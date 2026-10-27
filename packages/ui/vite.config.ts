import { defineConfig, esmExternalRequirePlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'] }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'SchemaVisualizerUI',
      fileName: 'index',
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@schema-visualizer/core': 'SchemaVisualizerCore',
        },
      },
      plugins: [
        esmExternalRequirePlugin({
          external: ['react', 'react-dom', '@schema-visualizer/core'],
        }),
      ],
    },
  },
})