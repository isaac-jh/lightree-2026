import React from 'react';
import MobileContainer from '@/components/layout/MobileContainer';
import HomePage from '@/pages/home/HomePage';

/**
 * 앱 루트 컴포넌트
 *
 * MobileContainer가 모든 페이지를 감싸며 모바일 전용 레이아웃을 보장한다.
 * TODO: 라우터(React Router 등) 추가 시 MobileContainer 내부에 라우팅 구성
 */
const App: React.FC = () => {
  return (
    <MobileContainer>
      <HomePage />
    </MobileContainer>
  );
};

export default App;
