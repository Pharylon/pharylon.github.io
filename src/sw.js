"use strict";
self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  const myPayload = JSON.parse(event.data.text());

  const title = myPayload.title;
  const options = {
    body: myPayload.body,
    icon: "images/icon.png",
    badge: "images/badge.png",
    data: myPayload.link,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener("notificationclick", function(event) {
  console.log("[Service Worker] Notification click Received.", event.notification);

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});