import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './data/en/en.json';
import it from './data/it/it.json';
import de from './data/de/de.json';

const languages = ['it', 'en', 'de'];

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: { translation: en },
        it: { translation: it },
        de: { translation: de },
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
