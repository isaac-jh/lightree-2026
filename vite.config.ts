import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

/**
 * Vite 빌드 설정
 * - React 플러그인으로 JSX/TSX 트랜스파일
 * - @ 경로 별칭: src/ 디렉토리를 @로 참조
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
