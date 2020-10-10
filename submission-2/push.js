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
    "https://fcm.googleapis.com/fcm/send/dgcX9PxLoEI:APA91bFaDG91sFLYQctDdmpdyqqMXFjKB99fen0CIdkrMb6luzb9leN6PRFtUuDlmKVRWgwsauN4tSeAu2JhTxpqKaXNUJIcYSuwpI_x4zIcJPgYycF1nvbRnWWUPdtfEKwnSXXxaO2z",
  keys: {
    p256dh:
      "BL/9sHScRDedSA/TJszppkLzCEgy+HJz4UlIPsWocRIhHXL79cNSlAGCnSN1YmBGoAnQbEN4y/BDJawIIqIImUw=",
    auth: "35AxK/Y4QJ10TEbRkWrnCg==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "1045517247257",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
