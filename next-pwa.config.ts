import type { RuntimeCaching } from "workbox-build";

const runtimeCaching: RuntimeCaching[] = [
  {
    urlPattern: /^https?.*/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "plantsdoc-dynamic",
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 24 * 60 * 60,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
    handler: "CacheFirst",
    options: {
      cacheName: "plantsdoc-images",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      },
    },
  },
];

const pwaConfig = {
  runtimeCaching,
};

export default pwaConfig;
