import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MobileContainer from '@/components/layout/MobileContainer';
import LandingPage from '@/pages/landing/LandingPage';
import AlbumPage from '@/pages/album/AlbumPage';

/**
 * 2026 앨범 페이지 경로 UUID
 * .env 파일의 VITE_ALBUM_2026_PATH 환경변수로 관리
 * 전체 경로: /albums/2026/${ALBUM_2026_PATH}
 */
const ALBUM_2026_PATH = import.meta.env.VITE_ALBUM_2026_PATH;

/**
 * 앱 루트 컴포넌트
 *
 * 라우팅 구조:
 *   /                                    → LandingPage (흰 화면 + 로고)
 *   /albums/2026/{ALBUM_2026_PATH}       → AlbumPage (스플래시 → 홈)
 *   *                                    → / 리다이렉트
 *
 * TODO: 라우터 추가 시 Routes 블록 안에 Route를 추가
 * NOTE: 프로덕션 배포 시 모든 경로를 index.html로 fallback하는 서버 설정 필요
 *       (Nginx: try_files, Vercel/Netlify: rewrites 설정 등)
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MobileContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path={`/albums/2026/${ALBUM_2026_PATH}`}
            element={<AlbumPage />}
          />
          {/* 정의되지 않은 모든 경로 → 루트로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileContainer>
    </BrowserRouter>
  );
};

export default App;
