import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA  } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pashautils/',
  plugins: [react(), VitePWA({     
    registerType: 'autoUpdate', 
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'Pasha Utils App',
      short_name: 'pashautils',
      description: 'Pasha Utils App',
      "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
      ],
      "theme_color": "#176fdf",
      "background_color": "#176fdf",
    } 
  })],
})
