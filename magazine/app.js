// magazine/app.js — Option 3: a new concept. One continuous, photo-led
// journal instead of an app-with-tabs — city by city, with reservations
// woven in as "boarding pass" tickets right where they happen.
(function () {
  const { TRIP, RESERVATIONS, DAYS, EXPLORE, INFO, COUNTRIES, COUNTRY_FLAGS } = window.TRIP_DATA;

  const app = document.getElementById("app");
  const sheet = document.getElementById("detailSheet");
  const sheetBody = document.getElementById("sheetBody");
  const panel = document.getElementById("panel");
  const panelBody = document.getElementById("panelBody");

  // B1: logo removed temporarily — PNG not yet in assets; no fallback text shown.

  // Display-only renaming for the two synthetic travel-day groups (Steve's
  // ask: "In Flight" -> "Departure", "Departure" -> "Return"). The underlying
  // data keys (group.city) are left as-is so classic/ and the root demo,
  // which share this same data.js, are unaffected.
  function displayCity(city) {
    if (city === "In Flight") return "Departure";
    if (city === "Departure") return "Return";
    return city;
  }

  function mapsUrl(q) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`; }
  function tripadvisorUrl(q) { return `https://www.tripadvisor.com/Search?q=${encodeURIComponent(q)}`; }
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
  // Group DAYS into contiguous city stays, in order. Each entry keeps its
  // original DAYS index (globalIndex) so we can render "Trip - day X of N"
  // alongside "City - day X of N" (Steve's countdown-line ask).
  // -----------------------------------------------------------------
  const groups = [];
  DAYS.forEach((d, i) => {
    const prev = groups[groups.length - 1];
    if (prev && prev.city === d.city) prev.days.push({ day: d, globalIndex: i });
    else groups.push({ city: d.city, days: [{ day: d, globalIndex: i }] });
  });

  function ticket(block) {
    const mapLink = block.mapQuery ? `<a class="plan-maplink" href="${mapsUrl(block.mapQuery)}" target="_blank" rel="noopener">Open in Maps ↗</a>` : "";
    if (!block.resId) {
      return `${block.detail ? `<p class="plan-detail">${block.detail}</p>` : ""}${mapLink}`;
    }
    const r = RESERVATIONS[block.resId];
    const group = typeGroup(r.type);
    return `
      ${block.blurb ? `<p class="plan-detail">${block.blurb}</p>` : ""}
      <button class="boarding-pass restype-${group}" data-res="${block.resId}">
        <span class="bp-icon">${iconSvg(block.icon)}</span>
        <span class="bp-text">
          <span class="bp-label">${typeLabel(r.type)}</span>
          <span class="bp-title">${r.title}</span>
        </span>
        <span class="bp-arrow">›</span>
      </button>`;
  }

  // F11: generic time-of-day labels → bullet point (Steve Sep 3 item 7)
  const GENERIC_TIMES = new Set([
    "Morning","Afternoon","Late Afternoon","Evening","Night",
    "All day","All Day","Day","Midday","Noon","TBD",""
  ]);

  function planRow(block) {
    const hasRes = !!block.resId;
    const group = hasRes ? typeGroup(RESERVATIONS[block.resId].type) : "";
    // F11: show "•" for items without a precise clock time
    const timeDisplay = (!block.time || GENERIC_TIMES.has(block.time.trim())) ? "•" : block.time;
    return `
      <div class="plan-row ${hasRes ? "restype-" + group : ""}">
        <div class="plan-time mono">${timeDisplay}</div>
        <div class="plan-main">
          <div class="plan-title">${block.title}</div>
          ${ticket(block)}
        </div>
      </div>`;
  }

  // F12: shared tile builder — <div> not <a>, includes Maps + TripAdvisor links (Steve Sep 3 item 8)
  function siteTile(p, city) {
    return `<div class="site-tile">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <span class="tag">${p.tag}</span>
      <span class="name">${p.name}</span>
      <span class="desc">${p.desc}</span>
      <span class="tile-links">
        <a href="${mapsUrl(p.mapQuery)}" target="_blank" rel="noopener">Maps</a> ·
        <a href="${tripadvisorUrl(p.name + ", " + city)}" target="_blank" rel="noopener">TripAdvisor</a>
      </span>
    </div>`;
  }

  function citySection(group, idx) {
    const info = INFO[group.city] || {};
    const allExplore = EXPLORE[group.city] || [];
    const img = info.cityImage || (allExplore[0] && allExplore[0].img) || TRIP.heroImage;
    const anchor = `city-${idx}`;
    const cityLabel = displayCity(group.city);
    const country = COUNTRIES[group.city];

    const badges = info.stay
      ? `<div class="city-badges"><span>${info.stay}</span><span>${info.weather}</span>${info.hoursAheadDC ? `<span>${info.hoursAheadDC}</span>` : ""}</div>`
      : `<div class="city-badges"><span>Travel day</span>${info.weather ? `<span>${info.weather}</span>` : ""}</div>`;

    // F1 + F2: day loop — inline links + inline day-assigned EXPLORE tiles
    const planHtml = group.days.map((entry, ci) => {
      const d = entry.day;
      const countdown = `${cityLabel} – day ${ci + 1} of ${group.days.length} · Trip – day ${entry.globalIndex + 1} of ${DAYS.length}`;

      // F1: day-level links rendered at point of use
      const dayLinksHtml = (d.links || []).length
        ? `<div class="day-links-bar">${d.links.map(l =>
            `<a class="day-link" href="${l.url}" target="_blank" rel="noopener">🔗 ${l.label}</a>`
          ).join("")}</div>`
        : "";

      // F2: inline tiles for activities assigned to this specific day (F12: use siteTile with Maps+TA)
      const dayTiles = allExplore.filter(e => e.day === d.date);
      const dayTilesHtml = dayTiles.length
        ? `<div class="site-grid site-grid--inline">${dayTiles.map(p => siteTile(p, group.city)).join("")}</div>`
        : "";

      return `
      <div class="plan-day">
        <div class="plan-day-head"><span class="plan-date">${fmtDate(d.date)}</span><span class="plan-day-title">${d.title}</span></div>
        <div class="plan-countdown mono">${countdown}</div>
        ${d.blocks.map((b) => planRow(b)).join("")}
        ${dayLinksHtml}
        ${dayTilesHtml}
      </div>`;
    }).join("");

    // F6+F12: EXPLORE tiles without day — NO heading (Steve Sep 3 item 8), uses siteTile with Maps+TA
    const addonTiles = allExplore.filter(e => !e.day);
    const addonSection = addonTiles.length
      ? `<div class="site-grid">${addonTiles.map(p => siteTile(p, group.city)).join("")}</div>`
      : "";

    // F7: food with cuisine label pill + local food heading dynamic "Taste of [Country]" (F7-update)
    const localFoodHtml = (info.localFood || []).length
      ? `<div class="local-food-section"><h5 class="local-food-heading">🍽 Taste of ${COUNTRIES[group.city] || group.city}</h5><ul class="local-food-list">${
          (info.localFood || []).map(lf =>
            `<li><b>${lf.name}</b>${lf.desc ? ` — ${lf.desc}` : ""}</li>`
          ).join("")
        }</ul></div>`
      : "";
    const foodCol = info.food ? `
      <div class="guide-col">
        <h4>Food &amp; Drink</h4>
        <ul>${info.food.map((f) => `
          <li>
            ${f.cuisine ? `<span class="food-cuisine">${f.cuisine}</span> ` : ""}<b>${f.name}</b>${f.desc ? ` — ${f.desc}` : ""}
            <span class="food-links"><a href="${mapsUrl(f.name + ", " + group.city)}" target="_blank" rel="noopener">Maps</a> · <a href="${tripadvisorUrl(f.name + " " + group.city)}" target="_blank" rel="noopener">TripAdvisor</a></span>
          </li>`).join("")}</ul>
        ${localFoodHtml}
      </div>` : "";

    // F8: transportLinks (clickable URLs) + transportTips (plain text)
    const transportLinksHtml = (info.transportLinks || []).map(l =>
      `<li><a class="transport-link" href="${l.url}" target="_blank" rel="noopener">🔗 ${l.label}</a></li>`
    ).join("");
    const transportCol = (info.transportTips || info.transportLinks) ? `
      <div class="guide-col">
        <h4>Getting Around</h4>
        <ul>
          ${(info.transportTips || []).map((t) => `<li>${t}</li>`).join("")}
          ${transportLinksHtml}
        </ul>
      </div>` : "";

    return `
      <section class="city-section" id="${anchor}" data-city="${group.city}">
        <div class="city-band">
          <img src="${img}" alt="${group.city}" loading="lazy">
          <div class="city-band-fade"></div>
          <div class="wrap city-band-content">
            <p class="city-eyebrow">Stop ${idx + 1} of ${groups.length}</p>
            <h2>${cityLabel}${country ? `<span class="city-country-inline">, ${country}</span>` : ""}</h2>
            ${badges}
          </div>
        </div>
        <div class="wrap city-body">
          <h3 class="section-label">The Plan</h3>
          <div class="plan">${planHtml}</div>

          ${addonSection}

          ${(foodCol || transportCol) ? `<h3 class="section-label">Tips &amp; General Guidance</h3><div class="guide-grid">${foodCol}${transportCol}</div>` : ""}
        </div>
      </section>`;
  }

  function render() {
    // Countries visited, in first-appearance order, each with its flag —
    // Steve's ask: "countries being visited with the country flags right
    // after the names."
    const seenCountries = [];
    groups.forEach((g) => {
      const c = COUNTRIES[g.city];
      if (c && !seenCountries.includes(c)) seenCountries.push(c);
    });
    const countriesLine = seenCountries.map((c) => `${c} ${COUNTRY_FLAGS[c] || ""}`).join(" · ");

    const hero = `
      <section class="hero">
        <img src="${TRIP.heroImage}" alt="" aria-hidden="true" class="hero-img">
        <div class="hero-fade"></div>
        <div class="wrap hero-content">

          <p class="hero-slogan">${TRIP.brand.tagline}</p>
          <div class="hero-heading">
            <div class="hero-client-name">${TRIP.clientName}</div>
            <div class="hero-trip-name">${TRIP.tripName}</div>
            <div class="hero-journal-label">${TRIP.journalLabel}</div>
          </div>
          <p class="hero-dates">${TRIP.dateRange}</p>
          <p class="hero-countries">${countriesLine}</p>
        </div>
      </section>`;

    app.innerHTML = hero + groups.map((g, i) => citySection(g, i)).join("") + `
      <footer class="site-footer">
        <div class="wrap">${TRIP.brand.name} — every reservation, every stop, in one place.</div>
      </footer>`;

    // C3+C4: side rail with heading "Click for Quick Search" + action buttons below Return
    const rail = document.getElementById("cityRail");
    rail.innerHTML = `
      <h4 class="rail-heading">Click for Quick Search</h4>
      ${groups.map((g, i) => `<a href="#city-${i}" data-i="${i}">${displayCity(g.city)}</a>`).join("")}
      <div class="rail-actions">
        <button class="rail-btn rail-btn--primary" id="openReservationsRail">📋 Reservation Links/Info</button>
        <button class="rail-btn rail-btn--secondary" id="openMapRail">🗺️ Google Map Links</button>
      </div>`;

    document.getElementById("openReservationsRail").addEventListener("click", openReservationsPanel);
    document.getElementById("openMapRail").addEventListener("click", openMapPanel);

    // C5: mobile bottom bar — fixed to viewport bottom, scrollable city chips + action buttons
    let mobileBar = document.getElementById("mobile-bar");
    if (!mobileBar) {
      mobileBar = document.createElement("nav");
      mobileBar.id = "mobile-bar";
      mobileBar.setAttribute("aria-label", "City navigation");
      document.body.appendChild(mobileBar);
    }
    // Real destination cities first, then travel days (dimmed) at end
    const travelDays = ["In Flight", "Departure"];
    const chipsSorted = [
      ...groups.filter(g => !travelDays.includes(g.city)).map((g, _i) => ({ g, i: groups.indexOf(g) })),
      ...groups.filter(g => travelDays.includes(g.city)).map((g, _i) => ({ g, i: groups.indexOf(g) })),
    ];
    mobileBar.innerHTML = `
      <div class="mobile-bar-chips">
        ${chipsSorted.map(({ g, i }) => {
            const isTravel = travelDays.includes(g.city);
            return `<a class="mobile-chip${isTravel ? " mobile-chip--travel" : ""}" href="#city-${i}">${displayCity(g.city)}</a>`;
          }).join("")}
      </div>
      <div class="mobile-bar-actions">
        <button class="rail-btn rail-btn--primary" id="openReservationsMobile">📋 Reservations</button>
        <button class="rail-btn rail-btn--secondary" id="openMapMobile">🗺️ Map</button>
      </div>`;
    document.getElementById("openReservationsMobile").addEventListener("click", openReservationsPanel);
    document.getElementById("openMapMobile").addEventListener("click", openMapPanel);

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
  // openReservations/openMap buttons now live inside the rendered content
  // (moved below the Return section per Steve's ask), so their listeners
  // are wired inside render() instead of here at load time.
  document.getElementById("panelClose").addEventListener("click", () => panel.close());
  panel.addEventListener("click", (e) => { if (e.target === panel) panel.close(); });

  render();

  // B6: Twemoji — parse flag emoji in hero and city badges as SVG images (Windows Chrome has no flag font)
  if (window.twemoji) {
    document.querySelectorAll('.hero-countries, .city-badges').forEach(function(el) {
      twemoji.parse(el, { folder: 'svg', ext: '.svg' });
    });
  }
})();
