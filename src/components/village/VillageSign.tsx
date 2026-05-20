import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import styles from './VillageSign.module.css';

const DEFAULT_GRID_SIGN_SRC = '/assets/signs/sign.svg';

/** 텍스트 박스 기하 목적 (판 영역별 inset 분리) */
export type VillageSignOverlayLayout = 'house' | 'list';

interface VillageSignProps {
  /** 팻말 배경 SVG (미지정 시 그리드용 sign.svg) */
  signSrc?: string;
  /** 팻말 위에 표시할 곡명·라벨 (로케일 문자열) */
  label: string;
  /** 위치·크기 등 (호출부 CSS 모듈 className — 래퍼 div) */
  className?: string;
  /**
   * 텍스트 오버레이 전용 레이아웃.
   * - house: 그리드 90×48 판(sign.svg / credit_sign 동형)
   * - list: 리스트 행(list_sign.svg / list_credit_sign 동형 167×52)
   */
  overlayLayout?: VillageSignOverlayLayout;
  /** 곡명 텍스트 추가 스타일 (선택 — 호환용) */
  labelClassName?: string;
  /** 그리드 뷰 등장 pop 애니메이션 */
  animated?: boolean;
  /** pop 애니메이션 delay (예: '0.45s') */
  animationDelay?: string;
  /** 그리드↔리스트 전환 시 페이드아웃 */
  hidden?: boolean;
}

/**
 * 팻말 SVG + 텍스트 오버레이.
 * overlayLayout 에 따라 다른 inset/타이포 (집 옆 리스트 간 간섭 금지).
 */
const VillageSign: React.FC<VillageSignProps> = ({
  signSrc = DEFAULT_GRID_SIGN_SRC,
  label,
  className,
  overlayLayout = 'house',
  labelClassName,
  animated = true,
  animationDelay,
  hidden,
}) => {
  const { locale } = useLocale();
  /** 영어 줄 수가 많을 때 레이아웃 전용으로 살짝 축소 */
  const localeFontAccent =
    locale !== 'en'
      ? ''
      : overlayLayout === 'house'
        ? styles.localeEnHouse
        : styles.localeEnList;

  let overlayCls = styles.overlayHouse;
  if (overlayLayout === 'list') overlayCls = styles.overlayList;

  return (
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
      <span
        className={[
          overlayCls,
          localeFontAccent,
          labelClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </span>
    </div>
  );
};

export default VillageSign;
