import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/prompt': {
        target: 'http://78.47.91.64:8000',
      },
      '/status': {
        target: 'http://78.47.91.64:8000',
      },
    },
  }
})