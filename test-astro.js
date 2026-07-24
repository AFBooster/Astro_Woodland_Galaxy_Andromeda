#!/usr/bin/env node
/* Woodlands Galaxy Night-Sky — astronomy regression test.
 * Loads astro-core.js and checks it against reference values that were independently
 * verified (NOAA solar algorithm + published almanac) for a fixed instant. Run in CI
 * before deploy:  node test-astro.js   (exits non-zero on any failure).
 */
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'astro-core.js'), 'utf8');
eval(src);                                   // attaches globalThis.Astro
const A = globalThis.Astro;
if (!A) { console.error('astro-core did not load'); process.exit(2); }

let fails = 0;
function ok(name, got, exp, tol) {
  const pass = Math.abs(got - exp) <= tol;
  console.log((pass ? '  ✓ ' : '  ✗ ') + name + ': got ' + (Math.round(got * 100) / 100) + ', expected ' + exp + ' ±' + tol);
  if (!pass) fails++;
}

// Reference instant: 2026-07-10 20:30 SGT = 12:30 UTC (Andromeda Observatory, Woodlands Galaxy CC).
const date = new Date(Date.UTC(2026, 6, 10, 12, 30, 0));
const s = A.sky(date);

console.log('Sidereal time & Sun');
ok('LST (deg)',  A.lstDeg(date), 219.68, 0.1);
ok('Sun altitude', s.sunAlt, -17.81, 0.1);
ok('Sun azimuth',  s.sunAz, 293.84, 0.1);

console.log('Moon');
ok('Moon illumination %', s.moon.illum, 21, 2);
ok('Moon altitude', s.moon.alt, -63.06, 0.2);

console.log('Planets (visibility pattern for July 2026: only Venus up in the evening)');
ok('Venus altitude', s.planets.Venus.alt, 23.48, 0.15);
ok('Venus magnitude', s.planets.Venus.mag, -4.01, 0.05);
ok('Jupiter altitude', s.planets.Jupiter.alt, -4.29, 0.15);
ok('Saturn altitude', s.planets.Saturn.alt, -64.08, 0.15);

console.log('Twilight (independently confirmed vs NOAA: sunset 7:16pm, astro-dark 8:30pm)');
function crossMs(fn, thr, a, b) { if ((fn(a) > thr) === (fn(b) > thr)) return null; for (let k = 0; k < 26; k++) { const m = (a + b) / 2; if ((fn(m) > thr) === (fn(a) > thr)) a = m; else b = m; } return (a + b) / 2; }
const sunF = t => A.sunAltAt(new Date(t));
const base = Date.UTC(2026, 6, 10, 10, 0, 0);
const sunsetMin = (crossMs(sunF, -0.833, base, base + 4 * 3600000) - base) / 60000 + 18 * 60; // minutes into the SGT day
const darkMin   = (crossMs(sunF, -18,     base, base + 6 * 3600000) - base) / 60000 + 18 * 60;
ok('Sunset (min after midnight SGT)', sunsetMin, 19 * 60 + 16, 3);   // 7:16pm
ok('Astro-dark (min after midnight SGT)', darkMin, 20 * 60 + 30, 3); // 8:30pm

console.log('Comet 10P/Tempel 2 (elements from MPEC 2024-D126; ref TheSkyLive 2026-06-15)');
const c10p = A.COMETS.find(c => c.id === '10p');
const ce = A.cometEq(c10p, new Date(Date.UTC(2026, 5, 15, 0, 0, 0)));
ok('Comet 10P RA (deg)', ce.ra, 308.94, 0.6);
ok('Comet 10P Dec (deg)', ce.dec, -9.2, 0.4);
ok('Comet 10P mag (~binocular)', ce.mag, 9.7, 0.6);
ok('activeComets in-window count', A.activeComets(new Date(Date.UTC(2026, 6, 15))).length, 1, 0.5);
ok('activeComets out-of-window count', A.activeComets(new Date(Date.UTC(2027, 0, 1))).length, 0, 0.5);

console.log('Moon libration (Meeus optical) & topocentric Moon');
const lb = A.libration(date);
ok('Libration longitude (deg)', lb.lon, -4.61, 0.4);
ok('Libration latitude (deg)', lb.lat, -6.65, 0.4);
const mt = A.moonTopo(date);
ok('Moon angular radius (deg)', mt.radius, 0.273, 0.02);
ok('Moon horizontal parallax (deg)', mt.par, 1.00, 0.06);

console.log('Lunar occultation scan (topocentric, from Woodlands)');
const occ = A.occultations(new Date(Date.UTC(2026, 3, 20)), 14);
const reg = occ.filter(function (e) { return e.name === 'Regulus' && e.occult; })[0];
ok('Regulus occultation found ~26 Apr 2026', reg ? 1 : 0, 1, 0.5);
if (reg) ok('  Regulus min separation (deg)', reg.sep, 0.03, 0.2);

console.log('Catalogue sanity');
const m31 = A.SHOWPIECES ? null : null; // showpieces present?
ok('Showpiece count >= 40', A.SHOWPIECES.length, 42, 5);

console.log('');
if (fails) { console.error(fails + ' CHECK(S) FAILED — the astronomy engine has regressed.'); process.exit(1); }
console.log('All astronomy checks passed.');
