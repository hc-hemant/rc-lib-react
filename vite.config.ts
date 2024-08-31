import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs';
import dts from 'vite-plugin-dts'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
      exclude: ["node_modules", "**/*.test.tsx"]
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry point for your library
      name: 'rc-lib-react',
      fileName: (format) => `rc-lib-react.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Externalize dependencies that shouldn't be bundled
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        plugins: [commonjs()]
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/_global.scss";`
      },
    },
  },

})
