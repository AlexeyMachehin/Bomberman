import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { offlineFallback } from 'workbox-recipes';

self.__WB_DISABLE_DEV_LOGS = true;

const DYNAMIC_CACHE_NAME = 'dynamic-data';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('active', () => {
  clientsClaim();
});

precacheAndRoute(['/index.html']);

offlineFallback({
  pageFallback: '/index.html',
});

registerRoute(
  () => true,
  new NetworkFirst({
    cacheName: DYNAMIC_CACHE_NAME,
  })
);

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
