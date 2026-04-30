import React from 'react';
import { extractYouTubeId, youtubeThumbnailUrl } from '@/utils/youtube';
import { openExternal } from '@/utils/openExternal';
import styles from './ThumbnailButton.module.css';

interface ThumbnailButtonProps {
  /** YouTube 영상 URL. 비어있어도 placeholder + play_button 으로 토대만 표시 */
  videoUrl?: string;
  /** 직접 핸들러를 지정하면 그것이 우선. 미지정 시 videoUrl 을 새 창으로 오픈 */
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

const PLAY_BUTTON_SRC = '/assets/thumbnails/play_button.svg';

/**
 * YouTube 영상 썸네일 버튼.
 * - videoUrl 의 video id 추출 → img.youtube.com/vi/{id}/hqdefault.jpg 표시 (dim 처리)
 * - id 추출 실패 시 회색 placeholder
 * - 항상 위에 play_button 오버레이
 */
const ThumbnailButton: React.FC<ThumbnailButtonProps> = ({
  videoUrl,
  onClick,
  ariaLabel,
  className,
}) => {
  const videoId = extractYouTubeId(videoUrl);
  const thumbSrc = videoId ? youtubeThumbnailUrl(videoId) : undefined;
  const handleClick = onClick ?? (() => openExternal(videoUrl));

  return (
    <button
      type="button"
      className={[styles.btn, className].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-label={ariaLabel ?? '영상 보기'}
    >
      <span className={styles.frame}>
        {thumbSrc && (
          <>
            <img src={thumbSrc} className={styles.thumb} alt="" aria-hidden="true" />
            <span className={styles.dim} />
          </>
        )}
        <img src={PLAY_BUTTON_SRC} className={styles.playBtn} alt="" aria-hidden="true" />
      </span>
    </button>
  );
};

export default ThumbnailButton;
