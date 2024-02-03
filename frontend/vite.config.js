import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    esbuild: {
      loader: { '.js': 'jsx' },
    },
  },
  base: "./",
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__test__/setup.js',
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
    mockReset: true,
    testTimeout: 10000,
  },
})
