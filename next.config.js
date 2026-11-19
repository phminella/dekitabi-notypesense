/** @type {import('next').NextConfig} */
const nextSafe = require("next-safe");
const { i18n } = require("./public/next-i18next.config");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  dynamicStartUrl: false,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-stylesheets",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-font-assets",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 180 * 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-image",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 180 * 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: "NetworkFirst",
      // handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-js-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-style-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 180 * 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: "NetworkFirst",
      // handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-data",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 180 * 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:json|xml|csv)$/i,
      handler: "NetworkFirst",
      // handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-data-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 180 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: ({ url }) => {
        const isSameOrigin = self.origin === url.origin;
        if (!isSameOrigin) return false;
        const pathname = url.pathname;
        // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without impact other environment
        // Above route is default for next-auth, you may need to change it if your OAuth workflow has a different callback route
        // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
        if (pathname.startsWith("/api/auth/")) return false;
        if (pathname.startsWith("/api/")) return true;
        return false;
      },
      handler: "NetworkFirst",
      method: "GET",
      options: {
        cacheName: "apis",
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
      },
    },
    {
      urlPattern: ({ url }) => {
        const isSameOrigin = self.origin === url.origin;
        if (!isSameOrigin) return false;
        const pathname = url.pathname;
        if (pathname.startsWith("/api/")) return false;
        return true;
      },
      handler: "NetworkFirst",
      options: {
        cacheName: "others",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: ({ url }) => {
        const isSameOrigin = self.origin === url.origin;
        return !isSameOrigin;
      },
      // handler: "StaleWhileRevalidate",
      handler: "NetworkFirst",
      options: {
        cacheName: "cross-origin",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 1 hour
        },
        // networkTimeoutSeconds: 10,
      },
    },
  ],
  publicExcludes: [
    "!locales/**/*",
    "!img/**/*",
    "!fonts/**/*",
    "!files/**/*",
    "!videos/**/*",
  ],
  buildExcludes: [/media\/.*$/, /chunks\/pages\/.*$/],
  cacheStartUrl: false,
  dynamicStartUrlRedirect: true,
});
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
const rewritesConfig = [
  {
    source: "/proxy/firebase/:path*",
    destination: "https://firebasestorage.googleapis.com/:path*", // no CORS issues
  },
  {
    source: "/google-map-api",
    destination: "https://maps.googleapis.com/maps/api/:path*",
  },
  {
    source: "/google-map-api/:path*",
    destination: "https://maps.googleapis.com/maps/api/:path*",
  },
];
const nextConfig = {
  rewrites: async () => rewritesConfig,
  i18n,
  reactStrictMode: false,
  swcMinify: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}",
    },
  },
  experimental: {
    // Enables the styled-components SWC transform
    // styledComponents: true,
    // legacyBrowsers: false,
    forceSwcTransforms: true,
  },
  compiler: {
    // reactStrictMode: false,
    styledComponents: true,
    // removeConsole: {
    //   exclude: ["error"],
    // },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 31536000,
    // formats: ["image/webp"],
    dangerouslyAllowSVG: true,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // sets the Content-Disposition header (inline or attachment)
    contentDispositionType: "inline",
  },
  async headers() {
    return [
      // {
      //   source: "/_next/static/:path*",
      //   headers: [
      //     {
      //       key: "cache-control",
      //       // allow Firebase Hosting to cache it for up to one year
      //       value: "public, max-age=31536000, immutable, s-maxage=31536000",
      //     },
      //   ],
      // },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|mp4|ttf|otf|woff|woff2)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: nextSafe({
          contentTypeOptions: "nosniff",
          contentSecurityPolicy: {
            "base-uri": "'none'",
            "child-src": "'none'",
            "connect-src": [
              "https://us-central1-dekitabi.cloudfunctions.net/",
              "https://img.freepik.com/",
              "https://i.ytimg.com/",
              "https://www.google.com",
              "https://google.com/",
              "https://www.google.co.jp",
              "https://www.youtube.com/",
              "https://cdn.jsdelivr.net/",
              "https://googleads.g.doubleclick.net/",
              "https://mapsresources-pa.googleapis.com/",
              "https://www.facebook.com/",
              "https://connect.facebook.net/",
              "https://accounts.google.com/",
              "https://appleid.cdn-apple.com/",
              "https://www.google.com/images/",
              "http://developers.google.com/",
              "https://developers.google.com/",
              "https://ssl.gstatic.com/",
              "https://firestore.googleapis.com",
              "https://apis.google.com/",
              "https://fcmregistrations.googleapis.com/",
              "https://fonts.gstatic.com/",
              "'self'",
              "https://stripe.com/cookie-settings/enforcement-mode",
              "https://firebasestorage.googleapis.com/",
              "https://geolocation-db.com/json/",
              "https://js.stripe.com/",
              "https://stripe.com/",
              "https://fonts.googleapis.com/",
              "https://lh3.googleusercontent.com/",
              "https://maps.gstatic.com/mapfiles/",
              "https://maps.googleapis.com/",
              "https://firebase.googleapis.com/",
              "https://firestore.googleapis.com/",
              "identitytoolkit.googleapis.com",
              "https://securetoken.googleapis.com/",
              "https://asia-northeast1-dekitabi.cloudfunctions.net/",
              "https://www.google-analytics.com/",
              "https://maps.googleapis.com/",
              "https://www.googletagmanager.com/",
              "https://firebaseinstallations.googleapis.com/",
              "",
            ],
            "default-src": [
              "'self'",
              "http://developers.google.com/",
              "https://www.youtube.com/",
            ],
            "font-src": [
              "'self'",
              "fonts.gstatic.com",
              "data:",
              "https://fonts.googleapis.com/",
            ],
            "form-action": "'self'",
            "frame-ancestors": "'none'",
            "frame-src": [
              "'none'",
              "https://www.youtube-nocookie.com/",
              "https://googleads.g.doubleclick.net/",
              "https://connect.facebook.net/",
              "https://www.googletagmanager.com/",
              "https://www.youtube.com/",
              "https://accounts.google.com/",
              "https://js.stripe.com/",
              "https://dekitabi.firebaseapp.com/",
              "https://dekitabi.com",
              "https://td.doubleclick.net/",
              "https://www.youtube.com/",
            ],
            "img-src": [
              "http//localhost:3000/",
              "https://i.ytimg.com/",
              "https://www.facebook.com/",
              "https://cdn.jsdelivr.net/",
              "https://www.google.com/",
              "https://www.google.co.jp/",
              "https://mapsresources-pa.googleapis.com/",
              "https://dekitabi.web.app",
              "https://www.dekitabi.com",
              "https://www.dekitabi.co.jp",
              "'self'",
              "https://firebasestorage.googleapis.com/",
              "maps.googleapis.com/",
              "data:",
              "www.google.com/images/",
              "https://lh3.googleusercontent.com/",
              "https://maps.gstatic.com/",
              "https://maps.googleapis.com/",
              "https://www.googletagmanager.com/",
            ],
            "manifest-src": "'self'",
            "media-src": ["'self'", " https://firebasestorage.googleapis.com/"],
            "object-src": ["'none'", "data:"],
            "prefetch-src": false,
            "script-src": [
              "'self'",
              "'unsafe-eval'",
              "'unsafe-inline'",
              "https://www.youtube.com/",
              "https://cdn.jsdelivr.net/",
              "https://googleads.g.doubleclick.net/",
              "https://connect.facebook.net/",
              "https://accounts.google.com/",
              "https://firestore.googleapis.com",
              "https://www.gstatic.com",
              "www.googletagmanager.com/",
              "https://maps.googleapis.com/",
              "https://js.stripe.com/",
              "https://maps.gstatic.com/mapfiles/",
              "https://apis.google.com/",
              "https://maps.googleapis.com/",
              "https://dekitabi.firebaseapp.com/",
              "https://appleid.cdn-apple.com/",
            ],
            "style-src": [
              "'self'",
              "'unsafe-inline'",
              "https://cdn.jsdelivr.net/",
              "https://accounts.google.com/",
              "https://fonts.googleapis.com/",
              "https://maps.gstatic.com/mapfiles/",
            ],
            "style-src-elem": [
              "https://cdn.jsdelivr.net/",
              "'self'",
              "'unsafe-inline'",
              "https://accounts.google.com/",
              "https://fonts.googleapis.com/",
              "https://cdn.ampproject.org",
            ],
            "worker-src": "'self'",
            mergeDefaultDirectives: false,
            reportOnly: false,
          },
          frameOptions: "DENY",
          permissionsPolicy: false,
          permissionsPolicyDirectiveSupport: ["proposed", "standard"],
          isDev: false,
          // Firebase Auth REST endpoints reject HTTP-referrer-restricted API keys when Referer is stripped.
          // Keep referrer minimal (origin-level on cross-origin) instead of removing it entirely.
          referrerPolicy: "strict-origin-when-cross-origin",
          xssProtection: "1; mode=block",
        }),
      },
    ];
  },
};
// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withPWA(nextConfig);
