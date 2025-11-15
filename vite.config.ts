import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import dotenv from "dotenv";
dotenv.config();

function loadHttpsConfig() {
  const keyPath = process.env.VITE_HTTPS_KEY_PATH
  const certPath = process.env.VITE_HTTPS_CERT_PATH

  if (!keyPath || !certPath) {
    console.warn('[vite] HTTPS DESATIVADO – variáveis VITE_HTTPS_KEY_PATH e/ou VITE_HTTPS_CERT_PATH ausentes.')
    return undefined
  }

  return {
    key: fs.readFileSync(path.resolve(keyPath)),
    cert: fs.readFileSync(path.resolve(certPath)),
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    https: loadHttpsConfig(),
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
