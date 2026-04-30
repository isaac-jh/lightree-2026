import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { villageSongResourcePath } from '@/constants/albumPaths';
import { SONG_MENU_ITEMS } from '@/data/songMenuItems';
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
 * - dim 영역 또는 "메뉴 닫기" 클릭 시 onClose
 * - 메뉴 항목 클릭 시 해당 리소스 페이지로 라우팅
 * - currentSlug에 해당하는 항목은 노출하지 않음
 */
const SongMenuBottomSheet: React.FC<SongMenuBottomSheetProps> = ({
  isOpen,
  songId,
  currentSlug,
  onClose,
}) => {
  const navigate = useNavigate();

  const items = SONG_MENU_ITEMS.filter((item) => item.key !== currentSlug);

  const handleSelect = useCallback(
    (slug: string) => {
      navigate(villageSongResourcePath(songId, slug));
    },
    [navigate, songId],
  );

  // 시트 내부 클릭이 dim까지 전파되어 닫히지 않도록
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
          메뉴 닫기
        </button>
        <div className={styles.menuList}>
          {items.map((item) => (
            <SongButton
              key={item.key}
              vectorSrc={item.vector}
              label={item.label}
              onClick={() => handleSelect(item.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongMenuBottomSheet;
