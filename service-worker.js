const build = [
  "/_app/immutable/start-713507eb.js",
  "/_app/immutable/pages/__layout.svelte-4201353e.js",
  "/_app/immutable/assets/pages/__layout.svelte-5047c4df.css",
  "/_app/immutable/pages/__error.svelte-52b1f9b8.js",
  "/_app/immutable/pages/_layout.svelte-453b6f46.js",
  "/_app/immutable/pages/index.svelte-d7622e43.js",
  "/_app/immutable/assets/pages/index.svelte-21335d85.css",
  "/_app/immutable/pages/playground-and-explosions-testing.svelte-dd867f88.js",
  "/_app/immutable/assets/pages/playground-and-explosions-testing.svelte-c6bcff3d.css",
  "/_app/immutable/pages/session/index.svelte-59f4a107.js",
  "/_app/immutable/assets/pages/session/index.svelte-71765815.css",
  "/_app/immutable/pages/setup/index.svelte-29798bb9.js",
  "/_app/immutable/assets/pages/setup/index.svelte-113e178b.css",
  "/_app/immutable/pages/summary/index.svelte-2c520b2b.js",
  "/_app/immutable/assets/pages/summary/index.svelte-53d04b86.css",
  "/_app/immutable/chunks/index-7f1c3d66.js",
  "/_app/immutable/chunks/index-76f9cd11.js",
  "/_app/immutable/chunks/singletons-d6e4a54a.js",
  "/_app/immutable/chunks/stores-5ce123b6.js",
  "/_app/immutable/chunks/audio-a1355b49.js",
  "/_app/immutable/chunks/settings-121f1947.js",
  "/_app/immutable/chunks/Button-8ee2eaaf.js",
  "/_app/immutable/assets/Button-fe0e2dc6.css",
  "/_app/immutable/chunks/Logo-751df6c9.js",
  "/_app/immutable/chunks/quiz-d9b00f48.js",
  "/_app/immutable/assets/quiz-eb2bbef6.css",
  "/_app/immutable/chunks/confetti-917e2ded.js",
  "/_app/immutable/assets/confetti-ddc5e033.css",
  "/_app/immutable/chunks/Radio-c41d3c38.js",
  "/_app/immutable/assets/Radio-2868f6d6.css",
  "/_app/immutable/chunks/dialog-polyfill.esm-ff963e5c.js"
];
const files = [
  "/audio/bong_001.mp3",
  "/audio/bong_001.ogg",
  "/audio/click_002.mp3",
  "/audio/click_002.ogg",
  "/audio/drop_002.mp3",
  "/audio/drop_002.ogg",
  "/audio/drop_003.mp3",
  "/audio/drop_003.ogg",
  "/audio/drop_004.mp3",
  "/audio/drop_004.ogg",
  "/audio/error_004.mp3",
  "/audio/error_004.ogg",
  "/audio/maximize_008.mp3",
  "/audio/maximize_008.ogg",
  "/audio/minimize_008.mp3",
  "/audio/minimize_008.ogg",
  "/audio/win_1.mp3",
  "/audio/win_2.mp3",
  "/audio/win_3.mp3",
  "/embed.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.svg",
  "/font/LICENSE_E",
  "/font/LICENSE_J",
  "/font/mplus-2c-black.ttf",
  "/font/mplus-2c-bold.ttf",
  "/font/mplus-2c-heavy.ttf",
  "/font/mplus-2c-light.ttf",
  "/font/mplus-2c-medium.ttf",
  "/font/mplus-2c-regular.ttf",
  "/font/mplus-2c-thin.ttf",
  "/font/mplus-2c.css",
  "/font/mplus-2p-black.ttf",
  "/font/mplus-2p-bold.ttf",
  "/font/mplus-2p-heavy.ttf",
  "/font/mplus-2p-light.ttf",
  "/font/mplus-2p-medium.ttf",
  "/font/mplus-2p-regular.ttf",
  "/font/mplus-2p.css",
  "/icon.png",
  "/manifest.json",
  "/maskable-192x192.png",
  "/maskable-512x512.png"
];
const version = "1739593187940";
const ASSETS = `cache${version}`;
const worker = self;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(ASSETS).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== ASSETS)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${version}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === worker.location.hostname && url.port !== worker.location.port;
  const isStaticAsset = url.host === worker.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
