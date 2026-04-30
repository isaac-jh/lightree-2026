import React from 'react';
import styles from './DownloadButton.module.css';

interface DownloadButtonProps {
  /** 버튼 라벨 (예: "다운받기" / "단선보 다운받기" / "밴드보 다운받기") */
  text: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * song_detail_button_download.svg(크림 알약 모양) 위에 텍스트를 올린 다운로드 버튼.
 * 클릭 동작(URL 오픈 등)은 호출부에서 onClick 으로 주입.
 */
const DownloadButton: React.FC<DownloadButtonProps> = ({
  text,
  onClick,
  className,
  ariaLabel,
}) => (
  <button
    type="button"
    className={[styles.btn, className].filter(Boolean).join(' ')}
    onClick={onClick}
    aria-label={ariaLabel ?? text}
  >
    <img
      src="/assets/buttons/song_detail_button_download.svg"
      className={styles.img}
      alt=""
      aria-hidden="true"
    />
    <span className={styles.text}>{text}</span>
  </button>
);

export default DownloadButton;
