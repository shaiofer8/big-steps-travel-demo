// app.js — Big Steps Travel demo. Static single-page app, no build step,
// no backend: RESERVATIONS/DAYS/EXPLORE/INFO come from data.js (transformed
// from the client's real .docx itinerary). Every place name is a live
// Google Maps search link; every reservation referenced from the day-by-day
// timeline expands inline via the detail sheet — this is the direct answer
// to "all the details related to it available for reference."

(function () {
const { TRIP, RESERVATIONS, DAYS, EXPLORE, INFO } = window.TRIP_DATA;

const app = document.getElementById("app");
const sheet = document.getElementById("detailSheet");
const sheetBody = document.getElementById("sheetBody");

let route = "overview";
let todayIndex = 0; // simulated "today" — index into DAYS

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

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
function iconSvg(name, extra) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra || ""}>${ICONS[name] || ICONS.activity}</svg>`;
}

function typeLabel(t) {
  return { flight: "Flight", hotel: "Hotel", tour: "Tour / Experience", ferry: "Ferry", train: "Train" }[t] || t;
}

// Three-color reservation coding (Steve's ask): blue = hotels, orange =
// planes/boats/trains, green = tours/experiences.
function typeGroup(t) {
  if (t === "hotel") return "hotel";
  if (t === "flight" || t === "train" || t === "ferry") return "transport";
  return "tour";
}

// ---------------------------------------------------------------------------
// Timeline block renderer (shared by Today + Day by Day)
// ---------------------------------------------------------------------------
function renderTlItem(block, isLast) {
  const hasRes = !!block.resId;
  const group = hasRes ? typeGroup(RESERVATIONS[block.resId].type) : "";
  const detailText = block.detail || block.blurb;
  const chip = `
    ${detailText ? `<p class="tl-detail">${detailText}</p>` : ""}
    ${hasRes
      ? `<button class="res-chip restype-${group}" data-res="${block.resId}">
           <span class="tag">${iconSvg(block.icon)}</span>
           View reservation details
         </button>`
      : ""}`;
  const mapLink = block.mapQuery
    ? ` · <a class="sheet-maplink" style="display:inline" href="${mapsUrl(block.mapQuery)}" target="_blank" rel="noopener">Open in Maps ↗</a>`
    : "";
  return `
    <div class="tl-item ${hasRes ? "has-res" : ""}" ${hasRes ? `data-restype="${group}"` : ""}>
      <div class="tl-time mono">${block.time}</div>
      <div class="tl-rail"><div class="tl-dot"></div><div class="tl-line"></div></div>
      <div class="tl-content">
        <div class="tl-title">${iconSvg(block.icon, 'style="width:15px;height:15px;vertical-align:-2px;margin-inline-end:6px;color:var(--ink-mute)"')}${block.title}${mapLink}</div>
        ${chip}
      </div>
    </div>`;
}

// ---------------------------------------------------------------------------
// OVERVIEW (Trip: Overview + Today + Day by Day, one scroll)
// ---------------------------------------------------------------------------
function renderOverview() {
  const day = DAYS[todayIndex];
  const nextBlock = day.blocks[0];

  const heroHtml = `
    <section class="hero">
      <div class="hero-media"><img src="${TRIP.heroImage}" alt=""></div>
      <div class="wrap hero-content">
        <p class="eyebrow">${TRIP.brand.name} · Client Itinerary</p>
        <h1>${TRIP.title}</h1>
        <p class="lede">${TRIP.subtitle} — ${TRIP.dateRange}. Everything you need for the road: flights, hotels, tours and the day-by-day plan, all in one place.</p>
        <div class="hero-stats">
          <div class="hero-stat"><b>${DAYS.length}</b><span>days</span></div>
          <div class="hero-stat"><b>5</b><span>destinations</span></div>
          <div class="hero-stat"><b>${Object.keys(RESERVATIONS).length}</b><span>reservations on file</span></div>
        </div>
        <div class="hero-cities">
          ${["Helsinki", "Tallinn", "Stockholm", "Oslo", "Bergen"].map((c) => `<span class="city-chip">${c}</span>`).join("")}
        </div>
      </div>
    </section>`;

  const todayHtml = `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Today view</p>
          <h2 style="margin-top:8px">What's happening</h2>
        </div>
        <p>Preview any day of the trip as if it were "today" — exactly what a traveler sees mid-trip, without hunting through email or WhatsApp.</p>
      </div>
      <div class="card today-card">
        <div class="today-head">
          <div>
            <div class="today-city">${day.city} — ${day.title}</div>
            <div class="mono" style="color:var(--ink-mute);font-size:.85rem;margin-top:4px">${fmtDate(day.date)} · Day ${todayIndex + 1} of ${DAYS.length}</div>
          </div>
          <div class="day-picker">
            <button id="dayPrev" ${todayIndex === 0 ? "disabled" : ""} aria-label="Previous day">${iconSvg("activity").replace(ICONS.activity, '<path d="M15 6l-6 6 6 6"/>')}</button>
            <select id="daySelect">
              ${DAYS.map((d, i) => `<option value="${i}" ${i === todayIndex ? "selected" : ""}>Day ${i + 1} — ${d.city}</option>`).join("")}
            </select>
            <button id="dayNext" ${todayIndex === DAYS.length - 1 ? "disabled" : ""} aria-label="Next day">${iconSvg("activity").replace(ICONS.activity, '<path d="M9 6l6 6-6 6"/>')}</button>
          </div>
        </div>
        <div class="now-strip">
          <div class="icon">${iconSvg(nextBlock.icon)}</div>
          <div>
            <b>${nextBlock.time} — ${nextBlock.title}</b>
            <span>${day.blocks.length} planned item${day.blocks.length > 1 ? "s" : ""} today · tap any item below for full details</span>
          </div>
        </div>
        <div class="timeline">
          ${day.blocks.map((b, i) => renderTlItem(b, i === day.blocks.length - 1)).join("")}
        </div>
      </div>
    </section>`;

  // City summary card — shown once, on the arrival day of each city stay.
  function citySummaryCard(city) {
    const info = INFO[city];
    if (!info || !info.stay) return "";
    const sites = (EXPLORE[city] || [])
      .map((p) => `<li><a href="${mapsUrl(p.mapQuery)}" target="_blank" rel="noopener"><b>${p.name}</b></a> — ${p.desc}</li>`)
      .join("");
    return `
      <div class="card city-summary">
        ${info.cityImage ? `<div class="city-summary-media"><img src="${info.cityImage}" alt="${city}" loading="lazy"></div>` : ""}
        <div class="city-summary-body">
          <h3>${city}</h3>
          <div class="city-summary-stats">
            <span>${info.stay}</span>
            <span>${info.weather}</span>
            <span>${info.hoursAheadDC}</span>
          </div>
          ${sites ? `<p class="city-summary-label">Sites &amp; things to do</p><ul class="site-list">${sites}</ul>` : ""}
        </div>
      </div>`;
  }

  // Food + Transportation guidance — shown once, at the end of each city stay.
  function cityGuideCard(city) {
    const info = INFO[city];
    if (!info || !(info.food || info.transportTips)) return "";
    const foodHtml = info.food
      ? `<div class="guide-col"><h4>Restaurants · Coffee · Bars</h4><ul class="site-list">${info.food.map((f) => `<li><b>${f.name}</b> — ${f.desc}</li>`).join("")}</ul></div>`
      : "";
    const transportHtml = info.transportTips
      ? `<div class="guide-col"><h4>Transportation</h4><ul class="site-list">${info.transportTips.map((t) => `<li>${t}</li>`).join("")}</ul></div>`
      : "";
    return `
      <div class="card guide-card">
        <p class="eyebrow">Leaving ${city}</p>
        <div class="guide-grid">${foodHtml}${transportHtml}</div>
      </div>`;
  }

  const dayCards = DAYS.map((d, i) => {
    const isArrival = i === 0 || DAYS[i - 1].city !== d.city;
    const isDeparture = i === DAYS.length - 1 || DAYS[i + 1].city !== d.city;
    const summary = isArrival ? citySummaryCard(d.city) : "";
    const guide = isDeparture ? cityGuideCard(d.city) : "";
    return `
      ${summary}
      <div class="card day-card">
        <div class="day-card-head">
          <div class="day-date">${fmtDate(d.date)}</div>
          <div class="day-sub mono">Day ${i + 1} of ${DAYS.length} · ${d.city} — ${d.title}</div>
        </div>
        <div class="timeline" style="margin-top:14px">
          ${d.blocks.map((b) => renderTlItem(b)).join("")}
        </div>
      </div>
      ${guide}`;
  }).join("");

  const daysHtml = `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Full itinerary</p>
          <h2 style="margin-top:8px">Day by Day</h2>
        </div>
        <p>The complete ${DAYS.length}-day plan — every flight, hotel check-in, tour and free afternoon, in order.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:20px">
        ${dayCards}
      </div>
    </section>`;

  app.innerHTML = heroHtml + todayHtml + daysHtml + footerHtml();
  wireTodayControls();
  wireResChips();
}

function wireTodayControls() {
  const sel = document.getElementById("daySelect");
  const prev = document.getElementById("dayPrev");
  const next = document.getElementById("dayNext");
  if (sel) sel.addEventListener("change", () => { todayIndex = Number(sel.value); renderOverview(); });
  if (prev) prev.addEventListener("click", () => { if (todayIndex > 0) { todayIndex--; renderOverview(); } });
  if (next) next.addEventListener("click", () => { if (todayIndex < DAYS.length - 1) { todayIndex++; renderOverview(); } });
}

// ---------------------------------------------------------------------------
// RESERVATIONS
// ---------------------------------------------------------------------------
function renderReservations() {
  const groups = { flight: [], hotel: [], train: [], ferry: [], tour: [] };
  for (const [id, r] of Object.entries(RESERVATIONS)) groups[r.type].push({ id, ...r });

  const groupLabels = { flight: "Flights", hotel: "Hotels", train: "Trains", ferry: "Ferries", tour: "Tours & Experiences" };

  const groupsHtml = Object.entries(groups)
    .filter(([, items]) => items.length)
    .map(
      ([type, items]) => `
      <div class="res-group">
        <h3>${groupLabels[type]} <span class="count">${items.length}</span></h3>
        <div class="res-grid">
          ${items
            .map(
              (r) => `
            <div class="res-card" data-type="${type}" data-restype="${typeGroup(r.type)}" data-res="${r.id}">
              <div class="kicker">${typeLabel(r.type)}${r.conf ? " · " + r.conf : ""}</div>
              <div class="title">${r.title}</div>
              <div class="sub">${r.city ? r.city + " · " : ""}${r.checkIn ? r.checkIn : r.when ? r.when : r.legs ? r.legs[0].depart : ""}</div>
            </div>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");

  app.innerHTML = `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">My Reservations</p>
          <h2 style="margin-top:8px">Every booking, all in one place</h2>
        </div>
        <p>No more digging through email, WhatsApp, or booking sites. Tap any card for the full confirmation.</p>
      </div>
      <div class="res-legend">
        <span><i class="dot" style="background:var(--c-hotel)"></i>Hotels</span>
        <span><i class="dot" style="background:var(--c-transport)"></i>Flights · Trains · Ferries</span>
        <span><i class="dot" style="background:var(--c-tour)"></i>Tours &amp; Experiences</span>
      </div>
      <div class="res-groups">${groupsHtml}</div>
    </section>
    ${footerHtml()}`;

  wireResChips();
}

// ---------------------------------------------------------------------------
// EXPLORE
// ---------------------------------------------------------------------------
function renderExplore() {
  const html = Object.entries(EXPLORE)
    .map(
      ([city, items]) => `
      <div class="explore-city">
        <h3>${city}</h3>
        <div class="explore-grid">
          ${items
            .map(
              (p) => `
            <a class="explore-card" href="${mapsUrl(p.mapQuery)}" target="_blank" rel="noopener">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
              <div class="body">
                <div class="tag">${p.tag}</div>
                <div class="name">${p.name}</div>
                <div class="desc">${p.desc}</div>
                <div class="maplink">Open in Maps ↗</div>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");

  app.innerHTML = `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Explore</p>
          <h2 style="margin-top:8px">Highlights by city</h2>
        </div>
        <p>Curated picks beyond the scheduled plan — every card links straight to Google Maps.</p>
      </div>
      ${html}
    </section>
    ${footerHtml()}`;
}

// ---------------------------------------------------------------------------
// MAP — every place mentioned anywhere in the trip, one clickable list.
// ---------------------------------------------------------------------------
function renderMap() {
  const rows = [];
  for (const d of DAYS) {
    for (const b of d.blocks) {
      if (b.mapQuery) rows.push({ name: b.title, city: d.city, q: b.mapQuery });
    }
  }
  for (const r of Object.values(RESERVATIONS)) {
    if (r.mapQuery) rows.push({ name: r.title, city: r.city || "", q: r.mapQuery });
  }
  for (const [city, items] of Object.entries(EXPLORE)) {
    for (const p of items) rows.push({ name: p.name, city, q: p.mapQuery });
  }
  // de-dupe by query
  const seen = new Set();
  const unique = rows.filter((r) => (seen.has(r.q) ? false : (seen.add(r.q), true)));

  app.innerHTML = `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Map</p>
          <h2 style="margin-top:8px">Every location, one tap to Google Maps</h2>
        </div>
        <p>${unique.length} places from your itinerary — hotels, tours, attractions, meeting points.</p>
      </div>
      <div class="map-list">
        ${unique
          .map(
            (r) => `
          <a class="map-row" href="${mapsUrl(r.q)}" target="_blank" rel="noopener">
            <span>
              <span class="name">${r.name}</span>
              <span class="city"> — ${r.city}</span>
            </span>
            <span class="go">Open ↗</span>
          </a>`
          )
          .join("")}
      </div>
    </section>
    ${footerHtml()}`;
}

// ---------------------------------------------------------------------------
// IMPORTANT INFO
// ---------------------------------------------------------------------------
function renderInfo() {
  const cards = Object.entries(INFO)
    .map(
      ([city, i]) => `
      <div class="info-card">
        <h3>${city}</h3>
        <div class="info-row"><span class="k">Currency</span><span class="v">${i.currency}</span></div>
        ${i.greeting ? `<div class="info-row"><span class="k">Greeting</span><span class="v">${i.greeting}</span></div>` : ""}
        <div class="info-row"><span class="k">Weather</span><span class="v">${i.weather}</span></div>
        <div class="info-row"><span class="k">Transport</span><span class="v">${i.transport}</span></div>
        <div class="info-row"><span class="k">Good to know</span><span class="v">${i.tips}</span></div>
      </div>`
    )
    .join("");

  app.innerHTML = `
    <section class="section wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Important Information</p>
          <h2 style="margin-top:8px">Currency, transport & local tips</h2>
        </div>
        <p>Everything practical, organized by city — no more scrolling through old emails mid-trip.</p>
      </div>
      <div class="info-grid">${cards}</div>
    </section>
    ${footerHtml()}`;
}

// ---------------------------------------------------------------------------
// DETAIL SHEET
// ---------------------------------------------------------------------------
function openReservation(id) {
  const r = RESERVATIONS[id];
  if (!r) return;

  let legsHtml = "";
  if (r.legs) {
    legsHtml = `<div class="sheet-legs">${r.legs
      .map(
        (l) => `
      <div class="sheet-leg">
        <div class="route">${l.from} → ${l.to}${l.flight ? " · " + l.flight : ""}</div>
        <div class="times mono">${l.depart}${l.arrive ? " → " + l.arrive : ""}${l.seats ? " · Seats " + l.seats : ""}</div>
      </div>`
      )
      .join("")}</div>`;
  }

  let fieldsHtml = "";
  const fields = [];
  if (r.room) fields.push(["Room", r.room]);
  if (r.checkIn) fields.push(["Check-in", r.checkIn]);
  if (r.checkOut) fields.push(["Check-out", r.checkOut]);
  if (r.contact) fields.push(["Contact", r.contact]);
  if (r.carrier) fields.push(["Provider", r.carrier]);
  if (r.when) fields.push(["When", r.when]);
  if (r.price) fields.push(["Price", r.price]);
  if (fields.length) {
    fieldsHtml = `<div class="sheet-fields">${fields.map(([k, v]) => `<div class="sheet-field"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("")}</div>`;
  }

  sheetBody.innerHTML = `
    <p class="sheet-kicker">${typeLabel(r.type)}</p>
    <h3 class="sheet-title">${r.title}</h3>
    ${r.conf ? `<p class="sheet-conf">Confirmation: ${r.conf}</p>` : ""}
    ${legsHtml}
    ${fieldsHtml}
    ${r.notes ? `<p class="sheet-notes">${r.notes}</p>` : ""}
    ${r.mapQuery ? `<a class="sheet-maplink" href="${mapsUrl(r.mapQuery)}" target="_blank" rel="noopener">Open in Google Maps ↗</a>` : ""}
  `;
  sheet.showModal();
}

function wireResChips() {
  document.querySelectorAll("[data-res]").forEach((el) => {
    el.addEventListener("click", () => openReservation(el.getAttribute("data-res")));
  });
}

document.getElementById("sheetClose").addEventListener("click", () => sheet.close());
sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.close(); });

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
function footerHtml() {
  return `
    <footer>
      <div class="wrap footer-row">
        <span class="footer-brand">
          <span class="logo-mark">${iconSvg("activity").replace(ICONS.activity, '<rect x="1" y="1" width="22" height="22" rx="6" fill="var(--ink)"/><path d="M6 16 L11 16 L11 12 L15 12 L15 8 L18 8" stroke="var(--paper)" stroke-width="2.4" fill="none"/>')}</span>
          ${TRIP.brand.name}
        </span>
        <span>${TRIP.brand.tagline}</span>
      </div>
    </footer>`;
}

// ---------------------------------------------------------------------------
// ROUTING
// ---------------------------------------------------------------------------
const ROUTES = { overview: renderOverview, reservations: renderReservations, explore: renderExplore, map: renderMap, info: renderInfo };

function navigate(name) {
  route = name;
  ROUTES[name]();
  document.querySelectorAll("[data-nav]").forEach((el) => el.classList.toggle("active", el.getAttribute("data-nav") === name));
  document.getElementById("mobileNav").hidden = true;
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    navigate(el.getAttribute("data-nav"));
  });
});

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
menuToggle.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
});

navigate("overview");
})();
