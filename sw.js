/* Offline-Speicher fürs Handy. Erst Internet versuchen, sonst gespeicherte Version.
   Nach Änderungen an der Seite muss hier nichts angepasst werden. */
var CACHE = "reschero-v1";
var DATEIEN = ["./", "index.html", "css/style.css", "js/einstellungen.js", "js/inhalte.js",
  "js/qrcode.js", "js/app.js", "favicon.svg", "manifest.webmanifest"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(DATEIEN); }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (antwort) {
      var kopie = antwort.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, kopie); });
      return antwort;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (t) {
        return t || caches.match("index.html");
      });
    })
  );
});
