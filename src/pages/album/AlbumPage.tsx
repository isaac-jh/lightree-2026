import React from 'react';
import HomePage from '@/pages/home/HomePage';
import styles from './AlbumPage.module.css';

/**
 * 2026 앨범 페이지
 *
 * - 경로: /albums/2026/${VITE_ALBUM_2026_PATH}
 * - 이전에 있던 스플래시(로딩 화면)는 사용하지 않게 되어 제거됨 → 곧바로 홈을 렌더
 */
const AlbumPage: React.FC = () => {
  return (
    <div className={styles.stage}>
      <HomePage />
    </div>
  );
};

export default AlbumPage;
