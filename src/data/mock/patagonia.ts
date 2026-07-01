// Patagonia journey itinerary data — two trip options

export interface DayEntry {
  day: number;
  date: string;
  title: string;
  location: string;
  coordinates: [number, number]; // [lng, lat]
  meals: string;
  description: string;
  detail?: string;
  transport: { type: "flight" | "drive" | "boat" | "trek" | "bus" | "local"; label: string }[];
  tip?: string;
}

export interface RouteSegment {
  from: [number, number];
  to: [number, number];
  type: "flight" | "ground";
  label?: string; // e.g. "2h" or "110km"
}

export interface Destination {
  name: string;
  color: string;
  badge: string;
}

export interface Itinerary {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  totalDays: number;
  destinations: Destination[];
  route: RouteSegment[];
  days: DayEntry[];
  stats: { label: string; value: string }[];
  price?: string;
  included?: string[];
  notIncluded?: string[];
  flights?: string;
}

// ── Coordinates ──
const COORDS = {
  buenosAires: [-58.3816, -34.6037] as [number, number],
  trelew: [-65.3050, -43.2489] as [number, number],
  puntaTombo: [-65.2094, -44.0422] as [number, number],
  puertoMadryn: [-65.0385, -42.7692] as [number, number],
  peninsulaValdes: [-63.9222, -42.4838] as [number, number],
  ushuaia: [-68.3030, -54.8019] as [number, number],
  elCalafate: [-72.2648, -50.3371] as [number, number],
  peritoMoreno: [-73.0486, -50.4965] as [number, number],
  torresDelPaine: [-72.9677, -51.0534] as [number, number],
  bariloche: [-71.3103, -41.1335] as [number, number],
  elChalten: [-72.8867, -49.3314] as [number, number],
  lagoArgentino: [-72.8, -50.2] as [number, number],
  parqueTierraFuego: [-68.5607, -54.8422] as [number, number],
};

// ── Destination colors ──
const DEST_COLORS = {
  buenosAires: "#00ff66",
  madryn: "#d4a847",
  ushuaia: "#b09fd4",
  calafate: "#4a9ebb",
  paine: "#2dd4bf",
  bariloche: "#4a9ebb",
  chalten: "#c0845a",
};

// ══════════════════════════════════════
// OPTION 1: Fly & Drive (Nov 2020)
// ══════════════════════════════════════
export const option1: Itinerary = {
  id: "fly-drive-2020",
  title: "Option 1",
  subtitle: "Fly & Drive — Patagonia & Terra del Fuoco",
  dates: "3 – 17 Novembre 2020",
  totalDays: 15,
  destinations: [
    { name: "Buenos Aires", color: DEST_COLORS.buenosAires, badge: "bg-cyan/10 border-cyan/30 text-cyan" },
    { name: "Puerto Madryn", color: DEST_COLORS.madryn, badge: "bg-yellow/10 border-yellow/30 text-yellow" },
    { name: "Ushuaia", color: DEST_COLORS.ushuaia, badge: "bg-purple-400/10 border-purple-400/30 text-purple-400" },
    { name: "El Calafate", color: DEST_COLORS.calafate, badge: "bg-sky-400/10 border-sky-400/30 text-sky-400" },
    { name: "Torres del Paine", color: DEST_COLORS.paine, badge: "bg-teal-400/10 border-teal-400/30 text-teal-400" },
  ],
  route: [
    { from: COORDS.buenosAires, to: COORDS.trelew, type: "flight", label: "2h" },
    { from: COORDS.trelew, to: COORDS.puntaTombo, type: "ground", label: "110km" },
    { from: COORDS.puntaTombo, to: COORDS.puertoMadryn, type: "ground", label: "180km" },
    { from: COORDS.puertoMadryn, to: COORDS.peninsulaValdes, type: "ground", label: "77km" },
    { from: COORDS.peninsulaValdes, to: COORDS.puertoMadryn, type: "ground" },
    { from: COORDS.puertoMadryn, to: COORDS.trelew, type: "ground", label: "65km" },
    { from: COORDS.trelew, to: COORDS.ushuaia, type: "flight", label: "2h15" },
    { from: COORDS.ushuaia, to: COORDS.elCalafate, type: "flight", label: "1h20" },
    { from: COORDS.elCalafate, to: COORDS.peritoMoreno, type: "ground", label: "80km" },
    { from: COORDS.peritoMoreno, to: COORDS.elCalafate, type: "ground" },
    { from: COORDS.elCalafate, to: COORDS.torresDelPaine, type: "ground", label: "4h" },
    { from: COORDS.torresDelPaine, to: COORDS.elCalafate, type: "ground", label: "4h" },
    { from: COORDS.elCalafate, to: COORDS.buenosAires, type: "flight", label: "2h55" },
  ],
  stats: [
    { label: "Giorni", value: "15" },
    { label: "Destinazioni", value: "5" },
    { label: "Voli interni", value: "5" },
    { label: "Auto 4x4", value: "3" },
  ],
  price: "€ 3.890",
  included: [
    "Voli intercontinentali Alitalia/Aerolineas Argentinas classe economica",
    "Voli interni Buenos Aires–Trelew, Trelew–Ushuaia, Ushuaia–El Calafate, El Calafate–Buenos Aires",
    "Hotel 4**** sup su base camera doppia (Gran Brizo, Territorio, Los Cauquenes, Rochester, Hosteria Grey)",
    "Noleggio auto 4x4 con assicurazione base e GPS",
    "Escursione guidata Buenos Aires con guida italiana",
    "Navigazione Canale di Beagle inclusa",
    "Navigazione catamarano Lago Argentino — Captain's Club con pranzo",
    "Avvistamento balene Golfo Nuevo (soggetto a condizioni meteo)",
    "Cena con spettacolo di tango a Buenos Aires",
    "Assicurazione medica, rimpatrio sanitario, polizza Viaggi Rischio Zero",
  ],
  notIncluded: [
    "Tasse aeroportuali (~€ 450)",
    "Tasse di ingresso parchi (Paine, Valdés)",
    "Bevande, extra personali, eccedenza bagaglio",
    "Escursioni facoltative",
    "Assicurazione annullamento viaggio",
  ],
  flights: `VRN→FCO AZ1488 15:10–16:10 | FCO→EZE AR1141 18:15–04:40+1
AEP→REL AR1852 04:30–06:30 | REL→USH AR1864 12:05–14:15
USH→FTE AR1825 19:50–21:10 | FTE→AEP AR1847 14:40–17:35
EZE→FCO AR1140 22:45–16:00+1 | FCO→VRN AZ1491 17:30–18:30`,
  days: [
    {
      day: 1, date: "3 NOV", title: "Verona → Buenos Aires",
      location: "In volo", coordinates: COORDS.buenosAires, meals: "-/-/-",
      description: "Partenza da Verona con volo intercontinentale per Buenos Aires via Roma Fiumicino. Pasti e pernottamento a bordo.",
      transport: [{ type: "flight", label: "VRN → FCO → EZE" }],
    },
    {
      day: 2, date: "4 NOV", title: "Arrivo a Buenos Aires",
      location: "Buenos Aires", coordinates: COORDS.buenosAires, meals: "B/-/-",
      description: "Arrivo, trasferimento al Gran Brizo 4****sup con early check-in. Pomeriggio: visita guidata di Buenos Aires — Plaza de Mayo, Casa Rosada, Cabildo, Catedral Metropolitana, Avenida de Mayo, Palacio del Congreso, Avenida 9 de Julio con l'Obelisco, Teatro Colón, La Boca con il colorato Caminito e la Bombonera, San Telmo con le tanguerias.",
      detail: "Buenos Aires è la città più europea del continente sudamericano. La Boca è la culla del grande calcio argentino — qui nacquero River Plate e Boca Juniors. Nel XIX secolo è nato il tango, simbolo dell'Argentina. Lo storico Café Tortoni fu frequentato da Borges e Carlos Gardel. La Recoleta ospita il cimitero dove riposa Evita Perón. Palermo Soho e Hollywood offrono la vita più mondana della città.",
      transport: [{ type: "local", label: "Transfer + Tour 3h" }],
      tip: "Early check-in incluso — riposarsi prima del tour",
    },
    {
      day: 3, date: "5 NOV", title: "Buenos Aires libera",
      location: "Buenos Aires", coordinates: COORDS.buenosAires, meals: "B/-/-",
      description: "Giornata libera per esplorare la città più europea dell'America Latina. Consigliati: Museo MALBA, quartiere Palermo Soho, cimitero della Recoleta, Museo Evita.",
      transport: [{ type: "local", label: "Libero" }],
      tip: "Da non perdere il Teatro Colón e una milonga serale",
    },
    {
      day: 4, date: "6 NOV", title: "Buenos Aires → Punta Tombo → Puerto Madryn",
      location: "Puerto Madryn", coordinates: COORDS.puertoMadryn, meals: "B/-/-",
      description: "Volo per Trelew. Ritiro Renault Duster 4x4. Visita della Riserva di Punta Tombo — la più grande colonia di pinguini di Magellano al mondo, oltre 500.000 esemplari. Camminata tra nidi e cuccioli. Trasferimento a Puerto Madryn, hotel Territorio 4****sup.",
      detail: "Punta Tombo comprende spiagge rocciose dove la Patagonia incontra l'oceano. I pinguini raggiungono 50-60cm di altezza e arrivano ad agosto. A novembre le uova si schiudono. Durante l'escursione si vedono anche cormorani, gabbiani e procellarie.",
      transport: [
        { type: "flight", label: "AEP → REL 2h" },
        { type: "drive", label: "Trelew → Punta Tombo 110km" },
        { type: "drive", label: "Punta Tombo → Madryn" },
      ],
      tip: "Escursione totale ~8h. Puerto Madryn fu fondata dai gallesi nel 1886",
    },
    {
      day: 5, date: "7 NOV", title: "Penisola Valdés",
      location: "Puerto Madryn", coordinates: COORDS.peninsulaValdes, meals: "B/-/-",
      description: "Giornata alla Penisola Valdés, Patrimonio UNESCO. Fauna locale: foche, leoni marini, nandù, guanaco. Navigazione inclusa per avvistamento delle balene australi nel Golfo Nuevo — emozione incredibile vedere questi giganti saltare fuori dall'acqua.",
      detail: "La Penisola di Valdés è un promontorio collegato alla terraferma da un istmo di 35km, una delle riserve marine più importanti del pianeta. Puerto Pirámides è il punto privilegiato per le balene (giugno-novembre). Le Salinas Grandes si trovano a 42m sotto il livello del mare — tra le depressioni continentali più basse al mondo.",
      transport: [
        { type: "drive", label: "Escursione libera ~10h" },
        { type: "boat", label: "Navigazione balene inclusa" },
      ],
      tip: "Navigazione soggetta a condizioni meteo",
    },
    {
      day: 6, date: "8 NOV", title: "Puerto Madryn → Ushuaia",
      location: "Ushuaia", coordinates: COORDS.ushuaia, meals: "B/-/-",
      description: "Rilascio auto a Trelew. Volo per Ushuaia, la città più australe del mondo. Ritiro Toyota Hilux 4x4 doble cabina. Hotel Los Cauquenes 4****sup. Tempo per esplorare il centro, Museo del Penitenziario e Museo de La Fin del Mundo.",
      detail: "All'estremo sud, nella Terra del Fuoco, Ushuaia è nascosta tra Cerro Martial e Monte Olivia. I primi europei furono i marinai di Magellano nel 1520, che vedendo i fuochi degli indigeni nominarono la zona 'Terra del Fuoco'. Ottima base per il Parco Nazionale, escursioni sul Canale di Beagle e la gastronomia a base di centolla.",
      transport: [
        { type: "drive", label: "Madryn → Trelew" },
        { type: "flight", label: "REL → USH ~2h15" },
      ],
    },
    {
      day: 7, date: "9 NOV", title: "Parco Nazionale & Canale di Beagle",
      location: "Ushuaia", coordinates: COORDS.ushuaia, meals: "B/-/-",
      description: "Mattina: Parco Nazionale di Lapataia — boschi andini, Canale di Beagle, fine della Ruta Nacional 3, Baia di Lapataia con testimonianze archeologiche. Pomeriggio: navigazione sul Canale di Beagle — Isla de los Pájaros, Isla de los Lobos con leoni marini, Faro de Les Éclaireurs.",
      detail: "Il Canale di Beagle deve il nome alla nave di Charles Darwin, esplorato dal capitano Fitz Roy nel 1833. Il Parco Nazionale protegge 630km² di montagne con boschi subantartici e tundra — habitat di volpi rosse, castori, oche, falchi e il picchio di Magellano.",
      transport: [
        { type: "drive", label: "Parco Lapataia ~4h" },
        { type: "boat", label: "Beagle Channel 2h30" },
      ],
      tip: "Navigazione inclusa. Estancia Harberton è la più antica della Terra del Fuoco (1887)",
    },
    {
      day: 8, date: "10 NOV", title: "Ushuaia → El Calafate",
      location: "El Calafate", coordinates: COORDS.elCalafate, meals: "B/-/-",
      description: "Tempo libero a Ushuaia. Rilascio auto in aeroporto. Volo per El Calafate. Ritiro Nissan Frontier 4x4. Hotel Rochester 4**** con camere vista lago.",
      detail: "El Calafate deve il nome a un arbusto delle Berberidaceae tipico della Patagonia. La leggenda dice: 'el que toma el calafate, volverá'. Un tempo semplice punto di ristoro tra le estancias, oggi base per il Perito Moreno. Il Glaciarium è un museo del ghiaccio con il GlacioBar nel sottosuolo.",
      transport: [
        { type: "flight", label: "USH → FTE ~1h20" },
      ],
    },
    {
      day: 9, date: "11 NOV", title: "Ghiacciai Upsala & Spegazzini",
      location: "El Calafate", coordinates: COORDS.lagoArgentino, meals: "B/L/-",
      description: "Navigazione in catamarano sul Lago Argentino alla scoperta dei ghiacciai Upsala e Spegazzini. Pranzo incluso in Captain's Club — ponte superiore con zona riservata e migliori viste. Giornata intera, 8 ore.",
      transport: [
        { type: "boat", label: "Catamarano Lago Argentino 8h" },
      ],
      tip: "Pranzo Captain's Club incluso. Prenotare in anticipo (ott–mar)",
    },
    {
      day: 10, date: "12 NOV", title: "Ghiacciaio Perito Moreno",
      location: "El Calafate", coordinates: COORDS.peritoMoreno, meals: "B/-/-",
      description: "Escursione libera al Perito Moreno attraverso la steppa patagonica. Sentieri su tre livelli fino all'immensa parete di ghiaccio — 5km di larghezza, 60m sopra il lago, 200m sotto. Uno dei pochi ghiacciai al mondo ancora in espansione. Possibilità di minicrociera o minitrekking con ramponi.",
      detail: "Il Perito Moreno sorprende per la varietà di colori: dal bianco neve al rame con venature di grigio all'incredibile blu profondo. Le torri ghiacciate si staccano dal fronte e si schiantano nel lago come colpi di cannone. Lo spettacolo: una lingua di ghiaccio tra le montagne, l'azzurro del Lago Argentino e il volo silenzioso del condor.",
      transport: [
        { type: "drive", label: "Calafate → Perito Moreno 80km" },
      ],
      tip: "Al rientro: Museo del Ghiaccio con brindisi nel Glacio Bar a -15°C!",
    },
    {
      day: 11, date: "13 NOV", title: "El Calafate → Torres del Paine",
      location: "Torres del Paine", coordinates: COORDS.torresDelPaine, meals: "B/-/-",
      description: "Partenza verso il confine cileno ed entrata nel Parco Nazionale Torres del Paine, Riserva della Biosfera UNESCO. 181.000 ettari di foreste, ghiacciai, fiumi e laghi. Hosteria Grey 4****.",
      detail: "Il parco comprende Cerros del Paine, Torres del Paine e Cuernos del Paine. 26 specie di mammiferi (volpi, guanaco, huemul, puma) e 118 di uccelli (condor, fenicotteri, cigni dal collo nero). I Tehuelche chiamarono il complesso 'paine' — blu nella loro lingua. Lady Florence Dixie fu la prima turista nel 1879 e pubblicò 'Across Patagonia'.",
      transport: [
        { type: "drive", label: "El Calafate → Torres del Paine ~4h" },
      ],
    },
    {
      day: 12, date: "14 NOV", title: "Torres del Paine — Escursioni",
      location: "Torres del Paine", coordinates: COORDS.torresDelPaine, meals: "B/L/-",
      description: "Giornata libera per escursioni nel parco. Trekking ai miradores, Lago Grey, ghiacciaio Grey. Pranzo al sacco o al rifugio. Paesaggi tra i più spettacolari della Patagonia.",
      transport: [
        { type: "trek", label: "Trekking libero nel parco" },
      ],
    },
    {
      day: 13, date: "15 NOV", title: "Torres del Paine → Buenos Aires",
      location: "Buenos Aires", coordinates: COORDS.buenosAires, meals: "B/-/D",
      description: "Trasferimento al Calafate e volo per Buenos Aires. Hotel Gran Brizo. Serata: show di tango con cena in uno storico locale.",
      transport: [
        { type: "drive", label: "Paine → El Calafate" },
        { type: "flight", label: "FTE → AEP ~2h55" },
      ],
      tip: "Cena con tango inclusa",
    },
    {
      day: 14, date: "16 NOV", title: "Buenos Aires → Italia",
      location: "Buenos Aires", coordinates: COORDS.buenosAires, meals: "B/-/-",
      description: "Mattinata libera per ultimi acquisti. Camere disponibili fino alle 18:00. Trasferimento in aeroporto e volo intercontinentale per l'Italia.",
      transport: [{ type: "flight", label: "EZE → FCO 22:45" }],
    },
    {
      day: 15, date: "17 NOV", title: "Arrivo in Italia",
      location: "Italia", coordinates: COORDS.buenosAires, meals: "-/-/-",
      description: "Arrivo a Roma Fiumicino e volo per Verona. Fine del viaggio.",
      transport: [{ type: "flight", label: "FCO → VRN 17:30" }],
    },
  ],
};

// ══════════════════════════════════════
// OPTION 2: 15 Days Exploration
// ══════════════════════════════════════
export const option2: Itinerary = {
  id: "exploration-15d",
  title: "Option 2",
  subtitle: "Bariloche · Puerto Madryn · El Calafate · El Chaltén · Ushuaia",
  dates: "15 Giorni — Ottobre–Aprile",
  totalDays: 15,
  destinations: [
    { name: "Bariloche", color: DEST_COLORS.bariloche, badge: "bg-sky-400/10 border-sky-400/30 text-sky-400" },
    { name: "Puerto Madryn", color: DEST_COLORS.madryn, badge: "bg-yellow/10 border-yellow/30 text-yellow" },
    { name: "El Calafate", color: DEST_COLORS.calafate, badge: "bg-sky-300/10 border-sky-300/30 text-sky-300" },
    { name: "El Chaltén", color: DEST_COLORS.chalten, badge: "bg-amber-600/10 border-amber-600/30 text-amber-600" },
    { name: "Ushuaia", color: DEST_COLORS.ushuaia, badge: "bg-purple-400/10 border-purple-400/30 text-purple-400" },
  ],
  route: [
    { from: COORDS.buenosAires, to: COORDS.bariloche, type: "flight", label: "2h" },
    { from: COORDS.bariloche, to: COORDS.puertoMadryn, type: "flight", label: "3h" },
    { from: COORDS.puertoMadryn, to: COORDS.puntaTombo, type: "ground", label: "180km" },
    { from: COORDS.puntaTombo, to: COORDS.puertoMadryn, type: "ground" },
    { from: COORDS.puertoMadryn, to: COORDS.elCalafate, type: "flight", label: "4h" },
    { from: COORDS.elCalafate, to: COORDS.elChalten, type: "ground", label: "3h" },
    { from: COORDS.elChalten, to: COORDS.elCalafate, type: "ground", label: "3h" },
    { from: COORDS.elCalafate, to: COORDS.ushuaia, type: "flight", label: "1h30" },
    { from: COORDS.ushuaia, to: COORDS.buenosAires, type: "flight", label: "3h30" },
  ],
  stats: [
    { label: "Giorni", value: "15" },
    { label: "Destinazioni", value: "5" },
    { label: "Voli interni", value: "4" },
    { label: "Km di vette", value: "∞" },
  ],
  days: [
    {
      day: 1, date: "G.01", title: "Arrivo & Primo Impatto",
      location: "Bariloche", coordinates: COORDS.bariloche, meals: "-/-/-",
      description: "Arrivo all'aeroporto di Bariloche. Check-in hotel. Passeggiata sul Lago Nahuel Huapi e Centro Civico. Aperitivo con vista sul lago.",
      transport: [{ type: "flight", label: "Volo da Buenos Aires ~2h" }],
      tip: "Prenotare hotel con vista lago",
    },
    {
      day: 2, date: "G.02", title: "Circuito Chico & Cerro Campanario",
      location: "Bariloche", coordinates: COORDS.bariloche, meals: "-/-/-",
      description: "Circuito Chico in auto o bici (65km). Funivia Cerro Campanario — vista panoramica 360°. Pranzo a Llao Llao. Rientro e cena in centro.",
      transport: [{ type: "drive", label: "Auto/Bici 65km" }],
      tip: "Arrivare al Campanario presto per evitare la fila",
    },
    {
      day: 3, date: "G.03", title: "Cerro Catedral → Puerto Madryn",
      location: "Bariloche", coordinates: COORDS.bariloche, meals: "-/-/-",
      description: "Mattina al Cerro Catedral: trekking in estate, sci in inverno. Rientro e pranzo. Transfer aeroporto. Volo per Puerto Madryn (via Buenos Aires o diretto).",
      transport: [
        { type: "trek", label: "Cerro Catedral" },
        { type: "flight", label: "BRC → PMY ~3h con scalo" },
      ],
    },
    {
      day: 4, date: "G.04", title: "Penisola Valdés — Wildlife Day",
      location: "Puerto Madryn", coordinates: COORDS.peninsulaValdes, meals: "-/-/-",
      description: "Tour guidato Penisola Valdés UNESCO. Puerto Pirámides: avvistamento balene in barca (lug–dic). Punta Norte: elefanti marini e orche (set–apr). Rientro Madryn.",
      transport: [
        { type: "bus", label: "Tour guidato ~300km A/R" },
        { type: "boat", label: "Avvistamento balene" },
      ],
      tip: "Prenotare tour + barca in anticipo",
    },
    {
      day: 5, date: "G.05", title: "Punta Tombo → El Calafate",
      location: "Puerto Madryn", coordinates: COORDS.puntaTombo, meals: "-/-/-",
      description: "Partenza per Punta Tombo (180km). Colonia pinguini di Magellano — 500.000 esemplari. Rientro Madryn. Volo per El Calafate via Buenos Aires.",
      transport: [
        { type: "drive", label: "Madryn → Punta Tombo 180km" },
        { type: "flight", label: "PMY → FTE ~4h con scalo" },
      ],
      tip: "Pinguini presenti settembre–marzo",
    },
    {
      day: 6, date: "G.06", title: "Arrivo & Lago Argentino",
      location: "El Calafate", coordinates: COORDS.elCalafate, meals: "-/-/-",
      description: "Arrivo aeroporto El Calafate. Check-in. Passeggiata sul Lago Argentino e Costanera. Cena con agnello patagonico al asador — specialità locale imperdibile.",
      transport: [{ type: "flight", label: "Arrivo FTE" }],
      tip: "El Calafate è la base logistica ideale. Prenotare Perito Moreno online",
    },
    {
      day: 7, date: "G.07", title: "Ghiacciaio Perito Moreno",
      location: "El Calafate", coordinates: COORDS.peritoMoreno, meals: "-/-/-",
      description: "Bus dal centro al Parco Los Glaciares. Passerelle panoramiche su 3 livelli. Opzione: mini-trekking sul ghiaccio con ramponi. Pranzo al rifugio. Rientro.",
      transport: [
        { type: "bus", label: "Bus/Tour 80km" },
        { type: "trek", label: "Mini-trekking con cramponi" },
      ],
      tip: "Mini-trekking ~$80 USD. Portare giacca impermeabile!",
    },
    {
      day: 8, date: "G.08", title: "Ghiacciaio Upsala → El Chaltén",
      location: "El Calafate", coordinates: COORDS.lagoArgentino, meals: "-/-/-",
      description: "Escursione in barca sul Lago Argentino: ghiacciai Upsala e Spegazzini (giornata intera). Oppure trekking Cerro Cristal. Bus El Calafate → El Chaltén (3h panoramiche sulla RN40).",
      transport: [
        { type: "boat", label: "Barca Lago Argentino" },
        { type: "bus", label: "Bus → El Chaltén 3h" },
      ],
      tip: "Bus Calafate-Chaltén ore 08:00 e 18:00. Prenotare in alta stagione",
    },
    {
      day: 9, date: "G.09", title: "Laguna Torre",
      location: "El Chaltén", coordinates: COORDS.elChalten, meals: "-/-/-",
      description: "Check-in. Hike alla Laguna Torre (18km A/R, 300m dislivello, ~5-6h). Panorama sul Cerro Torre con ghiacciaio. Rientro al tramonto.",
      transport: [{ type: "trek", label: "18km Trek A/R" }],
      tip: "Registrarsi al Centro de Visitantes all'ingresso. Gratuito. Portare acqua",
    },
    {
      day: 10, date: "G.10", title: "Laguna de los Tres — Alba sul Fitz Roy",
      location: "El Chaltén", coordinates: COORDS.elChalten, meals: "-/-/-",
      description: "Partenza nell'oscurità alle 05:30. Mirador Fitz Roy alle prime luci. Laguna de los Tres (22km A/R, 700m dislivello). Vista frontale sul Fitz Roy. Discesa e cena meritata.",
      transport: [{ type: "trek", label: "22km Trek A/R — 7-9h" }],
      tip: "Partenza all'alba OBBLIGATORIA per le luci. Scarpe impermeabili",
    },
    {
      day: 11, date: "G.11", title: "Hike leggero → Ushuaia",
      location: "El Chaltén", coordinates: COORDS.elChalten, meals: "-/-/-",
      description: "Hike leggero: Mirador del Cóndor o Loma del Pliegue Tumbado. Pranzo e check-out. Bus El Chaltén → El Calafate (3h). Volo FTE → Ushuaia.",
      transport: [
        { type: "trek", label: "Hike leggero" },
        { type: "bus", label: "Bus → Calafate 3h" },
        { type: "flight", label: "FTE → USH ~1h30" },
      ],
    },
    {
      day: 12, date: "G.12", title: "Arrivo alla Fin del Mondo",
      location: "Ushuaia", coordinates: COORDS.ushuaia, meals: "-/-/-",
      description: "Arrivo a Ushuaia. Check-in hotel sul Canale di Beagle. Passeggiata lungo Avenida San Martín. Cena con centolla — granchio reale patagonico.",
      transport: [{ type: "flight", label: "Arrivo USH" }],
      tip: "Ushuaia è la città più meridionale del mondo a 54°S",
    },
    {
      day: 13, date: "G.13", title: "Parco Nazionale Tierra del Fuego",
      location: "Ushuaia", coordinates: COORDS.parqueTierraFuego, meals: "-/-/-",
      description: "Parco Nazionale (12km da Ushuaia). Opzione: Treno del Fin del Mundo. Trekking Senda Costera e Laguna Verde. Lago Roca e foreste di lenga. Rientro.",
      transport: [
        { type: "drive", label: "Taxi/Bus 12km" },
        { type: "trek", label: "Trekking nel parco" },
      ],
      tip: "Il Treno del Fin del Mundo è un'esperienza storica unica",
    },
    {
      day: 14, date: "G.14", title: "Canale di Beagle & Isole Wildlife",
      location: "Ushuaia", coordinates: COORDS.ushuaia, meals: "-/-/-",
      description: "Navigazione Canale di Beagle: Isla de los Lobos (leoni marini), Isla de los Pájaros (cormorani), Faro Les Éclaireurs. Isla Martillo: pinguini (ott–mar). Pomeriggio: Museo Marítimo y del Presidio.",
      transport: [
        { type: "boat", label: "Navigazione 4h" },
        { type: "local", label: "Museo" },
      ],
      tip: "Prenotare la crociera in anticipo. ~$50 USD",
    },
    {
      day: 15, date: "G.15", title: "Ultima Mattina & Rientro",
      location: "Ushuaia", coordinates: COORDS.ushuaia, meals: "-/-/-",
      description: "Foto al cartello 'Aquí comienza la Patagonia' e Fin del Mundo. Shopping souvenir in Av. San Martín. Check-out. Volo USH → Buenos Aires.",
      transport: [{ type: "flight", label: "USH → EZE ~3h30" }],
      tip: "Controllare coincidenze internazionali da Ezeiza",
    },
  ],
};

export const itineraries = [option1, option2];

// Helper: get location color for a day entry
export function getLocationColor(itinerary: Itinerary, locationName: string): string {
  const dest = itinerary.destinations.find((d) => locationName.includes(d.name));
  return dest?.color ?? "#8a9ba8";
}

export function getLocationBadge(itinerary: Itinerary, locationName: string): string {
  const dest = itinerary.destinations.find((d) => locationName.includes(d.name));
  return dest?.badge ?? "bg-white/10 border-white/20 text-white/60";
}
