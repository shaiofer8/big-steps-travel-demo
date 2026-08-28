// magazine/app.js — Option 3: a new concept. One continuous, photo-led
// journal instead of an app-with-tabs — city by city, with reservations
// woven in as "boarding pass" tickets right where they happen.
(function () {
  const { TRIP, RESERVATIONS, DAYS, EXPLORE, INFO } = window.TRIP_DATA;

  const app = document.getElementById("app");
  const sheet = document.getElementById("detailSheet");
  const sheetBody = document.getElementById("sheetBody");
  const panel = document.getElementById("panel");
  const panelBody = document.getElementById("panelBody");

  function mapsUrl(q) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`; }
  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
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
  function iconSvg(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.activity}</svg>`;
  }
  function typeLabel(t) { return { flight: "Flight", hotel: "Hotel", tour: "Tour / Experience", ferry: "Ferry", train: "Train" }[t] || t; }
  function typeGroup(t) {
    if (t === "hotel") return "hotel";
    if (t === "flight" || t === "train" || t === "ferry") return "transport";
    return "tour";
  }

  // -----------------------------------------------------------------
  // Group DAYS into contiguous city stays, in order.
  // -----------------------------------------------------------------
  const groups = [];
  DAYS.forEach((d, i) => {
    const prev = groups[groups.length - 1];
    if (prev && prev.city === d.city) prev.days.push(d);
    else groups.push({ city: d.city, days: [d] });
  });

  function ticket(block) {
    if (!block.resId) {
      return block.detail ? `<p class="plan-detail">${block.detail}</p>${block.mapQuery ? `<a class="plan-maplink" href="${mapsUrl(block.mapQuery)}" target="_blank" rel="noopener">Open in Maps ↗</a>` : ""}` : (block.mapQuery ? `<a class="plan-maplink" href="${mapsUrl(block.mapQuery)}" target="_blank" rel="noopener">Open in Maps ↗</a>` : "");
    }
    const r = RESERVATIONS[block.resId];
    const group = typeGroup(r.type);
    return `
      <button class="boarding-pass restype-${group}" data-res="${block.resId}">
        <span class="bp-icon">${iconSvg(block.icon)}</span>
        <span class="bp-text">
          <span class="bp-label">${typeLabel(r.type)}</span>
          <span class="bp-title">${r.title}</span>
        </span>
        <span class="bp-arrow">›</span>
      </button>`;
  }

  function planRow(block, isLast) {
    const hasRes = !!block.resId;
    const group = hasRes ? typeGroup(RESERVATIONS[block.resId].type) : "";
    return `
      <div class="plan-row ${hasRes ? "restype-" + group : ""}">
        <div class="plan-time mono">${block.time}</div>
        <div class="plan-main">
          <div class="plan-title">${block.title}</div>
          ${ticket(block)}
        </div>
      </div>`;
  }

  function citySection(group, idx) {
    const info = INFO[group.city] || {};
    const img = info.cityImage || (EXPLORE[group.city] && EXPLORE[group.city][0] && EXPLORE[group.city][0].img) || TRIP.heroImage;
    const anchor = `city-${idx}`;

    const badges = info.stay
      ? `<div class="city-badges"><span>${info.stay}</span><span>${info.weather}</span>${info.hoursAheadDC ? `<span>${info.hoursAheadDC}</span>` : ""}</div>`
      : `<div class="city-badges"><span>Day trip</span>${info.weather ? `<span>${info.weather}</span>` : ""}</div>`;

    const planHtml = group.days.map((d) => `
      <div class="plan-day">
        <div class="plan-day-head"><span class="plan-date">${fmtDate(d.date)}</span><span class="plan-day-title">${d.title}</span></div>
        ${d.blocks.map((b) => planRow(b)).join("")}
      </div>`).join("");

    const sites = (EXPLORE[group.city] || []).map((p) => `
      <a class="site-tile" href="${mapsUrl(p.mapQuery)}" target="_blank" rel="noopener">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="tag">${p.tag}</span>
        <span class="name">${p.name}</span>
        <span class="desc">${p.desc}</span>
      </a>`).join("");

    const foodCol = info.food ? `
      <div class="guide-col">
        <h4>Food &amp; Drink</h4>
        <ul>${info.food.map((f) => `<li><b>${f.name}</b> — ${f.desc}</li>`).join("")}</ul>
      </div>` : "";
    const transportCol = info.transportTips ? `
      <div class="guide-col">
        <h4>Getting Around</h4>
        <ul>${info.transportTips.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>` : "";

    return `
      <section class="city-section" id="${anchor}" data-city="${group.city}">
        <div class="city-band">
          <img src="${img}" alt="${group.city}" loading="lazy">
          <div class="city-band-fade"></div>
          <div class="wrap city-band-content">
            <p class="city-eyebrow">Stop ${idx + 1} of ${groups.length}</p>
            <h2>${group.city}</h2>
            ${badges}
          </div>
        </div>
        <div class="wrap city-body">
          <h3 class="section-label">The Plan</h3>
          <div class="plan">${planHtml}</div>

          ${sites ? `<h3 class="section-label">Sites &amp; Things To Do</h3><div class="site-grid">${sites}</div>` : ""}

          ${(foodCol || transportCol) ? `<h3 class="section-label">Before You Go</h3><div class="guide-grid">${foodCol}${transportCol}</div>` : ""}
        </div>
      </section>`;
  }

  function render() {
    const hero = `
      <section class="hero">
        <img src="${TRIP.heroImage}" alt="" class="hero-img">
        <div class="hero-fade"></div>
        <div class="wrap hero-content">
          <p class="hero-eyebrow">${TRIP.brand.name} · A Travel Journal</p>
          <h1>${TRIP.title}</h1>
          <p class="hero-sub">${TRIP.subtitle} — ${TRIP.dateRange}</p>
          <p class="hero-quote">“${TRIP.brand.tagline}”</p>
        </div>
      </section>`;

    app.innerHTML = hero + groups.map((g, i) => citySection(g, i)).join("") + `
      <footer class="site-footer">
        <div class="wrap">${TRIP.brand.name} — every reservation, every stop, in one place.</div>
      </footer>`;

    // side rail
    const rail = document.getElementById("cityRail");
    rail.innerHTML = groups.map((g, i) => `<a href="#city-${i}" data-i="${i}">${g.city}</a>`).join("");

    wireResChips();
    wireRail();
  }

  function wireRail() {
    const links = Array.from(document.querySelectorAll("#cityRail a"));
    const sections = Array.from(document.querySelectorAll(".city-section"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sections.indexOf(e.target);
            links.forEach((l) => l.classList.toggle("active", Number(l.dataset.i) === i));
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    links.forEach((l) => l.addEventListener("click", (e) => { e.preventDefault(); document.getElementById(l.getAttribute("href").slice(1)).scrollIntoView({ behavior: "smooth" }); }));
  }

  // -----------------------------------------------------------------
  // Reservation detail sheet
  // -----------------------------------------------------------------
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

  // -----------------------------------------------------------------
  // Reservations / Map quick panels (topbar buttons)
  // -----------------------------------------------------------------
  function openReservationsPanel() {
    const byType = { flight: [], hotel: [], train: [], ferry: [], tour: [] };
    for (const [id, r] of Object.entries(RESERVATIONS)) byType[r.type].push({ id, ...r });
    const labels = { flight: "Flights", hotel: "Hotels", train: "Trains", ferry: "Ferries", tour: "Tours & Experiences" };
    panelBody.innerHTML = `
      <p class="sheet-kicker">Every booking</p>
      <h3 class="sheet-title">Reservations</h3>
      ${Object.entries(byType).filter(([, v]) => v.length).map(([type, items]) => `
        <h4 class="panel-subhead">${labels[type]}</h4>
        <div class="panel-list">
          ${items.map((r) => `
            <button class="boarding-pass restype-${typeGroup(r.type)}" data-res="${r.id}">
              <span class="bp-icon">${iconSvg(r.type)}</span>
              <span class="bp-text"><span class="bp-label">${typeLabel(r.type)}</span><span class="bp-title">${r.title}</span></span>
              <span class="bp-arrow">›</span>
            </button>`).join("")}
        </div>`).join("")}
    `;
    wireResChips();
    panel.showModal();
  }
  function openMapPanel() {
    const rows = [];
    for (const d of DAYS) for (const b of d.blocks) if (b.mapQuery) rows.push({ name: b.title, city: d.city, q: b.mapQuery });
    for (const r of Object.values(RESERVATIONS)) if (r.mapQuery) rows.push({ name: r.title, city: r.city || "", q: r.mapQuery });
    for (const [city, items] of Object.entries(EXPLORE)) for (const p of items) rows.push({ name: p.name, city, q: p.mapQuery });
    const seen = new Set();
    const unique = rows.filter((r) => (seen.has(r.q) ? false : (seen.add(r.q), true)));
    panelBody.innerHTML = `
      <p class="sheet-kicker">${unique.length} places</p>
      <h3 class="sheet-title">Map</h3>
      <div class="panel-list">
        ${unique.map((r) => `
          <a class="map-row" href="${mapsUrl(r.q)}" target="_blank" rel="noopener">
            <span><b>${r.name}</b> — ${r.city}</span><span class="go">Open ↗</span>
          </a>`).join("")}
      </div>`;
    panel.showModal();
  }
  document.getElementById("openReservations").addEventListener("click", openReservationsPanel);
  document.getElementById("openMap").addEventListener("click", openMapPanel);
  document.getElementById("panelClose").addEventListener("click", () => panel.close());
  panel.addEventListener("click", (e) => { if (e.target === panel) panel.close(); });

  render();
})();
