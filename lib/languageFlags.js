const LANGUAGE_FLAG_BASE_PATH = "/img/languages";
const LANGUAGE_FLAG_ABSOLUTE_BASE_PATH = "https://www.dekitabi.com/img/languages";
const LANGUAGE_FLAG_EXTENSION = "svg";
const DEFAULT_LANGUAGE_TOKEN = "English";

const SUPPORTED_LANGUAGE_TOKENS = [
  "Bahasa-Indonesia",
  "Bahasa-Melayu",
  "Català",
  "dansk",
  "Deutsch",
  "Dutch",
  "English",
  "Español",
  "Filipino",
  "Français",
  "Italiano",
  "Português",
  "Svenska",
  "Tiếng-Việt",
  "русский",
  "हिन्दी",
  "ไทย",
  "ລາວ",
  "မြန်မာဘာသာ",
  "日本語",
  "简体中文",
  "繁體中文(台湾)",
  "繁體中文(香港)",
  "한국어",
];

const CODE_TO_LANGUAGE_TOKEN = {
  en: "English",
  ja: "日本語",
  "zh-cn": "简体中文",
  "zh-tw": "繁體中文(台湾)",
  "zh-hk": "繁體中文(香港)",
  ko: "한국어",
  fil: "Filipino",
  id: "Bahasa-Indonesia",
  ms: "Bahasa-Melayu",
  th: "ไทย",
  vi: "Tiếng-Việt",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  ru: "русский",
  hi: "हिन्दी",
  de: "Deutsch",
  nl: "Dutch",
  da: "dansk",
  sv: "Svenska",
  ca: "Català",
  lo: "ລາວ",
  my: "မြန်မာဘာသာ",
};

const LANGUAGE_NAME_ALIASES = {
  arabic: DEFAULT_LANGUAGE_TOKEN,
  "العربية": DEFAULT_LANGUAGE_TOKEN,
  indonesian: "Bahasa-Indonesia",
  vietnamese: "Tiếng-Việt",
};

const normalize = (value) =>
  typeof value === "string"
    ? value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
    : "";

const TOKEN_BY_NORMALIZED_NAME = SUPPORTED_LANGUAGE_TOKENS.reduce(
  (acc, token) => {
    acc[normalize(token)] = token;
    acc[normalize(token.replace(/-/g, " "))] = token;
    return acc;
  },
  {}
);

const resolveLanguageToken = (language, code) => {
  const normalizedLanguage = normalize(language);
  if (normalizedLanguage) {
    if (LANGUAGE_NAME_ALIASES[normalizedLanguage]) {
      return LANGUAGE_NAME_ALIASES[normalizedLanguage];
    }
    if (TOKEN_BY_NORMALIZED_NAME[normalizedLanguage]) {
      return TOKEN_BY_NORMALIZED_NAME[normalizedLanguage];
    }
  }

  const normalizedCode = normalize(code).replace(/_/g, "-");
  if (normalizedCode && CODE_TO_LANGUAGE_TOKEN[normalizedCode]) {
    return CODE_TO_LANGUAGE_TOKEN[normalizedCode];
  }

  return DEFAULT_LANGUAGE_TOKEN;
};

const buildLanguageFlagPath = (basePath, languageToken) =>
  `${basePath}/language-${languageToken}.${LANGUAGE_FLAG_EXTENSION}`;

export const getLanguageFlagSrc = (language, code) =>
  buildLanguageFlagPath(
    LANGUAGE_FLAG_BASE_PATH,
    resolveLanguageToken(language, code)
  );

export const getLanguageFlagAbsoluteSrc = (language, code) =>
  buildLanguageFlagPath(
    LANGUAGE_FLAG_ABSOLUTE_BASE_PATH,
    resolveLanguageToken(language, code)
  );

