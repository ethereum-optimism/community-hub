// Script exists to clear the service worker cache from the old website. Please keep this script
// around until we're confident that users have the latest version of the site. Since Next doesn't
// use service workers it should be safe to keep this around indefinitely if needed.

self.addEventListener('install', (event) => {
  // Force the service worker to take control immediately
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Clear all caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName)
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', (event) => {
  // Always fetch from the network and do not cache
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => {
      // Optionally, return a fallback if the network request fails
      return caches.match(event.request)
    })
  )
})
