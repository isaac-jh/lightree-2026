import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import { formatCreditLine } from '@/content/creditRoleLabels';
import { useLocale } from '@/context/LocaleContext';
import MainTextLabel from '@/components/labels/MainTextLabel';
import ScreenBackUnderlineButton from '@/components/navigation/ScreenBackUnderlineButton';
import styles from './VillageCreditsPage.module.css';

/**
 * 빌리지 스텝 크레딧 화면.
 *
 * - 상단 좌측: 뒤로 가기(마을 지도 복귀)
 * - main_text_label 로 제목 표시
 * - credit_text_label 위에 크레딧 본문, 영역 안에서 스크롤 및 커스텀 스크롤바
 */
const VillageCreditsPage: React.FC = () => {
  const navigate = useNavigate();
  const { messages } = useLocale();

  const creditLines = useMemo(
    () => messages.credits.all.split('\n'),
    [messages.credits.all],
  );

  const handleBack = useCallback(() => {
    navigate(VILLAGE_HOME_PATH);
  }, [navigate]);

  return (
    <div className={styles.page}>
      <ScreenBackUnderlineButton
        label={messages.songDetail.goBack}
        onClick={handleBack}
        className={styles.backTop}
      />

      <MainTextLabel className={styles.titleLabel} align="left">
        <p className={styles.titlePlain}>{messages.credits.screenTitle}</p>
      </MainTextLabel>

      <div className={styles.creditFrame}>
        <div className={styles.creditParchment}>
          <img
            src="/assets/credit_text_label.svg"
            className={styles.creditSvg}
            alt=""
            aria-hidden="true"
          />
          <div className={styles.creditScrollShell}>
            <div className={styles.creditScrollTrack} aria-hidden="true" />
            <div className={styles.creditScroller}>
              <div className={styles.creditBody}>
                {creditLines.map((line, i) => (
                  <p key={i} className={styles.creditLine}>
                    {formatCreditLine(line, styles.roleLabel)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageCreditsPage;
