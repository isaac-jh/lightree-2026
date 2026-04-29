import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

interface HomePageProps {
  isEntering: boolean;
}

const VILLAGE_PATH = `/albums/2026/${import.meta.env.VITE_ALBUM_2026_PATH}/home`;

const HomePage: React.FC<HomePageProps> = ({ isEntering }) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = useCallback(() => {
    if (!isReady) return;
    navigate(VILLAGE_PATH);
  }, [isReady, navigate]);

  const handleEng = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 언어 전환 시스템 연결
  }, []);

  return (
    <div
      className={[styles.page, isEntering ? styles.entering : ''].join(' ')}
      onClick={handleTap}
    >
      {/* 배경 */}
      <div className={styles.background} />

      {/* 씬: hill + 집 + 나무 (한 덩어리로 아래에서 올라옴)
          DOM 순서 = 페인트 순서. z-index로 최종 깊이 결정 */}
      <div className={styles.scene} aria-hidden="true">
        {/* 뒤쪽 언덕 */}
        <img src="/assets/hill_second.svg" className={styles.hillSecond} alt="" />

        {/* 언덕 위 집 (뒤) */}
        <img src="/assets/houses/house4.svg" className={`${styles.house} ${styles.house4}`} alt="" />
        <img src="/assets/houses/house5.svg" className={`${styles.house} ${styles.house5}`} alt="" />

        {/* 메인 언덕 */}
        <img src="/assets/hill.svg" className={styles.hill} alt="" />

        {/* 언덕 위 나무 (뒤쪽) */}
        <img src="/assets/trees/tree1.svg" className={`${styles.tree} ${styles.tree1}`} alt="" />
        <img src="/assets/trees/tree3.svg" className={`${styles.tree} ${styles.tree3}`} alt="" />
        <img src="/assets/trees/tree2.svg" className={`${styles.tree} ${styles.tree2}`} alt="" />

        {/* 중간 깊이 집 */}
        <img src="/assets/houses/house3.svg" className={`${styles.house} ${styles.house3}`} alt="" />
        <img src="/assets/houses/house2.svg" className={`${styles.house} ${styles.house2}`} alt="" />

        {/* 중간 나무 */}
        <img src="/assets/trees/tree6.svg" className={`${styles.tree} ${styles.tree6}`} alt="" />

        {/* 전면 작은 덤불 */}
        <img src="/assets/trees/tree5.svg" className={`${styles.tree} ${styles.tree5}`} alt="" />
        <img src="/assets/trees/tree4.svg" className={`${styles.tree} ${styles.tree4}`} alt="" />

        {/* 가장 앞 큰 집 */}
        <img src="/assets/houses/house1.svg" className={`${styles.house} ${styles.house1}`} alt="" />
      </div>

      {/* 상단: 로고 + 부제목 */}
      <div className={styles.topContent}>
        <img src="/assets/logo2.svg" className={styles.logo} alt="라이트리" />
        <div className={styles.subtitleWrap}>
          <img src="/assets/sub_title_label.svg" className={styles.subtitleImg} alt="" aria-hidden="true" />
          <span className={styles.subtitleText}>2026 라이트리 빌리지</span>
        </div>
      </div>

      {/* 하단 입장 버튼 */}
      <div className={styles.bottomButtonWrap}>
        <img src="/assets/buttons/main_bottom_button.svg" className={styles.bottomButtonImg} alt="" aria-hidden="true" />
        <span className={styles.bottomButtonText}>라이트리 빌리지 입장하기</span>
      </div>

      {/* ENG 버튼 */}
      <button className={styles.engButton} onClick={handleEng} aria-label="Switch to English">
        ENG
      </button>
    </div>
  );
};

export default HomePage;
