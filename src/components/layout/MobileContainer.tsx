import React from 'react';
import styles from './MobileContainer.module.css';

interface MobileContainerProps {
  children: React.ReactNode;
}

/**
 * 모바일 전용 레이아웃 컨테이너
 *
 * - 데스크톱/태블릿 가로 모드: 화면 중앙에 모바일 너비로 고정
 * - 모바일 세로 / 세로 태블릿: 전체 너비 활용
 * - 양 옆 여백은 배경 오버레이로 처리
 * - iOS Safe Area (노치, Dynamic Island, 홈 인디케이터) 대응
 *
 * 지원 범위:
 * - iPhone 8+ (375px 이상)
 * - 세로 태블릿 (768px까지)
 */
const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default MobileContainer;
