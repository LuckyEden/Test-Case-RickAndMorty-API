import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



export default defineConfig({
  base: '/',  // Sunucu kök yolu
  build: {
    outDir: 'dist',       // Çıktı dizini
    assetsDir: 'assets',  // Asset dosyaları dizini
    sourcemap: true       // Sourcemap üretimi
  },
  plugins: [react()],     // React eklentisi
  server: {
    port: 3000,           // Geliştirme sunucusu portu
    host: true,
    open: true,           // Tarayıcıyı otomatik olarak açar
  },
  define: {
    VITE_RICK_AND_MORTY_API_URL: process.env.VITE_RICK_AND_MORTY_API_URL
  },
  resolve: {
    alias: {
      '@': '/src'         // Aliases yapılandırması
    }
  }
});