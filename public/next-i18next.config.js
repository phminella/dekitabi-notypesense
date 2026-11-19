const HttpBackend = require("i18next-http-backend/cjs");
const ChainedBackend = require("i18next-chained-backend").default;
const LocalStorageBackend = require("i18next-localstorage-backend").default;
const isBrowser = typeof window !== "undefined";
module.exports = {
  backend: {
    backendOptions: [
      { expirationTime: 60 * 60 * 1000 },
      {
        /* loadPath: 'https:// somewhere else' */
      },
    ], // 1 hour
    backends:
      typeof window !== "undefined" ? [LocalStorageBackend, HttpBackend] : [],
  },
  i18n: {
    defaultLocale: "default",
    locales: [
      "default",
      "en",
      "es",
      "tl",
      "fr",
      "id",
      "it",
      "ja",
      "ko",
      "ms",
      "pt",
      "th",
      "vi",
      "zh_cn",
      "zh_tw",
    ],
    localeDetection: false,
  },
  localeStructure: "{{lng}}/{{ns}}",
  localeExtension: "json",
  // reloadOnPrerender: true,
  defaultNS: "translation",
  fallbackNS: "translation",
  partialBundledLanguages: isBrowser && true,
  trailingSlash: true,
  serializeConfig: false,
  use: typeof window !== "undefined" ? [ChainedBackend] : [],
};
