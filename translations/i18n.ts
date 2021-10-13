import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { TRANSLATIONS_DE } from "./de/translations";
import { TRANSLATIONS_EN } from "./en/translations";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: TRANSLATIONS_EN,
    },
    de: {
      translation: TRANSLATIONS_DE,
    },
  },
});

i18n.changeLanguage("de");
