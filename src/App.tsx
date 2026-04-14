import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MobileContainer from '@/components/layout/MobileContainer';
import LandingPage from '@/pages/landing/LandingPage';
import AlbumPage from '@/pages/album/AlbumPage';
import VillagePage from '@/pages/village/VillagePage';

/**
 * 2026 앨범 기본 경로
 * .env 파일의 VITE_ALBUM_2026_PATH 환경변수로 관리
 */
const ALBUM_2026_BASE = `/albums/2026/${import.meta.env.VITE_ALBUM_2026_PATH}`;

/**
 * 앱 루트 컴포넌트
 *
 * 라우팅 구조:
 *   /                              → LandingPage  (흰 화면 + 로고)
 *   /albums/2026/{UUID}            → AlbumPage    (스플래시 → 메인)
 *   /albums/2026/{UUID}/home       → VillagePage  (마을 지도 – 집 5채)
 *   *                              → / 리다이렉트
 *
 * TODO: 개별 곡 페이지 라우트 추가 시 /albums/2026/{UUID}/songs/:songId 형태로 추가
 * NOTE: 프로덕션 배포 시 모든 경로를 index.html로 fallback하는 서버 설정 필요
 *       (Vercel: vercel.json rewrites, Nginx: try_files 등)
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MobileContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={ALBUM_2026_BASE}           element={<AlbumPage />} />
          <Route path={`${ALBUM_2026_BASE}/home`} element={<VillagePage />} />
          {/* 정의되지 않은 모든 경로 → 루트로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileContainer>
    </BrowserRouter>
  );
};

export default App;
