import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
      },
      "/refresh": {
        target: "http://localhost:5000/"
      },
      "/token": {
        target: "http://localhost:5000/"
      },
      "/logout": {
        target: "http://localhost:5000/"
      }
    }
  },
  plugins: [react()]
})
