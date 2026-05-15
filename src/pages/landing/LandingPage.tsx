import React from 'react';
import styles from './LandingPage.module.css';
import { useLocale } from '@/context/LocaleContext';

/**
 * 루트(/) 랜딩 페이지
 *
 * - 흰 배경 + 로고 중앙 배치
 * - 로고 대체 텍스트는 로케일별 SITE_MESSAGES 에서 관리
 * TODO: 추후 실제 콘텐츠(소개, 네비게이션 등)로 교체 예정
 */
const LandingPage: React.FC = () => {
  const { messages } = useLocale();

  return (
    <div className={styles.page}>
      <img
        src="/assets/logo.png"
        className={styles.logo}
        alt={messages.landingLogoAlt}
      />
    </div>
  );
};

export default LandingPage;
