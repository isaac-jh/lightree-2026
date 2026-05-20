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
 * 구름 하나의 폭(vm 단위). 네 구간으로 나누어 작은 구름부터 아주 큰 구름까지 골고루 나오게 한다.
 */
function randomCloudWidthVmin(): number {
  const bucket = Math.random();
  if (bucket < 0.2) return 10 + Math.random() * 12;
  if (bucket < 0.48) return 20 + Math.random() * 16;
  if (bucket < 0.78) return 34 + Math.random() * 22;
  return 52 + Math.random() * 26;
}

/**
 * 마운트 시 한 번만 호출: 세로 위치·가로 속도·진폭 등을 무작위로 부여해 자연스러운 흐름 연출.
 * 세로 좌표는 상단 반쪽 밴드 안에서만 분포된다.
 */
function buildRandomCloudSpecs(count: number): CloudSpec[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `cloud-${index}-${Math.random().toString(36).slice(2, 9)}`,
    top: `${4 + Math.random() * 86}%`,
    width: `${randomCloudWidthVmin()}vmin`,
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
 * 렌더 영역은 뷰포트 세로의 상단 50%로 제한한다.
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
      <div className={styles.upperHalf}>
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
    </div>
  );
};

export default SkyBackgroundClouds;
