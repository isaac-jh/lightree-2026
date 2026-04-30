import React from 'react';
import styles from './HomeButton.module.css';

interface HomeButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * 좌측 하단 Home 버튼.
 * - home_button.svg 아이콘 + "Home" 텍스트 레이블
 * - 호출부에서 className 으로 위치(보통 absolute bottom/left) 부여
 */
const HomeButton: React.FC<HomeButtonProps> = ({ onClick, className, ariaLabel }) => (
  <button
    type="button"
    className={[styles.btn, className].filter(Boolean).join(' ')}
    onClick={onClick}
    aria-label={ariaLabel ?? '빌리지로 이동'}
  >
    <img
      src="/assets/buttons/home_button.svg"
      className={styles.icon}
      alt=""
      aria-hidden="true"
    />
    <span className={styles.label}>Home</span>
  </button>
);

export default HomeButton;
