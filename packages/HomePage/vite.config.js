import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../../')

export default defineConfig({
  root: __dirname,
  plugins: [
    Vue(),
  ],
  build: {
    outDir: rootDir,
    assetsDir: './assets-homepage',
  },
})
