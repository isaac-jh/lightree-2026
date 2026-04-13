import React from 'react';
import styles from './HomePage.module.css';

interface HomePageProps {
  /** 스플래시에서 진입 시 등장 애니메이션 */
  isEntering: boolean;
}

/**
 * 홈 페이지 (메인 메뉴)
 *
 * - 배경: bg.jpg (하늘 + 산 + 초원)
 * - 전경: 나무 + 집 레이어 (assets/trees, assets/houses)
 * - 제목 텍스트: "어린이 찬양 앨범 / 라이트리 빌리지 / 2026"
 * - 메뉴 버튼 3개 (TODO: 버튼별 라우팅 연결)
 *
 * 레이어 구조 (z-index 낮은 → 높은 순):
 *   bg.jpg → tree(뒤) → tree(앞큰것) → house(최전면) → UI
 */
const HomePage: React.FC<HomePageProps> = ({ isEntering }) => {
  return (
    <div className={`${styles.page} ${isEntering ? styles.entering : ''}`}>
      {/* ── 배경 이미지 ── */}
      <div className={styles.background} />

      {/* ── 전경: 나무 & 집 씬 ── */}
      <div className={styles.scene}>
        {/* 뒤쪽 나무들 */}
        <img src="/assets/trees/tree3.png" className={`${styles.scenePiece} ${styles.tree3}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree5.png" className={`${styles.scenePiece} ${styles.tree5}`} alt="" aria-hidden="true" />

        {/* 앞쪽 큰 나무들 */}
        <img src="/assets/trees/tree1.png" className={`${styles.scenePiece} ${styles.tree1}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree2.png" className={`${styles.scenePiece} ${styles.tree2}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree4.png" className={`${styles.scenePiece} ${styles.tree4}`} alt="" aria-hidden="true" />

        {/* 집 2채: 나무보다 앞 레이어 */}
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

        {/* TODO: 버튼 라벨 및 라우팅 연결 */}
        <div className={styles.buttonGroup}>
          <button className={styles.menuButton}>
            <span className={styles.menuButtonText}>시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
