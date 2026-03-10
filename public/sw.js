/**
 * sw.js — Autumn8 Field PWA Service Worker
 *
 * Cache strategy:
 * - Static shell (layout, fonts, CSS): cache-first
 * - Schedule / job data: network-first (always fresh)
 * - Photos: network-only (always upload live)
 *
 * Install: caches the app shell on first load.
 * Fetch: serves shell from cache; falls through to network for data.
 */

const CACHE_NAME = 'autumn8-field-v1';

const SHELL_URLS = [
  '/crew/today',
  '/crew/route',
];

// Install: pre-cache shell pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(SHELL_URLS).catch(() => {
        // Silently ignore cache failures (e.g., pages don't exist yet)
      })
    )
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API and dynamic data, cache-first for static shell
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Always network for API calls, photo uploads, auth
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('/photos') ||
    url.pathname.includes('/signature') ||
    url.hostname !== self.location.hostname
  ) {
    return; // Fall through to network
  }

  // Network-first for schedule data and job details (must be fresh)
  if (url.pathname.startsWith('/crew/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
    )
  );
});
