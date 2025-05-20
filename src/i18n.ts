import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enUI from "./locales/en/translation.json";
import ruUI from "./locales/ru/translation.json";
import hyUI from "./locales/hy/translation.json";

import enSEO from "./locales/en/seo.json";
import ruSEO from "./locales/ru/seo.json";
import hySEO from "./locales/hy/seo.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enUI, seo: enSEO },
      ru: { translation: ruUI, seo: ruSEO },
      hy: { translation: hyUI, seo: hySEO }
    },
    fallbackLng: "en",
    detection: {
      order: ["path", "navigator"],
      lookupFromPathIndex: 0,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
