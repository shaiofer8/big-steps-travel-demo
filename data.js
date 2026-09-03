// data.js — Nordic & Baltic Escape, June 9–25 2026
// Source: "Itinerary - Nordic-Baltic Region Scandinavia 2026 - Shared.docx"
// (Big Steps Travel, updated 5/21/26). Transformed into structured data for
// the Trip / Reservations / Explore / Map / Info surfaces.
// Updated 2026-09-02: full DOCX pass — food sections, EXPLORE tiles, day links, 6/12 restore.

const TRIP = {
  brand: { name: "Big Steps Travel", tagline: "Every Great Journey Begins with BIG Steps™" },
  title: "Nordic & Baltic Escape",
  // B3: three separate hero heading lines
  clientName: "The Carlton Family",
  tripName: "Scandinavian/Baltic Escape",
  journalLabel: "Travel Journal",
  // legacy single field kept for backward compat
  clientTitle: "The Carlton Family Scandinavian/Baltic Travel Journal",
  subtitle: "Finland · Estonia · Sweden · Norway",
  dateRange: "June 9 – June 25, 2026",
  travelers: 2,
  heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Suomenlinna.jpg/960px-Suomenlinna.jpg",
};

const COUNTRIES = {
  Helsinki: "Finland",
  Tallinn: "Estonia",
  Stockholm: "Sweden",
  Oslo: "Norway",
  Bergen: "Norway",
};
const COUNTRY_FLAGS = { Finland: "🇫🇮", Estonia: "🇪🇪", Sweden: "🇸🇪", Norway: "🇳🇴" };

// ---------------------------------------------------------------------------
// RESERVATIONS
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
// DAY-BY-DAY
// `links:[]` — inline links rendered at point of use (F1). Source: DOCX + Steve's examples.
// ---------------------------------------------------------------------------
const DAYS = [
  { date: "2026-06-09", city: "In Flight", title: "Depart Washington", blocks: [
    { time: "5:20 PM", icon: "flight", title: "Depart IAD for Frankfurt", resId: "flightOut", blurb: "Wheels up — the first leg of the trip, Washington to Frankfurt overnight." },
  ]},

  { date: "2026-06-10", city: "Helsinki", title: "Arrival Day",
    links: [
      { label: "Helsinki Airport (HEL) — Finavia (website)", url: "https://www.finavia.fi/en/airports/helsinki-airport" },
      { label: "Helsinki Airport Arrival Guide (Video)", url: "https://www.youtube.com/watch?v=DCIsFoVjhpA" },
      { label: "myhelsinki.fi — Official Travel Guide", url: "https://www.myhelsinki.fi/" },
      { label: "Helsinki Travel Guide Video (4K)", url: "https://www.youtube.com/watch?v=ESFPoxepyP4" },
      { label: "HSL App — Public Transport Step-by-Step Guide (Video)", url: "https://www.youtube.com/watch?v=A_bGZomICVE" },
      { label: "Helsinki Card — Sightseeing & Excursions (Stromma)", url: "https://www.stromma.com/en-fi/helsinki/city-pass/helsinki-card/" },
      { label: "Suomenlinna Sea Fortress — Official Website", url: "https://suomenlinna.fi/en/" },
      { label: "Stromma Ferry Departure Point — Market Square", url: "https://www.stromma.com/en-fi/helsinki/customer-service-contact/find-us/market-square/" },
    ],
    blocks: [
      { time: "9:40 AM", icon: "flight", title: "Connect FRA → HEL", resId: "flightOut", blurb: "A short connection through Frankfurt, then on into Finland." },
      { time: "1:10 PM", icon: "flight", title: "Arrive Helsinki (HEL)", detail: "Express Train, 30 min, every 10 min, 24 miles to Helsinki Central Station (Zone A/B/C ticket, HSL app). Buy a €5 ticket on the platform — take the \"P\" (32 min) or \"I\" (28 min) train." },
      { time: "2:00 PM", icon: "hotel", title: "Check in — Lapland Hotels Bulevardi", resId: "hotelHelsinki", blurb: "Home base for the next four nights — a King room with a French balcony and sauna, a short walk from the harbor market." },
    ]},

  { date: "2026-06-11", city: "Helsinki", title: "Synagogue & Private Tour",
    links: [
      { label: "Private Tour Booking — WithLocals Helsinki", url: "https://www.withlocals.com/experiences/finland/helsinki/" },
      { label: "Helsinki Walking Tour Video (4K)", url: "https://www.youtube.com/watch?v=S7mKDAoNoo8" },
      { label: "Paja Workshop — Finnish Crafts", url: "https://www.pajadesign.com/" },
    ],
    blocks: [
      { time: "10:00 AM", icon: "activity", title: "Helsinki Synagogue Tour", detail: "€10pp donation · Malminkatu 26 · srk@jchelsinki.fi. One of only two synagogues in Finland; the Helsinki Jewish community numbers about 1,200. Built in 1906.", mapQuery: "Helsinki Synagogue" },
      { time: "11:15 AM", icon: "tour", title: "Private Highlights & Hidden Gems", resId: "tourHelsinkiLocals", blurb: "A private, local's-eye look at Helsinki beyond the guidebook stops. Meeting point: Stockmann Department Store main entrance, under the large clock." },
      { time: "Afternoon", icon: "activity", title: "Design District & Design Museum", detail: "Immersive experience into the world of Finnish Design. Compact area of nearly 200 design-forward establishments. Sustainable and vintage design.", mapQuery: "Design Museum Helsinki" },
      { time: "Evening", icon: "food", title: "Dinner in the Design District", detail: "YesYesYes — vegetarian, seasonally changing menu, everything made from scratch with local ingredients." },
    ]},

  { date: "2026-06-12", city: "Helsinki", title: "Helsinki Day Celebration",
    blocks: [
      { time: "All day", icon: "activity", title: "Helsinki Day Celebration", detail: "Celebrated every June 12 since 1959 — the city's birthday. Main event at Kamppi Narinkkatori & Lasipalatsi Squares: live music, film screenings, sports, participatory art, ~250 free events including City Life photo exhibit.", mapQuery: "Narinkkatori, Helsinki" },
      { time: "Late morning", icon: "activity", title: "Bulevardi & Café Eckberg", detail: "Restaurants, cafes, boutiques, galleries along Bulevardi. Stop in at Café Eckberg.", mapQuery: "Café Eckberg, Helsinki" },
      { time: "Midday", icon: "activity", title: "Esplanadi Park & Market Square", detail: "Center of activity and concerts. Market Square and harbor at the end of Esplanadi.", mapQuery: "Esplanadi, Helsinki" },
      { time: "Afternoon", icon: "activity", title: "Temppeliaukio — The Rock Church", detail: "Carved directly into solid rock — one-of-a-kind architecture in the world.", mapQuery: "Temppeliaukio Church, Helsinki" },
      { time: "Afternoon", icon: "activity", title: "Allas Sea Pool", detail: "Finnish sauna culture — combines urban culture, relaxing by the water and live music. Surrounded by the sea, saunas and sea-water pools.", mapQuery: "Allas Sea Pool, Helsinki" },
      { time: "Afternoon", icon: "activity", title: "Kotiharjun Sauna", detail: "The oldest public sauna in Helsinki, 1928.", mapQuery: "Kotiharjun Sauna, Helsinki" },
      { time: "Afternoon", icon: "activity", title: "Marimekko Flagship Store", detail: "Designer flagship store on Esplanadi.", mapQuery: "Marimekko, Helsinki" },
      { time: "Evening", icon: "activity", title: "Tavastia — Legendary Music Venue", detail: "One of Europe's oldest rock clubs, near Amos Rex.", mapQuery: "Tavastia Club, Helsinki" },
      { time: "Any time", icon: "activity", title: "Paja Workshop — Finnish Crafts", detail: "Design and make your own leather, silver jewelry or ring, 1–3 hrs in an authentic Finnish workshop. Kamppi neighborhood, Eerikinkatu 18.", mapQuery: "Paja Workshop, Eerikinkatu 18, Helsinki" },
    ]},

  { date: "2026-06-13", city: "Tallinn", title: "Day Trip to Estonia",
    links: [
      { label: "Visit Tallinn — Official Guide", url: "https://visittallinn.ee/" },
      { label: "Private Tour Booking — WithLocals Tallinn", url: "https://www.withlocals.com/" },
      { label: "Tallinn Walking Tour Video (4K)", url: "https://www.youtube.com/watch?v=bk3jIU5N9T8" },
    ],
    blocks: [
      { time: "7:30 AM", icon: "ferry", title: "Ferry to Tallinn", resId: "ferryTallinn", blurb: "A 2-hour crossing on a 10-deck ferry — pub, viewing deck and duty-free on board. Check in by 7:00 AM at West Terminal 2." },
      { time: "10:00 AM", icon: "tour", title: "Private Highlights & Hidden Gems", resId: "tourTallinnLocals", blurb: "A local's walk through the UNESCO Old Town — cobblestones, city walls, hidden courtyards. Meeting point: Freedom Square in front of Jaani Kirik church." },
      { time: "4:30 PM", icon: "ferry", title: "Return ferry to Helsinki", resId: "ferryTallinn", blurb: "Same crossing back. Check in to Tallinn D-Terminal by 16:00." },
    ]},

  { date: "2026-06-14", city: "Stockholm", title: "Fly to Sweden",
    links: [
      { label: "Visit Stockholm — Official Guide", url: "https://www.visitstockholm.com/" },
      { label: "Stockholm Walking Tour Video (4K)", url: "https://www.youtube.com/watch?v=0j5e_9GCPZY" },
    ],
    blocks: [
      { time: "10:10 AM", icon: "flight", title: "Fly Helsinki → Stockholm", resId: "flightHelToStockholm", blurb: "A short hop across the Gulf of Bothnia — under an hour in the air." },
      { time: "12:00 PM", icon: "hotel", title: "Check in — The Sparrow Hotel", resId: "hotelStockholm", blurb: "A boutique stay on the top floor with city views, steps from Gamla Stan." },
      { time: "12:00 PM", icon: "tour", title: "Private City Tour, Gamla Stan", resId: "tourStockholmLocals", blurb: "First steps into Sweden — Stockholm's 700-year-old old town, medieval alleys and all. Meeting point: in front of Stockholms Gästabud restaurant, Österlånggatan 7." },
      { time: "Afternoon", icon: "activity", title: "Södermalm Island — Monteliusvägen", detail: "Trendy galleries and boutiques, eclectic cafes. Monteliusvägen offers amazing panoramic views of the city skyline, the waterfront, and historic landmarks — trees and benches, perfect for strolls and photography.", mapQuery: "Monteliusvagen, Stockholm" },
    ]},

  { date: "2026-06-15", city: "Stockholm", title: "Gamla Stan & Fika",
    links: [
      { label: "IceBar Stockholm — Book Tickets (Hellotickets)", url: "https://www.hellotickets.com/se/comprar-entradas-icebar-stockholm/p-1057" },
      { label: "Stockholm Pass — 70+ Attractions (1–4 Days)", url: "https://stockholmpass.com/en/" },
      { label: "Nobel Prize Museum — Plan Your Visit", url: "https://www.nobelprizemuseum.se/en/" },
    ],
    blocks: [
      { time: "9:00 AM", icon: "tour", title: "Stockholm Full City — Multi Island", resId: "tourStockholmMultiIsland", blurb: "Gamla Stan cobblestone streets, medieval buildings, and historic sites, founded 1252. Meeting point: Skeppsbron 25, Gamla Stan." },
      { time: "Midday", icon: "food", title: "Fika in Gamla Stan", detail: "Traditional Swedish fika (coffee + pastry) at Systrarna Andersson. The Swedish art of Fika, pronounced \"fee-kuh\", is one of the country's most cherished customs — pause for coffee, cake, and relaxation." },
      { time: "Afternoon", icon: "activity", title: "Nobel Prize Museum & Storkyrkan Cathedral", detail: "Nobel Prize Museum — Stockholm Pass, Gamla Stan Square. Interactive exhibits and audio commentary. Storkyrkan Stockholm Cathedral (1300s) — the mother church, site of royal weddings and parliamentary ceremonies.", mapQuery: "Nobel Prize Museum, Stockholm" },
      { time: "Afternoon", icon: "activity", title: "The Great Synagogue", detail: "Kings Garden — Wahrendorffsgatan 3A. Menorah donated by King Gustav 1792.", mapQuery: "Great Synagogue Stockholm" },
      { time: "Evening", icon: "activity", title: "IceBar Stockholm", detail: "In Hotel C, next to Central Station. 30–60 min, includes a drink in an ice glass — room kept at 23°F. Capes & gloves provided. Less crowded 11–2 PM; lively 5–7 PM pre-dinner. Book through Hellotickets or Tickadoo apps.", mapQuery: "IceBar Stockholm" },
    ]},

  { date: "2026-06-16", city: "Stockholm", title: "Vasa Museum & ABBA",
    links: [
      { label: "ABBA The Museum — Tickets & Info (reservation required)", url: "https://abbathemuseum.com/en/" },
      { label: "Skansen Open-Air Museum — Visit Info & Tickets", url: "https://www.skansen.se/en/" },
      { label: "Gröna Lund — Brad Paisley Concert", url: "https://gronalund.com/en/events/concerts/" },
    ],
    blocks: [
      { time: "10:00 AM", icon: "tour", title: "Vasa Museum Small-Group Tour", resId: "tourVasaMuseum", blurb: "The world's only surviving 17th-century warship — raised intact after 333 years underwater. One of the biggest cultural treasures in Sweden." },
      { time: "1:00 PM", icon: "activity", title: "Skansen — Open-Air Museum", detail: "Oldest open-air museum in the world — five centuries of Swedish life. Unique gardens, cafes, culturally significant buildings.", mapQuery: "Skansen, Stockholm" },
      { time: "3:00 PM", icon: "activity", title: "ABBA The Museum", detail: "Timed entry, reservation needed. Dance with ABBA! QR audio guided tour, ABBA Karaoke. Very interactive museum.", mapQuery: "ABBA The Museum, Stockholm" },
      { time: "8:00 PM", icon: "activity", title: "Brad Paisley Concert at Gröna Lund", detail: "8:00–9:30 PM at Gröna Lund amusement park.", mapQuery: "Grona Lund, Stockholm" },
    ]},

  { date: "2026-06-17", city: "Stockholm", title: "Archipelago & Vikings",
    links: [
      { label: "Stockholm Archipelago Speedboat — Viator Booking", url: "https://www.viator.com/Stockholm/d752-ttd" },
      { label: "Viking History Walking Tours — Viator Stockholm", url: "https://www.viator.com/search/Stockholm?text=viking+walking+tour" },
    ],
    blocks: [
      { time: "9:30 AM", icon: "tour", title: "Stockholm Archipelago Speedboat", resId: "tourArchipelago", blurb: "Exploring the traditional summer getaway of locals on the Stockholm Peninsula, viewing historic sites and summer houses dating to the 17th century. Meeting point: Pier 19 (Kajplats 19), Strandvägen 20–28." },
      { time: "1:00 PM", icon: "tour", title: "Viking History Walking Tour", resId: "tourVikingWalk", blurb: "Meeting point: Stortorget in front of Nobel Museum. Arrive 10 minutes early." },
    ]},

  { date: "2026-06-18", city: "Stockholm", title: "Royal Palace & Metro Art",
    links: [
      { label: "Royal Palace Stockholm — Guided Tour Info & Tickets", url: "https://kungligaslotten.se/english/royal-palaces-and-sites/the-royal-palace/" },
      { label: "SL Metro Art Map — Self-Guided Tour", url: "https://sl.se/en/in-english/travelling-with-sl/art-in-the-sl-network/" },
    ],
    blocks: [
      { time: "11:45 AM", icon: "activity", title: "Royal Palace — 90 min Guided Tour", detail: "Stockholm Pass guided tour of opulent Royal Apartments, Treasury, and Royal Chapel.", mapQuery: "Royal Palace Stockholm" },
      { time: "12:15 PM", icon: "activity", title: "Changing of the Guard", detail: "Outer courtyard parade and band at 12:15 PM, takes 40 minutes. Band/guards march through central Stockholm to the palace starting at 11:45 AM — view from Skeppsbron water side of palace." },
      { time: "Afternoon", icon: "explore", title: "\"World's Longest Art Gallery\" — Metro Stations", detail: "Self-guided art tour: *T-Centralen (Roman) → red line #14 to Mörby Centrum → one stop Östermalmstorg (environment/women's rights) → Stadion (colors/rainbow) → Tekniska Högskolan (cosmic) → return T-Centralen → green #19 → Hötorget (1950s) → five stops to Thorildsplan (Pac-Man/Mario Bros) → Fridhemsplan (nautical) → blue line #11 → Solna Centrum (hell) → Hallonbergen (whimsical) → return to *Rådhuset (cavern/geological) → *Kungsträdgården (archaeological artifacts) → return T-Centralen." },
    ]},

  { date: "2026-06-19", city: "Oslo", title: "Fly to Norway",
    links: [
      { label: "Visit Oslo — Official Guide", url: "https://www.visitoslo.com/en/" },
      { label: "Oslo Pass — Unlimited Transit + 30 Museums", url: "https://www.visitoslo.com/en/activities-and-attractions/oslo-pass/" },
    ],
    blocks: [
      { time: "9:10 AM", icon: "flight", title: "Fly Stockholm → Oslo", resId: "flightStockholmToOslo", blurb: "A quick one-hour flight into Norway." },
      { time: "12:00 PM", icon: "hotel", title: "Check in — Hotel Christiania Teater", resId: "hotelOslo", blurb: "Top-floor city views, right in the heart of Oslo." },
      { time: "1:00 PM", icon: "tour", title: "Private City Tour, Hidden Gems", resId: "tourOsloLocals", blurb: "A local's introduction to Oslo. Meeting point: Oslo Cathedral main entrance." },
      { time: "Evening", icon: "activity", title: "Karl Johans Gate & Grand Hotel", detail: "Oslo's lively main pedestrian street, running from the main train station to the Royal Palace and the National Theatre. Visit Grand Hotel for a drink at the rooftop bar or glass-domed bar — winner of the Nobel Peace Prize waves from here.", mapQuery: "Grand Hotel Oslo" },
    ]},

  { date: "2026-06-20", city: "Oslo", title: "Royal Palace & Harbor",
    blocks: [
      { time: "11:30 AM", icon: "tour", title: "The Royal Palace / Castle Tour", resId: "tourRoyalPalaceOslo", blurb: "Inside the working Royal Palace. Ministers' Salon & Council Chambers, State rooms, Bird Room, Grand Ballroom. Arrive 11:30 for security — no backpacks/handbags." },
      { time: "1:30 PM", icon: "activity", title: "Changing of the Guard", detail: "40-minute ceremony at the Royal Palace." },
      { time: "2:30 PM", icon: "explore", title: "Aker Brygge Harbor-Front Promenade", detail: "Oslo Fjord City Walk — start at Tjuvholmen #5. Nobel Peace Center #6 (Oslo Pass) on harbor. Untuned Bell — ring it by stepping on the pedal (bell from the city hall bell tower). Oslo Opera House #10 — next to train stations, stunning architecture. Go up the marble ramps on the unique roof for great views, open 24/7. Munch Museum #11 (Oslo Pass) — Edvard Munch's The Scream. Akershus Fortress #7 (Oslo Pass) — Military and Resistance Museum. Akershusstranda — walk along harbor front.", mapQuery: "Oslo Opera House" },
      { time: "Afternoon", icon: "activity", title: "Historical Museum — Viking Artifacts", detail: "Viking artifacts moved here from the Viking Ship Museum (closed for renovation).", mapQuery: "Historical Museum Oslo" },
      { time: "12:00 PM", icon: "tour", title: "Fjær Konfekt — Anniversary Dessert", resId: "tourFjaerKonfekt", blurb: "A dessert celebration stop, Drammensveien 153B. Take local train (VY) from Oslo S to Skøyen (5 min) or Tram #13. Open 12–6 PM." },
      { time: "Evening", icon: "activity", title: "Floating Saunas in the Harbor", detail: "Floating saunas across from the Munch Museum.", mapQuery: "Floating Saunas Oslo" },
    ]},

  { date: "2026-06-21", city: "Oslo", title: "Fjord Explorers & Vigeland Park",
    blocks: [
      { time: "Morning", icon: "activity", title: "Fram Museum & Kon-Tiki Museum", detail: "Ferry to Bygdøy / Museum Island (Oslo Pass) — bus #30 or ferry. Fram Museum (1½ hr, Oslo Pass): original arctic and Antarctic expedition ship used by famed explorer Roald Amundsen, first person to reach the South Pole. Interactive and immersive. Kon-Tiki / RA2 Museum (1½ hr, Oslo Pass) — next door to Fram.", mapQuery: "Fram Museum, Oslo" },
      { time: "Midday", icon: "activity", title: "Holmenkollen Ski Jump", detail: "Olympic ski tower — viewing platform, great views from the top of Oslo. International Ski Museum (4,000-year history). Zip line down like the ski jumpers! Take metro Line #1 to Holmenkollen station and follow signs.", mapQuery: "Holmenkollen Ski Jump, Oslo" },
      { time: "Afternoon", icon: "activity", title: "SALT — Art Project & Space", detail: "Art project and entertainment space — food, music and atmosphere.", mapQuery: "SALT Oslo" },
      { time: "Late afternoon", icon: "activity", title: "Vigeland Sculpture Park", detail: "200 sculptures by Gustav Vigeland, each depicting people at different stages of life. One of the most popular sites in Oslo. Open 24/7. Tram #12 to Vigelandsparken, or any metro line to Majorstuen + 5-min walk.", mapQuery: "Vigeland Park, Oslo" },
    ]},

  { date: "2026-06-22", city: "Bergen", title: "Norway in a Nutshell — Fjord Crossing",
    links: [
      { label: "Bergen Card — Official Website (24h $42 / 48h $54 · free transit + museums)", url: "https://en.visitbergen.com/bergen-card" },
      { label: "SKYSS Ticket App — save up to 20% on bus & train", url: "https://www.skyss.no/en/tickets-and-prices/skyss-ticket-app/" },
      { label: "Visit Bergen — Official Travel Guide", url: "https://en.visitbergen.com/" },
    ],
    blocks: [
      { time: "6:25 AM", icon: "train", title: "The Bergen Railway — Oslo → Myrdal", resId: "trainBergenRailway", blurb: "Vy Pluss (1st class), Car #1, seats 23/24/27/28 — facing seats with table. One of the world's most scenic train journeys across Norway's high mountain plateau. Arrive Myrdal 11:15 AM." },
      { time: "12:06 PM", icon: "train", title: "The Flåm Railway — Myrdal → Flåm", resId: "trainFlamRailway", blurb: "One of the steepest railways on earth — a dramatic 3,000-ft descent, with a 10-minute photo stop at Kjosfossen waterfall. Look for the seductive troll Huldra. Sit on the right side for the best fjord views." },
      { time: "1:15 PM", icon: "tour", title: "Stegastein Viewpoint — Private Tour", resId: "tourStegastein", blurb: "A platform 2,000+ feet above the Aurlandsfjord — higher than the World Trade Center. Booking #3097." },
      { time: "2:35 PM", icon: "activity", title: "Aurland Shoe Factory", detail: "Home of the original Aurland shoe (penny loafer), created by local shoemaker Nils Tveranger. Watch the local craftsmen at work observing craft traditions in historical context.", mapQuery: "Aurland Shoe Factory" },
      { time: "3:30 PM", icon: "ferry", title: "Fjord Cruise — Flåm → Bergen", resId: "cruiseSognefjord", blurb: "Into the UNESCO-listed Nærøyfjord (Aurlandsfjord & Sognefjord — Norway's longest fjord). One stop Balestrand 4:50 PM. Arrive early for prime spots on the top level. Front and rear outdoor deck for panoramic fjord views. Arrive Bergen 8:45 PM." },
      { time: "8:45 PM", icon: "hotel", title: "Check in — Hotel Admiral", resId: "hotelBergen", blurb: "Journey's end for the day — a harbor-view room looking out over Bryggen." },
    ]},

  { date: "2026-06-23", city: "Bergen", title: "Bryggen & the Fish Market",
    links: [
      { label: "Fløibanen Funicular — Book Online (roundtrip $15)", url: "https://www.floibanen.com/" },
      { label: "Bergen History Walking Tour — TripAdvisor Ref #1349328525", url: "https://www.tripadvisor.com/AttractionProductDetail-d19029009-Bergen_Historical_Walking_Tour_with_a_Local_Guide-Bergen_Vestland.html" },
    ],
    blocks: [
      { time: "9:50 AM", icon: "tour", title: "Bergen History Walking Tour", resId: "tourBergenHistory", blurb: "A walk through Bergen's Hanseatic past, starting right at the fortress gate. Meeting point: Bradbenken 1, a brick office building next to the fortress entrance." },
      { time: "Midday", icon: "explore", title: "Bryggen Wharf & Old Town", detail: "Bryggen Wharf (Vagen Harbor) — Bergen's most famous area. A series of colorful wooden buildings that once housed the trading offices of the Hanseatic League. UNESCO World Heritage site. The narrow passages behind the facades hide small shops, galleries, and small museums. Sandviken neighborhood — wooden houses and cobbled streets. Hanseatic Maritime Museum — oldest building, very authentic feel. Powerful guild of European merchants from the 14th–18th century.", mapQuery: "Bryggen, Bergen" },
      { time: "Afternoon", icon: "activity", title: "Fejellskal Fisketorget — Fish Market", detail: "10 AM–6 PM. Fish Market — 800 years of continuous use as a meeting place for merchants and fishermen.", mapQuery: "Fish Market Bergen" },
      { time: "After 5 PM", icon: "activity", title: "Mt. Fløyen Funicular", detail: "Fløibanen funicular to the summit — panoramic views over the city and fjords. Take the easy hiking path (1½ mi, 30 min) back down. Go after 5 PM when cruise ships leave for shorter ticket lines. Two lines — left line charges extra; use the ticket machine on the right or book online at Fløibanen app, roundtrip $15. Take a picture at the Fløyen directional signpost. Granbakken Lake on Fløyen — free canoe rentals, 8-minute walk from the viewpoint.", mapQuery: "Floibanen, Bergen" },
    ]},

  { date: "2026-06-24", city: "Bergen", title: "Open Day",
    links: [
      { label: "Bergen Pubs & Bars Guide", url: "https://en.visitbergen.com/food-and-drink/pubs-and-bars" },
      { label: "Bergen International Restaurants", url: "https://en.visitbergen.com/food-and-drink/restaurants/international" },
    ],
    blocks: [
      { time: "All day", icon: "activity", title: "Open Day in Bergen", detail: "Free day — explore Bergen's pubs, bars, and restaurants at your own pace. Cruise ships: AIDAnova (8 AM–4:30 PM) and Seabourn Ovation (8 AM–5 PM) in port — Old Bergen Museum is a great option today: over 50 reconstructed wooden houses, historic cobblestone streets, and actors in period costumes bringing Bergen's history back to life.", mapQuery: "Old Bergen Museum" },
      { time: "Any time", icon: "activity", title: "Old Bergen Museum", detail: "Interactive museum — over 50 reconstructed wooden houses, historic cobblestone streets, and actors in period costumes. Checkout the homes of merchants and craftsmen, explore the old schoolhouse, chat with a 'local' from the 1800s.", mapQuery: "Old Bergen Museum" },
      { time: "Any time", icon: "activity", title: "Mt. Ulriken — Highest Mountain Around Bergen", detail: "Highest mountain around Bergen with great panoramic views.", mapQuery: "Mount Ulriken, Bergen" },
      { time: "Evening", icon: "activity", title: "Bergenhus Fortress", detail: "One of Norway's oldest and best-preserved stone fortifications. Large stone banquet hall for royal medieval feasts. Along Vagen Harbor, 13th century. Tours $10 — free walk of the grounds.", mapQuery: "Bergenhus Fortress, Bergen" },
    ]},

  { date: "2026-06-25", city: "Departure", title: "Fly Home",
    blocks: [
      { time: "12:00 PM", icon: "activity", title: "Leave for Bergen Airport", detail: "Bybanen Light Rail (Line 1), 50 min, $4.50 — or Flybussen express bus, 20 min, $13.80 booked ahead / $16.50 on board. Taxis $45–$60. Bergen Lounge airside between Upper Crust and near Gate E26 (international flights only)." },
      { time: "3:20 PM", icon: "flight", title: "Depart Bergen → Reykjavík → Washington", resId: "flightHome", blurb: "Homeward bound — Bergen to Reykjavík to Washington Dulles. 1-hour layover in Reykjavík at the Icelandair Saga Lounge." },
    ]},
];

// ---------------------------------------------------------------------------
// EXPLORE — curated highlights per city.
// Items with `day:` field render INLINE in that day block (CAP-6).
// Items without `day:` render in the "Add-on Options" grid at end of city (CAP-7).
// ---------------------------------------------------------------------------
const EXPLORE = {
  Helsinki: [
    // Inline day tiles
    { name: "Suomenlinna Sea Fortress", tag: "UNESCO Site", day: "2026-06-10",
      desc: "15-min HSL ferry from Market Square (€3 one way, HSL AB ticket, runs 24h). Island sea fortress.",
      url: "https://suomenlinna.fi/en/",
      ferryUrl: "https://www.stromma.com/en-fi/helsinki/customer-service-contact/find-us/market-square/",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Suomenlinna.jpg/960px-Suomenlinna.jpg", mapQuery: "Suomenlinna, Helsinki" },
    { name: "Amos Rex Museum", tag: "Modern Art", day: "2026-06-10",
      desc: "Very cool modern experimental art underground museum. €22, 11 AM–8 PM.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Amos_Rex_aukio.jpg/960px-Amos_Rex_aukio.jpg", mapQuery: "Amos Rex, Helsinki" },
    { name: "Kamppi Chapel — Chapel of Silence", tag: "Architecture", day: "2026-06-10",
      desc: "Chapel of Silence next to Amos Rex. Atypical modern design church — very unique.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kamppi_Chapel.jpg/960px-Kamppi_Chapel.jpg", mapQuery: "Kamppi Chapel, Helsinki" },
    { name: "Hakaniemi Market Hall", tag: "Market", day: "2026-06-10",
      desc: "Old Market Hall — central market near Market Square & Harbor.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hakaniemi_market_hall.jpg/960px-Hakaniemi_market_hall.jpg", mapQuery: "Hakaniemi Market Hall, Helsinki" },
    { name: "Design Museum Helsinki", tag: "Design", day: "2026-06-11",
      desc: "Immersive experience into the world of Finnish Design. Compact area of nearly 200 design-forward establishments. Sustainable and vintage design.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Design Museum Helsinki" },
    { name: "Temppeliaukio — The Rock Church", tag: "Architecture", day: "2026-06-12",
      desc: "Carved directly into solid rock — one-of-a-kind architecture in the world.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Temppeliaukio_Church_3.jpg/960px-Temppeliaukio_Church_3.jpg", mapQuery: "Temppeliaukio Church, Helsinki" },
    { name: "Allas Sea Pool", tag: "Experience", day: "2026-06-12",
      desc: "Finnish sauna culture — urban culture, relaxing by the water and live music. Surrounded by the sea, saunas and sea-water pools.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Allas Sea Pool, Helsinki" },
    { name: "Tavastia — Legendary Music Venue", tag: "Music", day: "2026-06-12",
      desc: "One of Europe's oldest rock clubs, near Amos Rex.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Tavastia Club, Helsinki" },
    { name: "Paja Workshop", tag: "Crafts", day: "2026-06-12",
      desc: "Design and make your own leather, silver jewelry or ring, 1–3 hrs in authentic Finnish workshop. Eerikinkatu 18, Kamppi. pajadesign.com",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Paja Workshop Eerikinkatu 18 Helsinki" },
    // Add-on Options (no day field)
    { name: "Helsinki Cathedral & Senate Square", tag: "Landmark",
      desc: "The city's iconic neoclassical cathedral overlooking the harbor market.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Helsinki Cathedral" },
    { name: "Tram #2 — Sightseeing Loop", tag: "Transport",
      desc: "Great sightseeing loop — passes Old Market Hall, Market Square, Senate Square, Amos Rex and Kamppi.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg", mapQuery: "Helsinki tram" },
  ],

  Tallinn: [
    { name: "Tallinn Old Town Square", tag: "UNESCO Site",
      desc: "700-year-old Town Hall — the historic heart of the Hanseatic old city.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tallinn_Town_Hall_Square%2C_2013.jpg/960px-Tallinn_Town_Hall_Square%2C_2013.jpg", mapQuery: "Tallinn Town Hall Square" },
    { name: "Seaplane Harbour Museum", tag: "Museum",
      desc: "Giant 1930s seaplane hangar — walk through a full-size submarine. Interactive. Boats on display in drydock are free to go on.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Seaplane_Harbour.jpg/960px-Seaplane_Harbour.jpg", mapQuery: "Seaplane Harbour, Tallinn" },
    { name: "Kiek in de Kök & Bastion Passages", tag: "History",
      desc: "Climb the Maiden Tower, walk the city wall, descend into 13th–14th-century underground passages with engraved stone slabs and tombs.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/The_Kiek_in_de_K%C3%B6k_cannon_tower_in_Tallinn.jpg/960px-The_Kiek_in_de_K%C3%B6k_cannon_tower_in_Tallinn.jpg", mapQuery: "Kiek in de Kok, Tallinn" },
    { name: "Raeapteek — 600-Year-Old Pharmacy", tag: "History",
      desc: "One of the oldest continuously open pharmacies in the world — 600 years, next to Town Hall. Small free museum of medieval medicines.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tallinn_Town_Hall_Square%2C_2013.jpg/960px-Tallinn_Town_Hall_Square%2C_2013.jpg", mapQuery: "Raeapteek, Tallinn" },
    { name: "Calamaya Area & KGB Prison Cells", tag: "History",
      desc: "Trendy area slightly north of Old Town — trendy cafes, street art, and the KGB Prison Cells.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tallinn_Town_Hall_Square%2C_2013.jpg/960px-Tallinn_Town_Hall_Square%2C_2013.jpg", mapQuery: "Kalamaja, Tallinn" },
    { name: "Olde Hansa Restaurant", tag: "Dining",
      desc: "15th-century, purely medieval — no electricity, all candles, everyone in medieval clothing. Three floors. Herb, honey or cinnamon beer, sweet almonds, mushroom soup with bread loaf. Troubadors playing.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tallinn_Town_Hall_Square%2C_2013.jpg/960px-Tallinn_Town_Hall_Square%2C_2013.jpg", mapQuery: "Olde Hansa, Tallinn" },
  ],

  Stockholm: [
    // Scheduled day items
    { name: "Gamla Stan (Old Town)", tag: "UNESCO-listed", day: "2026-06-14",
      desc: "Cobblestone alleys and medieval buildings dating to 1252.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Gamla Stan, Stockholm" },
    { name: "Vasa Museum", tag: "Museum", day: "2026-06-16",
      desc: "The world's only fully intact 17th-century warship, raised from the harbor after 333 years.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Stern_of_the_Vasa_ship%2C_Vasa_Museum%2C_Stockholm%2C_Sweden_julesvernex2.jpg/960px-Stern_of_the_Vasa_ship%2C_Vasa_Museum%2C_Stockholm%2C_Sweden_julesvernex2.jpg", mapQuery: "Vasa Museum, Stockholm" },
    { name: "ABBA The Museum", tag: "Interactive", day: "2026-06-16",
      desc: "Timed entry — dance along, QR audio guide, ABBA karaoke. Reservation needed.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/ABBA_Museum%2C_Djurg%C3%A5rdsv%C3%A4gen%2C_Stockholm%2C_Sweden.jpg/960px-ABBA_Museum%2C_Djurg%C3%A5rdsv%C3%A4gen%2C_Stockholm%2C_Sweden.jpg", mapQuery: "ABBA The Museum, Stockholm" },
    // Add-On Options (DOCX lines 159–169 — no day field)
    { name: "Drottningholm Palace", tag: "Add-On",
      desc: "Official residence of the Royal Family — \"Sweden's Versailles.\" Take the ferry.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Drottningholm Palace, Stockholm" },
    { name: "Golden Hits — Dinner Show", tag: "Add-On",
      desc: "Pop hits and karaoke/disco atmosphere — pulsating dinner shows, doors open 6 PM. Close to hotel. Or Stampen in Gamla Stan — very local, jazz music.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Golden Hits Stockholm" },
    { name: "City Hall", tag: "Add-On",
      desc: "Great 360° view of Stockholm from the tower. Nobel Banquet hall and 1-hour tour. Very unique building.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Stockholm City Hall" },
    { name: "Fotografiska", tag: "Add-On",
      desc: "Rotating exhibit of famous and emerging photographers, plus a restaurant with great views of Gamla Stan.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Fotografiska Stockholm" },
    { name: "Royal Armory", tag: "Add-On",
      desc: "Stockholm Pass, 90 min — Royal Wardrobe, Royal Arsenal and private collections of select monarchs.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Royal Armory Stockholm" },
    { name: "Riddarholmen Church", tag: "Add-On",
      desc: "30 min — within grounds of the Royal Palace in Old Town. The royal necropolis where many Swedish kings and queens are buried.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg", mapQuery: "Riddarholmen Church, Stockholm" },
  ],

  Oslo: [
    { name: "Oslo Opera House", tag: "Architecture",
      desc: "Walk the marble roof ramps for sweeping fjord views. Stunning unique architecture — open 24/7.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roof_of_the_Oslo_Opera_House.jpg/960px-Roof_of_the_Oslo_Opera_House.jpg", mapQuery: "Oslo Opera House" },
    { name: "Vigeland Sculpture Park", tag: "Open 24/7",
      desc: "200 Gustav Vigeland sculptures depicting people at every stage of life. One of the most popular sites in Oslo.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Vigeland_Sculpture_Park_-_Panoramic_view_towards_the_Monolith%2C_Oslo%2C_Norway.jpg/960px-Vigeland_Sculpture_Park_-_Panoramic_view_towards_the_Monolith%2C_Oslo%2C_Norway.jpg", mapQuery: "Vigeland Park, Oslo" },
    { name: "Akershus Fortress", tag: "History",
      desc: "Medieval fortress — Military & Resistance Museum (Oslo Pass). Free walk of the grounds. Deportation Chair monument — Jewish deportees WW2.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Akershus_festning.jpg/960px-Akershus_festning.jpg", mapQuery: "Akershus Fortress, Oslo" },
    { name: "The Munch Museum", tag: "Museum",
      desc: "Edvard Munch's The Scream — the largest single-artist museum in Europe. $15. Three versions (painting/drawing/print) — one shown at a time, rotated hourly.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/MUNCH_Museum_front_%282020%29_4.jpg/960px-MUNCH_Museum_front_%282020%29_4.jpg", mapQuery: "Munch Museum, Oslo" },
    { name: "Damstredet & Telthusbakken", tag: "Neighborhood",
      desc: "Old world Oslo neighborhood, a few blocks behind Grand Hotel — one of Oslo's best-preserved 19th-century wooden house districts.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roof_of_the_Oslo_Opera_House.jpg/960px-Roof_of_the_Oslo_Opera_House.jpg", mapQuery: "Damstredet Oslo" },
    { name: "Nobel Peace Center", tag: "Museum",
      desc: "Oslo Pass included — on the harbor front (#6 on the harbor walk).",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roof_of_the_Oslo_Opera_House.jpg/960px-Roof_of_the_Oslo_Opera_House.jpg", mapQuery: "Nobel Peace Center, Oslo" },
  ],

  Bergen: [
    { name: "Bryggen Wharf", tag: "UNESCO Site",
      desc: "Colorful Hanseatic-era wooden trading houses along Vågen Harbor — the classic Bergen postcard. Narrow passages hide small shops, galleries and museums.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bryggen_%282%29.jpg/960px-Bryggen_%282%29.jpg", mapQuery: "Bryggen, Bergen" },
    { name: "Mt. Fløyen", tag: "Viewpoint",
      desc: "Fløibanen funicular to a panoramic summit — hike the easy 30-min path back down. Go after 5 PM when cruise ships leave. Free canoe rentals at Granbakken Lake (8 min walk from summit).",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bergen_from_Fl%C3%B8yen.jpg/960px-Bergen_from_Fl%C3%B8yen.jpg", mapQuery: "Floyen, Bergen" },
    { name: "Bergenhus Fortress", tag: "History",
      desc: "One of Norway's oldest and best-preserved stone fortifications, 13th century. Large stone banquet hall for royal medieval feasts. Tours $10.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bergenhus_Fortress_Museum5058.JPG/960px-Bergenhus_Fortress_Museum5058.JPG", mapQuery: "Bergenhus Fortress, Bergen" },
    { name: "Old Bergen Museum", tag: "Museum",
      desc: "Over 50 reconstructed wooden houses, historic cobblestone streets, and actors in period costumes. Checkout homes of merchants and craftsmen, explore the old schoolhouse.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bryggen_%282%29.jpg/960px-Bryggen_%282%29.jpg", mapQuery: "Old Bergen Museum" },
    { name: "Mt. Ulriken", tag: "Nature",
      desc: "Highest mountain around Bergen — great panoramic views.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bergen_from_Fl%C3%B8yen.jpg/960px-Bergen_from_Fl%C3%B80yen.jpg", mapQuery: "Mount Ulriken, Bergen" },
    { name: "Sandviken Neighborhood", tag: "Neighborhood",
      desc: "Wooden houses and cobbled streets — Bergen's most picturesque historic neighborhood.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bryggen_%282%29.jpg/960px-Bryggen_%282%29.jpg", mapQuery: "Sandviken Bergen" },
  ],
};

// ---------------------------------------------------------------------------
// PRACTICAL INFO — per city. Food entries include `cuisine:` label (F7).
// All food content verbatim from DOCX.
// ---------------------------------------------------------------------------
const INFO = {
  Helsinki: {
    currency: "Euro (€)", greeting: "Hei (\"hay\") — thank you: Kiitos (\"kee-toss\") — excuse me: \"uhn-teehk-si\"",
    stay: "3½ days / 4 nights · Wed 6/10 – Sun 6/14", hoursAheadDC: "7 hrs ahead of DC",
    weather: "~70°F day / 55°F night · sunrise 3:59 AM–10:42 PM (18.5 hrs of sun)",
    transport: "HSL app for tickets/routes. Airport→city: Express Train, 30 min, Zone A/B/C. Tram #2 is a great sightseeing loop.",
    transportTips: [
      "Helsinki zone is A, the airport is zone C — going from the airport you need an ABC ticket, valid 80 minutes.",
      "Buy €5 ticket on the platform. Take \"P\" train (32 min) or \"I\" train (28 min) to Helsinki Central Station.",
      "A day pass works on all city transport — buy it in the HSL app (shows a live map when you search a route).",
      "Tram #2 is a great sightseeing loop — passes Old Market Hall, Market Square, Senate Square, Amos Rex and Kamppi.",
      "Uber and Bolt both operate normally in Helsinki.",
    ],
    // Steve cited these explicitly in Email 3 + Email 4 as clickable transport links
    transportLinks: [
      { label: "HSL App — Public Transport in Finland (Step-by-Step Guide)", url: "https://www.youtube.com/watch?v=A_bGZomICVE" },
      { label: "Helsinki Card — Sightseeing & Excursions (Stromma)", url: "https://www.stromma.com/en-fi/helsinki/city-pass/helsinki-card/" },
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg/960px-Helsinki_Senate_Square_and_Helsinki_Cathedral_in_May_2026.jpg",
    food: [
      { name: "Café Ekberg", cuisine: "Finnish / Café", desc: "The oldest coffee shop in Helsinki." },
      { name: "Johan & Nyström", cuisine: "Coffee", desc: "Coffee shop and hot chocolate — try the rosemary and dark chocolate." },
      { name: "Café Regatta", cuisine: "Café", desc: "Cinnamon rolls on the waterfront, next to kayak/canoe rentals." },
      { name: "Cheri Chou", cuisine: "Pastry", desc: "Exciting pastries." },
      { name: "St George Bakery", cuisine: "Bakery / Café", desc: "Pastries, sandwiches and smoothies, with a terrace view." },
      { name: "YesYesYes", cuisine: "Vegetarian", desc: "Design District vegetarian restaurant — vibrant room, seasonally changing menu. Kitchen makes all from scratch, ingredients from local farms." },
      { name: "Daddy Green's Pizza Bar", cuisine: "Pizza", desc: "Funky, top-rated brick-oven pizza in the Design District." },
      { name: "Ristorante Argegno", cuisine: "Italian", desc: "Highly-rated Italian." },
      { name: "Bar Mate", cuisine: "Bar", desc: "Loft-style bar in the Design District." },
      { name: "Solo Sokos / Torni Hotel Ateljee Rooftop", cuisine: "Rooftop Bar", desc: "The city's highest rooftop bar — sweeping views over Helsinki." },
    ],
    localFood: [
      { name: "Salmiakki", desc: "Salted liquorice — popular in Finland. Found in practically every variety bag of sweets; also an ingredient in chocolate, ice cream, and liquor." },
      { name: "Leipäjuusto (Squeaky Cheese)", desc: "Finnish bread cheese — served warm, paired with honey or cloudberry jam. Mild flavor, springy texture, unmistakable squeak." },
      { name: "Karjalanpiirakka", desc: "Savory Karelian pies — rice porridge in a rye flour crust, baked until slightly browned. Eaten at breakfast or lunch; delicious topped with ham, cheese, or butter." },
      { name: "Mustikkapiirakka", desc: "Finnish blueberry pie — a cross between a pie, a tart, and a cheesecake." },
    ],
    tips: "Itinerary locations in bold are saved on Google Maps. Tipping isn't expected, though some restaurants now offer the option. Summers are mild but it can rain — best dressed is layers and a waterproof jacket.",
  },

  Tallinn: {
    currency: "Euro (€)",
    weather: "Similar to Helsinki, June",
    transport: "Ferry from Helsinki via Tallink Megastar, ~2 hrs each way.",
    food: [
      { name: "Olde Hansa Restaurant", cuisine: "Medieval", desc: "15th century — purely medieval, no electricity, all candles, everyone in medieval clothing. Three floors. Herb, honey or cinnamon beer, sweet almonds, mushroom soup with bread loaf. Troubadors playing. Definitely stop in and check out." },
      { name: "Pulla Bakery", cuisine: "Bakery", desc: "Next to Old Town Square — bun shop." },
    ],
    localFood: [
      { name: "Estonian Dark Rye", desc: "Hearty dark rye bread — a staple of Estonian cuisine." },
      { name: "Beetroot Soup", desc: "Traditional Estonian soup." },
      { name: "Marzipan", desc: "Tallinn is famous for its marzipan — available in elaborate shapes at Old Town shops." },
      { name: "Estonian Cheesecake", desc: "Estonian version of cheesecake — distinct from Western styles." },
    ],
    tips: "Old Town is fully walkable — cobblestones, wear comfortable shoes. Luggage lockers on the ferry (€3 small / €5 large, in-out privileges).",
  },

  Stockholm: {
    currency: "Swedish Krona (SEK)",
    stay: "4½ days / 5 nights · Sun 6/14 – Fri 6/19", hoursAheadDC: "6 hrs ahead of DC",
    weather: "~70°F day / 55°F night · sunrise 3:33 AM–9:04 PM (18 hrs) · civil twilight all night",
    transport: "SL app for tickets (single fare valid 75 min). Metro: 3 lines, extensive, doubles as \"the world's longest art gallery.\" Scooters ~$7.36/day. Arlanda Express 20 min to city, $35 one way.",
    transportTips: [
      "SL app for tickets and routes — a single fare is valid 75 minutes on any combination of bus, metro or tram.",
      "Buy a 24h/$17 or 72h/$23 pass. SL Access smart card reloadable (tap and go at turnstile). Or use phone (credit card) to tap at turnstile.",
      "Bus: enter through front door to scan ticket, exit back. Trams run every 10–15 min — Djurgården/Line 7 most popular with tourists.",
      "Scooters (Voi/Lime/Tier/Bolt) — a day pass is $7.36.",
      "Stockholm Pass covers 70+ attractions, €89–192 for 1–4 days.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alley_in_Gamla_Stan%2C_Stockholm.jpg/960px-Alley_in_Gamla_Stan%2C_Stockholm.jpg",
    food: [
      { name: "Östermalms Saluhall", cuisine: "Food Hall", desc: "★ MUST visit. 1880s food hall — close to hotel." },
      { name: "K25 Food Hall", cuisine: "Food Hall", desc: "Many cuisines, close to hotel." },
      { name: "Aifur Krog & Bar", cuisine: "Viking / Medieval", desc: "Viking restaurant — down in a cave-interior, food, music and atmosphere reminiscent of Viking feasts. Or Sjätte Tunnan for meads/dessert only." },
      { name: "Hermitage", cuisine: "Vegetarian", desc: "Vegetarian buffet restaurant with a stunning city view. International fare. In Gamla Stan." },
      { name: "Chutney", cuisine: "Indian Vegetarian", desc: "Indian vegetarian and vegan dishes. Also Veganbar and Veggie by Paul's." },
      { name: "La Neta", cuisine: "Mexican", desc: "Mex cantina style. Normalm and Sodermalm." },
      { name: "Hermans", cuisine: "Vegetarian", desc: "Veg all-you-can-eat buffet, in Södermalm. Great views of Gamla Stan, next to Fotografiska." },
      { name: "Vete-Katten", cuisine: "Swedish / Café", desc: "City institution since 1928 — snacks and pastries all from scratch." },
      { name: "Johan & Nyström", cuisine: "Coffee", desc: "Coffee shop — rosemary and dark hot chocolate." },
      { name: "Flickorna Helin", cuisine: "Bakery", desc: "Baked goods and coffee. Tree setting near Vasa and ABBA museums." },
      { name: "Socker Sucker", cuisine: "Pastry", desc: "Pastry works of art. Award-winning pastry. Drottninggatan 93 and Skeppsbro Bakery Gamla Stan sandwiches." },
      { name: "Stora Bageriet", cuisine: "Bakery", desc: "Great pastry and coffee with patio outside (near hotel). Or Svedjan Bageri." },
      { name: "Lucy's Flower Shop", cuisine: "Speakeasy / Bar", desc: "Speakeasy. Top 50 bar in the world." },
      { name: "Capital Skybar", cuisine: "Rooftop Bar", desc: "Outside 8th floor rooftop views of Gamla Stan and Södermalm — at Scandic Continental." },
      { name: "Södra Teatern", cuisine: "Rooftop Bar", desc: "Oldest theatre rooftop terrace bar with amazing views." },
      { name: "Mosebacketerrassen", cuisine: "Bar / Terrace", desc: "Laid-back open-air terrace in Södermalm, famed for casual vibe and panoramic vistas of the city and water. Ideal for beer, snacks, and watching the sunset — arrive early on sunny days for best seats." },
    ],
    localFood: [
      { name: "Raggmunk", desc: "Swedish potato pancakes — grated potatoes fried to a crispy-tender balance, served with lingonberry jam." },
      { name: "Knäckebröd", desc: "Swedish crisp bread — flat, dry, rye flour. Lightweight, keeps fresh very long. Staple food of Sweden." },
      { name: "Lingonberries", desc: "Found everywhere — jams, sauces, and as a condiment alongside almost every Swedish dish." },
      { name: "Fika — Kanelbullar", desc: "Swedish cinnamon buns. Also Kardemummabullar (cardamom buns) and Semla (cream and almond paste pastry)." },
    ],
    tips: "Stockholm has a growing vegetarian and vegan culture. Swedes eat dinner very early — make reservations. No tipping expected in restaurants. Tour guide tipping: $15–$30 pp. Don't take a taxi — many scams; price should be clear before getting in.",
  },

  Oslo: {
    currency: "Norwegian Krone (NOK) — a largely cashless country",
    stay: "2½ days / 3 nights · Fri 6/19 – Mon 6/22", hoursAheadDC: "6 hrs ahead of DC",
    weather: "~70°F day / 53°F night · sunrise 3:55 AM–11:11 PM (20 hrs) · civil twilight all night",
    transport: "Flytoget Airport Express, 20 min, ~$20pp. Oslo Pass: unlimited transit + 30 museums (€49/24h, €72/48h). Ruter app for transit.",
    transportTips: [
      "Flytoget Airport Express, 20 minutes to Oslo S, ~$20pp. Orange ticket machines.",
      "Two trains from airport — one goes direct to Central Oslo Station, or to Drammen with stops.",
      "Ruter app covers all city transit — bus, tram, metro (T-bane) and Bygdøy ferries.",
      "Oslo Pass: unlimited transit plus 30+ museums, €49/24h or €72/48h — buy on OsloPass app or VisitOslo website.",
      "Oslo City Bike pass — 3 days for $10. Oslo is largely cashless.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roof_of_the_Oslo_Opera_House.jpg/960px-Roof_of_the_Oslo_Opera_House.jpg",
    food: [
      { name: "Mathallen (Mathyallen) Food Hall", cuisine: "Food Hall", desc: "Great vibe — explore various food stalls with vegetarian options." },
      { name: "Trattoria Popolare", cuisine: "Italian", desc: "Classic Italian, located in old brewery." },
      { name: "Happolati", cuisine: "Japanese / Vegetarian", desc: "Vegetarian sushi and Asian fusion cuisine." },
      { name: "Nordvegan", cuisine: "Vegan", desc: "Oslo's award-winning vegan restaurant — popular vegan spot. Fresh salads, warm plant-based mains." },
      { name: "Café Sara", cuisine: "Café / Pub", desc: "Pub-like atmosphere and backyard garden." },
      { name: "Dattera til Hagen", cuisine: "Bar / Café", desc: "Colorful eclectic bar/café and beer garden. Pasta, salads, tapas." },
      { name: "Haralds Vaffles", cuisine: "Norwegian", desc: "Oslo waffles in Grünerløkka neighborhood — eat it with your hands, not utensils." },
      { name: "Freddy Fuego", cuisine: "Mexican", desc: "Known for amazing selection of marinated burritos." },
      { name: "Vippa", cuisine: "Food Market", desc: "Lunch at Oslo food market in ocean containers — local food vendors." },
      { name: "Gronland (Greenland)", cuisine: "Neighborhood", desc: "Oslo restaurant area — diverse international dining in the Grønland district." },
    ],
    localFood: [
      { name: "Traditional Norwegian Waffle", desc: "Served with jam, sour cream, and brown cheese (Norwegian cheese)." },
      { name: "Skoleboller (School Buns)", desc: "Sweet cardamom dough filled with vanilla custard, coated in icing and dipped in coconut flakes." },
    ],
    tips: "Tipping isn't mandatory — the bill usually includes service charges. Customary to round up or leave a small tip. Weather is unpredictable — rain jacket and umbrella! Currency: Norwegian Krone (NOK). Basically cashless country. \"Vimpel\" — narrow flag version; Norwegian wind tatters flags.",
  },

  Bergen: {
    currency: "Norwegian Krone (NOK)",
    stay: "2½ days / 3 nights · Mon 6/22 – Thu 6/25", hoursAheadDC: "6 hrs ahead of DC",
    weather: "~65°F day / 50°F night · rains ~200 days/yr (rainiest city in Europe) · sunrise 4:11 AM–11:09 PM (19 hrs)",
    transport: "Bergen Card (24h $42 / 48h $54): free public transport + museum discounts. Bybanen Light Rail to airport, 50 min, $4.50.",
    transportLinks: [
      { label: "Bergen Card — Official Website (24h $42 / 48h $54 · free transit + museums)", url: "https://en.visitbergen.com/bergen-card" },
      { label: "SKYSS Ticket App — save up to 20% on bus & train", url: "https://www.skyss.no/en/tickets-and-prices/skyss-ticket-app/" },
    ],
    transportTips: [
      "Bergen Card (24h $42 / 48h $54): free public transport plus museum discounts. Get at Bergen Tourist info Center.",
      "Download SKYSS ticket app (don't need if you have Bergen Card) — buy train and bus tickets, save up to 20%.",
      "Bybanen Light Rail (Line #1) to airport in 50 minutes, $4.50 — or Flybussen express, 20 minutes.",
      "The Old Town / Bryggen area is fully walkable — no transit needed day-to-day.",
      "Bring a rain jacket — Bergen is the rainiest city in Europe, ~200 days a year.",
    ],
    cityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bryggen_%282%29.jpg/960px-Bryggen_%282%29.jpg",
    food: [
      { name: "No Stress Bar", cuisine: "Bar / Cocktails", desc: "Hidden gem on a backstreet — best cocktails in town. Last Monkey or Zachariasbryggen." },
      { name: "Sjoboden", cuisine: "Pub / Live Music", desc: "Live music on Bryggen — a pub as it would have been for drinkers in Bergen's olden days." },
      { name: "Det Lille Kaffekompiniet", cuisine: "Coffee", desc: "One of the city's best coffee shops for a caffeine hit and cinnamon roll." },
      { name: "Godt Brod", cuisine: "Bakery", desc: "Award-winning bakery — bread and sandwiches." },
      { name: "Daily Pot", cuisine: "Vegan", desc: "Popular vegan restaurant." },
    ],
    tips: "Cruise ships in port: 6/23 Costa Diadema (10:30 AM–8:30 PM) and Silver Dawn (8 AM–6 PM); 6/24 AIDAnova (8 AM–4:30 PM) and Seabourn Ovation (8 AM–5 PM). Visit Bryggen/Fløyen after 5 PM for a quieter experience.",
  },
};

window.TRIP_DATA = { TRIP, RESERVATIONS, DAYS, EXPLORE, INFO, COUNTRIES, COUNTRY_FLAGS };
