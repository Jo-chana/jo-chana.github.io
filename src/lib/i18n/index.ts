import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

//@ts-ignore
import translationEn from './en.json';
//@ts-ignore
import translationKo from './ko.json';

// Add languages which you want
const resource =  {
    en: {
        translation: translationEn
    },
    ko: {
        translation: translationKo
    }
};

export type langType = keyof typeof resource;

i18n
    .use(initReactI18next)
    .init({
        resources: resource,
        lng: "ko",
        fallbackLng: 'ko',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;