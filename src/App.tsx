import React, { useCallback, useState } from 'react';
import MobileContainer from '@/components/layout/MobileContainer';
import SplashPage from '@/pages/splash/SplashPage';
import HomePage from '@/pages/home/HomePage';
import styles from './App.module.css';

/**
 * 앱 화면 전환 단계
 * - splash: 스플래시 화면만 표시
 * - transitioning: 스플래시 퇴장 + 홈 등장 애니메이션 진행 중
 * - home: 홈 화면만 표시
 */
type AppPhase = 'splash' | 'transitioning' | 'home';

/** 트랜지션 애니메이션 지속 시간 (ms) — CSS 애니메이션과 동기화 */
const TRANSITION_DURATION = 920;

/**
 * 앱 루트 컴포넌트
 *
 * - 스플래시 → 홈 화면 전환을 "스케치북 페이지 넘기기" 애니메이션으로 처리
 * - MobileContainer가 전체 레이아웃(모바일 고정 너비)을 보장
 * - TODO: 라우터 추가 시 HomePage 위치에 Router 컴포넌트 삽입
 */
const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('splash');

  /**
   * 스플래시 로딩 완료 핸들러
   * 스케치북 트랜지션 시작 → 완료 후 홈으로 전환
   */
  const handleSplashComplete = useCallback(() => {
    setPhase('transitioning');
    setTimeout(() => setPhase('home'), TRANSITION_DURATION);
  }, []);

  return (
    <MobileContainer>
      <div className={styles.stage}>
        {phase !== 'home' && (
          <SplashPage
            onComplete={handleSplashComplete}
            isExiting={phase === 'transitioning'}
          />
        )}
        {phase !== 'splash' && (
          <HomePage isEntering={phase === 'transitioning'} />
        )}
        {/* 화면 중앙에서 흰색이 방사형으로 퍼졌다가 사라지는 디졸브 트랜지션 */}
        {phase === 'transitioning' && (
          <div className={styles.transitionOverlay} aria-hidden="true" />
        )}
      </div>
    </MobileContainer>
  );
};

export default App;
