import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";
i18n
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en",
    fallbackLng: "en",
    // resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    partialBundledLanguages: true,
  });
export default i18n;
