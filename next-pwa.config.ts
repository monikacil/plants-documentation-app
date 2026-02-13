import type { RuntimeCaching } from "workbox-build";

const runtimeCaching: RuntimeCaching[] = [
  {
    urlPattern: ({ request }) => request.mode === "navigate",
    handler: "NetworkFirst",
    options: {
      cacheName: "plantsdoc-pages",
      networkTimeoutSeconds: 5,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },

  {
    urlPattern: /\/api\/.*$/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "plantsdoc-api",
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 5 * 60,
      },
    },
  },

  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
    handler: "CacheFirst",
    options: {
      cacheName: "plantsdoc-images",
      expiration: {
        maxEntries: 150,
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

  fallbacks: {
    document: "/offline",
  },
};

export default pwaConfig;
