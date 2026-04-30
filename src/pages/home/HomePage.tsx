import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainBottomButton, { MainBottomButtonText } from '@/components/buttons/MainBottomButton';
import VillageHouse from '@/components/village/VillageHouse';
import styles from './HomePage.module.css';

interface HomePageProps {
  isEntering: boolean;
}

type Phase = 'home' | 'intro';

const VILLAGE_PATH = `/albums/2026/${import.meta.env.VITE_ALBUM_2026_PATH}/home`;

const HomePage: React.FC<HomePageProps> = ({ isEntering }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('home');
  const [isReady, setIsReady] = useState(false);

  // 페이즈별 인터랙션 가능 시점
  useEffect(() => {
    setIsReady(false);
    const delay = phase === 'home' ? 2200 : 950;
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [phase]);

  const [isExiting, setIsExiting] = useState(false);

  const handleTap = useCallback(() => {
    if (!isReady) return;
    if (phase === 'home') {
      setPhase('intro');
    } else {
      // intro → village: 상단 UI 페이드아웃 후 라우팅 (씬은 VillagePage에서 그대로 이어짐)
      setIsReady(false);
      setIsExiting(true);
      setTimeout(() => navigate(VILLAGE_PATH), 380);
    }
  }, [isReady, phase, navigate]);

  const handleEng = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 언어 전환 시스템 연결
  }, []);

  const isIntro = phase === 'intro';

  return (
    <div
      className={[
        styles.page,
        isEntering ? styles.entering : '',
        isExiting ? styles.exiting : '',
      ].join(' ')}
      onClick={handleTap}
    >
      {/* 배경 */}
      <div className={styles.background} />

      {/* 씬: hill + 집 + 나무 (양 페이즈 공통). 팻말은 /home(VillagePage)에서만 등장 */}
      <div className={styles.scene} aria-hidden="true">
        {/* 뒤쪽 집 2개 (z-index 낮음) */}
        <VillageHouse houseSrc="/assets/houses/house4.svg" houseClassName={styles.house4} />
        <VillageHouse houseSrc="/assets/houses/house5.svg" houseClassName={styles.house5} />

        <img src="/assets/hill.svg" className={styles.hill} alt="" />

        {/* 뒤쪽 나무 */}
        <img src="/assets/trees/tree1.svg" className={`${styles.tree} ${styles.tree1}`} alt="" />
        <img src="/assets/trees/tree3.svg" className={`${styles.tree} ${styles.tree3}`} alt="" />
        <img src="/assets/trees/tree2.svg" className={`${styles.tree} ${styles.tree2}`} alt="" />

        {/* 중간 깊이 집 */}
        <VillageHouse houseSrc="/assets/houses/house3.svg" houseClassName={styles.house3} />
        <VillageHouse houseSrc="/assets/houses/house2.svg" houseClassName={styles.house2} />

        {/* 앞쪽 나무 */}
        <img src="/assets/trees/tree6.svg" className={`${styles.tree} ${styles.tree6}`} alt="" />
        <img src="/assets/trees/tree5.svg" className={`${styles.tree} ${styles.tree5}`} alt="" />
        <img src="/assets/trees/tree4.svg" className={`${styles.tree} ${styles.tree4}`} alt="" />

        {/* 가장 앞 큰 집 */}
        <VillageHouse houseSrc="/assets/houses/house1.svg" houseClassName={styles.house1} />
      </div>

      {/* 홈 페이즈: 로고 + 부제목 (intro 진입 시 페이드아웃) */}
      <div className={`${styles.topContent} ${isIntro ? styles.topContentHidden : ''}`}>
        <img src="/assets/logo2.svg" className={styles.logo} alt="라이트리" />
        <div className={styles.subtitleWrap}>
          <img src="/assets/sub_title_label.svg" className={styles.subtitleImg} alt="" aria-hidden="true" />
          <span className={styles.subtitleText}>2026 라이트리 빌리지</span>
        </div>
      </div>

      {/* 인트로 페이즈: intro_text_label (페이드인) */}
      <div className={`${styles.introWrap} ${isIntro ? styles.introWrapVisible : ''}`}>
        <img src="/assets/intro_text_label.svg" className={styles.introImg} alt="" aria-hidden="true" />
        <div className={styles.introContent}>
          <h2 className={styles.introTitle}>라이트리 어린이 몸찬양 앨범</h2>
          <p className={styles.introBody}>
            라이트리는 어린이 찬양을 위한 디지털 앨범 플랫폼입니다.
            <br />곡 감상, 영상 시청, 악보까지
            <br />모든 콘텐츠를 직관적으로 이용할 수 있도록 구성되어 있습니다.
          </p>
        </div>
      </div>

      {/* 하단 버튼 (텍스트만 페이즈에 따라 교체) */}
      <MainBottomButton className={styles.bottomButtonWrap}>
        <MainBottomButtonText hidden={isIntro}>라이트리 빌리지 입장하기</MainBottomButtonText>
        <MainBottomButtonText hidden={!isIntro}>다음</MainBottomButtonText>
      </MainBottomButton>

      {/* ENG 버튼 (양 페이즈 공통) */}
      <button className={styles.engButton} onClick={handleEng} aria-label="Switch to English">
        ENG
      </button>
    </div>
  );
};

export default HomePage;
