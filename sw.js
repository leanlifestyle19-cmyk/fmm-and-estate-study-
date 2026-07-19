const CACHE = 'groundwork-20260719c'; // M1: BUMP on EVERY index.html deploy.

// M16: list EVERY external API host here. (No APIs in this app; external
// resource links open in the browser and are not intercepted.)
const BYPASS = [];

self.addEventListener('install', e => {
  // M4: add files individually — addAll() fails entirely if ANY file 404s.
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.all([
        fetch('./index.html').then(res => c.put('./index.html', res)).catch(() => {}),
        fetch('./manifest.json').then(res => c.put('./manifest.json', res)).catch(() => {}),
        fetch('./icon-192.png').then(res => c.put('./icon-192.png', res)).catch(() => {}),
        fetch('./icon-512.png').then(res => c.put('./icon-512.png', res)).catch(() => {})
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (BYPASS.some(h => url.hostname.includes(h))) return;

  // M5: serve app shell by request MODE, not by URL path.
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match('./index.html').then(r => r || fetch(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
