import React, { useEffect, useRef, useState } from 'react';
import styles from './SplashPage.module.css';

interface SplashPageProps {
  /** 로딩 완료 후 호출되는 콜백 */
  onComplete: () => void;
  /** 트랜지션 시작 여부 */
  isExiting: boolean;
}

/**
 * 스플래시 화면
 *
 * - 앱 최초 진입 시 보여지는 브랜드 로딩 화면
 * - 로딩 실제 데이터는 없으며, 로고 노출 및 브랜드 경험 제공이 목적
 * - 로딩바는 3초간 랜덤하게 채워지며 완료 후 onComplete 호출
 * - 벡터 요소들이 로고 주변에서 귀여운 애니메이션으로 부유
 */
const SplashPage: React.FC<SplashPageProps> = ({ onComplete, isExiting }) => {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    /**
     * 랜덤한 느낌의 로딩 진행 단계
     * 실제 로딩 없이 자연스러운 진행감을 연출
     * TODO: 실제 리소스 프리로딩 필요 시 각 단계에 fetch 로직 추가
     */
    const milestones: Array<{ target: number; delay: number }> = [
      { target: 18, delay: 250 },
      { target: 35, delay: 380 },
      { target: 42, delay: 500 },
      { target: 61, delay: 320 },
      { target: 74, delay: 450 },
      { target: 83, delay: 280 },
      { target: 91, delay: 360 },
      { target: 100, delay: 260 },
    ];

    let accumulated = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    milestones.forEach(({ target, delay }) => {
      accumulated += delay;
      const t = setTimeout(() => setProgress(target), accumulated);
      timers.push(t);
    });

    // 로딩 완료 후 350ms 유지 → onComplete 호출
    const doneTimer = setTimeout(() => {
      onCompleteRef.current();
    }, accumulated + 350);
    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`${styles.splash} ${isExiting ? styles.exiting : ''}`}>
      {/* ── 부유하는 벡터 장식 요소 ── */}
      <img
        src="/assets/vectors/vector_star.png"
        className={`${styles.vector} ${styles.vectorStar1}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_star.png"
        className={`${styles.vector} ${styles.vectorStar2}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_flower.png"
        className={`${styles.vector} ${styles.vectorFlower1}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_flower.png"
        className={`${styles.vector} ${styles.vectorFlower2}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_small_sun.png"
        className={`${styles.vector} ${styles.vectorSmallSun}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_sun.png"
        className={`${styles.vector} ${styles.vectorSun}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_crunch.png"
        className={`${styles.vector} ${styles.vectorCrunch}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_ribon.png"
        className={`${styles.vector} ${styles.vectorRibon}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_wave.png"
        className={`${styles.vector} ${styles.vectorWave}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_cloud.png"
        className={`${styles.vector} ${styles.vectorCloud1}`}
        alt=""
        aria-hidden="true"
      />
      <img
        src="/assets/vectors/vector_cloud.png"
        className={`${styles.vector} ${styles.vectorCloud2}`}
        alt=""
        aria-hidden="true"
      />

      {/* ── 로고 ── */}
      <div className={styles.logoArea}>
        <img
          src="/assets/logo.png"
          className={styles.logo}
          alt="라이트리 빌리지"
        />
      </div>

      {/* ── 로딩 바 ── */}
      <div className={styles.loadingBarWrapper} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={styles.loadingBar}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SplashPage;
