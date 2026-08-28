// data.js — Nordic & Baltic Escape, June 9–25 2026
// Source: "Itinerary - Nordic-Baltic Region Scandinavia 2026 - Shared.docx"
// (Big Steps Travel, updated 5/21/26). Transformed into structured data for
// the Trip / Reservations / Explore / Map / Info surfaces.

const TRIP = {
  brand: { name: "Big Steps Travel", tagline: "Your itinerary, ready for the road." },
  title: "Nordic & Baltic Escape",
  subtitle: "Finland · Estonia · Sweden · Norway",
  dateRange: "June 9 – June 25, 2026",
  travelers: 2,
  heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Suomenlinna.jpg/960px-Suomenlinna.jpg",
};

// ---------------------------------------------------------------------------
// RESERVATIONS — the single source of truth for every booked thing. Each has
// a stable id; day-by-day timeline blocks reference it via `resId` so a
// reservation's full detail is available inline wherever it's relevant
// (Steve's core ask: "all the details related to it available for reference").
// ---------------------------------------------------------------------------
const RESERVATIONS = {
  flightOut: {
    type: "flight", title: "IAD → FRA → HEL", carrier: "United / Lufthansa",
    conf: "J952S3",
    legs: [
      { flight: "UA 989", from: "Washington Dulles (IAD)", to: "Frankfurt (FRA)", depart: "Tue Jun 9, 5:20 PM", arrive: "Wed Jun 10, 7:20 AM", seats: "22K/L" },
      { flight: "LH/UA 8735", from: "Frankfurt (FRA)", to: "Helsinki (HEL)", depart: "Wed Jun 10, 9:40 AM", arrive: "Wed Jun 10, 1:10 PM", seats: "6B/C" },
    ],
    notes: "Total travel time 12h 50m (8h IAD–FRA, 2h20m layover, 2h30m FRA–HEL). Priority Pass lounges: Concourse B Lufthansa, or Turkish/Capital One Lounge, main terminal.",
  },
  flightHelToStockholm: {
    type: "flight", title: "HEL → ARN", carrier: "Finnair AY807 (oneworld)",
    conf: "$246.40 total",
    legs: [{ flight: "AY 807", from: "Helsinki (HEL)", to: "Stockholm Arlanda (ARN)", depart: "Sun Jun 14, 10:10 AM", arrive: "Sun Jun 14, 10:10 AM", seats: "" }],
    notes: "Priority Pass: OP Lounge (gates 22/27) or Aspire Lounge (gate 13), Helsinki-Vantaa, 5:00 AM–9:00 PM daily.",
  },
  flightStockholmToOslo: {
    type: "flight", title: "ARN → OSL", carrier: "Norwegian Air DY805",
    conf: "$158.40 total",
    legs: [{ flight: "DY 805", from: "Stockholm Arlanda, Terminal 5 (ARN)", to: "Oslo (OSL)", depart: "Fri Jun 19, 9:10 AM", arrive: "Fri Jun 19, 10:10 AM", seats: "" }],
    notes: "Priority Pass: Pearl Lounge, Terminal 2 (after security) or Terminal 4 / Gate 37.",
  },
  flightHome: {
    type: "flight", title: "BGO → KEF → IAD", carrier: "Icelandair",
    conf: "A65PBU",
    legs: [
      { flight: "FI 335", from: "Bergen Flesland (BGO)", to: "Reykjavik Keflavík (KEF)", depart: "Thu Jun 25, 3:20 PM CEST", arrive: "Thu Jun 25, 3:50 PM GMT", seats: "" },
      { flight: "FI 645", from: "Reykjavík Keflavík (KEF)", to: "Washington Dulles (IAD)", depart: "Thu Jun 25, 4:50 PM GMT", arrive: "Thu Jun 25, 7:20 PM EDT", seats: "" },
    ],
    notes: "1h layover in Reykjavík — Icelandair Saga Lounge. Aircraft: Airbus A321neo, then Boeing 737 MAX 9.",
  },
  hotelHelsinki: {
    type: "hotel", title: "Lapland Hotels Bulevardi", city: "Helsinki",
    checkIn: "Wed Jun 10 (early check-in 2:00 PM)", checkOut: "Sun Jun 14",
    room: "Mystique Deluxe, rooms #715 & #815 — King / French balcony / sauna, breakfast included",
    contact: "GM Nathalie Huber — Nathalie.huber@laplandhotels.com",
    mapQuery: "Lapland Hotels Bulevardi, Helsinki",
  },
  hotelStockholm: {
    type: "hotel", title: "The Sparrow Hotel", city: "Stockholm",
    checkIn: "Sun Jun 14 (early check-in)", checkOut: "Fri Jun 19",
    room: "Superior Double King, city view, top floor, boutique — breakfast included",
    contact: "GM Christian Herslow — front desk: Mohamad",
    mapQuery: "The Sparrow Hotel, Stockholm",
  },
  hotelOslo: {
    type: "hotel", title: "Hotel Christiania Teater", city: "Oslo",
    checkIn: "Fri Jun 19 (early check-in 12:00 PM)", checkOut: "Mon Jun 22",
    room: "Superior Room #603/604, city view, top (6th) floor — King, breakfast included",
    contact: "Front Desk Mgr Øystein Nustad — Oystein.nustad@christianiateater.com · Stortingsgaten 16, Oslo 0161 · +47 21 04 38 00",
    mapQuery: "Hotel Christiania Teater, Oslo",
  },
  hotelBergen: {
    type: "hotel", title: "Hotel Admiral", city: "Bergen",
    checkIn: "Mon Jun 22 (late check-in)", checkOut: "Thu Jun 25",
    room: "Deluxe Room, balcony, harbor / Bryggen Wharf view, top (5th) floor — Queen, breakfast included",
    contact: "GM Solvi Solmunde — Solvi.Solmunde@strawberry.no · front desk Eirin / Maria",
    mapQuery: "Clarion Hotel Admiral, Bergen",
  },
  ferryTallinn: {
    type: "ferry", title: "Helsinki ⇄ Tallinn — Tallink Megastar",
    price: "€43.80 × 2 = €87.60 ($103.14)",
    legs: [
      { from: "Helsinki, West Terminal 2 (check-in by 7:00)", to: "Tallinn, D-Terminal", depart: "Sat Jun 13, 7:30 AM", arrive: "9:30 AM" },
      { from: "Tallinn, D-Terminal (check-in by 16:00)", to: "Helsinki, West Terminal 2", depart: "Sat Jun 13, 4:30 PM", arrive: "6:30 PM" },
    ],
    notes: "10-deck ferry — pub, coffee shop, restaurant, viewing deck. Luggage lockers on board (€3 small / €5 large, in-out privileges). Online check-in via Tallink app, 24h–30min before departure.",
  },
  trainBergenRailway: {
    type: "train", title: "The Bergen Railway — Oslo → Myrdal", conf: "EWZTA1",
    legs: [{ from: "Oslo S", to: "Myrdal", depart: "Mon Jun 22, 6:25 AM", arrive: "11:15 AM" }],
    notes: "Vy Pluss (1st class), Car #1, seats 23/24/27/28 — facing seats with table. One of the world's most scenic train journeys.",
  },
  trainFlamRailway: {
    type: "train", title: "The Flåm Railway — Myrdal → Flåm",
    legs: [{ from: "Myrdal", to: "Flåm", depart: "Mon Jun 22, 12:06 PM", arrive: "1:04 PM" }],
    notes: "One of the steepest railways in the world — 12 miles / 3,000 ft descent. 10-minute photo stop at Kjosfossen waterfall. Sit on the right side for the best fjord views.",
  },
  tourStegastein: {
    type: "tour", title: "Stegastein Viewpoint — Private Electric Mini-Bus", conf: "El-Tour #3097 · voucher yoGNkw8NLO",
    when: "Mon Jun 22, 1:15 – 2:30 PM",
    notes: "Scenic winding road above the Aurlandsfjord. Walk 100 ft out from the mountainside, 2,000+ ft above the fjord (taller than the WTC).",
    mapQuery: "Stegastein Viewpoint, Norway",
  },
  cruiseSognefjord: {
    type: "ferry", title: "Flåm → Bergen — Aurlandsfjord & Sognefjord Cruise",
    when: "Mon Jun 22, 3:30 PM – 8:45 PM (one stop, Balestrand, 4:50 PM)",
    notes: "UNESCO Nærøyfjord — Norway's longest fjord. Arrive early for the top-level indoor seats (table, electric outlets) or the front/rear outdoor deck.",
  },
  tourHelsinkiLocals: {
    type: "tour", title: "Helsinki — Private Highlights & Hidden Gems", carrier: "WithLocals — guide Anna, +358 44 355 3304",
    when: "Thu Jun 11, 11:15 AM – 3:15 PM (incl. 1:15–2:15 lunch)",
    notes: "Meeting point: Stockmann Department Store main entrance, under the large clock.",
    mapQuery: "Stockmann Department Store, Helsinki",
  },
  tourTallinnLocals: {
    type: "tour", title: "Tallinn — Private Highlights & Hidden Gems", carrier: "WithLocals — guide Anna, +372 5561 2877",
    when: "Sat Jun 13, 10:00 AM – 1:00 PM",
    notes: "Meeting point: Freedom Square, in front of Jaani Kirik church.",
    mapQuery: "Freedom Square, Tallinn",
  },
  tourStockholmLocals: {
    type: "tour", title: "Stockholm — Private City Tour, Gamla Stan", carrier: "WithLocals — guide Zenid, +46 70 176 8735",
    when: "Sun Jun 14, 12:00 – 3:00 PM",
    notes: "Meeting point: in front of Stockholms Gästabud restaurant, Österlånggatan 7.",
    mapQuery: "Österlånggatan 7, Stockholm",
  },
  tourStockholmMultiIsland: {
    type: "tour", title: "Stockholm Full City — Multi Island", carrier: "Viator",
    when: "Mon Jun 15, 9:00 – 11:00 AM",
    notes: "Meeting point: Skeppsbron 25, Gamla Stan.",
    mapQuery: "Skeppsbron 25, Stockholm",
  },
  tourVasaMuseum: {
    type: "tour", title: "Vasa Museum Small-Group Tour", carrier: "Viator",
    when: "Tue Jun 16, 10:00 AM – 12:30 PM",
    notes: "The world's only fully intact 17th-century warship — sank in Stockholm harbor in 1628, raised in 1961.",
    mapQuery: "Vasa Museum, Stockholm",
  },
  tourArchipelago: {
    type: "tour", title: "Stockholm Archipelago Speedboat", carrier: "Viator",
    when: "Wed Jun 17, 9:30 – 11:30 AM",
    notes: "Meeting point: Pier 19 (Kajplats 19), Strandvägen 20–28, 114 56 Stockholm.",
    mapQuery: "Strandvagen 20, Stockholm",
  },
  tourVikingWalk: {
    type: "tour", title: "Viking History Walking Tour", carrier: "Alex the Viking, +46 70 176 8735",
    when: "Wed Jun 17, 1:00 – 3:30 PM",
    notes: "Meeting point: Stortorget, in front of the Nobel Museum. Arrive 10 minutes early.",
    mapQuery: "Stortorget, Stockholm",
  },
  tourOsloLocals: {
    type: "tour", title: "Oslo — Private City Tour, Hidden Gems", carrier: "WithLocals — guide Ihor, +47 967 46 268",
    when: "Fri Jun 19, 1:00 – 4:00 PM",
    notes: "Meeting point: Oslo Cathedral main entrance.",
    mapQuery: "Oslo Cathedral",
  },
  tourRoyalPalaceOslo: {
    type: "tour", title: "The Royal Palace / Castle Tour",
    when: "Sat Jun 20, 12:00 – 1:00 PM (arrive 11:30 AM for security)",
    notes: "No backpacks or handbags — checked at lockers. Entrance at the back, facing Palace Yard. Changing of the Guard follows at 1:30 PM (40 min).",
    mapQuery: "Royal Palace, Oslo",
  },
  tourFjaerKonfekt: {
    type: "tour", title: "Fjær Konfekt — Anniversary Dessert Celebration",
    when: "Sat Jun 20, 12:00 – 6:00 PM",
    notes: "Drammensveien 153B, next to Skøyen station — take the local (VY) train from Oslo S to Skøyen (5 min) or Tram #13.",
    mapQuery: "Drammensveien 153B, Oslo",
  },
  tourBergenHistory: {
    type: "tour", title: "Bergen History Walking Tour", carrier: "TripAdvisor Ref #1349328525",
    when: "Tue Jun 23, 10:00 AM – 12:00 PM (arrive 9:50 AM)",
    notes: "Meeting point: Bradbenken 1, a brick office building next to the fortress entrance.",
    mapQuery: "Bradbenken 1, Bergen",
  },
};

// ---------------------------------------------------------------------------
// DAY-BY-DAY — the trip timeline. Each block that has a matching
// reservation carries `resId`; the UI renders it as a linked chip that
// expands to the full reservation detail inline.
// ---------------------------------------------------------------------------
const DAYS = [
  { date: "2026-06-09", city: "In Flight", title: "Depart Washington", blocks: [
    { time: "5:20 PM", icon: "flight", title: "Depart IAD for Frankfurt", resId: "flightOut" },
  ]},
  { date: "2026-06-10", city: "Helsinki", title: "Arrival Day", blocks: [
    { time: "9:40 AM", icon: "flight", title: "Connect FRA → HEL", resId: "flightOut" },
    { time: "1:10 PM", icon: "flight", title: "Arrive Helsinki (HEL)", detail: "Express Train, 30 min, every 10 min, 24 miles to Helsinki Central Station (Zone A/B/C ticket, HSL app). Or buy a €5 ticket on the platform — take the \"P\" (32 min) or \"I\" (28 min) train." },
    { time: "2:00 PM", icon: "hotel", title: "Check in — Lapland Hotels Bulevardi", resId: "hotelHelsinki" },
  ]},
  { date: "2026-06-11", city: "Helsinki", title: "Synagogue & Private Tour", blocks: [
    { time: "10:00 AM", icon: "activity", title: "Helsinki Synagogue Tour", detail: "€10pp donation · Malminkatu 26. One of only two synagogues in Finland; the Jewish community here numbers about 1,200.", mapQuery: "Helsinki Synagogue" },
    { time: "11:15 AM", icon: "tour", title: "Private Highlights & Hidden Gems", resId: "tourHelsinkiLocals" },
    { time: "Evening", icon: "food", title: "Dinner in the Design District", detail: "YesYesYes — vegetarian, seasonally changing menu, everything made from scratch with local ingredients." },
  ]},
  { date: "2026-06-12", city: "Helsinki", title: "Helsinki Day Celebration", blocks: [
    { time: "All day", icon: "activity", title: "Helsinki Day Celebration", detail: "Celebrated every June 12 since 1959 — the city's birthday. Main event at Kamppi Narinkkatori & Lasipalatsi Squares: live music, film screenings, sports, participatory art, ~250 free events.", mapQuery: "Narinkkatori, Helsinki" },
    { time: "Afternoon", icon: "explore", title: "Bulevardi, Esplanadi Park & Kotiharjun Sauna", detail: "Café Eckberg on Bulevardi · Esplanadi park and Market Square · Kotiharjun Sauna, the city's oldest public sauna (1928)." },
  ]},
  { date: "2026-06-13", city: "Tallinn", title: "Day Trip to Estonia", blocks: [
    { time: "7:30 AM", icon: "ferry", title: "Ferry to Tallinn", resId: "ferryTallinn" },
    { time: "10:00 AM", icon: "tour", title: "Private Highlights & Hidden Gems", resId: "tourTallinnLocals" },
    { time: "4:30 PM", icon: "ferry", title: "Return ferry to Helsinki", resId: "ferryTallinn" },
  ]},
  { date: "2026-06-14", city: "Stockholm", title: "Fly to Sweden", blocks: [
    { time: "10:10 AM", icon: "flight", title: "Fly Helsinki → Stockholm", resId: "flightHelToStockholm" },
    { time: "12:00 PM", icon: "hotel", title: "Check in — The Sparrow Hotel", resId: "hotelStockholm" },
    { time: "12:00 PM", icon: "tour", title: "Private City Tour, Gamla Stan", resId: "tourStockholmLocals" },
  ]},
  { date: "2026-06-15", city: "Stockholm", title: "Gamla Stan & Fika", blocks: [
    { time: "9:00 AM", icon: "tour", title: "Stockholm Full City — Multi Island", resId: "tourStockholmMultiIsland" },
    { time: "Midday", icon: "food", title: "Fika in Gamla Stan", detail: "Traditional Swedish fika (coffee + pastry) at Systrarna Andersson." },
    { time: "Afternoon", icon: "activity", title: "Nobel Prize Museum & Storkyrkan Cathedral", mapQuery: "Nobel Prize Museum, Stockholm" },
    { time: "Evening", icon: "activity", title: "IceBar Stockholm", detail: "In Hotel C, next to Central Station. 30–60 min, includes a drink in an ice glass — room kept at 23°F. Capes & gloves provided." },
  ]},
  { date: "2026-06-16", city: "Stockholm", title: "Vasa Museum & ABBA", blocks: [
    { time: "10:00 AM", icon: "tour", title: "Vasa Museum Small-Group Tour", resId: "tourVasaMuseum" },
    { time: "1:00 PM", icon: "activity", title: "Skansen — open-air museum", detail: "Oldest open-air museum in the world — five centuries of Swedish life." },
    { time: "3:00 PM", icon: "activity", title: "ABBA The Museum", detail: "Timed entry, reservation needed — interactive exhibits, ABBA karaoke, dance-along experience.", mapQuery: "ABBA The Museum, Stockholm" },
    { time: "8:00 PM", icon: "activity", title: "Brad Paisley concert", detail: "Gröna Lund amusement park.", mapQuery: "Grona Lund, Stockholm" },
  ]},
  { date: "2026-06-17", city: "Stockholm", title: "Archipelago & Vikings", blocks: [
    { time: "9:30 AM", icon: "tour", title: "Stockholm Archipelago Speedboat", resId: "tourArchipelago" },
    { time: "1:00 PM", icon: "tour", title: "Viking History Walking Tour", resId: "tourVikingWalk" },
  ]},
  { date: "2026-06-18", city: "Stockholm", title: "Royal Palace & Metro Art", blocks: [
    { time: "12:15 PM", icon: "activity", title: "Changing of the Guard", detail: "Outer courtyard parade — band marches through central Stockholm to the palace, starting 11:45 AM (view from Skeppsbron, water side of the palace)." },
    { time: "Afternoon", icon: "explore", title: "\"World's Longest Art Gallery\" — Metro Stations", detail: "Self-guided art tour through T-Centralen, Östermalmstorg, Stadion, Tekniska Högskolan, Hötorget, Thorildsplan, Fridhemsplan, Solna Centrum, Rådhuset, Kungsträdgården." },
  ]},
  { date: "2026-06-19", city: "Oslo", title: "Fly to Norway", blocks: [
    { time: "9:10 AM", icon: "flight", title: "Fly Stockholm → Oslo", resId: "flightStockholmToOslo" },
    { time: "12:00 PM", icon: "hotel", title: "Check in — Hotel Christiania Teater", resId: "hotelOslo" },
    { time: "1:00 PM", icon: "tour", title: "Private City Tour, Hidden Gems", resId: "tourOsloLocals" },
  ]},
  { date: "2026-06-20", city: "Oslo", title: "Royal Palace & Harbor", blocks: [
    { time: "11:30 AM", icon: "tour", title: "The Royal Palace / Castle Tour", resId: "tourRoyalPalaceOslo" },
    { time: "1:30 PM", icon: "activity", title: "Changing of the Guard", detail: "40-minute ceremony at the Royal Palace." },
    { time: "2:30 PM", icon: "explore", title: "Aker Brygge, Nobel Peace Center & Oslo Opera House", detail: "Harbor-front promenade from Tjuvholmen; Opera House roof (open 24/7) for the best views; Munch Museum next door.", mapQuery: "Oslo Opera House" },
    { time: "12:00 PM", icon: "tour", title: "Fjær Konfekt — Anniversary Dessert Celebration", resId: "tourFjaerKonfekt" },
  ]},
  { date: "2026-06-21", city: "Oslo", title: "Fjord Explorers & Vigeland Park", blocks: [
    { time: "Morning", icon: "activity", title: "Fram Museum & Kon-Tiki Museum", detail: "Ferry or bus #30 to Bygdøy / Museum Island. The Fram: original polar expedition ship of Roald Amundsen. Kon-Tiki/RA2 next door.", mapQuery: "Fram Museum, Oslo" },
    { time: "Afternoon", icon: "activity", title: "Holmenkollen Ski Jump", detail: "Olympic ski tower — viewing platform, International Ski Museum (4,000-year history), zip line down the jump route. Metro Line #1 to Holmenkollen.", mapQuery: "Holmenkollen Ski Jump, Oslo" },
    { time: "Late afternoon", icon: "activity", title: "Vigeland Sculpture Park", detail: "200 sculptures by Gustav Vigeland, open 24/7. Tram #12 to Vigelandsparken, or any metro line to Majorstuen + 5-min walk.", mapQuery: "Vigeland Park, Oslo" },
  ]},
  { date: "2026-06-22", city: "Bergen", title: "Norway in a Nutshell — Fjord Crossing", blocks: [
    { time: "6:25 AM", icon: "train", title: "The Bergen Railway — Oslo → Myrdal", resId: "trainBergenRailway" },
    { time: "12:06 PM", icon: "train", title: "The Flåm Railway — Myrdal → Flåm", resId: "trainFlamRailway" },
    { time: "1:15 PM", icon: "tour", title: "Stegastein Viewpoint — Private Tour", resId: "tourStegastein" },
    { time: "2:35 PM", icon: "activity", title: "Aurland Shoe Factory", detail: "Home of the original penny loafer, created by shoemaker Nils Tveranger — watch the craftsmen at work.", mapQuery: "Aurland Shoe Factory" },
    { time: "3:30 PM", icon: "ferry", title: "Fjord Cruise — Flåm → Bergen", resId: "cruiseSognefjord" },
    { time: "8:45 PM", icon: "hotel", title: "Check in — Hotel Admiral", resId: "hotelBergen" },
  ]},
  { date: "2026-06-23", city: "Bergen", title: "Bryggen & the Fish Market", blocks: [
    { time: "9:50 AM", icon: "tour", title: "Bergen History Walking Tour", resId: "tourBergenHistory" },
    { time: "Afternoon", icon: "explore", title: "Bryggen Wharf & Fish Market", detail: "UNESCO World Heritage wooden Hanseatic League trading houses. Fisketorget fish market — 800 years of continuous use.", mapQuery: "Bryggen, Bergen" },
    { time: "After 5 PM", icon: "activity", title: "Mt. Fløyen Funicular", detail: "Fløibanen funicular to the summit — panoramic views over the city and fjords. Go after 5 PM once the cruise ships leave.", mapQuery: "Floibanen, Bergen" },
  ]},
  { date: "2026-06-24", city: "Bergen", title: "Open Day", blocks: [
    { time: "All day", icon: "activity", title: "Open Day in Bergen", detail: "Free day — explore Bergen's pubs, bars, and international restaurants at your own pace." },
  ]},
  { date: "2026-06-25", city: "Departure", title: "Fly Home", blocks: [
    { time: "12:00 PM", icon: "activity", title: "Leave for Bergen Airport", detail: "Bybanen Light Rail (Line 1), 50 min, $4.50 — or Flybussen express bus, 20 min, $13.80 booked ahead / $16.50 on board." },
    { time: "3:20 PM", icon: "flight", title: "Depart Bergen → Reykjavík → Washington", resId: "flightHome" },
  ]},
];

// ---------------------------------------------------------------------------
// EXPLORE — curated highlights per city (beyond what's already scheduled),
// each with a real hotlinked image, a Google Maps link, and a quick-take.
// ---------------------------------------------------------------------------
const EXPLORE = {
  Helsinki: [
    { name: "Suomenlinna Sea Fortress", tag: "UNESCO Site", desc: "15-min HSL ferry from Market Square (€3, runs 24h). Island sea fortress.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Suomenlinna.jpg/960px-Suomenlinna.jpg", mapQuery: "Suomenlinna, Helsinki" },
    { name: "Temppeliaukio (Rock) Church", tag: "Architecture", desc: "Carved directly into solid rock — one-of-a-kind design.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Temppeliaukio_Church_3.jpg/960px-Temppeliaukio_Church_3.jpg", mapQuery: "Temppeliaukio Church, Helsinki" },
    { name: "Amos Rex Museum", tag: "Modern Art", desc: "Underground experimental art museum, €22, 11 AM–8 PM.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Amos_Rex_aukio.jpg/960px-Amos_Rex_aukio.jpg", mapQuery: "Amos Rex, Helsinki" },
    { name: "Helsinki Cathedral & Senate Square", tag: "Landmark", desc: "The city's iconic neoclassical cathedral overlooking the harbor market.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Helsinki Cathedral" },
  ],
  Tallinn: [
    { name: "Tallinn Old Town Square", tag: "UNESCO Site", desc: "700-year-old Town Hall — the historic heart of the Hanseatic old city.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tallinn_Town_Hall_Square%2C_2013.jpg/960px-Tallinn_Town_Hall_Square%2C_2013.jpg", mapQuery: "Tallinn Town Hall Square" },
    { name: "Seaplane Harbour Museum", tag: "Museum", desc: "Giant 1930s seaplane hangar — walk through a full-size submarine.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Seaplane_Harbour.jpg/960px-Seaplane_Harbour.jpg", mapQuery: "Seaplane Harbour, Tallinn" },
    { name: "Kiek in de Kök & Bastion Passages", tag: "History", desc: "Climb the Maiden Tower, walk the city wall, descend into 13th–14th-century underground passages.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/The_Kiek_in_de_K%C3%B6k_cannon_tower_in_Tallinn.jpg/960px-The_Kiek_in_de_K%C3%B6k_cannon_tower_in_Tallinn.jpg", mapQuery: "Kiek in de Kok, Tallinn" },
  ],
  Stockholm: [
    { name: "Gamla Stan (Old Town)", tag: "UNESCO-listed", desc: "Cobblestone alleys and medieval buildings dating to 1252.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Gamla Stan, Stockholm" },
    { name: "Vasa Museum", tag: "Museum", desc: "The world's only fully intact 17th-century warship, raised from the harbor after 333 years.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Stern_of_the_Vasa_ship%2C_Vasa_Museum%2C_Stockholm%2C_Sweden_julesvernex2.jpg/960px-Stern_of_the_Vasa_ship%2C_Vasa_Museum%2C_Stockholm%2C_Sweden_julesvernex2.jpg", mapQuery: "Vasa Museum, Stockholm" },
    { name: "ABBA The Museum", tag: "Interactive", desc: "Timed entry — dance along, QR audio guide, ABBA karaoke.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/ABBA_Museum%2C_Djurg%C3%A5rdsv%C3%A4gen%2C_Stockholm%2C_Sweden.jpg/960px-ABBA_Museum%2C_Djurg%C3%A5rdsv%C3%A4gen%2C_Stockholm%2C_Sweden.jpg", mapQuery: "ABBA The Museum, Stockholm" },
    { name: "Södermalm Viewpoints", tag: "Viewpoint", desc: "Scenic walkways on Södermalm (near Monteliusvägen) with sweeping views over the city and water.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/S%C3%B6dermalmstorg_and_Stockholm_skyline_from_S%C3%B6dermalm.jpg/960px-S%C3%B6dermalmstorg_and_Stockholm_skyline_from_S%C3%B6dermalm.jpg", mapQuery: "Monteliusvagen, Stockholm" },
  ],
  Oslo: [
    { name: "Oslo Opera House", tag: "Architecture", desc: "Walk the marble roof ramps for sweeping fjord views. Open 24/7.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roof_of_the_Oslo_Opera_House.jpg/960px-Roof_of_the_Oslo_Opera_House.jpg", mapQuery: "Oslo Opera House" },
    { name: "Vigeland Sculpture Park", tag: "Open 24/7", desc: "200 Gustav Vigeland sculptures depicting people at every stage of life.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Vigeland_Sculpture_Park_-_Panoramic_view_towards_the_Monolith%2C_Oslo%2C_Norway.jpg/960px-Vigeland_Sculpture_Park_-_Panoramic_view_towards_the_Monolith%2C_Oslo%2C_Norway.jpg", mapQuery: "Vigeland Park, Oslo" },
    { name: "Akershus Fortress", tag: "History", desc: "Medieval fortress with a Military & Resistance Museum — free grounds walk.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Akershus_festning.jpg/960px-Akershus_festning.jpg", mapQuery: "Akershus Fortress, Oslo" },
    { name: "The Munch Museum", tag: "Museum", desc: "Home to Edvard Munch's The Scream — the largest single-artist museum in Europe.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/MUNCH_Museum_front_%282020%29_4.jpg/960px-MUNCH_Museum_front_%282020%29_4.jpg", mapQuery: "Munch Museum, Oslo" },
  ],
  Bergen: [
    { name: "Bryggen Wharf", tag: "UNESCO Site", desc: "Colorful Hanseatic-era wooden trading houses along Vågen Harbor — the classic Bergen postcard.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bryggen_%282%29.jpg/960px-Bryggen_%282%29.jpg", mapQuery: "Bryggen, Bergen" },
    { name: "Mt. Fløyen", tag: "Viewpoint", desc: "Fløibanen funicular to a panoramic summit — hike the easy 30-min path back down.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bergen_from_Fl%C3%B8yen.jpg/960px-Bergen_from_Fl%C3%B8yen.jpg", mapQuery: "Floyen, Bergen" },
    { name: "Bergenhus Fortress", tag: "History", desc: "One of Norway's oldest and best-preserved stone fortifications, 13th century.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bergenhus_Fortress_Museum5058.JPG/960px-Bergenhus_Fortress_Museum5058.JPG", mapQuery: "Bergenhus Fortress, Bergen" },
  ],
};

// ---------------------------------------------------------------------------
// PRACTICAL INFO — per city, everything Reservations/Explore don't cover.
// ---------------------------------------------------------------------------
const INFO = {
  Helsinki: {
    currency: "Euro (€)", greeting: "Hei (\"hay\") — thank you: Kiitos (\"kee-toss\")",
    stay: "3½ days / 4 nights · Wed 6/10 – Sun 6/14", hoursAheadDC: "7 hrs ahead of DC",
    weather: "~70°F day / 55°F night · sunrise 3:59 AM–10:42 PM (18.5 hrs of sun)",
    transport: "HSL app for tickets/routes. Airport→city: Express Train, 30 min, Zone A/B/C. Tram #2 is a great sightseeing loop.",
    transportTips: [
      "Helsinki zone is A, the airport is zone C — going from the airport you need an ABC ticket, valid 80 minutes.",
      "A day pass works on all city transport — buy it in the HSL app (shows a live map when you search a route).",
      "Tram #2 is a great sightseeing loop — passes Old Market Hall, Market Square, Senate Square, Amos Rex and Kamppi.",
      "Uber and Bolt both operate normally in Helsinki.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg",
    food: [
      { name: "Café Ekberg", desc: "The oldest coffee shop in Helsinki." },
      { name: "Johan & Nyström", desc: "Coffee shop & hot chocolate — try the rosemary and dark chocolate." },
      { name: "Café Regatta", desc: "Cinnamon rolls on the waterfront, next to the kayak/canoe rentals." },
      { name: "St George Bakery", desc: "Pastries, sandwiches and smoothies, with a terrace view." },
      { name: "YesYesYes", desc: "Design District vegetarian restaurant — vibrant room, seasonal menu, everything made from scratch with local ingredients." },
      { name: "Daddy Green's Pizza Bar", desc: "Funky, top-rated brick-oven pizza in the Design District." },
      { name: "Ristorante Argegno", desc: "Highly-rated Italian." },
      { name: "Bar Mate", desc: "Loft-style bar in the Design District." },
      { name: "Torni Hotel Ateljee Rooftop", desc: "The city's highest rooftop bar — sweeping views over Helsinki." },
    ],
    tips: "Itinerary locations in bold are saved on Google Maps. Tipping isn't expected, though some restaurants now offer the option.",
  },
  Tallinn: {
    currency: "Euro (€)",
    weather: "Similar to Helsinki, June",
    transport: "Ferry from Helsinki via Tallink Megastar, ~2 hrs each way.",
    tips: "Old Town is fully walkable — cobblestones, wear comfortable shoes.",
  },
  Stockholm: {
    currency: "Swedish Krona (SEK)",
    stay: "5 days / 5 nights · Sun 6/14 – Fri 6/19", hoursAheadDC: "6 hrs ahead of DC",
    weather: "~70°F day / 55°F night · sunrise 3:33 AM–9:04 PM (18 hrs) · civil twilight all night",
    transport: "SL app for tickets (single fare valid 75 min). Metro: 3 lines, extensive, doubles as \"the world's longest art gallery.\" Scooters ~$7.36/day.",
    transportTips: [
      "SL app for tickets and routes — a single fare is valid 75 minutes on any combination of bus, metro or tram.",
      "The Metro doubles as \"the world's longest art gallery\" — worth riding a few extra stops just for the stations.",
      "Djurgården ferry from Slussen/Nybroplan is covered by a normal SL ticket — a scenic shortcut to the museums.",
      "Arlanda Express train, 20 minutes to city center. E-scooters (Voi/Bolt/Lime) are everywhere, ~$7.36/day.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg",
    food: [
      { name: "Café Saturnus", desc: "Vasastan institution, famous for the giant cinnamon buns." },
      { name: "Vete-Katten", desc: "Historic 1928 konditori on Kungsgatan — old-school Swedish fika." },
      { name: "Nystekt Strömming", desc: "Fried-herring stand at Södermalmstorg — the classic Stockholm quick bite." },
      { name: "Meatballs for the People", desc: "Modern, playful take on the Swedish meatball, Södermalm." },
      { name: "Pelikan", desc: "Classic beer hall and husmanskost (Swedish home cooking), Södermalm." },
      { name: "Under Kastanjen", desc: "Cozy courtyard café tucked into Gamla Stan." },
      { name: "Akkurat", desc: "Craft beer bar with one of the city's biggest selections." },
    ],
    tips: "Stockholm Pass covers 70+ attractions (€89–192, 1–4 days). Restaurants: make reservations — Swedes eat dinner early.",
  },
  Oslo: {
    currency: "Norwegian Krone (NOK) — a largely cashless country",
    stay: "3 days / 3 nights · Fri 6/19 – Mon 6/22", hoursAheadDC: "6 hrs ahead of DC",
    weather: "~70°F day / 53°F night · sunrise 3:55 AM–11:11 PM (20 hrs) · civil twilight all night",
    transport: "Flytoget Airport Express, 20 min, ~$20pp. Oslo Pass: unlimited transit + 30 museums (€49/24h, €72/48h). Ruter app for transit.",
    transportTips: [
      "Flytoget Airport Express, 20 minutes to Oslo S, ~$20pp.",
      "Ruter app covers all city transit — bus, tram, metro and the Bygdøy ferries.",
      "Oslo Pass: unlimited transit plus 30+ museums, €49/24h or €72/48h — worth it on a museum-heavy day.",
      "Oslo is largely cashless — cards (and phone wallets) work everywhere, even for small purchases.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roof_of_the_Oslo_Opera_House.jpg/960px-Roof_of_the_Oslo_Opera_House.jpg",
    food: [
      { name: "Mathallen Oslo", desc: "Food hall in Vulkan — dozens of stalls, good for a casual group meal." },
      { name: "Fru Hagen", desc: "Grünerløkka neighborhood café and wine bar." },
      { name: "Vippa", desc: "Waterfront food hall in a converted warehouse, Youngstorget/harborside." },
      { name: "Kaffebrenneriet", desc: "Norway's own coffee chain — reliably excellent, several central locations." },
      { name: "Fisketorget", desc: "Fish market and restaurant right on the harbor." },
    ],
    tips: "Tipping isn't mandatory — the bill usually includes service. Weather is unpredictable — bring a rain jacket.",
  },
  Bergen: {
    currency: "Norwegian Krone (NOK)",
    stay: "3 days / 3 nights · Mon 6/22 – Thu 6/25", hoursAheadDC: "6 hrs ahead of DC",
    weather: "~65°F day / 50°F night · rains ~200 days/yr (rainiest city in Europe) · sunrise 4:11 AM–11:09 PM (19 hrs)",
    transport: "Bergen Card (24h $42 / 48h $54): free public transport + museum discounts. Bybanen Light Rail to airport, 50 min, $4.50.",
    transportTips: [
      "Bergen Card (24h $42 / 48h $54): free public transport plus museum discounts.",
      "Bybanen Light Rail runs to the airport in 50 minutes, $4.50 — or Flybussen express, 20 minutes.",
      "The Old Town / Bryggen area is fully walkable — no transit needed day-to-day.",
      "Bring a rain jacket — Bergen is the rainiest city in Europe, ~200 days a year.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bryggen_%282%29.jpg/960px-Bryggen_%282%29.jpg",
    food: [
      { name: "Bryggeloftet & Stuene", desc: "Traditional Norwegian dining right on Bryggen." },
      { name: "To Kokker", desc: "Fine dining in one of Bryggen's historic wooden houses." },
      { name: "Colonialen", desc: "Modern Nordic cooking, seasonal tasting menu." },
      { name: "Pingvinen", desc: "Cozy neighborhood pub, classic Norwegian comfort food." },
      { name: "Fisketorget", desc: "The harborside fish market — also a sit-down seafood restaurant." },
    ],
    tips: "Cruise ships are in port Jun 23–24 — visit Bryggen/Fløyen after 5 PM once they depart for a quieter experience.",
  },
};

window.TRIP_DATA = { TRIP, RESERVATIONS, DAYS, EXPLORE, INFO };
