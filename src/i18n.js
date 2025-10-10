import en from './locales/en.json';
import es from './locales/es.json';

import {createI18n} from "vue-i18n";

const i18n = createI18n({
    legacy: true, // Usar legacy mode para evitar problemas de sintaxis
    locale: 'en', // Idioma por defecto: inglés
    fallbackLocale: 'en',
    globalInjection: true,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    messages: {
        en,
        es
    }
})

export default i18n;