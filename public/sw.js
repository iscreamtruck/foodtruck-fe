const urlsToCache = [
  '/site.webmanifest',
  '/main.chunk.js',
  '/vendors~main.chunk.js',
  'bundle.js',
  '/',
  '/login',
  '/newuser',
  '/newlocatioin', 
  '/trucklist', 
  '/map'
];

//Install a service worker
self.addEventListener('install', event => {
  //perform install steps
  event.waitUntil(
    caches.open('v1')
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if(response) {
        return response 
      }
      return fetch(event.request);
    })
  );
});

// //update a service worker
// self.addEventListener('activate', event => {
//   const cacheWhitelist = ['pwa-nomadic-nibbler'];
//   event.waitUntil(
//     caches.keys().then(cacheName => {
//       if(cacheWhitelist.indexOf(cacheName) === -1) {
//         return caches.delete(cacheName); 
//       }
//     })
//   )
// })
