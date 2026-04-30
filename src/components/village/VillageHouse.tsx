import React from 'react';
import styles from './VillageHouse.module.css';

interface VillageHouseProps {
  /** 집 SVG 경로 */
  houseSrc: string;
  /** 팻말 SVG 경로. 미지정 시 팻말 미렌더 (HomePage 등 /home 외 화면) */
  signSrc?: string;
  /** 클릭 시 부모로 전달되는 곡 번호. onClick과 함께 지정 시 집이 버튼이 됨 */
  songId?: number;
  /** 집 위치/사이즈 className (예: page CSS의 styles.house1) */
  houseClassName?: string;
  /** 팻말 위치/사이즈 className (예: page CSS의 styles.sign1) */
  signClassName?: string;
  /** 팻말 등장(scale pop) 애니메이션 딜레이 (예: '0.45s') */
  signDelay?: string;
  /**
   * 그리드↔리스트 전환 등으로 집·팻말을 페이드아웃 시킬 때 true.
   * (마운트 시 팻말 pop 애니메이션은 그대로 진행)
   */
  hidden?: boolean;
  /**
   * 집 버튼 클릭 핸들러. 지정 시 집이 `<button>` 으로 렌더되며, 미지정 시 `<img>` (장식용).
   * 부모는 e의 좌표로 ripple 시작 위치 계산, songId로 라우팅.
   */
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    songId: number,
  ) => void;
  /** 집 옆에 함께 렌더할 추가 요소 (예: 나무) — 위치는 호출부 CSS로 부여 */
  children?: React.ReactNode;
}

/**
 * 빌리지 페이지의 집 슬롯 (집 + 옵션 팻말).
 *
 * - onClick + songId 지정 시: 집이 `<button>` (인터랙티브, /home 빌리지 화면)
 * - 둘 다 미지정 시: 집이 `<img>` (장식용, HomePage 등)
 *
 * - signSrc 가 있으면 팻말이 함께 렌더되며, 마운트 시 scale pop 애니메이션
 *   (signDelay 로 stagger 가능). 팻말은 호출부에서 signSrc 제공 여부로 토글됨.
 *
 * - hidden=true 시 집·팻말 페이드아웃 (그리드 → 리스트 뷰 전환 등)
 */
const VillageHouse: React.FC<VillageHouseProps> = ({
  houseSrc,
  signSrc,
  songId,
  houseClassName,
  signClassName,
  signDelay,
  hidden,
  onClick,
  children,
}) => {
  const isInteractive = !!onClick && songId !== undefined;

  const houseElement = isInteractive ? (
    <button
      type="button"
      className={[styles.houseBtn, houseClassName, hidden ? styles.hidden : '']
        .filter(Boolean)
        .join(' ')}
      onClick={(e) => onClick!(e, songId!)}
      aria-label={`${songId}번 곡으로 이동`}
    >
      <img src={houseSrc} alt="" aria-hidden="true" />
    </button>
  ) : (
    <img
      src={houseSrc}
      className={[styles.houseImg, houseClassName, hidden ? styles.hidden : '']
        .filter(Boolean)
        .join(' ')}
      alt=""
      aria-hidden="true"
    />
  );

  return (
    <>
      {houseElement}
      {signSrc && (
        <img
          src={signSrc}
          className={[styles.signImg, signClassName, hidden ? styles.hidden : '']
            .filter(Boolean)
            .join(' ')}
          style={signDelay ? { animationDelay: signDelay } : undefined}
          alt=""
          aria-hidden="true"
        />
      )}
      {children}
    </>
  );
};

export default VillageHouse;
