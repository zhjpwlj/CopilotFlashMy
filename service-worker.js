/* Scope-aware PWA cache */
const ROOT  = self.registration.scope;           // e.g.  https://user.github.io/flashmaster-pro/
const CACHE = 'flashmaster-v1.1.0';
const ASSETS = [
  `${ROOT}index.html`,
  `${ROOT}css/styles.css`,
  `${ROOT}js/app.js`
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
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
  if (e.request.mode === 'navigate')
    return e.respondWith(
      fetch(e.request).catch(() => caches.match(`${ROOT}index.html`))
    );

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
