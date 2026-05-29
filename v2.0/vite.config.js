import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api:        path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      hooks:      path.resolve(__dirname, 'src/hooks'),
      context:    path.resolve(__dirname, 'src/context'),
      layouts:    path.resolve(__dirname, 'src/layouts'),
      pages:      path.resolve(__dirname, 'src/pages'),
      router:     path.resolve(__dirname, 'src/router'),
      constants:  path.resolve(__dirname, 'src/constants'),
      utils:      path.resolve(__dirname, 'src/utils'),
      styles:     path.resolve(__dirname, 'src/styles'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  }
})