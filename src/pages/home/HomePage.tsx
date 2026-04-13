import React from 'react';
import styles from './HomePage.module.css';

/**
 * 홈 페이지 컴포넌트
 *
 * TODO: 실제 콘텐츠로 교체
 */
const HomePage: React.FC = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Lightree 2026</h1>
        <p className={styles.description}>모바일 전용 웹 앱</p>
      </section>
    </main>
  );
};

export default HomePage;
