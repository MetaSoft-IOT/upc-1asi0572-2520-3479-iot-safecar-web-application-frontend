import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            devTools: false // Desactiva Vue DevTools overlay
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separa vue-i18n en su propio chunk para evitar problemas de linking
                    'vue-i18n': ['vue-i18n']
                }
            }
        }
    },
    // Optimizaciones para producción
    define: {
        // Configuración para Vue i18n en modo legacy
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: true,
        __INTLIFY_PROD_DEVTOOLS__: false,
    }
})
