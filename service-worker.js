const CACHE_NAME = 'profit-sharing-calculator-v1';
const urlsToCache = [
  '/ProfitSharing-APP/',
  '/ProfitSharing-APP/index.html',
  '/ProfitSharing-APP/css/styles.css',
  '/ProfitSharing-APP/js/script.js',
  '/ProfitSharing-APP/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});