/* SCOB Night-Sky — service worker: offline cache so the installed app opens with no signal */
const CACHE = 'scob-sky-v29';
const ASSETS = [
  'scob-dashboard-v3.html',
  'sky-guide.html',
  'sky-guide.webmanifest',
  'identify.html',
  'audio-tour.html',
  'almanac.html',
  'quiz.html',
  'occultations.html',
  'telescope-types.html',
  'moon-tonight.html',
  'tracking-methods.html',
  'tonights-tour.html',
  'sky-finder.html',
  'eyepiece-fov.html',
  'kiosk.html',
  'align-stars.html',
  'plan-ahead.html',
  'solar.html',
  'object-cards.html',
  'checklist.html',
  'constellation-story.html',
  'scale-model.html',
  'highlights-card.html',
  'qr-poster.html',
  'astro-core.js',
  'version.js',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'icon-180.png'
];
self.addEventListener('install', e => {
  // Cache assets individually so one missing file doesn't abort the whole install.
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(a => c.add(a)))
    ).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Don't intercept cross-origin requests (e.g. the live weather API) — let them hit the network fresh.
  if (new URL(e.request.url).origin !== self.location.origin) return;
  // Network-first for the page itself so updates arrive; cache-first for icons/manifest.
  const isPage = e.request.mode === 'navigate' || e.request.url.endsWith('.html');
  if (isPage) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then(hit => hit || caches.match('scob-dashboard-v3.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('scob-dashboard-v3.html')))
  );
});
