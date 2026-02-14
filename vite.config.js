import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    base: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                services: 'services.html',
                contact: 'contact.html',
                faq: 'faq.html',
                // Individual Service Pages
                uniform: 'uniform-security.html',
                office: 'office-security.html',
                event: 'event-security.html',
                loss_prevention: 'loss-prevention.html',
                elite: 'elite-security.html',
                concierge: 'concierge-security.html',
                executive: 'executive-protection.html',
                house: 'house-protection.html'
            }
        }
    }
})
