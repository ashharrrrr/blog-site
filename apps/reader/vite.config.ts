import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwdincss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwdincss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,  "./src")
    }
  }
})
