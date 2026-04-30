import React from 'react';
import styles from './MainBottomButton.module.css';

interface MainBottomButtonProps {
  /** 단일 텍스트(간단한 사용). children과 동시 지정 시 children 우선 */
  text?: React.ReactNode;
  /** 자유 구성 (예: 크로스페이드를 위해 여러 Text 동시 렌더) */
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
}

interface MainBottomButtonTextProps {
  children: React.ReactNode;
  className?: string;
  /** opacity:0 으로 숨김 (페이드 전환용) */
  hidden?: boolean;
}

/** 버튼 위에 올라가는 텍스트 오버레이. 기본 글꼴/색상/중앙 정렬 적용 */
export const MainBottomButtonText: React.FC<MainBottomButtonTextProps> = ({ children, className, hidden }) => (
  <span
    className={[
      styles.text,
      hidden ? styles.textHidden : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </span>
);

/**
 * main_bottom_button.svg(전면 가로 버튼)을 배경으로 한 하단 메인 버튼.
 * - 간단 사용: text prop
 * - 고급 사용: children + MainBottomButtonText (크로스페이드 등)
 */
const MainBottomButton: React.FC<MainBottomButtonProps> = ({
  text,
  children,
  onClick,
  className,
  ariaLabel,
}) => {
  const content =
    children ??
    (text != null ? <MainBottomButtonText>{text}</MainBottomButtonText> : null);

  const fallbackAriaLabel = typeof text === 'string' ? text : undefined;

  return (
    <button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={ariaLabel ?? fallbackAriaLabel}
    >
      <img
        src="/assets/buttons/main_bottom_button.svg"
        className={styles.img}
        alt=""
        aria-hidden="true"
      />
      {content}
    </button>
  );
};

export default MainBottomButton;
