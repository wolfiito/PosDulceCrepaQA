// src/components/ProductIcons.tsx
import React from 'react';
import type { MenuItem, MenuGroup } from '../types/menu';

// --- COLECCIÓN DE ICONOS SVG ---

const IconBebidaFria = () => (<img src="/item_bebida_fria.svg" width="100" height="64" />);
const IconPostre = () => (<img src="/item_postre.svg" width="100" height="64" />);
const IconCrepaSalada = () => (<img src="/CrepasSaladas/item_crepa_salada.svg" width="100" height="64" />);

const IconCafeCaliente = () => (<img src="/item_cafe_caliente.svg" width="100" height="64" />);


const IconBebidas = () => (<img src="/item_bebida.svg" width="100" height="64" />);
const IconChamoyada = () => (<img src="/item_chamoyada.svg" width="100" height="64" />);
const IconFrappe = () => (<img src="/item_frappe.svg" width="100" height="64" />);
const IconLicuado = () => (<img src="/item_licuado.svg" width="100" height="64" />);
const IconMalteada = () => (<img src="/item_malteada.svg" width="100" height="64" />);
const IconSoda = () => (<img src="/item_soda.svg" width="100" height="64" />);

// __________ Inicia Panquecitos  __________ //
const IconHotcakes = () => (<img src="/Postres/hotcakes.svg" width="100" height="64" />);
const IconWaffle = () => (<img src="/Postres/waffle.svg" width="100" height="64" />);
const IconMiniHotcake = () => (<img src="/Postres/mini_hotcakes.svg" />);
// __________ Finaliza panquecitos  __________ //

// __________ Inicia Postres  __________ //
const IconFresaCrema = () => (<img src="/Postres/item_fresas_crema.svg" width="100" height="64" />);
const IconDuraznosCrema = () => (<img src="/Postres/item_duraznos_crema.svg" width="100" height="64" />);
const IconFrutosRojosCrema = () => (<img src="/Postres/item_frutos_rojos_crema.svg" width="100" height="64" />);
const IconUvasVerdesCrema = () => (<img src="/Postres/item_uvas_verdes_crema.svg" width="100" height="64" />);
const IconFlanVainilla = () => (<img src="/Postres/item_flan_vainilla.svg" width="100" height="64" />);
const IconFlanNapolitano = () => (<img src="/Postres/item_flan_napolitano.svg" width="100" height="64" />);
const IconArrozLeche = () => (<img src="/Postres/item_arroz_leche.svg" width="100" height="64" />);
const IconPayLimon = () => (<img src="/Postres/item_pay_limon.svg" width="100" height="64" />);
// __________ Finaliza Postres  __________ //

// ______ Iniciamos Crepas Dulces _______ //

const IconCrepaDulce = () => (<img src="/CrepasDulces/item_crepa_dulce.svg" />);
const IconArmaCrepa = () => (<img src="/CrepasDulces/item_arma_crepa.svg" />);
const IconDulceTropical = () => (<img src="/CrepasDulces/item_dulce_tropical.svg" />);
const IconDulceRompope = () => (<img src="/CrepasDulces/item_dulce_rompope.svg" />);
const IconDulcePlatano = () => (<img src="/CrepasDulces/item_dulce_platano.svg" width="100" height="64" />);
const IconDulceDuraznos = () => (<img src="/CrepasDulces/item_dulce_durazno.svg" width="100" height="64" />);
const IconDulceFrutosRojos = () => (<img src="/CrepasDulces/item_crepa_frutos_rojos.svg" width="100" height="64" />);
const IconStrudelManzana = () => (<img src="/CrepasDulces/item_crepa_strudel_manzana.svg" width="100" height="64" />);
const IconDulceCajeta = () => (<img src="/CrepasDulces/item_dulce_cajeta.svg" width="100" height="64" />);
const IconDulceTentacion = () => (<img src="/CrepasDulces/item_dulce_tentacion.svg" width="100" height="64" />);
const IconDulceFresa = () => (<img src="/CrepasDulces/item_dulce_fresa.svg" width="100" height="64" />);
const IconDeliciaCasa = () => (<img src="/CrepasDulces/item_delicia_casa.svg" width="100" height="64" />);
const IconBananaCaramel = () => (<img src="/CrepasDulces/item_banana_caramel.svg" />);
const IconNutella = () => (<img src="/CrepasDulces/item_dulce_nutella.svg"/>)
// ______ Finalizamos Crepas Dulces _______ //

// ______ Iniciamos Crepas Saladas _______ //

const IconCrepasSaladas = () => (<img src="/CrepasSaladas/crepas_saladas.svg" />)
const IconSaladaCarnesFrias = () => (<img src="/CrepasSaladas/item_carnes_frias.svg"/>)
const IconSaladaChampiQueso = () => (<img src="/CrepasSaladas/item_champiqueso.svg"/>)
const IconSaladaChickenTender = () => (<img src="/CrepasSaladas/item_chiken_tender.svg" width="100" height="64" />);
const IconSaladaClasica = () => (<img src="/CrepasSaladas/item_clasica.svg" width="100" height="64" />);
const IconSaladaCrepizza = () => (<img src="/CrepasSaladas/item_crepizza.svg" width="100" height="64" />);
const IconSaladaEspañola = () => (<img src="/CrepasSaladas/item_española.svg"/>)
const IconSaladaHawaiana = () => (<img src="/CrepasSaladas/item_hawaiana.svg" width="100" height="64" />);
const IconSaladaItaliana = () => (<img src="/CrepasSaladas/item_italiana.svg" width="100" height="64" />);
const IconSaladaRajas = () => (<img src="/CrepasSaladas/item_rajas_crema.svg" width="100" height="64" />);
const IconSaladaSuprema = () => (<img src="/CrepasSaladas/item_suprema.svg" width="100" height="64" />);
const IconSaladaTresQuesos = () => (<img src="/CrepasSaladas/item_tres_quesos.svg" width="100" height="64" />);  
const IconSaladaVegetarian = () => (<img src="/CrepasSaladas/item_vegetariana.svg"/>)

const IconAmericano = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);
const IconCapuccino = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);  
const IconLatte = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);
  // --- TÉS Y TISANAS ---
  
const IconTe = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);  
const IconTisanas = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />); 
  // --- CHOCOLATES ---
  
const IconChocolate = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);
const IconChocolateBlanco = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);
  // --- LATTES ESPECIALES ---
  
const IconVainillaLatte = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);  
const IconTaroLatte = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);  
const IconMatchaLatte = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);  
const IconMoka = () => (<img src="/item_dulce_cajeta.svg" width="100" height="64" />);

function isGroup(item: MenuItem | MenuGroup): item is MenuGroup {
    return 'level' in item;
}

// --- HELPER PARA OBTENER ICONOS ---
export function getIconForItem(item: MenuItem | MenuGroup): React.ReactNode {
    // Normalizamos todo a minúsculas
    const id = item.id.toLowerCase();
    const category = 'category' in item ? item.category.toLowerCase() : '';
    const name = item.name.toLowerCase(); 

    if (id === 'item_pay_limon') return <IconPayLimon />;
    if (id === 'item_arroz_leche') return <IconArrozLeche />;
    if (id === 'item_flan_napolitano') return <IconFlanNapolitano />;
    if (id === 'item_flan_vainilla') return <IconFlanVainilla />;
    if (id === 'item_uvas_verdes_crema') return <IconUvasVerdesCrema />;
    if (id === 'item_frutos_rojos_crema') return <IconFrutosRojosCrema />;
    if (id === 'item_duraznos_crema') return <IconDuraznosCrema />;
    if (id === 'item_fresa_crema' || name.includes('fresas con crema')) return <IconFresaCrema />;



    // __________ Inicia Iconos Crepas Dulces  __________ //
    if (id === 'crepas_dulces') return <IconCrepaDulce />
    if (id === 'item_frutos_rojos') return <IconDulceFrutosRojos />
    if (id === 'item_dulce_cajeta') return <IconDulceCajeta />
    if (id === 'item_dulce_rompope') return <IconDulceRompope />
    if (id === 'item_dulce_tentacion') return <IconDulceTentacion />
    if (id === 'item_dulce_fresa') return <IconDulceFresa />
    if (id === 'item_dulce_durazno') return <IconDulceDuraznos />
    if (id === 'item_delicia_casa') return <IconDeliciaCasa />
    if (id === 'item_dulce_platano') return <IconDulcePlatano />
    if (id === 'item_dulce_tropical') return <IconDulceTropical />
    if (id === 'item_strudel_manzana') return <IconStrudelManzana/>
    if (id === 'item_banana_caramel') return <IconBananaCaramel />
    if (id === 'item_dulce_nutella') return <IconNutella />
    // __________ Finaliza Iconos Crepas Dulces  __________ //

    // __________ Inicia Iconos Crepas Saladas  __________ //
    if (id === 'crepas_saladas') return <IconCrepasSaladas/>
    if (id === 'item_carnes_frias') return <IconSaladaCarnesFrias />
    if (id === 'item_champiqueso') return <IconSaladaChampiQueso />
    if (id === 'item_chiken_tender') return <IconSaladaChickenTender />
    if (id === 'item_clasica') return <IconSaladaClasica />
    if (id === 'item_crepizza') return <IconSaladaCrepizza />
    if (id === 'item_española') return <IconSaladaEspañola />
    if (id === 'item_hawaiana') return <IconSaladaHawaiana />
    if (id === 'item_italiana') return <IconSaladaItaliana />
    if (id === 'item_rajas_crema_esp') return <IconSaladaRajas />
    if (id === 'item_suprema') return <IconSaladaSuprema />
    if (id === 'item_tres_quesos') return <IconSaladaTresQuesos />
    if (id === 'item_vegetariana') return <IconSaladaVegetarian />
    // __________ Finaliza Iconos Crepas Dulces  __________ //
    
    if (id === 'item_americano') return <IconAmericano />
    if (id === 'item_capuchino') return <IconCapuccino />
    if (id === 'item_tisanas') return <IconTisanas />
    if (id === 'item_te') return <IconTe />
    if (id === 'item_chocolate') return <IconChocolate />
    if (id === 'item_chocolate_blanco') return <IconChocolateBlanco />
    if (id === 'item_vainilla_latte') return <IconVainillaLatte />
    if (id === 'item_taro_latte') return <IconTaroLatte />
    if (id === 'item_matcha_latte') return <IconMatchaLatte />
    if (id === 'item_moka') return <IconMoka />
    if (id === 'item_latte') return <IconLatte />

    if (id.includes('hotcake') || category.includes('hotcake') || name.includes('hot cake') || name.includes('hotcake')) return <IconHotcakes />;
    if (id.includes('waffle') || category.includes('waffle') || name.includes('waffle')) return <IconWaffle />;
    if (id.includes('chamoyada') || category.includes('chamoyada') || name.includes('chamoyada')) return <IconChamoyada />;
    if (id.includes('frapp') || category.includes('frapp') || name.includes('frapp')) return <IconFrappe />;
    if (id.includes('licuado') || category.includes('licuado') || name.includes('licuado')) return <IconLicuado />;
    if (id.includes('malteada') || category.includes('malteada') || name.includes('malteada')) return <IconMalteada />;
    if (id.includes('item_soda')) return <IconSoda />;
    
    // 2. CATEGORÍAS Y GRUPOS (IDs parciales)
    if (id.includes('postres_fijos')) return <IconPostre />;
    
    if (id.includes('dulces') || category.includes('dulces')) return <IconCrepaDulce />;
    if (id.includes('saladas') || category.includes('saladas')) return <IconCrepaSalada />;
    
    // Bebidas
    if (id.includes('bebidas_frias') || category.includes('frias')) return <IconBebidaFria />;
    if (id.includes('bebidas_calientes') || category.includes('calientes')) return <IconCafeCaliente />;
    if (id.includes('bebidas')) return <IconBebidas />;
    
    // Otros
    if (id.includes('postres') || category.includes('postres')) return <IconPostre />;
    
    if (id.includes('bublee') || category.includes('bublee')) return <span className="text-5xl">🧋</span>;

    // 3. DEFAULT
    return isGroup(item) ? <span className="text-5xl"></span> : <span className="text-5xl">🍽️</span>;
}