/* Woodlands Galaxy Night-Sky — SINGLE SOURCE OF TRUTH for the observing site.
 *
 * This is the ONE file to edit to re-point the whole app to a different
 * observatory: coordinates, venue name, air-quality region, weather forecast
 * area, session times, social link and the telescope fleet all live here.
 *
 * Consumed at runtime by:
 *   - astro-core.js        (reads window.SITE_CONFIG.LAT/LON if present)
 *   - scob-dashboard-v3.html (coords, NEA PSI region, 2-hr forecast area, fleet run-sheet)
 *   - version.js           (footer venue + copyright)
 *   - companion pages       (venue label, social link)
 *
 * Static display strings baked into each page's HTML (titles, <h1>, the
 * "location" line under the header) mirror these values — keep them in sync.
 *
 * Load order matters: include this BEFORE astro-core.js on every page.
 */
window.SITE_CONFIG = {
  // --- Observing site -------------------------------------------------------
  LAT: 1.43901,            // Andromeda Observatory, Woodlands Galaxy CC (OneMap, postal 738991)
  LON: 103.80266,
  ELEV_M: 15,

  // --- Identity / branding --------------------------------------------------
  SITE_NAME:   'Woodlands Galaxy Night-Sky',   // full product name (titles, footer)
  APP_SHORT:   'Woodlands Galaxy',             // PWA short name / home-screen label
  VENUE:       'Andromeda Observatory, Woodlands Galaxy CC',  // the "location" line
  VENUE_SHORT: 'Andromeda Observatory',
  COPYRIGHT:   '© 2026 Woodlands Galaxy Night-Sky',   // footer credit — edit to taste

  // --- Session --------------------------------------------------------------
  SESSION_DAY:   'Fri',
  SESSION_START: '7:30',   // pm SGT
  SESSION_END:   '9:30',   // pm SGT  (SCOB ran to 10:00; Woodlands Galaxy CC runs 7:30–9:30)
  SESSION_LABEL: 'session Fri 7:30–9:30 pm',

  // --- Singapore live-data feeds -------------------------------------------
  NEA_PSI_REGION: 'north',                         // Woodlands sits in NEA's NORTH region
  FORECAST_AREAS: ['Woodlands', 'Sembawang', 'Yishun'],  // 2-hr forecast area, nearest first
  BORTLE_DEFAULT: 8,
  BORTLE_LABEL:   'city (Woodlands)',

  // --- Links ----------------------------------------------------------------
  SOCIAL_URL:   'https://www.facebook.com/AndromedaObservatory/',
  SOCIAL_LABEL: 'Andromeda Observatory Facebook',

  // --- Telescope fleet ------------------------------------------------------
  // PENDING: real Andromeda Observatory fleet to be supplied by the observatory.
  // Placeholder mirrors what public sources confirm (30 cm dome scope + rooftop
  // portables). Replace with confirmed makes / apertures / mounts.
  FLEET: {
    dome: [
      { name: 'Andromeda dome scope', aperture: '30 cm (12")', type: 'reflector', note: 'CONFIRM — main dome instrument' }
    ],
    portable: [
      { name: 'Rooftop portable scopes', aperture: 'varies', type: 'varies', note: 'CONFIRM — units set up on the rooftop for public sessions' }
    ]
  }
};
