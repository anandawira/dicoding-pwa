const CACHE_NAME = "cssframeworks";
var urlsToCache = [
  "/",
  "/nav.html",
  "/manifest.json",
  "/index.html",
  "/icon.png",
  "/pages/home.html",
  "/pages/bootstrap.html",
  "/pages/bulma.html",
  "/pages/materialize.html",
  "/pages/semantic-ui.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/nav.js",
  "/assets/Bootstrap.svg",
  "/assets/bulma-logo.png",
  "/assets/materialize.svg",
  "/assets/semantic-ui.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
