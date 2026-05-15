import React, { useCallback, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import {
  getSongVideoUrl,
  getSongDownloadUrl,
  getSongSheetLeadUrl,
  getSongSheetBandUrl,
} from '@/data/villageSongLinks';
import {
  RESOURCE_MENU_META,
  type SongMenuSlug,
  getSongLocaleCopy,
} from '@/content/siteContent';
import { VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import { useLocale } from '@/context/LocaleContext';
import { openExternal } from '@/utils/openExternal';
import MainTextLabel from '@/components/labels/MainTextLabel';
import SongDetailBottomButton from '@/components/buttons/SongDetailBottomButton';
import ThumbnailButton from '@/components/buttons/ThumbnailButton';
import DownloadButton from '@/components/buttons/DownloadButton';
import HomeButton from '@/components/buttons/HomeButton';
import SongMenuBottomSheet from '@/components/menu/SongMenuBottomSheet';
import styles from './VillageSongResourcePage.module.css';

/** URL subSlug 가 곡 리소스 메뉴 키인지 확인 */
function isSongMenuSlug(value: string): value is SongMenuSlug {
  return value in RESOURCE_MENU_META;
}

const VillageSongResourcePage: React.FC = () => {
  const { songId, subSlug } = useParams<{ songId: string; subSlug: string }>();
  const navigate = useNavigate();
  const { locale, messages } = useLocale();
  const song = getVillageSongById(Number(songId));

  const menu =
    subSlug && isSongMenuSlug(subSlug) ? RESOURCE_MENU_META[subSlug] : undefined;
  const menuLabel =
    subSlug && isSongMenuSlug(subSlug) ? messages.songMenu[subSlug] : '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHome = useCallback(() => {
    navigate(VILLAGE_HOME_PATH);
  }, [navigate]);

  const handleMenuOpen = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  if (!song || !menu || !subSlug || !isSongMenuSlug(subSlug)) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  const songCopy = getSongLocaleCopy(locale, song.id);

  const videoUrl = getSongVideoUrl(song.id, subSlug);

  const handleDownloadClick = () => {
    openExternal(getSongDownloadUrl(song.id, subSlug));
  };

  const handleSheetLeadClick = () => {
    openExternal(getSongSheetLeadUrl(song.id));
  };

  const handleSheetBandClick = () => {
    openExternal(getSongSheetBandUrl(song.id));
  };

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(/assets/patterns/${menu.bgPattern})` }}
    >
      <MainTextLabel className={styles.titleWrap} align="left">
        <p className={styles.songTitle}>{songCopy?.title ?? ''}</p>
        <h2 className={styles.menuName}>{menuLabel}</h2>
      </MainTextLabel>

      <div className={styles.content}>
        {menu.isSheet ? (
          <SheetContent
            songId={song.id}
            onDownloadLead={handleSheetLeadClick}
            onDownloadBand={handleSheetBandClick}
          />
        ) : (
          <>
            {menu.hasVideo && (
              <ThumbnailButton
                videoUrl={videoUrl}
                ariaLabel={messages.resource.openVideoAria(menuLabel)}
                className={styles.thumbBtn}
              />
            )}
            {menu.hasDownload && (
              <DownloadButton
                text={messages.resource.download}
                onClick={handleDownloadClick}
                className={styles.downloadBtn}
              />
            )}
          </>
        )}
      </div>

      <HomeButton
        className={styles.homeBtn}
        onClick={handleHome}
        label={messages.resource.homeButtonLabel}
        ariaLabel={messages.resource.homeButtonAria}
      />

      <SongDetailBottomButton
        className={styles.menuViewBtn}
        onClick={handleMenuOpen}
        text={messages.resource.showMenu}
      />

      <SongMenuBottomSheet
        isOpen={isMenuOpen}
        songId={song.id}
        currentSlug={subSlug}
        onClose={handleMenuClose}
      />
    </div>
  );
};

interface SheetContentProps {
  songId: number;
  onDownloadLead: () => void;
  onDownloadBand: () => void;
}

/**
 * 악보 화면 전용 레이아웃 (단선보 / 밴드보 다운로드 버튼)
 */
const SheetContent: React.FC<SheetContentProps> = ({
  songId,
  onDownloadLead,
  onDownloadBand,
}) => {
  const { messages } = useLocale();

  return (
    <>
      <div className={styles.sheetStack}>
        <img
          src={`/assets/sheets/song_sheet_${songId}_2.svg`}
          className={`${styles.sheetImg} ${styles.sheetImgBack}`}
          alt=""
          aria-hidden="true"
        />
        <img
          src={`/assets/sheets/song_sheet_${songId}_1.svg`}
          className={`${styles.sheetImg} ${styles.sheetImgFront}`}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className={styles.sheetButtons}>
        <DownloadButton
          text={messages.resource.downloadLead}
          onClick={onDownloadLead}
        />
        <DownloadButton
          text={messages.resource.downloadBand}
          onClick={onDownloadBand}
        />
      </div>
    </>
  );
};

export default VillageSongResourcePage;
