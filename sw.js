const scope = new URL(self.registration.scope);
const cachePrefix = `monkey:${encodeURIComponent(scope.pathname)}:`;
const cacheName = `${cachePrefix}v1`;
const appShell = new URL('index.html', scope).href;
const appAssets = new Set([
  appShell,
  ...[
    'manifest.webmanifest',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'icons/icon-maskable-512.png',
    'icons/apple-touch-icon.png',
  ].map(path => new URL(path, scope).href),
]);

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll([...appAssets].map(url => new Request(url, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(cachePrefix) && name !== cacheName).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function onlineOrCached(request, key) {
  const response = await fetch(request, { cache: 'no-cache' }).catch(() => null);
  if (response?.ok) {
    const cache = await caches.open(cacheName).catch(() => null);
    await cache?.put(key, response.clone()).catch(() => {});
    return response;
  }
  const cache = await caches.open(cacheName).catch(() => null);
  return await cache?.match(key) || response || Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  url.search = '';
  const launch = request.mode === 'navigate' && (url.href === scope.href || url.href === appShell);
  if (launch || appAssets.has(url.href)) {
    event.respondWith(onlineOrCached(request, launch ? appShell : url.href));
  }
});
