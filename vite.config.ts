import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // production 빌드에서 console.log/info/debug 제거 (error/warn 유지)
  esbuild:
    mode === 'production'
      ? {
          pure: ['console.log', 'console.debug', 'console.info', 'console.warn', 'console.error'],
          drop: ['debugger'],
        }
      : {},
}));
