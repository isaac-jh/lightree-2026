import React, { useMemo } from 'react';
import styles from './SkyBackgroundClouds.module.css';

/** 동시에 보이는 구름 개수 (랜덤 파라미터는 마운트 시 1회만 생성) */
const CLOUD_COUNT = 8;

interface CloudSpec {
  /** 스테이블 id (리스트 key) */
  id: string;
  top: string;
  width: string;
  driftDurationSec: number;
  driftDelaySec: number;
  bobDurationSec: number;
  opacity: number;
}

/**
 * 마운트 시 한 번만 호출: 세로 위치·가로 속도·진폭 등을 무작위로 부여해 자연스러운 흐름 연출.
 */
function buildRandomCloudSpecs(count: number): CloudSpec[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `cloud-${index}-${Math.random().toString(36).slice(2, 9)}`,
    top: `${6 + Math.random() * 78}%`,
    width: `${20 + Math.random() * 34}vmin`,
    driftDurationSec: 42 + Math.random() * 78,
    driftDelaySec: -Math.random() * 110,
    bobDurationSec: 3.5 + Math.random() * 6,
    opacity: 0.42 + Math.random() * 0.38,
  }));
}

interface SkyBackgroundCloudsProps {
  /** 부모가 `position: relative`일 때 겹침 기준 (기본 sky 루트) */
  className?: string;
}

/**
 * bg.svg에서 분리한 `cloud.svg`를 여러 겹 쌓아, 오른쪽 바깥에서 왼쪽으로 선형 이동 +
 * 내부 레이어에서 상하로 부드럽게 흔들리는 애니메이션을 적용한다.
 * 접근성: `prefers-reduced-motion` 시 이동 애니메이션을 끈다.
 */
const SkyBackgroundClouds: React.FC<SkyBackgroundCloudsProps> = ({
  className,
}) => {
  const specs = useMemo(() => buildRandomCloudSpecs(CLOUD_COUNT), []);

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {specs.map((spec) => (
        <div
          key={spec.id}
          className={styles.drift}
          style={{
            top: spec.top,
            width: spec.width,
            opacity: spec.opacity,
            animationDuration: `${spec.driftDurationSec}s`,
            animationDelay: `${spec.driftDelaySec}s`,
          }}
        >
          <div
            className={styles.bob}
            style={{
              animationDuration: `${spec.bobDurationSec}s`,
              animationDelay: `${spec.driftDelaySec * 0.12}s`,
            }}
          >
            <img
              src="/assets/cloud.svg"
              className={styles.img}
              alt=""
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkyBackgroundClouds;
