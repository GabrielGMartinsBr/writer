import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';
import { tclassesPlugin } from 'vite-plugin-tclasses';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tclassesPlugin()
  ],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
})
