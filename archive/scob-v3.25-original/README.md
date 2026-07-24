# SCOB Night-Sky Dashboard — Singapore Science Centre Observatory

A single-file web app for planning the Friday-night stargazing sessions at the Science Centre Observatory (SCOB), Singapore (1.3342° N, 103.7357° E). Everything — moon, planets, deep-sky target altitudes, sky map, sunset/twilight times — is computed on-device, so the page works offline; only the live weather forecast needs a connection.

**File to open or host: `scob-dashboard-v3.html`** — the single canonical file. `scob-dashboard.html` and `main.html` are now just redirect stubs to it (for anyone who installed the PWA from those URLs); all older versions live in `archive/`.

## Features

### Date & time planning
- Defaults to the **next Friday, 8:30 pm SGT** (session night), with a live countdown to the chosen moment.
- Date picker, time picker, and a drag **time slider** to scrub through the night; **● Now** and **↺ Next Fri** shortcuts.
- Flags whether the chosen date is a Friday session night.

### Tonight at a glance *(v3)*
- One-line **go / no-go verdict** combining the live forecast and sky darkness.
- Chips for **sunset, fully-dark (astronomical twilight end), sunrise**, moon % and altitude, **best planet**, and the **top deep-sky target** right now.

### Sky map
- All-sky "looking up" chart (N top, E left) with planets, Moon, Sun, deep-sky targets, and 17 constellation stick figures (tap the map to toggle them).
- Hover / tap any object for an illustrated tooltip explaining what it is.

### Moon
- Phase name, % illuminated, graphical disc, rise/set times, and practical notes on how much moonlight will wash out faint targets.

### Solar system
- Sun, Moon, and all seven planets: altitude, compass direction, magnitude, and a visibility verdict (naked eye / binoculars / scope / twilight / below horizon).

### Deep-sky targets
- Messier + Caldwell selection ranked by altitude, with magnitude, compass direction, and **Moon separation** for each.
- Two modes, remembered between visits:
  - **👁 Visual** — eyepiece verdicts (Excellent / Good / Low / Washed out under a bright Moon).
  - **📷 Seestar S30 Pro** — imaging verdicts that account for the dual-band Hα/OIII filter (emission nebulae stay imageable under moonlight; broadband galaxies flagged for dark weeks).

### Weather — go / no-go
- **Auto-loading live forecast** (Open-Meteo) for the chosen date & time: cloud cover, rain chance, temperature, humidity, wind, and a GO / CAUTION / NO-GO verdict. *(auto-load: v3)*
- **Evening cloud timeline** *(v3)* — hour-by-hour bars from 6 pm to 11 pm with the **clearest observing window highlighted**.
- Seasonal monsoon guidance for dates beyond the ~16-day forecast window, plus quick links to the **MSS 2-hr Nowcast** and SCOB Facebook for the on-the-night call.

### Special events *(v3.2)*
- Verified 2026–27 calendar of **meteor showers, eclipses, oppositions, elongations & supermoons**, flagged for the 3 weeks after the chosen date, with Singapore-visibility notes (events not visible from SG are dimmed). Works fully offline; the chosen night's event also appears as a glance chip.

### ISS passes *(v3.2)*
- Evening (7–11 pm) **ISS pass predictions** computed on-device from a CelesTrak TLE (cached in the browser, refreshed every ~3 days when online) via satellite.js — rise/peak/set times, direction, max altitude, and whether the pass is sunlit (visible) or in Earth's shadow. Best visible pass shows as a glance chip.

### Haze / PSI *(v3.2)*
- **Live NEA 24-h PSI (west region)** in the weather card with a transparency note — Good / Moderate / Unhealthy.

### Session run-sheet *(v3.2)*
- Auto-generated **per-instrument plan at 7:30 / 8:30 / 9:30 pm**: Moon → deck CPC/C6, best planets → 40 cm & 11" domes, globulars/clusters → 40 cm + 6" apo, emission nebulae → Seestar S30 dual-band.

### 📄 Briefing *(v3.2)*
- One tap builds a **print-friendly weekly briefing** (glance verdict, weather, Moon, planets, top-10 targets, events, ISS, run-sheet, sources) — print or save as PDF straight from the browser.

### 🌕 Tonight on the Moon *(v3.3)*
A dedicated page, **`moon-tonight.html`** (linked from the Moon card and the footer):

- Drawn **Moon disc with the computed terminator**, maria and craters, for 8:30 pm on any chosen date.
- **"On the terminator tonight"** — craters, rilles, scarps & mountain ranges within ~13° of the sunrise/sunset line, ranked, with one-line docent descriptions and scope tips (35-feature IAU/USGS-based catalogue, incl. Tranquility Base).
- Full-Moon nights switch automatically to the **ray systems** story (Tycho, Copernicus, Kepler, Aristarchus); New-Moon nights point back to deep-sky.
- Phase, age, colongitude, rise/set and an **up-during-session verdict**; earthshine tip on thin crescents; night mode; cached offline.

### Jupiter & Saturn eyepiece detail *(v3.3)*
- **Galilean moon positions** drawn to scale for the chosen time, flagging transits/occultations.
- **Great Red Spot meridian-crossing times** for the evening (Meeus CM series + JUPOS drift trend).
- **Saturn ring tilt** computed on-device with an opening/edge-on interpretation.

### Double & carbon stars *(v3.3)*
- 18 moon-proof showpieces (Albireo, α Cen, Acrux, the Double-Double, La Superba, DY Crucis…) with mags, separations, colours and altitude-ranked verdicts — the go-to list when moonlight washes out the fuzzies.

### Conjunction finder *(v3.3)*
- **Moon–planet (<5°) and planet–planet (<2.5°) pairings computed on-device** for 8:30 pm over the 3 weeks after the chosen date — no longer limited to the static events calendar. Tonight's pairing appears as a glance chip.

### Rain radar *(v3.3)*
- **Live MSS 50-km rain-radar image** embedded in the weather card (5-min timestamps, auto-fallback), alongside the existing forecast, cloud timeline and PSI.

### Satellite passes *(v3.3, upgrades v3.2 ISS)*
- Evening passes now cover the **ISS, Tiangong and Hubble** (CelesTrak TLEs, computed on-device), labelled per satellite with visibility flags.

### Telescope fleet reference
- SCOB main dome 40 cm (16") Cassegrain + 15 cm (6") apo, second dome 11" + 7", deck Celestron CPC (8"–11") + C6 — with tips on which instrument suits which target class.

### Telescope guide page *(v3.1)*
A companion page, **`telescope-types.html`**, cross-linked with the dashboard (button in the dashboard footer; back-links in the guide's header and footer):

- **Five optical designs with animated light paths** — refractor, Newtonian reflector, classical Cassegrain, Schmidt-Cassegrain and Maksutov-Cassegrain — each SVG shows photons travelling through the lenses/mirrors and notes which SCOB instrument uses that design.
- **Four mount types with animated illustrations** — alt-azimuth GoTo fork (CPC), Dobsonian, German equatorial, and the English yoke carrying the 40 cm main scope — with typical makes and usage.
- **DSO tracking explainer** — animated comparison of equatorial (one axis at 15°/hr) vs alt-az GoTo (both axes recomputed every second) tracking, including field rotation and the Singapore quirk of a celestial pole on the horizon.
- **Magnification calculator** — magnification = focal length ÷ eyepiece, with one-tap presets for the whole SCOB fleet, f-ratio, exit pupil, max/min useful magnification warnings, and a live table of common eyepieces.
- Same **Auto / Desktop / Mobile** switcher as the dashboard (shares the saved choice) and cached by the service worker for offline use.

### App conveniences
- **Desktop and mobile layouts** in one file, auto-detected (manual override available).
- **Night mode** (red-tinted, dark-adaptation friendly), remembered between visits.
- Installable as a **home-screen / PWA app** (`manifest.webmanifest`, `sw.js`, icons — see `INSTALL-as-app.md`).

## Version history

| Version | Files | What changed |
|---|---|---|
| **v1** | `scob-dashboard-desktop_WO_Weather_Old_Version.html`, `scob-dashboard-mobile_WO_Weather_Old_Version.html` | Original release: separate desktop & mobile pages. Sky map, moon, solar system, deep-sky targets with Visual/Seestar verdicts, seasonal weather notes only (no live forecast). |
| **v2** | `scob-dashboard-desktop.html`, `scob-dashboard-mobile.html` | Added **live weather**: button-triggered Open-Meteo forecast for the chosen date & time with a GO / CAUTION / NO-GO verdict. |
| **v2.1** | `scob-dashboard.html`, `main.html` | Merged desktop + mobile into **one auto-detecting file** with a manual view switcher; added **PWA support** (installable, offline service worker). |
| **v3** | `scob-dashboard-v3.html` | Added: **auto-loading weather** (fetches on open and on date change, cached, button now just refreshes) · **evening cloud timeline** (6–11 pm hourly bars, clearest window highlighted) · **sunset / fully-dark / sunrise times** computed on-device · **tonight-at-a-glance summary card** (verdict + moon + best planet + top target). |
| **v3.1** | `telescope-types.html`, `scob-dashboard-v3.html`, `sw.js` | Added the **telescope guide page** (animated optics for 5 telescope types, 4 mount types, DSO-tracking explainer, magnification calculator with SCOB fleet presets) · **cross-links** between dashboard footer and guide · guide added to the **offline cache** (`sw.js` → `scob-sky-v5`). |
| **v3.2** | `scob-dashboard-v3.html`, `sw.js`, `archive/` | Mobile: **slim sticky header** (compact date/time/slider bar) · **special-events calendar 2026–27** (showers, eclipses, oppositions — SG-visibility flagged) · **ISS evening pass predictions** (CelesTrak TLE + satellite.js, on-device) · **live NEA PSI/haze** in the weather card · **auto session run-sheet** per instrument at 7:30/8:30/9:30 pm · **📄 printable briefing** · data-source credits in the footer · old entry points archived, `main.html`/`scob-dashboard.html` now redirect · cache → `scob-sky-v6`. |
| **v3.3** | `moon-tonight.html`, `scob-dashboard-v3.html`, `sw.js` | Added: **Tonight on the Moon page** (computed terminator + feature guide, cross-linked) · **Jupiter/Saturn eyepiece detail** (Galilean moons, GRS transit times, ring tilt) · **double & carbon star list** (18 moon-proof targets) · **on-device conjunction finder** (Moon–planet & planet–planet, 3 weeks ahead) · **embedded MSS rain radar** in the weather card · **Tiangong & Hubble passes** alongside the ISS · briefing includes all new sections · cache → `scob-sky-v7`. |
| **v3.4** | `tracking-methods.html`, `scob-dashboard-v3.html`, `sw.js` | **Single shared script** — the duplicated desktop/mobile script blocks merged into one `sharedScript` (layout detected at runtime; halves maintenance) · **in-page MSS 2-hr Nowcast** (Jurong East, data.gov.sg) in the weather card · **sky map embedded in the printable briefing** · **auto night mode** (red theme switches on after sunset until manually overridden) · new **tracking & alignment methods page** (Celestron SkyAlign / 1-star / 2-star / Auto 2-star / Solar System / ASPA, tracking rates, SCOB mount comparison), cross-linked & cached · cache → `scob-sky-v8`. |
| **v3.5** | `tracking-methods.html`, plus version-footer bump across `main.html`, `scob-dashboard.html`, `scob-dashboard-v3.html`, `moon-tonight.html`, `telescope-types.html`, `sw.js` | **Removed StarSense AutoAlign** from the tracking & alignment methods page — SCOB has no StarSense module in its Celestron collection, so it's no longer listed as an alignment method (method card, at-a-glance table, meta description and source credit all scrubbed; plate-solving still explained generically for the Seestar) · site-wide version footer synced to **v3.5** · cache → `scob-sky-v9`. |
| **v3.6** | `version.js` (new), `check-release.sh` (new), all pages, `sw.js` | **Single source of truth for the version** — new `version.js` holds one `SCOB_VERSION` constant and injects the `SCOB Night-Sky vX.Y · © AFBOOSTER.cc` footer into every page at runtime (via a `.scob-version` placeholder), so a release now means editing **one** number instead of ~10 (also retires the twin-script-block footer duplication) · **`check-release.sh` pre-flight script** — verifies version parity, that every page loads `version.js`, that `sw.js` caches all pages + `version.js`, that the README marks the current version, and that internal links resolve · **dated review marker** on the Jupiter GRS longitude constant (`REVIEW BY 2027-01-01`) so the drift fit gets re-checked before it silently goes stale · cache → `scob-sky-v10`. |
| **v3.7** | `scob-dashboard-v3.html`, `version.js`, `sw.js` | Five observing upgrades: **seeing & transparency** in the weather card (7Timer! astro forecast when online, with an offline estimate from the loaded Open-Meteo data as fallback) · **light-pollution-honest deep-sky verdicts** — a Bortle selector (default Bortle 8, typical Jurong) trims faint galaxies/nebulae the city sky won't actually show · **per-target observing windows** — each target shows when it's above 25° during the session and its best time, not just the current altitude · **live "Now" session screen** — a full-screen, auto-refreshing, red-mode-friendly view giving the best target per instrument at the current minute, for use at the eyepiece · **data-health strip** — surfaces forecast age, orbital-element (TLE) age and the GRS review-by date so stale inputs are visible · **compact, collapsible lists** — the deep-sky targets and the double/carbon stars now preview the top 5 (ranked easiest-to-hardest) with a "Show all / Show fewer" toggle, remembered per list, so the page stays short to scroll. Sources for the new feeds credited in every footer (seeing/transparency — 7Timer!; light-pollution realism — Bortle scale). cache → `scob-sky-v11`. |
| **v3.8** | `scob-dashboard-v3.html`, `version.js`, `sw.js` | **Tap-to-locate on the sky map** — clicking any object highlights it on the all-sky chart with a pulsing gold ring + label, scrolls the map into view, and shows a locator note ("42° up in the SE"), with a graceful "below the map / not dark yet" message when it can't be plotted. The highlight follows the object as you scrub the time slider. Works from the **deep-sky targets list, the Solar-System table (planets, Moon, Sun) and the double/carbon-star list**. cache → `scob-sky-v12`. |
| **v3.9** | `astro-core.js` (new), `tonights-tour.html` (new), `sky-finder.html` (new), `eyepiece-fov.html` (new), `scob-dashboard-v3.html`, `sw.js` | Three new companion pages plus a dashboard add-on: **`tonights-tour.html`** — an auto-generated, printable docent tour that lists what to show the public *in order* with plain-language talking points and the right SCOB scope for each object; **`sky-finder.html`** — a "point-your-phone" finder that uses the device compass to steer you to a chosen showpiece (with a text direction/altitude fallback for phones without sensors); **`eyepiece-fov.html`** — an eyepiece/field-of-view calculator that frames a target to scale for any SCOB scope + eyepiece (magnification, true field, exit pupil, useful-magnification warnings). On the **dashboard**, an optional **satellite-track overlay** draws tonight's ISS/Tiangong/Hubble pass arcs on the sky map (toggle, off by default). A new shared **`astro-core.js`** engine (Schlyter position math, validated arc-minute-accurate against an independent NOAA computation) powers the tour & finder so there's one engine to maintain. cache → `scob-sky-v13`. |
| **v3.10** | `kiosk.html` (new), `scob-dashboard-v3.html`, `version.js`, `sw.js` | **`kiosk.html`** — a full-screen, auto-refreshing visitor display for the observatory: a live clock, the sky state (daytime / twilight / dark), the Moon phase, and the top few objects up *right now* in plain language, plus a big **QR code** that visitors scan to open the point-your-phone finder on their own device (the QR resolves to `sky-finder.html` on whatever host it's served from; it degrades to a printed URL if the QR library or connection is unavailable). Linked from the dashboard. **Tidier navigation** — the companion-page links are consolidated into a single **☰ Menu** drawer (top-left of the dashboard, grouped into "Tonight's session" and "Reference guides") instead of a long row of buttons. The **data-health strip** was reworded to plain language ("🩺 Live-data freshness — weather forecast: up to date · satellite pass data: fresh · Jupiter red-spot model: good to Jan 2027") with hover tooltips. cache → `scob-sky-v14`. |
| **v3.11** | `sky-finder.html`, `scob-dashboard-v3.html`, `kiosk.html`, `align-stars.html` (new), `version.js`, `sw.js` | **Finder up/down guidance** — the point-your-phone finder now uses the phone's tilt to say "raise/lower phone" and confirm "✔ on target", with a live "where your phone is aimed" marker (plus the earlier compass fix: single locked north source + smoothing, no more 90° flicker). **Darkness-window bar** on the dashboard — a slim timeline of sunset → astronomical dark → moonrise/set → dawn with the usable dark window shaded and the Moon-up band marked. **Offline-capable kiosk QR** — the QR library is now cached in the browser on first load so the code renders with no internet afterwards. **Multilingual kiosk** — a EN / 中文 / Malay / Tamil toggle for the visitor display (Malay & Tamil are machine translations pending a native-speaker review). New **`align-stars.html`** (volunteer) — suggests bright, well-separated alignment stars that are up now for the CPC GoTo mounts (SkyAlign / 2-star). cache → `scob-sky-v15`. |
| **v3.12** | `astro-core.js`, `kiosk.html`, `tonights-tour.html`, `version.js`, `sw.js` | **Much broader showpiece catalogue** — the shared `SHOWPIECES` list grew from ~19 to **42**, spread across all right-ascensions so the kiosk, Tonight's Tour and finder always have plenty of targets in **every season, year-round** (typically 14–23 objects up at 9 pm). Added **Mercury, Uranus and Neptune**, plus all-season deep-sky/stars (Beehive, Double Cluster, M22, Swan/Ring/Dumbbell nebulae, M6/M11 clusters, 47 Tuc, and bright stars Vega, Altair, Deneb, Arcturus, Spica, Capella, Rigel, Betelgeuse, Regulus, Procyon, Fomalhaut). Planet selection is now generic (by object kind), and the kiosk carries Chinese names for the new objects. Positions are all still computed live — **nothing needs updating over time**. cache → `scob-sky-v16`. |
| **v3.13** | `scob-dashboard-v3.html`, `plan-ahead.html`, `solar.html`, `object-cards.html` (new), `version.js`, `sw.js` | **Accessibility mode** on the dashboard (☰ menu toggle) — larger text, a colour-blind-safe verdict symbol on every tag (●/◑/○/✕), higher-contrast secondary text, and an ARIA label on the sky map. **Meteor-shower radiant** — near a major shower's peak the sky map draws the radiant with a Singapore-latitude-adjusted rate. Three new pages: **`plan-ahead.html`** compares the next ~6 session Fridays by Moon phase + Open-Meteo forecast and flags the best night; **`solar.html`** a daytime/solar mode (live Sun position, safe-viewing checklist, what to look for); **`object-cards.html`** printable one-per-object handout cards for the observing deck. All linked from the ☰ menu. cache → `scob-sky-v17`. |
| **v3.14** | `astro-core.js`, `scob-dashboard-v3.html`, `tonights-tour.html`, `kiosk.html`, `sky-finder.html`, `test-astro.js` (new), `.github/workflows/deploy-pages.yml`, `version.js`, `sw.js` | **One astronomy engine, everywhere** — the dashboard's own copy of the position math (Sun, Moon, planets, ecliptic→equatorial, planet magnitudes) was retired and now **delegates to the shared `astro-core.js`**, so there is a single validated engine to maintain instead of two that could silently drift. A new **`test-astro.js` CI regression test** locks the engine to independently-verified reference positions (sidereal time, Sun/Moon/planet altitudes & magnitudes, twilight times) and runs automatically on every deploy — a bad edit now fails the build instead of shipping. **Object illustrations** — the Tonight's Tour, kiosk and sky-finder cards now show a small, recognisable on-device drawing of each object (Moon with craters & terminator, planets with Saturn's rings / Jupiter's bands, nebula glows, spiral galaxies, globular vs open clusters, coloured stars & doubles). They're generated as lightweight SVG in `astro-core.js` — no image files, so they work fully offline. cache → `scob-sky-v18`. |
| **v3.15** | `astro-core.js`, `scob-dashboard-v3.html`, `tonights-tour.html`, `sky-finder.html`, `object-cards.html`, `checklist.html` (new), `version.js`, `sw.js`, `test-astro.js` | Ten upgrades. **Comet tracker** — bright comets (currently 10P/Tempel 2) are computed live from orbital elements in `astro-core.js` and flow into the dashboard target list, Tour, kiosk and finder, with a magnitude estimate and an auto-expiring visibility window; the CI test locks its position against an independent ephemeris. **Rise-to-transit timeline** — each dashboard target shows a bar of tonight's window above 25° with the best (transit) moment marked. **Satellite magnitudes + live countdown** — each ISS/Tiangong/Hubble pass shows an estimated peak brightness, and a live "next pass in 12m, rises SW, mag −2" banner counts down. **Talking-point depth toggle** on the Tour (first-timer hook vs full enthusiast blurb). **Read-aloud** — a 🔊 button narrates each Tour object via the browser's speech synthesis. **Per-object QR deep-links** — the printable object cards carry a QR that opens the finder pre-aimed at that object (`sky-finder.html?target=<id>`). **Setup & pack-down checklist** — a new printable `checklist.html` for the 40 cm dome, CPC/C6 deck scopes and Seestar. **Session pack** — the printable briefing now also includes talking-point cards for tonight's showpieces. **Update-available toast** — installed PWAs show a one-tap "New version — refresh" prompt when a fresh build is cached. **Milky Way band + constellation toggle** on the sky map. cache → `scob-sky-v19`. |
| **v3.16** | `solar.html`, `version.js`, `sw.js` | **Live solar activity in daytime/solar mode** — the solar page now shows a plain-language activity level plus today's **sunspot regions and spot count**, the largest group's McIntosh/Hale class, the **10.7 cm solar radio flux**, and the **latest X-ray flare** — fetched client-side from the **NOAA Space Weather Prediction Center (SWPC)** with a graceful offline fallback and the source credited in the footer. It also embeds a **live white-light image of the Sun (NASA / SDO HMI)** so you can see today's sunspots directly, refreshing through the session (credited in the footer, offline-safe). Sunspot-region data lags ~a day (reported once daily UTC); flux & flares update through the day. cache → `scob-sky-v20`. |
| **v3.17** | `object-cards.html`, `kiosk.html`, `version.js`, `sw.js` | Fixes. **Object-card icons** — the printable cards were showing the same generic ringed-planet emoji for every planet (so Venus, Jupiter etc. all looked like Saturn); they now use the same on-device `astro-core.js` illustrations as the Tour/finder/kiosk, so each planet, star and deep-sky object is drawn correctly (only Saturn has rings). **Kiosk translation** — the multilingual visitor display now carries `translate="no"` on `<html>` plus a `notranslate` meta tag (re-asserted on every language switch), so Chrome no longer offers to auto-translate the 中文 / Malay / Tamil text back to English. cache → `scob-sky-v21`. |
| **v3.18** | `constellation-story.html` (new), `scale-model.html` (new), `highlights-card.html` (new), `qr-poster.html` (new), `scob-dashboard-v3.html`, `version.js`, `sw.js` | Engagement & reach. Four new pages plus a dashboard tweak: **`constellation-story.html`** features a constellation well-placed over Singapore right now — its myth, a star-hop find guide, best-viewing months, and an accurate asterism diagram (bright-star coordinates), with a list of others up now. **`scale-model.html`** is an interactive "shrink the Sun to a basketball" solar-system-to-scale explainer (model sizes, relatable comparisons and distances). **`highlights-card.html`** generates a downloadable square image of tonight's highlights (Moon phase, best planet, top targets) for posting to social media. **`qr-poster.html`** is a printable A4 "Scan to explore tonight's sky" sign with an offline-capable QR (finder/kiosk/constellation/dashboard). On the **dashboard**, the weather card adds a **cloud-trend arrow** — clearing ↗ / clouding over ↘ / steady → across the 7–11 pm window, from the Open-Meteo hourly forecast. All four pages linked from the ☰ menu. cache → `scob-sky-v22`. |
| **v3.19** *(current)* | `constellation-story.html`, `version.js`, `sw.js` | **Richer constellation stories** — each constellation now has a full-length telling of its Greek mythology and background (the boastful hunter humbled by a scorpion, Zeus as the bull carrying off Europa, Orpheus's lyre, the vain queen chained to her throne…) woven together with astronomy trivia (Sirius and the Nile calendar, the black hole in the Teapot's spout, Cygnus X-1, the Qixi cowherd-and-weaver tale). A **Short / Full story toggle** (📖, remembered per visitor) switches between a quick blurb and the deep version, and the toggle keeps you on the constellation you're reading. cache → `scob-sky-v23`. |
| **v3.20** *(current)* | `identify.html` (new), `audio-tour.html` (new), `scob-dashboard-v3.html`, `version.js`, `sw.js` | Two new public-engagement pages. **`identify.html` — "What am I looking at?"** is the reverse of the finder: point your phone at the sky and it names the brightest object in that direction (Sun, Moon, planets, bright stars, clusters, comets), with the angular distance from your aim and nearby runners-up. It reuses the finder's locked-north compass + tilt handling and computes everything on-device. **`audio-tour.html` — guided audio sky tour** builds tonight's tour in order and reads it out hands-free with the device's speech synthesis (play/pause, next/prev, tap any stop to jump), showing each object's illustration, where to look and talking points as it speaks. Both linked from the ☰ menu. cache → `scob-sky-v24`. |
| **v3.21** *(current)* | `almanac.html` (new), `quiz.html` (new), `scob-dashboard-v3.html`, `version.js`, `sw.js` | Two more engagement pages. **`almanac.html` — Sky Almanac** shows tonight's Moon phase, the planets on show, the **Milky-Way-core window** (the dark, high span when the galactic centre in Sagittarius is up — computed live, with a Moon-glare note), the meteor showers peaking this month, and a "this month in the sky" highlight. **`quiz.html` — Constellation Quiz** draws a real star pattern and asks you to name it (four choices, running score) — a fun way to learn the sky, using the same bright-star asterisms as the constellation pages. Both linked from the ☰ menu. cache → `scob-sky-v25`. Note: multilingual finder/tour remains planned for a later release. |
| **v3.22** *(current)* | `astro-core.js`, `occultations.html` (new), `almanac.html`, `scob-dashboard-v3.html`, `version.js`, `sw.js` | The two hard ones, done properly. **Lunar libration** — the almanac's Moon card now reports how the Moon is tipped (Meeus optical libration): how many degrees toward the eastern/western and northern/southern limbs, which extra terrain that reveals, and a "near maximum tonight" flag for the best limb-feature nights. **`occultations.html` — lunar occultation predictor** scans the next ~5 months for the Moon covering (or closely passing) the bright zodiac stars Aldebaran, Regulus, Spica and Antares and the planets, using the Moon's **topocentric, parallax-corrected** position for SCOB — essential for occultations. Each event shows the SGT time, whether it's an occultation or a close pass, and whether it's actually visible from Singapore (Moon up and sky dark), with the genuinely-visible ones highlighted. Validated: reproduces the real 2026 Regulus & Antares occultation series, with correct Moon parallax (0.98°) and angular radius (0.267°). cache → `scob-sky-v26`. |
| **v3.23** *(current)* | `occultations.html`, `almanac.html`, `version.js`, `sw.js` | "Visible from SCOB" filters, default on. The **occultations** page now hides, by default, events that happen with the Moon below the horizon or in daylight here — showing only what's actually observable from Singapore, with a one-tap "show all" to reveal the rest. The **almanac's meteor-shower** list likewise hides showers whose radiant climbs too low from our near-equatorial latitude (e.g. the Ursids, radiant only ~15° up) by default, showing each shower's radiant altitude and a "show all" link. Both remember the choice. Also added libration + occultation + topocentric checks to the CI regression test. cache → `scob-sky-v27`. |
| **v3.24** *(current)* | `sky-guide.html` (new), `scob-dashboard-v3.html`, `version.js`, `sw.js` | **New project — "SCOB Sky Guide", the public front door.** A polished, mobile-first, multilingual (EN / 中文 / Bahasa Melayu / தமிழ்) home screen for visitors that ties the public tools into one branded experience: a hero "tonight at a glance" (sky state, and the standout sight right now with its illustration, computed on-device) over tidy tiles grouped into *See the sky tonight* (tour, point-your-phone finder, "what am I looking at?"), *Learn & explore* (constellation stories, audio tour, almanac) and *Just for fun* (solar-system-to-scale, quiz, daytime/Sun). Marked `translate="no"` so Chrome leaves the chosen language alone; works offline once loaded. This is the seed of a consolidated visitor app — next steps: extend full multilingual into the linked tool pages, and an install/QR entry point. Linked from the dashboard ☰ menu. cache → `scob-sky-v28`. |
| **v3.25** *(current)* | `sky-guide.webmanifest` (new), `sky-guide.html`, `qr-poster.html`, `version.js`, `sw.js` | **Install / QR entry point for the Sky Guide.** The guide is now an installable PWA (`sky-guide.webmanifest`, `start_url` = the guide, standalone display, maskable icons): it shows an **"Install this app"** button on Android/Chrome (via `beforeinstallprompt`), an "Add to Home Screen" hint on iPhone, and a **QR code that opens the guide** (offline-cached QR library) so visitors can scan it from a poster and take SCOB home. The install prompt/labels are translated into all four languages. The printable **QR poster** now offers the Sky Guide as its default target. cache → `scob-sky-v29`. **Still to do for this project:** the 4-language rollout into the five linked tool pages (finder, tour, identify, constellation stories, almanac) — a dedicated content-translation pass (mechanism proven by the kiosk and guide). |

### Cutting a release

The version number lives in **one** place now. To ship a change:

1. Edit `SCOB_VERSION` in **`version.js`** (every page's footer updates from it automatically).
2. Bump the `CACHE` name in **`sw.js`** (e.g. `scob-sky-v10` → `v11`) — this is what forces installed PWAs to pull the new pages.
3. Add a row to the version-history table above and move the marker.
4. Run **`./check-release.sh`** — it fails loudly if anything is out of sync.
5. Upload the changed pages plus `sw.js`, `version.js`, and `README.md`.

## Other files in this folder

- **telescope-types.html** — the telescope types, mounts & magnification guide (linked from the dashboard).
- **tracking-methods.html** — how tracking mounts & GoTo alignment work (Celestron methods focus).
- **moon-tonight.html** — Tonight on the Moon: terminator features for the chosen night (linked from the dashboard).
- **tonights-tour.html** — auto-generated docent tour: what to show the public in order, with talking points (linked from the dashboard).
- **sky-finder.html** — "point-your-phone" compass finder for tonight's showpieces.
- **eyepiece-fov.html** — eyepiece / field-of-view calculator with to-scale target framing.
- **kiosk.html** — full-screen visitor display (multilingual) with a QR code to the point-your-phone finder.
- **align-stars.html** — volunteer GoTo alignment-star picker for the CPC mounts.
- **plan-ahead.html** — compares upcoming session Fridays (Moon + forecast) to pick the best night.
- **solar.html** — daytime / solar-observing mode (Sun position, safety, what to look for).
- **object-cards.html** — printable per-object handout cards for the observing deck.
- **astro-core.js** — shared on-device astronomy engine used by the tour & finder pages.
- **Night-Sky-Briefing-*.md / .pdf** — the weekly observing briefing (objects, viewing notes, weather).
- **Telescopes-Reference.md** — notes on the telescopes available at SCOB.
- **star_map.png**, **weather_chart.png** — generated visuals for the briefing.
- **version.js** — single source of truth for the site version; injects the version/copyright footer into every page. Bump `SCOB_VERSION` here on each release.
- **check-release.sh** — pre-flight check; run `./check-release.sh` before uploading to confirm everything is in sync.
- **INSTALL-as-app.md** — how to install the dashboard as a home-screen app.
- **archive/** — superseded versions (v1 desktop/mobile pages, v2 with weather, v2.1 merged `scob-dashboard.html` / `main.html`). Kept for reference only.

## Cadence

Updated once a week, on Friday, ahead of the observatory session.

## Data sources

Deep-sky catalogue: AstroPixels Messier & Caldwell catalogs (F. Espenak) · planetary orbital elements: P. Schlyter · weather: Open-Meteo & MSS weather.gov.sg · seeing/transparency: 7Timer! astro · light-pollution realism: Bortle scale · haze: NEA via data.gov.sg · sky events: Sea & Sky astronomy calendar (seasky.org) · ISS/Tiangong/Hubble orbits: CelesTrak TLEs, propagated with satellite.js · Jupiter/Saturn physical ephemeris: J. Meeus, Astronomical Algorithms · GRS longitude: JUPOS trend · lunar feature positions: IAU/USGS Gazetteer of Planetary Nomenclature · double/carbon star data: WDS & SIMBAD (compiled) · rain radar: MSS weather.gov.sg · Science Centre Observatory.

**Project convention: every page credits its data sources in the footer** — keep this when adding new data feeds.
