const CACHE_NAME = "caths-main-pwa-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Keep Firebase, APIs, images, scripts, and other app resources on the
  // normal network path so the existing site's behavior is not changed.
  if (request.method !== "GET" || request.destination !== "document") {
    return;
  }

  event.respondWith(
    fetch(request).catch(() =>
      caches.match("./index.html")
    )
  );
});
