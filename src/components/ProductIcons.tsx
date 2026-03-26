// src/components/ProductIcons.tsx
import React from 'react';
import type { MenuItem, MenuGroup } from '../types/menu';

const ICON_WEBPS: Record<string, string> = {
    'crepe_sweet': new URL('../assets/icons/crepe-sweet.webp', import.meta.url).href,
    'crepe_savory': new URL('../assets/icons/crepe-savory.webp', import.meta.url).href,
    'coffee_hot': new URL('../assets/icons/BebidaCaliente.webp', import.meta.url).href,
    'bubble_tea': new URL('../assets/icons/bubble-tea.webp', import.meta.url).href,
    'waffle': new URL('../assets/icons/waffle.webp', import.meta.url).href,
    'hotcakes': new URL('../assets/icons/hotcakes.webp', import.meta.url).href,
    'frappe': new URL('../assets/icons/frappe.webp', import.meta.url).href,
    'smoothie': new URL('../assets/icons/smoothie.webp', import.meta.url).href,
    'milkshake': new URL('../assets/icons/milkshake.webp', import.meta.url).href,
    'soda': new URL('../assets/icons/soda.webp', import.meta.url).href,
    'dessert': new URL('../assets/icons/Postre.webp', import.meta.url).href,
    'chamoyada': new URL('../assets/icons/Chamoyada.webp', import.meta.url).href,
    'fresa_crema': new URL('../assets/icons/FresaConCrema.webp', import.meta.url).href,

    //------Configuración de iconos de bebidas calientes------//
    'item_americano': new URL('../assets/icons/Cafe_Americano.webp', import.meta.url).href,
    'item_capuchino': new URL('../assets/icons/Cafe_Capuchino.webp', import.meta.url).href,
    'item_tisanas': new URL('../assets/icons/Tisana.webp', import.meta.url).href,
    'item_te': new URL('../assets/icons/Te.webp', import.meta.url).href,
    'item_chocolate': new URL('../assets/icons/Cafe_Chocolate.webp', import.meta.url).href,
    'item_chocolate_blanco': new URL('../assets/icons/Cafe_Chocolate_Blanco.webp', import.meta.url).href,
    'item_vainilla_latte': new URL('../assets/icons/Vainilla_Latte.webp', import.meta.url).href,
    'item_taro_latte': new URL('../assets/icons/Taro_Latte.webp', import.meta.url).href,
    'item_matcha_latte': new URL('../assets/icons/Matcha_Latte.webp', import.meta.url).href,
    'item_moka': new URL('../assets/icons/Cafe_Moka.webp', import.meta.url).href,
    'item_latte': new URL('../assets/icons/Latte.webp', import.meta.url).href,
};

const KawaiiIcon: React.FC<{ iconKey?: string }> = ({ iconKey }) => {
    const [hasError, setHasError] = React.useState(false);
    const src = iconKey ? ICON_WEBPS[iconKey] : null;

    if (src && !hasError) {
        return (
            <img
                src={src}
                alt={iconKey}
                onError={() => setHasError(true)}
                className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            />
        );
    }

    // Fallback based on keys if image fails or is missing
    if (iconKey?.includes('sweet') || iconKey?.includes('dessert') || iconKey?.includes('cake')) return <span className="text-5xl">🍰</span>;
    if (iconKey?.includes('savory') || iconKey?.includes('crepizza')) return <span className="text-5xl">🍕</span>;
    if (iconKey?.includes('coffee') || iconKey?.includes('latte') || iconKey?.includes('americano')) return <span className="text-5xl">☕</span>;
    if (iconKey?.includes('frappe') || iconKey?.includes('smoothie') || iconKey?.includes('milkshake')) return <span className="text-5xl">🥤</span>;
    if (iconKey?.includes('soda')) return <span className="text-5xl">🥤</span>;
    if (iconKey?.includes('tea')) return <span className="text-5xl">🧋</span>;
    if (iconKey?.includes('waffle')) return <span className="text-5xl">🧇</span>;
    return <span className="text-4xl text-gray-400">🍽️</span>;
};


function isGroup(item: MenuItem | MenuGroup): item is MenuGroup {
    return 'level' in item;
}

export function getIconForItem(item: MenuItem | MenuGroup): React.ReactNode {

    const id = item.id.toLowerCase();
    const category = 'category' in item ? item.category.toLowerCase() : '';
    const name = item.name.toLowerCase();

    // 1. POSTRES ESPECÍFICOS
    if (id.includes('item_fresa_crema') || name.includes('fresas con crema')) return <KawaiiIcon iconKey="fresa_crema" />;

    if (id === 'item_gelatina_rompope' || id === 'item_pay_limon' || id === 'item_gelatina_mosaico' ||
        id === 'item_arroz_leche' || id === 'item_flan_napolitano' || id === 'item_flan_vainilla' ||
        id === 'item_uvas_verdes_crema' || id === 'item_frutos_rojos_crema' || id === 'item_duraznos_crema') {
        return <KawaiiIcon iconKey="dessert" />;
    }

    // Crepas Dulces
    if (id.includes('item_frutos_rojos') || id.includes('dulce_cajeta') || id.includes('dulce_rompope') ||
        id.includes('dulce_tentacion') || id.includes('dulce_fresa') || id.includes('dulce_durazno') ||
        id.includes('delicia_casa') || id.includes('dulce_platano') || id.includes('dulce_tropical') ||
        id.includes('dulce_nutella') || id.includes('banana_caramel') || id.includes('strudel_manzana')) {
        return <KawaiiIcon iconKey="crepe_sweet" />;
    }

    // Crepas Saladas
    if (id.includes('hawaiana') || id.includes('italiana') || id.includes('crepizza') ||
        id.includes('tres_quesos') || id.includes('suprema') || id.includes('clasica') ||
        id.includes('chiken_tender') || id.includes('rajas_crema') || id.includes('vegetariana') ||
        id.includes('española') || id.includes('champiqueso') || id.includes('carnes_frias')) {
        return <KawaiiIcon iconKey="crepe_savory" />;
    }

    // 2. BEBIDAS CALIENTES
    if (id === 'item_americano') return <KawaiiIcon iconKey="item_americano" />;
    if (id === 'item_capuchino') return <KawaiiIcon iconKey="item_capuchino" />;
    if (id === 'item_taro_latte') return <KawaiiIcon iconKey="item_taro_latte" />;
    if (id === 'item_matcha_latte') return <KawaiiIcon iconKey="item_matcha_latte" />;
    if (id === 'item_moka') return <KawaiiIcon iconKey="item_moka" />;
    if (id === 'item_vainilla_latte') return <KawaiiIcon iconKey="item_vainilla_latte" />;
    if (id === 'item_latte') return <KawaiiIcon iconKey="item_latte" />;
    if (id === 'item_tisanas') return <KawaiiIcon iconKey="item_tisanas" />;
    if (id === 'item_te') return <KawaiiIcon iconKey="item_te" />;
    if (id === 'item_chocolate') return <KawaiiIcon iconKey="item_chocolate" />;
    if (id === 'item_chocolate_blanco') return <KawaiiIcon iconKey="item_chocolate_blanco" />;

    // 3. BEBIDAS FRÍAS
    if (id.includes('item_chamoyada') || category.includes('chamoyada') || name.includes('chamoyada')) return <KawaiiIcon iconKey="chamoyada" />;
    if (id.includes('item_frapp') || category.includes('frapp') || name.includes('frapp')) return <KawaiiIcon iconKey="frappe" />;
    if (id.includes('item_licuado') || category.includes('licuado') || name.includes('licuado')) return <KawaiiIcon iconKey="smoothie" />;
    if (id.includes('item_malteada') || category.includes('malteada') || name.includes('malteada')) return <KawaiiIcon iconKey="milkshake" />;
    if (id.includes('item_soda')) return <KawaiiIcon iconKey="soda" />;
    if (id.includes('item_bubble_tea') || category.includes('bubble tea') || name.includes('bubble tea') || name.includes('bublee'))
        return <KawaiiIcon iconKey="bubble_tea" />;

    // 4. OTROS POSTRES
    if (id.includes('item_hotcake') || category.includes('hotcake') || name.includes('hot cake') || name.includes('hotcake')) return <KawaiiIcon iconKey="hotcakes" />;
    if (id.includes('item_waffle') || category.includes('waffle') || name.includes('waffle')) return <KawaiiIcon iconKey="waffle" />;

    // Mapeos por categoría o grupo
    if (id.includes('postres_fijos') || id.includes('postres') || category.includes('postres')) return <KawaiiIcon iconKey="dessert" />;
    if (id.includes('dulces') || category.includes('dulces')) return <KawaiiIcon iconKey="crepe_sweet" />;
    if (id.includes('saladas') || category.includes('saladas')) return <KawaiiIcon iconKey="crepe_savory" />;
    if (id.includes('bebidas_frias') || category.includes('frias')) return <KawaiiIcon iconKey="bubble_tea" />;
    if (id.includes('bebidas_calientes') || category.includes('calientes')) return <KawaiiIcon iconKey="coffee_hot" />;
    if (id.includes('bebidas')) return <KawaiiIcon iconKey="coffee_hot" />;

    if (id.includes('bublee') || category.includes('bublee')) return <span className="text-5xl">🧋</span>;

    // DEFAULT
    return isGroup(item) ? null : <span className="text-4xl text-gray-400">🍽️</span>;
}