# Woodlands Galaxy CC Night-Sky — Adaptation Plan

Building a site modelled on the SCOB Night-Sky Dashboard, re-pointed to the **Andromeda Observatory at Woodlands Galaxy Community Club** (31 Woodlands Avenue 6, Singapore 738991). *No code yet — this is the plan for your review.*

---

## 1. The good news: it's still Singapore

The observatory sits ~12 km north of the Science Centre, so nearly the whole engine and every Singapore-specific data feed carries over unchanged. This is a **re-point and rebrand**, not a rebuild. The astronomy is location-driven off two coordinate constants; change those and the sky map, moon, planets, twilight, deep-sky altitudes and satellite passes all recompute correctly for Woodlands automatically.

## 2. What we know about the venue

| Item | SCOB (source) | Woodlands Galaxy CC (target) |
|---|---|---|
| Venue | Science Centre Observatory, Jurong | Andromeda Observatory, Woodlands Galaxy CC |
| Coordinates | 1.3342° N, 103.7357° E | **≈ 1.432° N, 103.796° E** *(needs your confirmation — see §6)* |
| Main instrument | 40 cm (16") Cassegrain + fleet | **30 cm (~12") dome telescope** + rooftop scopes |
| Session | Fri 7:30–10:00 pm | **Fri 7:30–9:30 pm**, weather permitting |
| Entry / booking | Free (Science Centre) | **S$1 via onePA / CC counter** |
| Operator | Science Centre Singapore | People's Association (PA) |
| Region (for NEA haze/PSI) | **West** | **North** |

*(Venue facts from Mothership, TheSmartLocal and onePA — see Sources. Fleet detail beyond the 30 cm scope is thin online and should be confirmed with the observatory.)*

## 3. What changes vs. what stays

**Stays as-is (the bulk of the work is already done):**
- The entire `astro-core.js` position engine (Sun/Moon/planets/comets/occultations/libration) — it's latitude/longitude driven.
- Sky map, moon page, solar-system table, deep-sky targets, conjunctions, meteor showers, ISS/Tiangong/Hubble passes.
- Weather go/no-go (Open-Meteo), MSS rain radar & 2-hr Nowcast, seeing/transparency (7Timer!), Bortle realism — all Singapore-valid.
- PWA offline machinery (`sw.js`, `version.js`, manifests), companion pages, printable briefing, kiosk, quiz, almanac, etc.

**Must change (config + branding + content):**
- **Coordinates** — 2 constants: `Woodland_Galaxy.html` line 760 and `astro-core.js` line 9.
- **NEA PSI region** — West → **North** (Woodlands' actual air-quality region).
- **Branding** — "SCOB" / "Science Centre Observatory" appears ~200 times across 29 files (38× in the main dashboard alone). Titles, manifests, PWA names, footer copyright, menu headers.
- **Telescope fleet** — the SCOB fleet (40 cm main, 6" apo, 11"/7", CPC/C6) → the Andromeda 30 cm + rooftop scopes. This drives `Telescopes-Reference.md`, the run-sheet logic (7:30/8:30/9:30 instrument assignments), `telescope-types.html`, `align-stars.html`, `checklist.html`, `object-cards.html`, `eyepiece-fov.html` presets.
- **Session end time** — 10:00 → 9:30 pm (default times, slider range, run-sheet slots).
- **External links** — SCOB Facebook → Andromeda Observatory Facebook; add onePA booking/$1 entry note.
- **CI test** — `test-astro.js` reference altitudes are computed for SCOB's coordinates; they need regenerating for the new site (the numbers will shift slightly with latitude).

## 4. Proposed approach — centralize config first

Right now the site's identity is scattered. Before adapting, I'd introduce a **single site-config object** (extend the existing `version.js` pattern, or a new `site-config.js`) holding: coordinates, site name, region, session times, entry/booking text, social link, and the telescope fleet definition. Every page reads from it. This means:

- The Woodlands re-point becomes editing **one file**, not 29.
- Anyone can later spin up a *third* observatory the same way.
- The fleet-matching run-sheet logic reads the fleet from config instead of hard-coded scope names.

This is a modest up-front refactor that pays for itself immediately and keeps parity with the SCOB project's own "single source of truth" philosophy (`version.js`, `check-release.sh`).

## 5. Phased build order

**Phase 0 — Config foundation** *(refactor, no visible change)*
Create `site-config.js`; move coordinates, names, region, session times and fleet into it; wire the two coordinate call-sites and `version.js` footer to read from it.

**Phase 1 — Core dashboard MVP** *(the working product)*
Re-point coordinates, swap NEA region to North, rebrand titles/manifest/footer, set session to 7:30–9:30, update the fleet reference and the run-sheet instrument slots, fix external links. Regenerate `test-astro.js` reference values and confirm they pass. Deliverable: a working `woodlands-dashboard.html` (equivalent of `Woodland_Galaxy.html`).

**Phase 2 — Companion pages** *(breadth)*
Rebrand and re-point the public/engagement pages in priority order: `telescope-types.html` + `Telescopes-Reference.md` (fleet-specific), `tonights-tour.html`, `sky-finder.html`, `kiosk.html`, `moon-tonight.html`, then the rest (almanac, quiz, occultations, solar, constellation-story, etc.). Update `sw.js` cache manifest and `check-release.sh` file list.

**Phase 3 — Polish & release**
New icons/manifest branding, QR poster + kiosk pointed at the new host, weekly briefing template, and a `README.md` rewrite with a fresh version history. Run `check-release.sh`.

## 6. What I need from you before Phase 1

1. **Exact coordinates.** I have ≈1.432° N, 103.796° E from the Woodlands Ave 6 address. If you can confirm (or the observatory has published lat/long), I'll lock it in; otherwise I'll geocode the postal address 738991 and flag the ±precision.
2. **The real telescope fleet.** Online sources only reliably confirm the 30 cm dome scope. What's actually on the rooftop for public sessions (makes/apertures/mounts)? This drives the whole run-sheet and reference content. If unknown, I'll build a sensible generic fleet and mark it "confirm with observatory."
3. **Branding preferences.** Keep the same dark-navy/gold visual theme, or restyle? Site name string — "Woodlands Galaxy Night-Sky", "Andromeda Observatory", or your call? Copyright/credit line to replace "© 2026 AFBOOSTER.cc"?
4. **Hosting target.** Where will this live (GitHub Pages, other)? Affects the QR/kiosk URLs and the PWA `start_url`.
5. **Scope of the first cut.** Full parity with all ~25 companion pages, or the Phase-1 dashboard MVP first and expand later?

## 7. Effort & risk notes

- **Low risk:** the astronomy — it's already validated and latitude-driven; a 0.1° latitude shift is astronomically trivial and the CI test will catch any regression.
- **Medium effort:** the ~200 branding occurrences — mechanical but must be thorough (PWA names, meta tags, menu headers, footers) so nothing still says "SCOB".
- **Highest-content item:** the telescope fleet — this is the one place SCOB content doesn't transfer, and it needs real observatory input to be accurate rather than invented.
- **Don't invent equipment or session details.** Where facts are unconfirmed I'll clearly mark them as placeholders for you/the observatory to verify, matching the SCOB project's careful, source-credited convention.

---

*Sources for venue facts:*
- [Woodlands Galaxy CC Observatory reopens — Mothership](https://mothership.sg/2022/10/woodlands-galaxy-cc-observatory-reopens/)
- [Woodlands Galaxy CC Observatory — TheSmartLocal](https://thesmartlocal.com/read/woodlands-galaxy-cc-observatory/)
- [Woodlands Galaxy CC — onePA](https://www.onepa.gov.sg/cc/woodlands-galaxy-cc)
- [The Galaxy CC Observatory (Andromeda Observatory) — Facebook](https://www.facebook.com/AndromedaObservatory/)
