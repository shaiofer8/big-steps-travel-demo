// classic/app.js — Option 1: the "one day at a time" template Steve called
// out by name (day switcher, cover photo, Tips/Food/Good-to-Know tabs,
// clickable map links) — same TRIP_DATA as the main demo, different shape.
(function () {
  const { TRIP, RESERVATIONS, DAYS, EXPLORE, INFO } = window.TRIP_DATA;

  const app = document.getElementById("app");
  const sheet = document.getElementById("detailSheet");
  const sheetBody = document.getElementById("sheetBody");

  let route = "day";
  let dayIndex = 0;
  let activeTab = "sites";

  function mapsUrl(q) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`; }
  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  }

  const ICONS = {
    flight: '<path d="M22 12l-9 3-3 7-2-1 1-6-7-2 1-2 7 1 4-9 2 1-2 5 6-2 2 5Z"/>',
    hotel: '<path d="M3 21V7l6-4 6 4v14M3 21h18M9 21v-6h6v6M9 10h.01M14 10h.01"/>',
    activity: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    tour: '<path d="M17 21a4 4 0 0 0-10 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 21a4 4 0 0 0-6-3.46M3 21a4 4 0 0 1 6-3.46M16.5 8a3 3 0 1 1 0-6M7.5 2a3 3 0 1 0 0 6"/>',
    ferry: '<path d="M3 21c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0M4 17l1-9h14l1 9M9 8V4h4v4"/>',
    train: '<path d="M6 3h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2ZM4 17l-2 4M20 17l2 4M8 21h8M6 12h12"/>',
    food: '<path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v9M14 3c-1 0-2 1.5-2 4s1 4 2 4v10"/>',
    explore: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2Z"/>',
  };
  function iconSvg(name, extra) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra || ""}>${ICONS[name] || ICONS.activity}</svg>`;
  }
  function typeLabel(t) { return { flight: "Flight", hotel: "Hotel", tour: "Tour / Experience", ferry: "Ferry", train: "Train" }[t] || t; }
  function typeGroup(t) {
    if (t === "hotel") return "hotel";
    if (t === "flight" || t === "train" || t === "ferry") return "transport";
    return "tour";
  }

  // ---------------------------------------------------------------------
  // Day switcher — horizontal scroll of every day, mirrors the "Bar
  // Mitzvah" template's day chips at the top of the itinerary.
  // ---------------------------------------------------------------------
  function daySwitcherHtml() {
    return `<div class="day-switcher" id="daySwitcher">
      ${DAYS.map((d, i) => `
        <button type="button" class="day-chip ${i === dayIndex ? "active" : ""}" data-i="${i}">
          <span class="n">${i + 1}</span><span class="c">${d.city}</span>
        </button>`).join("")}
    </div>`;
  }

  function scheduleRow(block) {
    const hasRes = !!block.resId;
    const group = hasRes ? typeGroup(RESERVATIONS[block.resId].type) : "";
    const mapLink = block.mapQuery ? `<a class="s-maplink" href="${mapsUrl(block.mapQuery)}" target="_blank" rel="noopener">📍 Open in Maps ↗</a>` : "";
    const resBtn = hasRes
      ? `<button class="res-chip restype-${group}" data-res="${block.resId}"><span class="tag">${iconSvg(block.icon)}</span>View reservation details</button>`
      : "";
    return `
      <div class="s-row">
        <div class="s-time mono">${block.time}</div>
        <div class="s-dot ${hasRes ? "restype-" + group : ""}"></div>
        <div class="s-body">
          <div class="s-title">${block.title}</div>
          ${block.detail ? `<p class="s-detail">${block.detail}</p>` : ""}
          <div class="s-links">${mapLink}${resBtn}</div>
        </div>
      </div>`;
  }

  // ---------------------------------------------------------------------
  // Single-day view
  // ---------------------------------------------------------------------
  function renderDay() {
    const d = DAYS[dayIndex];
    const info = INFO[d.city] || {};
    const isArrival = dayIndex === 0 || DAYS[dayIndex - 1].city !== d.city;
    const coverImg = info.cityImage || TRIP.heroImage;

    const cityStrip = isArrival && info.stay ? `
      <div class="city-strip">
        <span>${info.stay}</span><span>${info.weather}</span><span>${info.hoursAheadDC || ""}</span>
      </div>` : "";

    const sites = (EXPLORE[d.city] || []).map((p) => `
      <a class="site-card" href="${mapsUrl(p.mapQuery)}" target="_blank" rel="noopener">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="body">
          <div class="tag">${p.tag}</div>
          <div class="name">${p.name}</div>
          <div class="desc">${p.desc}</div>
          <div class="go">Open in Maps ↗</div>
        </div>
      </a>`).join("") || `<p class="tab-empty">No extra highlights logged for ${d.city} yet.</p>`;

    const food = (info.food || []).map((f) => `
      <a class="restaurant-card" href="${mapsUrl(f.name + ", " + d.city)}" target="_blank" rel="noopener">
        <b>${f.name}</b><small>${f.desc}</small>
      </a>`).join("") || `<p class="tab-empty">No restaurant picks logged for ${d.city} yet.</p>`;

    const goodToKnow = `
      <div class="metrics-grid">
        <div class="metric-tile"><small>Currency</small><b>${info.currency || "—"}</b></div>
        ${info.greeting ? `<div class="metric-tile"><small>Greeting</small><b>${info.greeting}</b></div>` : ""}
        <div class="metric-tile"><small>Weather</small><b>${info.weather || "—"}</b></div>
        ${info.hoursAheadDC ? `<div class="metric-tile"><small>Time zone</small><b>${info.hoursAheadDC}</b></div>` : ""}
      </div>
      ${info.transportTips ? `<h4 class="tab-subhead">Transportation</h4><ul class="plain-list">${info.transportTips.map((t) => `<li>${t}</li>`).join("")}</ul>` : info.transport ? `<h4 class="tab-subhead">Transportation</h4><p>${info.transport}</p>` : ""}
      ${info.tips ? `<div class="tip-card">💡 ${info.tips}</div>` : ""}
    `;

    app.innerHTML = `
      ${daySwitcherHtml()}
      <div class="wrap day-wrap">
        <div class="day-cover">
          <img src="${coverImg}" alt="${d.city}" loading="lazy">
          <div class="day-num-badge">Day ${dayIndex + 1} of ${DAYS.length}</div>
          <a class="place-badge" href="${mapsUrl(d.city)}" target="_blank" rel="noopener">📍 ${d.city}</a>
        </div>
        <div class="day-title-block">
          <div class="day-date">${fmtDate(d.date)}</div>
          <h1 class="day-title">${d.title}</h1>
        </div>
        ${cityStrip}

        <div class="schedule">${d.blocks.map(scheduleRow).join("")}</div>

        <div class="tabs">
          <button class="tab-btn2 ${activeTab === "sites" ? "active" : ""}" data-tab="sites">🗺️ Sites &amp; Things To Do</button>
          <button class="tab-btn2 ${activeTab === "food" ? "active" : ""}" data-tab="food">🍴 Food</button>
          <button class="tab-btn2 ${activeTab === "info" ? "active" : ""}" data-tab="info">📌 Good to Know</button>
        </div>
        <div class="tab-panel ${activeTab === "sites" ? "active" : ""}" data-panel="sites"><div class="site-grid">${sites}</div></div>
        <div class="tab-panel ${activeTab === "food" ? "active" : ""}" data-panel="food">${food}</div>
        <div class="tab-panel ${activeTab === "info" ? "active" : ""}" data-panel="info">${goodToKnow}</div>

        <div class="day-nav">
          <button class="day-nav-btn" id="dayPrev" ${dayIndex === 0 ? "disabled" : ""}>← Previous day</button>
          <button class="day-nav-btn" id="dayNext" ${dayIndex === DAYS.length - 1 ? "disabled" : ""}>Next day →</button>
        </div>
      </div>`;

    wireDayView();
  }

  function wireDayView() {
    document.querySelectorAll(".day-chip").forEach((btn) => {
      btn.addEventListener("click", () => { dayIndex = Number(btn.dataset.i); renderDay(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    });
    document.querySelectorAll(".tab-btn2").forEach((btn) => {
      btn.addEventListener("click", () => { activeTab = btn.dataset.tab; renderDay(); });
    });
    const prev = document.getElementById("dayPrev");
    const next = document.getElementById("dayNext");
    if (prev) prev.addEventListener("click", () => { if (dayIndex > 0) { dayIndex--; activeTab = "sites"; renderDay(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    if (next) next.addEventListener("click", () => { if (dayIndex < DAYS.length - 1) { dayIndex++; activeTab = "sites"; renderDay(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    const activeChip = document.querySelector(".day-chip.active");
    if (activeChip) activeChip.scrollIntoView({ behavior: "instant" in window ? "instant" : "auto", inline: "center", block: "nearest" });
    wireResChips();
  }

  // ---------------------------------------------------------------------
  // Reservations (same grouping/coloring as the main demo)
  // ---------------------------------------------------------------------
  function renderReservations() {
    const groups = { flight: [], hotel: [], train: [], ferry: [], tour: [] };
    for (const [id, r] of Object.entries(RESERVATIONS)) groups[r.type].push({ id, ...r });
    const groupLabels = { flight: "Flights", hotel: "Hotels", train: "Trains", ferry: "Ferries", tour: "Tours & Experiences" };

    const groupsHtml = Object.entries(groups).filter(([, items]) => items.length).map(([type, items]) => `
      <div class="res-group">
        <h3>${groupLabels[type]} <span class="count">${items.length}</span></h3>
        <div class="res-grid">
          ${items.map((r) => `
            <div class="res-card" data-restype="${typeGroup(r.type)}" data-res="${r.id}">
              <div class="kicker">${typeLabel(r.type)}${r.conf ? " · " + r.conf : ""}</div>
              <div class="title">${r.title}</div>
              <div class="sub">${r.city ? r.city + " · " : ""}${r.checkIn ? r.checkIn : r.when ? r.when : r.legs ? r.legs[0].depart : ""}</div>
            </div>`).join("")}
        </div>
      </div>`).join("");

    app.innerHTML = `
      <div class="wrap section">
        <h2>Every booking, all in one place</h2>
        <p class="lede">Tap any card for the full confirmation — no digging through email.</p>
        <div class="res-legend">
          <span><i class="dot" style="background:var(--c-hotel)"></i>Hotels</span>
          <span><i class="dot" style="background:var(--c-transport)"></i>Flights · Trains · Ferries</span>
          <span><i class="dot" style="background:var(--c-tour)"></i>Tours &amp; Experiences</span>
        </div>
        <div class="res-groups">${groupsHtml}</div>
      </div>`;
    wireResChips();
  }

  // ---------------------------------------------------------------------
  // Map — every location, one tap to Google Maps
  // ---------------------------------------------------------------------
  function renderMap() {
    const rows = [];
    for (const d of DAYS) for (const b of d.blocks) if (b.mapQuery) rows.push({ name: b.title, city: d.city, q: b.mapQuery });
    for (const r of Object.values(RESERVATIONS)) if (r.mapQuery) rows.push({ name: r.title, city: r.city || "", q: r.mapQuery });
    for (const [city, items] of Object.entries(EXPLORE)) for (const p of items) rows.push({ name: p.name, city, q: p.mapQuery });
    const seen = new Set();
    const unique = rows.filter((r) => (seen.has(r.q) ? false : (seen.add(r.q), true)));

    app.innerHTML = `
      <div class="wrap section">
        <h2>Every location, one tap to Google Maps</h2>
        <p class="lede">${unique.length} places from your itinerary.</p>
        <div class="map-list">
          ${unique.map((r) => `
            <a class="map-row" href="${mapsUrl(r.q)}" target="_blank" rel="noopener">
              <span><span class="name">${r.name}</span><span class="city"> — ${r.city}</span></span>
              <span class="go">Open ↗</span>
            </a>`).join("")}
        </div>
      </div>`;
  }

  // ---------------------------------------------------------------------
  // Detail sheet
  // ---------------------------------------------------------------------
  function openReservation(id) {
    const r = RESERVATIONS[id];
    if (!r) return;
    let legsHtml = "";
    if (r.legs) {
      legsHtml = `<div class="sheet-legs">${r.legs.map((l) => `
        <div class="sheet-leg">
          <div class="route">${l.from} → ${l.to}${l.flight ? " · " + l.flight : ""}</div>
          <div class="times mono">${l.depart}${l.arrive ? " → " + l.arrive : ""}${l.seats ? " · Seats " + l.seats : ""}</div>
        </div>`).join("")}</div>`;
    }
    const fields = [];
    if (r.room) fields.push(["Room", r.room]);
    if (r.checkIn) fields.push(["Check-in", r.checkIn]);
    if (r.checkOut) fields.push(["Check-out", r.checkOut]);
    if (r.contact) fields.push(["Contact", r.contact]);
    if (r.carrier) fields.push(["Provider", r.carrier]);
    if (r.when) fields.push(["When", r.when]);
    if (r.price) fields.push(["Price", r.price]);
    const fieldsHtml = fields.length ? `<div class="sheet-fields">${fields.map(([k, v]) => `<div class="sheet-field"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("")}</div>` : "";

    sheetBody.innerHTML = `
      <p class="sheet-kicker">${typeLabel(r.type)}</p>
      <h3 class="sheet-title">${r.title}</h3>
      ${r.conf ? `<p class="sheet-conf">Confirmation: ${r.conf}</p>` : ""}
      ${legsHtml}${fieldsHtml}
      ${r.notes ? `<p class="sheet-notes">${r.notes}</p>` : ""}
      ${r.mapQuery ? `<a class="sheet-maplink" href="${mapsUrl(r.mapQuery)}" target="_blank" rel="noopener">Open in Google Maps ↗</a>` : ""}
    `;
    sheet.showModal();
  }
  function wireResChips() {
    document.querySelectorAll("[data-res]").forEach((el) => el.addEventListener("click", () => openReservation(el.getAttribute("data-res"))));
  }
  document.getElementById("sheetClose").addEventListener("click", () => sheet.close());
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.close(); });

  // ---------------------------------------------------------------------
  // Routing
  // ---------------------------------------------------------------------
  const ROUTES = { day: renderDay, reservations: renderReservations, map: renderMap };
  function navigate(name) {
    route = name;
    ROUTES[name]();
    document.querySelectorAll("[data-nav]").forEach((el) => el.classList.toggle("active", el.getAttribute("data-nav") === name));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  document.querySelectorAll("[data-nav]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); navigate(el.getAttribute("data-nav")); }));

  navigate("day");
})();
