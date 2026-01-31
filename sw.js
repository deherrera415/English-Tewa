const CACHE = "tewa-translator-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./sw.js"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE ? caches.delete(k) : null))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(()=>cached)));
});
