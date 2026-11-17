// src/utils/receiptImage.ts
// Dibuja el ticket completo como imagen (PNG blanco y negro) para la impresora térmica.
// Thermer junta los espacios del texto y no permite columnas; como imagen controlamos
// letra, logo, sangrías y precios alineados a la derecha.
import type { Order } from '../types/order';
import type { TicketItem } from '../types/menu';
import {
    consolidateItems,
    getFormattedDate,
    LOGO_PATH,
    PAYMENT_LABELS,
    type ReceiptBranchInfo
} from './bluetoothPrintBuilder';
import { getBranchPrice } from './pricing';

// Impresora de 58 mm = 384 puntos de ancho
const WIDTH = 384;
const MARGIN = 8;
const RIGHT = WIDTH - MARGIN;
const QTY_X = MARGIN;
const NAME_X = 40;       // descripción del producto
const MOD_X = 56;        // sangría de ingredientes / extras
const PRICE_COL = 96;    // espacio reservado para el importe a la derecha

const FAMILY = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const font = (size: number, bold = false) => `${bold ? 'bold ' : ''}${size}px ${FAMILY}`;

const money = (value: number) => `$${value.toFixed(2)}`;

// El logo se carga desde el inicio para no demorar la impresión
// (en iPhone el enlace a Thermer debe abrirse sin esperas).
const logo = typeof Image !== 'undefined' ? new Image() : null;
if (logo) logo.src = LOGO_PATH;

/** Precio unitario separado en base + extras con costo. Si no cuadra, todo es base. */
const splitItemPrice = (item: TicketItem, branchId?: string | null) => {
    const extras = (item.details?.selectedModifiers || []).reduce(
        (sum, mod) => sum + getBranchPrice(mod.price, mod.branchPrices, branchId), 0);
    if (extras <= 0 || extras > item.finalPrice) return { base: item.finalPrice, extras: 0 };
    return { base: item.finalPrice - extras, extras };
};

class ReceiptCanvas {
    private ctx: CanvasRenderingContext2D;
    y = MARGIN;

    constructor(private canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas no disponible');
        this.ctx = ctx;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'top';
    }

    /** Parte el texto en renglones que quepan en `maxWidth` sin cortar palabras. */
    wrap(text: string, maxWidth: number, f: string): string[] {
        this.ctx.font = f;
        const lines: string[] = [];
        let current = '';
        text.split(/\s+/).filter(Boolean).forEach(word => {
            const candidate = current ? `${current} ${word}` : word;
            if (this.ctx.measureText(candidate).width <= maxWidth || !current) current = candidate;
            else { lines.push(current); current = word; }
        });
        if (current) lines.push(current);
        return lines.length ? lines : [''];
    }

    /** Renglón con texto a la izquierda (desde x) y opcionalmente a la derecha. */
    row(left: string, opts: { x?: number; right?: string; size?: number; bold?: boolean; gap?: number } = {}) {
        const { x = MARGIN, right, size = 20, bold = false, gap = 4 } = opts;
        const f = font(size, bold);
        const maxWidth = RIGHT - x - (right ? PRICE_COL : 0);
        const lines = this.wrap(left, maxWidth, f);
        this.ctx.font = f;
        lines.forEach((line, i) => {
            this.ctx.textAlign = 'left';
            this.ctx.fillText(line, x, this.y);
            if (i === 0 && right) {
                this.ctx.textAlign = 'right';
                this.ctx.fillText(right, RIGHT, this.y);
            }
            this.y += size + gap;
        });
    }

    center(text: string, size = 20, bold = false) {
        const f = font(size, bold);
        this.wrap(text, RIGHT - MARGIN, f).forEach(line => {
            this.ctx.font = f;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(line, WIDTH / 2, this.y);
            this.y += size + 4;
        });
    }

    /** Texto suelto en una posición del renglón actual (sin avanzar). */
    text(value: string, x: number, size: number, bold = false, align: CanvasTextAlign = 'left') {
        this.ctx.font = font(size, bold);
        this.ctx.textAlign = align;
        this.ctx.fillText(value, x, this.y);
    }

    divider(thick = 2, dashed = false) {
        this.y += 6;
        this.ctx.setLineDash(dashed ? [6, 4] : []);
        this.ctx.lineWidth = thick;
        this.ctx.beginPath();
        this.ctx.moveTo(MARGIN, this.y);
        this.ctx.lineTo(RIGHT, this.y);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.y += 10;
    }

    space(px: number) { this.y += px; }

    image(img: HTMLImageElement, width: number) {
        const height = Math.round(img.naturalHeight * (width / img.naturalWidth));
        this.ctx.drawImage(img, Math.round((WIDTH - width) / 2), this.y, width, height);
        this.y += height + 8;
    }

    /** Recorta al alto usado y deja solo blanco y negro (la térmica no imprime grises). */
    finish(): string {
        const out = document.createElement('canvas');
        out.width = WIDTH;
        out.height = Math.ceil(this.y + MARGIN);
        const outCtx = out.getContext('2d');
        if (!outCtx) throw new Error('Canvas no disponible');
        outCtx.drawImage(this.canvas, 0, 0);
        const pixels = outCtx.getImageData(0, 0, out.width, out.height);
        const d = pixels.data;
        for (let i = 0; i < d.length; i += 4) {
            const lum = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
            const v = d[i + 3] < 128 || lum > 150 ? 255 : 0;
            d[i] = d[i + 1] = d[i + 2] = v;
            d[i + 3] = 255;
        }
        outCtx.putImageData(pixels, 0, 0);
        return out.toDataURL('image/png');
    }
}

/** Ticket de venta como imagen PNG (data URL) de 384 px de ancho. */
export const buildReceiptImage = (order: Order, branch?: ReceiptBranchInfo): string => {
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = 6000; // se recorta al final
    const r = new ReceiptCanvas(canvas);

    // --- 1. LOGO Y SUCURSAL ---
    if (logo?.complete && logo.naturalWidth > 0) r.image(logo, 200);
    if (branch?.name) r.center(branch.name, 26, true);
    if (branch?.address) r.center(branch.address, 17);
    r.divider();

    // --- 2. DATOS DE LA ORDEN ---
    const { date, time } = getFormattedDate(order);
    const formatFolio = (n: number) => `#${String(n ?? 0).padStart(4, '0')}`;
    const folios = order.mergedOrderNumbers && order.mergedOrderNumbers.length > 1
        ? order.mergedOrderNumbers
        : [order.orderNumber];
    if (folios.length === 1) {
        r.row(`Folio ${formatFolio(folios[0])}`, { right: order.mode || '', size: 22, bold: true });
    } else {
        r.row(order.mode || '', { size: 22, bold: true });
        r.row(`Folios: ${folios.map(formatFolio).join(', ')}`, { size: 20, bold: true });
    }
    r.row(date, { right: time, size: 18 });
    if (order.customerName) r.row(`Cliente: ${order.customerName}`, { size: 18 });
    r.row(`Atendió: ${order.cashier || 'Cajero General'}`, { size: 18 });
    r.divider();

    // --- 3. PRODUCTOS ---
    r.text('CANT', QTY_X, 15, true);
    r.text('DESCRIPCIÓN', MOD_X, 15, true);
    r.text('IMPORTE', RIGHT, 15, true, 'right');
    r.space(20);
    r.divider(1, true);

    const items = consolidateItems(order.items);
    items.forEach((item, index) => {
        const qty = item.quantity || 1;
        const { base, extras } = splitItemPrice(item, order.branchId);
        const variant = item.details?.variantName ? ` (${item.details.variantName})` : '';

        r.text(String(qty), QTY_X, 22, true);
        r.row(`${item.baseName}${variant}`, { x: NAME_X, right: money(base * qty), size: 22, bold: true });

        item.details?.selectedModifiers?.forEach(mod => {
            const modPrice = getBranchPrice(mod.price, mod.branchPrices, order.branchId);
            r.row(`+ ${mod.name}`, {
                x: MOD_X,
                right: modPrice > 0 ? money(modPrice * qty) : undefined,
                size: 19,
                gap: 3
            });
        });

        if (qty > 1) r.row(`${qty} x ${money(item.finalPrice)}`, { x: MOD_X, size: 17 });
        if (extras > 0) {
            r.text('Subtotal', RIGHT - PRICE_COL - 8, 20, true, 'right');
            r.text(money(item.finalPrice * qty), RIGHT, 20, true, 'right');
            r.space(24);
        }
        if (index < items.length - 1) r.space(8);
    });
    r.divider();

    // --- 4. TOTALES ---
    const totalUnits = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    r.row('Artículos', { right: String(totalUnits), size: 18 });
    r.space(2);
    r.row('TOTAL', { right: money(order.total), size: 32, bold: true });
    r.divider();

    // --- 5. FORMA DE PAGO ---
    const payment = order.payment;
    if (!payment) {
        r.center('PENDIENTE DE PAGO', 22, true);
    } else if (payment.method === 'mixed') {
        r.center('PAGO COMBINADO', 20, true);
        payment.transactions?.forEach(tx => {
            r.row(PAYMENT_LABELS[tx.method] || 'Otro', { right: money(tx.amount), size: 19 });
        });
        if (payment.change > 0) r.row('Cambio', { right: money(payment.change), size: 20, bold: true });
    } else if (payment.method === 'cash') {
        // totalPaid = lo que entregó el cliente (ej. billete de $500)
        const received = payment.totalPaid || payment.amountPaid || order.total;
        r.row('Efectivo', { right: money(received), size: 19 });
        r.row('Cambio', { right: money(payment.change || 0), size: 20, bold: true });
    } else {
        r.row(PAYMENT_LABELS[payment.method] || 'Otro', { right: money(order.total), size: 19 });
    }

    // --- 6. PIE ---
    r.space(16);
    r.center('¡Gracias por su visita!', 22, true);
    r.center('Este no es un comprobante fiscal', 16);
    r.space(24);

    return r.finish();
};

/**
 * JSON para Thermer con el ticket como una sola imagen.
 * Regresa null si el navegador no pudo dibujarlo, para usar el ticket de texto.
 */
export const buildReceiptImageJSON = (order: Order, branch?: ReceiptBranchInfo): string | null => {
    try {
        const image = buildReceiptImage(order, branch);
        return JSON.stringify({
            '000': { type: 1, path: image, align: 1 },
            '001': { type: 0, content: '\n', bold: 0, align: 0, format: 0 },
            '002': { type: 0, content: '\n', bold: 0, align: 0, format: 0 }
        });
    } catch (error) {
        console.error('No se pudo generar el ticket como imagen:', error);
        return null;
    }
};
