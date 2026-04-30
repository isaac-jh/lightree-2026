import React from 'react';
import styles from './MainTextLabel.module.css';

interface MainTextLabelProps {
  /** 라벨 안에 들어갈 텍스트(요소) */
  children: React.ReactNode;
  /** 텍스트 정렬 (기본: center) */
  align?: 'center' | 'left';
  /** 외부 wrap에 적용할 추가 className (위치/애니메이션 등은 소비자가 부여) */
  className?: string;
}

/**
 * main_text_label.svg(말풍선 모양)을 배경으로 한 텍스트 라벨.
 * 자식 요소에 따라 제목/설명/안내 등 다양한 텍스트 구성을 받을 수 있다.
 */
const MainTextLabel: React.FC<MainTextLabelProps> = ({ children, align = 'center', className }) => {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <img src="/assets/main_text_label.svg" className={styles.img} alt="" aria-hidden="true" />
      <div
        className={[
          styles.content,
          align === 'left' ? styles.alignLeft : styles.alignCenter,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

export default MainTextLabel;
