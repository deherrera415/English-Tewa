const CACHE="tewa-translator-ios-v6-allwords-font";
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./favicon.png",
  "./TewaFont.ttf",
  "./apple-touch-icon.png",
  "./apple-touch-icon-180x180.png",
  "./apple-touch-icon-167x167.png",
  "./apple-touch-icon-152x152.png",
  "./apple-touch-icon-120x120.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
self.addEventListener("install",(e)=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate",(e)=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):null))));self.clients.claim();});
self.addEventListener("fetch",(e)=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>cached)));});
