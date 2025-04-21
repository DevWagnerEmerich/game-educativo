const CACHE_NAME = 'roda-a-roda-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './assets/images/roleta.png',
  './assets/audio/roleta.mp3',
  './assets/audio/resposta-certa-roda-a-roda.mp3',
  './assets/audio/letraerrada.wav',
  './assets/audio/letrarodaaroda.mp3',
  './assets/audio/mixkit-arcade-game-jump-coin-216.mp3',
  './assets/audio/passouavez.mp3',
  './assets/audio/timer.mp3',
  './assets/images/background.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
