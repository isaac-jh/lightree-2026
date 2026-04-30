import React from 'react';
import styles from './SongDetailBottomButton.module.css';

interface SongDetailBottomButtonProps {
  /** 단일 텍스트(간단한 사용). children과 동시 지정 시 children 우선 */
  text?: React.ReactNode;
  /** 자유 구성 (예: 크로스페이드를 위해 여러 Text 동시 렌더) */
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
}

interface SongDetailBottomButtonTextProps {
  children: React.ReactNode;
  className?: string;
  /** opacity:0 으로 숨김 (페이드 전환용) */
  hidden?: boolean;
}

/** 버튼 위에 올라가는 텍스트 오버레이. 기본 글꼴/색상/중앙 정렬 적용 */
export const SongDetailBottomButtonText: React.FC<SongDetailBottomButtonTextProps> = ({
  children,
  className,
  hidden,
}) => (
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
 * song_detail_bottom_button.svg(곡 상세용 하단 버튼)을 배경으로 한 버튼.
 * 사용법은 MainBottomButton과 동일.
 */
const SongDetailBottomButton: React.FC<SongDetailBottomButtonProps> = ({
  text,
  children,
  onClick,
  className,
  ariaLabel,
}) => {
  const content =
    children ??
    (text != null ? <SongDetailBottomButtonText>{text}</SongDetailBottomButtonText> : null);

  const fallbackAriaLabel = typeof text === 'string' ? text : undefined;

  return (
    <button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={ariaLabel ?? fallbackAriaLabel}
    >
      <img
        src="/assets/buttons/song_detail_bottom_button.svg"
        className={styles.img}
        alt=""
        aria-hidden="true"
      />
      {content}
    </button>
  );
};

export default SongDetailBottomButton;
