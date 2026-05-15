import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { villageSongResourcePath } from '@/constants/albumPaths';
import { SONG_MENU_STRUCTURE } from '@/content/siteContent';
import { useLocale } from '@/context/LocaleContext';
import SongButton from '@/components/buttons/SongButton';
import styles from './SongMenuBottomSheet.module.css';

interface SongMenuBottomSheetProps {
  isOpen: boolean;
  songId: number;
  /** 현재 페이지의 슬러그 (해당 항목은 시트에서 제외) */
  currentSlug?: string;
  onClose: () => void;
}

/**
 * 곡 메뉴 바텀시트.
 * - dim 영역 또는 닫기 버튼 클릭 시 onClose
 * - 메뉴 항목 클릭 시 해당 리소스 페이지로 라우팅
 * - 현재 슬러그에 해당하는 항목은 노출하지 않음
 */
const SongMenuBottomSheet: React.FC<SongMenuBottomSheetProps> = ({
  isOpen,
  songId,
  currentSlug,
  onClose,
}) => {
  const navigate = useNavigate();
  const { messages } = useLocale();

  const items = SONG_MENU_STRUCTURE.filter((item) => item.key !== currentSlug);

  const handleSelect = useCallback(
    (slug: string) => {
      navigate(villageSongResourcePath(songId, slug));
    },
    [navigate, songId],
  );

  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  return (
    <div
      className={[styles.overlay, isOpen ? styles.overlayOpen : ''].filter(Boolean).join(' ')}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={[styles.sheet, isOpen ? styles.sheetOpen : ''].filter(Boolean).join(' ')}
        onClick={stop}
        role="dialog"
        aria-modal={isOpen}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          {messages.menuSheet.close}
        </button>
        <div className={styles.menuList}>
          {items.map((item) => (
            <SongButton
              key={item.key}
              vectorSrc={item.vector}
              label={messages.songMenu[item.key]}
              onClick={() => handleSelect(item.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongMenuBottomSheet;
