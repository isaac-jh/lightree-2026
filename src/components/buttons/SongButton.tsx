import React, { useCallback } from 'react';
import styles from './SongButton.module.css';

interface SongButtonProps {
  /** 버튼 좌측에 표시될 벡터 아이콘 SVG 경로 (song_button_*_vector.svg) */
  vectorSrc: string;
  /** 버튼 라벨 텍스트 */
  label: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /**
   * 곡 메뉴 항목 coming soon (예: 스페인어 ver.) — opacity 40%, 클릭 불가.
   * SongDetail / SongMenuBottomSheet 전용. 빌리지 집·팻말과 분리됨.
   */
  comingSoon?: boolean;
  /** 접근성 라벨 (기본값: label) */
  ariaLabel?: string;
}

/**
 * 곡 상세 페이지의 메뉴 버튼 컴포넌트.
 * 베이스(공통 흰 배경 + 파란 보더), 벡터 아이콘, 텍스트 3개를 합성한다.
 */
const SongButton: React.FC<SongButtonProps> = ({
  vectorSrc,
  label,
  onClick,
  comingSoon = false,
  ariaLabel,
}) => {
  const handleClick = useCallback(() => {
    if (comingSoon) return;
    onClick?.();
  }, [comingSoon, onClick]);

  return (
    <button
      type="button"
      className={[styles.songButton, comingSoon ? styles.comingSoon : ''].filter(Boolean).join(' ')}
      data-coming-soon={comingSoon ? '' : undefined}
      onClick={handleClick}
      aria-label={ariaLabel ?? label}
      aria-disabled={comingSoon}
    >
      <img
        src="/assets/buttons/song_button_base.svg"
        className={styles.base}
        alt=""
        aria-hidden="true"
      />
      <span className={styles.content}>
        <span className={styles.vectorWrap}>
          <img src={vectorSrc} className={styles.vector} alt="" aria-hidden="true" />
        </span>
        <span className={styles.label}>{label}</span>
      </span>
    </button>
  );
};

export default SongButton;
