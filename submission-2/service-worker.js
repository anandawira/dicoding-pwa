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
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
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
  const img_url = "https://crests.football-data.org";

  //Save result from API Call

  //Save loaded club logo
  if (event.request.url.indexOf(img_url) > -1) {
    event.respondWith(
      caches.open("CACHE_NAME").then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (
            networkResponse
          ) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
  } else if (event.request.url.indexOf(base_url) > -1) {
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
  } else if (
    event.request.url.indexOf("http://localhost:5500/detail.html") > -1
  ) {
    event.respondWith(
      caches
        .match("http://localhost:5500/detail.html")
        .then(function (response) {
          return response || fetch(event.request);
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

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
