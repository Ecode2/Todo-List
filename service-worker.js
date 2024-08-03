const CACHE_NAME = "todo-list-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "style.css",
    "/index.js",
    "/icons/favicon-32x32.png",
    "/icons/favicon.png"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
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
});