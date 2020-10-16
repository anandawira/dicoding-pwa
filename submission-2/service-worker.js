importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log("Workbox terpasang");
} else {
  console.log(`Workbox tidak terpasang`);
}

// Precaching
workbox.precaching.precacheAndRoute(
  [
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
    "/icon.png",
    "/manifest.json",
    "/index.html",
    "/nav.html",
    "/",
  ],
  {
    // Ignore all URL parameters.
    ignoreUrlParametersMatching: [/.*/],
  }
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Runtime caching api call
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate()
);

// Runtime caching club logo
workbox.routing.registerRoute(
  /^https:\/\/crests\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "club-logo",
  })
);

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
