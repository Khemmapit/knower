import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./config/locale/en";
import th from "./config/locale/th";
// the translations
// (tip move them in a JSON file and import them)

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    resources: { en, th },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
