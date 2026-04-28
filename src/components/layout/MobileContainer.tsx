import React from 'react';
import styles from './MobileContainer.module.css';

interface MobileContainerProps {
  children: React.ReactNode;
}

/**
 * 모바일 전용 레이아웃 컨테이너
 *
 * - 모바일(~480px): 전체 너비 활용
 * - 데스크톱(481px 이상): 화면 중앙에 모바일 너비(480px)로 고정
 * - iOS Safe Area (노치, Dynamic Island, 홈 인디케이터) 대응
 */
const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default MobileContainer;
