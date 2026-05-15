import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ALBUM_2026_BASE } from '@/constants/albumPaths';
import { LocaleProvider } from '@/context/LocaleContext';
import MobileContainer from '@/components/layout/MobileContainer';
import LandingPage from '@/pages/landing/LandingPage';
import AlbumPage from '@/pages/album/AlbumPage';
import VillagePage from '@/pages/village/VillagePage';
import VillageCreditsPage from '@/pages/village/VillageCreditsPage';
import VillageSongDetailPage from '@/pages/village/VillageSongDetailPage';
import VillageSongResourcePage from '@/pages/village/VillageSongResourcePage';

/**
 * 앱 루트 컴포넌트
 *
 * 라우팅 구조:
 *   /                              → LandingPage  (흰 화면 + 로고)
 *   /albums/2026/{UUID}            → AlbumPage    (메인 화면)
 *   /albums/2026/{UUID}/home       → VillagePage  (마을 지도 – 집 5채)
 *   /albums/2026/{UUID}/home/credits   → VillageCreditsPage (스텝 크레딧)
 *   /albums/2026/{UUID}/home/:id       → VillageSongDetailPage (곡 허브, id = 1~5)
 *   /albums/2026/{UUID}/home/:id/:sub  → VillageSongResourcePage (리소스)
 *   *                              → / 리다이렉트
 * NOTE: 프로덕션 배포 시 모든 경로를 index.html로 fallback하는 서버 설정 필요
 *       (Vercel: vercel.json rewrites, Nginx: try_files 등)
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <MobileContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={ALBUM_2026_BASE}           element={<AlbumPage />} />
          <Route path={`${ALBUM_2026_BASE}/home`} element={<VillagePage />} />
          <Route
            path={`${ALBUM_2026_BASE}/home/credits`}
            element={<VillageCreditsPage />}
          />
          <Route
            path={`${ALBUM_2026_BASE}/home/:songId/:subSlug`}
            element={<VillageSongResourcePage />}
          />
          <Route
            path={`${ALBUM_2026_BASE}/home/:songId`}
            element={<VillageSongDetailPage />}
          />
          {/* 정의되지 않은 모든 경로 → 루트로 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </MobileContainer>
      </LocaleProvider>
    </BrowserRouter>
  );
};

export default App;
