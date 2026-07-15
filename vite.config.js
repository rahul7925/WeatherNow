import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Warn when any chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Split vendor code into a separate chunk for better caching
        manualChunks: {
          react:         ['react', 'react-dom'],
          framer:        ['framer-motion'],
          'react-icons': ['react-icons'],
          axios:         ['axios'],
        },
      },
    },
  },

  // Silence noisy dev logs; keep errors visible
  server: {
    open: false,
  },
})
