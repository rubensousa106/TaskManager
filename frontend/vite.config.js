import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,          // se 5173 estiver ocupada, dá erro (não muda para 5174)
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
})
