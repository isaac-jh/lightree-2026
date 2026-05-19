import React from 'react';
import styles from './VillageSign.module.css';

const DEFAULT_GRID_SIGN_SRC = '/assets/signs/sign.svg';

interface VillageSignProps {
  /** 팻말 배경 SVG (미지정 시 그리드용 sign.svg) */
  signSrc?: string;
  /** 팻말 위에 표시할 곡명·라벨 (로케일 문자열) */
  label: string;
  /** 위치·크기 등 (호출부 CSS 모듈 className) */
  className?: string;
  /** 곡명 텍스트 추가 스타일 (리스트 뷰 등) */
  labelClassName?: string;
  /** 그리드 뷰 등장 pop 애니메이션 */
  animated?: boolean;
  /** pop 애니메이션 delay (예: '0.45s') */
  animationDelay?: string;
  /** 그리드↔리스트 전환 시 페이드아웃 */
  hidden?: boolean;
}

/**
 * 글자 없는 팻말 SVG + 텍스트 오버레이.
 * 그리드(집 옆)·리스트·크레딧 간판 등에서 공통 사용.
 */
const VillageSign: React.FC<VillageSignProps> = ({
  signSrc = DEFAULT_GRID_SIGN_SRC,
  label,
  className,
  labelClassName,
  animated = true,
  animationDelay,
  hidden,
}) => (
  <div
    className={[
      styles.sign,
      animated ? styles.signAnimated : '',
      className,
      hidden ? styles.hidden : '',
    ]
      .filter(Boolean)
      .join(' ')}
    style={animationDelay ? { animationDelay } : undefined}
    aria-hidden={hidden ? true : undefined}
  >
    <img src={signSrc} className={styles.signImg} alt="" aria-hidden="true" />
    <span className={[styles.signLabel, labelClassName].filter(Boolean).join(' ')}>
      {label}
    </span>
  </div>
);

export default VillageSign;
