var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BHJy4NTNWG4NGMSKHDMkXIUgLARncznbv8QUnrDHYPravGpNdkm4RzGNw_3KQ2VlioeKdoOabGuMzjlen5R0hvE",
  privateKey: "RTm2GTCFoDlwLEuUJcL_xth1qRswXOPeLQi-ldJyzFQ",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint: "<Endpoint URL>",
  keys: {
    p256dh: "<p256dh Key>",
    auth: "<Auth key>",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1045517247257",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
