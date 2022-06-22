let cacheName = "cache";
let assests = [
    "/",
    "/index.html",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "favicon.ico",
    "/static/js/bundle.js"
]
self.addEventListener("install", res=>{
    res.waitUntil(
        caches.open(cacheName)
            .then(cache=>{
                cache.addAll(assests);
            })
    )
});
self.addEventListener("activate", res=>console.log("activated", res));
self.addEventListener("fetch", res=>{
    res.respondWith(
        caches.match(res.request)
            .then(cacheResult=>{
                return (cacheResult)? cacheResult:fetch(res.request);
            })
    )
});