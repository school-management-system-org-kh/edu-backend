import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'

const languages = ['en', 'cn', 'kh'];
var langs =  localStorage.getItem("lang")
const lang = languages.includes(langs) ? langs : 'cn';

i18n.use(initReactI18next).init({
    fallbackLng: lang,
    lng: lang,
    resources: {
        en: {
            translations: require('./locales/en/translations.json')
        },
        cn: {
            translations: require('./locales/cn/translations.json')
        },
        kh: {
            translations: require('./locales/kh/translations.json')
        }

    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'cn']

export default i18n;