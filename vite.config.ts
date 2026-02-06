import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.woff2'],

  // PERFORMANCE OPTIMIZATIONS
  build: {
    // Target modern browsers for faster builds
    target: 'esnext',

    // Disable source maps in production
    sourcemap: false,

    // Minify output
    minify: 'esbuild',

    // Optimize CSS code splitting
    cssCodeSplit: true,

    // Reduce build warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for better caching
    rollupOptions: {
      output: {
        // Don't use manual chunks - let Vite handle it optimally
        manualChunks: undefined,

        // Add cache busting to filenames
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    force: true,
  },
})
