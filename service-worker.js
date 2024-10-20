/* const CACHE_NAME = "todo-list-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "style.css",
    "/index.js",
    "/icons/favicon-32x32.png",
    "/icons/favicon-173x173.png",
    "/icons/favicon-600x600.png",
    "/icons/favicon.png"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {return cache.addAll(urlsToCache)})
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        cahes.keys().then((cacheNames) =>
        Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        ))
    );
}); */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');


workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);