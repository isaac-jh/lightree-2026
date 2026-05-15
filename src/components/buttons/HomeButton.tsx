import React from 'react';
import styles from './HomeButton.module.css';

interface HomeButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  /** 버튼에 같이 표시되는 텍스트 (기본값 Home — 로케일별로 호출부에서 넘김) */
  label?: string;
}

/**
 * 좌측 하단 Home 버튼.
 * - home_button.svg 아이콘 + 텍스트 레이블
 * - 라벨·aria-label 은 로케일별 문자열을 호출부에서 전달하는 것을 권장
 */
const HomeButton: React.FC<HomeButtonProps> = ({
  onClick,
  className,
  ariaLabel,
  label,
}) => (
  <button
    type="button"
    className={[styles.btn, className].filter(Boolean).join(' ')}
    onClick={onClick}
    aria-label={ariaLabel ?? 'Home'}
  >
    <img
      src="/assets/buttons/home_button.svg"
      className={styles.icon}
      alt=""
      aria-hidden="true"
    />
    <span className={styles.label}>{label ?? 'Home'}</span>
  </button>
);

export default HomeButton;
