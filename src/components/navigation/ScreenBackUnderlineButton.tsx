import React from 'react';
import styles from './ScreenBackUnderlineButton.module.css';

interface ScreenBackUnderlineButtonProps {
  /** 표시 문자열 (`SITE_MESSAGES.*.songDetail.goBack`) */
  label: string;
  /** 클릭 시 이동 (보통 빌리지 지도 또는 이전 라우트) */
  onClick: () => void;
  /** 래핑 레이아웃을 위한 추가 className */
  className?: string;
}

/**
 * 곡 상세·크레딧 등 상단 좌측에 쓰이는 밑줄 형태 텍스트 "뒤로 가기" 버튼.
 * 디자인 가이드: 짙은 갈색 글자 + 미세한 텍스트 밑줄.
 */
const ScreenBackUnderlineButton: React.FC<ScreenBackUnderlineButtonProps> = ({
  label,
  onClick,
  className,
}) => (
  <button
    type="button"
    className={[styles.backBtn, className].filter(Boolean).join(' ')}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ScreenBackUnderlineButton;
