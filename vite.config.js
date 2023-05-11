import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),cesium()],
  server:{
    open: true,
    host: '0.0.0.0',
    port: 8084,
    https: false,
    hotOnly: false,
    // proxy:{
    //   '/ArcGIS':{
    //     target:'http://services.arcgisonline.com',
    //     secure: false,
    //     changeOrigin:true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   }
    // }
  }
})
