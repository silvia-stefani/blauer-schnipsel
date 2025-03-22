import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translations from './models/translations';

const languages = ['it', 'en', 'de'];

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: { translation: translations.en },
        it: { translation: translations.it },
        de: { translation: translations.de },
    },
    lng: 'it',
    fallbackLng: 'it',
    supportedLngs: languages,
    interpolation: {
      escapeValue: false
    }
  });

export { languages };
export default i18n;
