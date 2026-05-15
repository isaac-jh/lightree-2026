import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainBottomButton, { MainBottomButtonText } from '@/components/buttons/MainBottomButton';
import VillageHouse from '@/components/village/VillageHouse';
import { useLocale } from '@/context/LocaleContext';
import styles from './HomePage.module.css';

type Phase = 'home' | 'intro';

const VILLAGE_PATH = `/albums/2026/${import.meta.env.VITE_ALBUM_2026_PATH}/home`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { messages, toggleLocale } = useLocale();
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

  const handleEng = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleLocale();
    },
    [toggleLocale],
  );

  const isIntro = phase === 'intro';

  return (
    <div
      className={[styles.page, isExiting ? styles.exiting : ''].join(' ')}
      onClick={handleTap}
    >
      {/* 배경 */}
      <div className={styles.background} />

      {/* 씬: hill + 집 + 나무 (양 페이즈 공통). 팻말은 /home(VillagePage)에서만 등장 */}
      <div className={styles.scene} aria-hidden="true">
        <img src="/assets/hill.svg" className={styles.hill} alt="" />
        <img src="/assets/trees/tree2.svg" className={`${styles.tree} ${styles.tree1}`} alt="" />
        <img src="/assets/trees/tree3.svg" className={`${styles.tree} ${styles.tree2}`} alt="" />
        <VillageHouse
          houseSrc="/assets/houses/house5.svg" 
          houseClassName={styles.house5}
          tree1Src="/assets/trees/tree1.svg"
          tree1ClassName={styles.house5Tree1}
          tree2Src="/assets/trees/tree1.svg"
          tree2ClassName={styles.house5Tree2}
        />
        <VillageHouse 
          houseSrc="/assets/houses/house4.svg"
          houseClassName={styles.house4} 
          tree1Src="/assets/trees/tree3.svg"
          tree1ClassName={styles.house4Tree1}
          tree2Src="/assets/trees/tree1.svg"
          tree2ClassName={styles.house4Tree2}
        />
        <VillageHouse 
          houseSrc="/assets/houses/house3.svg" 
          houseClassName={styles.house3} 
          tree1Src="/assets/trees/tree4.svg"
          tree1ClassName={styles.house3Tree1}
        />
        <VillageHouse
          houseSrc="/assets/houses/house2.svg"
          houseClassName={styles.house2} 
          tree1Src="/assets/trees/tree1.svg"
          tree1ClassName={styles.house2Tree1}
          tree2Src="/assets/trees/tree1.svg"
          tree2ClassName={styles.house2Tree2}
        />
        <VillageHouse
          houseSrc="/assets/houses/house1.svg"
          houseClassName={styles.house1}
          tree1Src="/assets/trees/tree5.svg"
          tree1ClassName={styles.house1Tree1}
        />
      </div>

      {/* 홈 페이즈: 로고 + 부제목 (intro 진입 시 페이드아웃) */}
      <div className={`${styles.topContent} ${isIntro ? styles.topContentHidden : ''}`}>
        <img src="/assets/logo2.svg" className={styles.logo} alt={messages.brandAlt} />
        <div className={styles.subtitleWrap}>
          <img src="/assets/sub_title_label.svg" className={styles.subtitleImg} alt="" aria-hidden="true" />
          <span className={styles.subtitleText}>{messages.home.subtitle2026}</span>
        </div>
      </div>

      {/* 인트로 페이즈: intro_text_label (페이드인) */}
      <div className={`${styles.introWrap} ${isIntro ? styles.introWrapVisible : ''}`}>
        <img src="/assets/intro_text_label.svg" className={styles.introImg} alt="" aria-hidden="true" />
        <div className={styles.introContent}>
          <h2 className={styles.introTitle}>{messages.home.introTitle}</h2>
          <p className={styles.introBody}>
            {messages.home.introBodyLines.map((line, i) => (
              <React.Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* 하단 버튼 (텍스트만 페이즈에 따라 교체) */}
      <MainBottomButton className={styles.bottomButtonWrap}>
        <MainBottomButtonText hidden={isIntro}>{messages.home.btnEnterVillage}</MainBottomButtonText>
        <MainBottomButtonText hidden={!isIntro}>{messages.home.btnNext}</MainBottomButtonText>
      </MainBottomButton>

      <button
        type="button"
        className={styles.engButton}
        onClick={handleEng}
        aria-label={messages.langToggleAria}
      >
        {messages.langToggleLabel}
      </button>
    </div>
  );
};

export default HomePage;
