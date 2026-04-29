import React, { useCallback, useState } from 'react';
import SplashPage from '@/pages/splash/SplashPage';
import HomePage from '@/pages/home/HomePage';
import styles from './AlbumPage.module.css';

/**
 * 앨범 화면 전환 단계
 * - splash       : 스플래시 화면
 * - transitioning: 흰색 디졸브 트랜지션 진행 중
 * - home         : 메인 화면
 */
type AlbumPhase = 'splash' | 'transitioning' | 'home';

/** 트랜지션 애니메이션 총 지속 시간 (ms) — CSS와 동기화 */
const TRANSITION_DURATION = 700;

/**
 * 2026 앨범 페이지
 *
 * - 경로: /albums/2026/${VITE_ALBUM_2026_PATH}
 * - 스플래시 → 흰색 방사형 디졸브 → 홈 화면 순서로 전환
 * - TODO: 홈 화면 내 버튼에 실제 라우팅 연결
 */
const AlbumPage: React.FC = () => {
  const [phase, setPhase] = useState<AlbumPhase>('splash');

  /**
   * 스플래시 로딩 완료 핸들러
   * 디졸브 트랜지션 시작 → 완료 후 홈으로 전환
   */
  const handleSplashComplete = useCallback(() => {
    setPhase('transitioning');
    setTimeout(() => setPhase('home'), TRANSITION_DURATION);
  }, []);

  return (
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
    </div>
  );
};

export default AlbumPage;
