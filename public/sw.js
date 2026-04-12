// Service worker neutralizado — se desregistra a sí mismo y limpia todos los cachés
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(event) {
  event.waitUntil((async function() {
    const keys = await caches.keys();
    await Promise.all(keys.map(function(k) { return caches.delete(k); }));
    const clientList = await self.clients.matchAll({ type: 'window' });
    await self.registration.unregister();
    clientList.forEach(function(client) { client.navigate(client.url); });
  })());
});
