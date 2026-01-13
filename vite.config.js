import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    base: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                services: 'services.html',
                contact: 'contact.html',
                about: 'about.html',
                faq: 'faq.html'
            }
        }
    }
})
