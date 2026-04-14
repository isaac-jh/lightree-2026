import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

interface HomePageProps {
  /** 스플래시에서 진입 시 등장 애니메이션 */
  isEntering: boolean;
}

/** 빌리지(홈) 페이지 경로 */
const VILLAGE_PATH = `/albums/2026/${import.meta.env.VITE_ALBUM_2026_PATH}/home`;

/**
 * 홈 페이지 (메인 메뉴)
 *
 * - "시작하기" 버튼 클릭 시: 줌인 + 안개 연출 → VillagePage로 전환
 * - 레이어 구조 (z-index 낮은 → 높은 순):
 *   bg.jpg → tree(뒤) → tree(앞큰것) → house(최전면) → UI → fogOverlay
 */
const HomePage: React.FC<HomePageProps> = ({ isEntering }) => {
  const navigate = useNavigate();
  const [isZooming, setIsZooming] = useState(false);

  /**
   * 시작하기 버튼 클릭 핸들러
   * 줌+안개 애니메이션(750ms) 후 VillagePage로 이동
   */
  const handleStart = useCallback(() => {
    if (isZooming) return;
    setIsZooming(true);
    setTimeout(() => navigate(VILLAGE_PATH), 750);
  }, [isZooming, navigate]);

  return (
    <div
      className={[
        styles.page,
        isEntering ? styles.entering : '',
        isZooming  ? styles.zooming  : '',
      ].join(' ')}
    >
      {/* ── 배경 이미지 ── */}
      <div className={styles.background} />

      {/* ── 전경: 나무 & 집 씬 ── */}
      <div className={styles.scene}>
        <img src="/assets/trees/tree3.png" className={`${styles.scenePiece} ${styles.tree3}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree5.png" className={`${styles.scenePiece} ${styles.tree5}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree1.png" className={`${styles.scenePiece} ${styles.tree1}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree2.png" className={`${styles.scenePiece} ${styles.tree2}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree4.png" className={`${styles.scenePiece} ${styles.tree4}`} alt="" aria-hidden="true" />
        <img src="/assets/houses/house4.png" className={`${styles.scenePiece} ${styles.house4}`} alt="" aria-hidden="true" />
        <img src="/assets/houses/house8.png" className={`${styles.scenePiece} ${styles.house8}`} alt="" aria-hidden="true" />
      </div>

      {/* ── UI: 타이틀 + 버튼 ── */}
      <div className={styles.ui}>
        <div className={styles.titleArea}>
          <p className={styles.subtitle}>어린이 찬양 앨범</p>
          <h1 className={styles.title}>라이트리 빌리지</h1>
          <p className={styles.year}>2026</p>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.menuButton} onClick={handleStart}>
            <span className={styles.menuButtonText}>시작하기</span>
          </button>
        </div>
      </div>

      {/* ── 줌 전환 시 안개 오버레이 ── */}
      {isZooming && <div className={styles.fogOverlay} aria-hidden="true" />}
    </div>
  );
};

export default HomePage;
