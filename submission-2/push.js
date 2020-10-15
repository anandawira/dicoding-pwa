var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BM1LwUuPZuHnr_7Pvkk0Z1jCmMltUVSwUWQt4PVOr6uAEf4u8OLi7JrZ0jK1E6sRu-TzPo7R0N6kqwNM_qjOlNI",
  privateKey: "SNPRt6nzOEj2uWpAdOtOWgFb7olhXgFyX-hcv_t6mB8",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABfh…B0Rl6FR7V8AjVQbW83RW_dvYiqmdZXm7Gl-Vjmg02bl-kKgtaXyf7OLyT4hE",
  keys: {
    p256dh:
      "BN2nmUIXSFH5+hhYK/fkyAGEo6QzNa8u47vKZ1SC7nUZBCj73LAqHXgPwJYE3STuRCv5Nbr5v3VRclEnE+zKEGs=",
    auth: "JfBXLP7QRcUYXGB/WCLMOw==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1045517247257",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
