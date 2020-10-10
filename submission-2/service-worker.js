const CACHE_NAME = "football-teams";
var urlsToCache = [
  "/css/materialize.min.css",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/pages/premier-league.html",
  "/pages/saved-teams.html",
  "/pages/serie-a.html",
  "/detail.html",
  "/index.html",
  "/nav.html",
  "/",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request, {
          method: "GET",
          headers: {
            "X-Auth-Token": "3c95e145608a431f82cf8a3ac6f119ad",
          },
        }).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
