import React, { useCallback, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import {
  getSongVideoUrl,
  getSongDownloadUrl,
  getSongSheetLeadUrl,
  getSongSheetBandUrl,
} from '@/data/villageSongLinks';
import { VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import { openExternal } from '@/utils/openExternal';
import MainTextLabel from '@/components/labels/MainTextLabel';
import SongDetailBottomButton from '@/components/buttons/SongDetailBottomButton';
import ThumbnailButton from '@/components/buttons/ThumbnailButton';
import DownloadButton from '@/components/buttons/DownloadButton';
import HomeButton from '@/components/buttons/HomeButton';
import SongMenuBottomSheet from '@/components/menu/SongMenuBottomSheet';
import styles from './VillageSongResourcePage.module.css';

/**
 * URL 슬러그(/home/:songId/:subSlug) 별 메뉴 설정
 * - label: 라벨에 표시될 메뉴 이름
 * - bgPattern: 배경 패턴 SVG 파일명
 * - hasVideo: YouTube 썸네일 버튼 표시
 * - hasDownload: "다운받기" 버튼 표시
 * - isSheet: 악보 화면 (썸네일 대신 sheet 이미지 + 단선보/밴드보 두 버튼)
 */
const MENU_CONFIG: Record<
  string,
  {
    label: string;
    bgPattern: string;
    hasVideo?: boolean;
    hasDownload?: boolean;
    isSheet?: boolean;
  }
> = {
  mv:    { label: '뮤직비디오',          bgPattern: 'mv_bg_pattern.svg',            hasVideo: true, hasDownload: false },
  ko:    { label: '한국어 ver.',         bgPattern: 'korean_bg_pattern.svg',        hasVideo: true, hasDownload: true  },
  en:    { label: '영어 ver.',           bgPattern: 'english_bg_pattern.svg',       hasVideo: true, hasDownload: true  },
  es:    { label: '스페인어 ver.',       bgPattern: 'spanish_bg_pattern.svg',       hasVideo: true, hasDownload: true  },
  inst:  { label: 'Inst.',               bgPattern: 'inst_bg_pattern.svg',          hasVideo: true, hasDownload: true  },
  guide: { label: '워십 가이드 영상',    bgPattern: 'worship_guide_bg_pattern.svg', hasVideo: true, hasDownload: true  },
  sheet: { label: '악보 (단선보, 밴드보)', bgPattern: 'song_sheet_bg_pattern.svg',                                  isSheet:  true     },
};

const VillageSongResourcePage: React.FC = () => {
  const { songId, subSlug } = useParams<{ songId: string; subSlug: string }>();
  const navigate = useNavigate();
  const song = getVillageSongById(Number(songId));
  const menu = subSlug ? MENU_CONFIG[subSlug] : undefined;

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

  if (!song || !menu) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  /** 영상 URL (썸네일 클릭 시 새 창으로 오픈) */
  const videoUrl = subSlug ? getSongVideoUrl(song.id, subSlug) : undefined;

  /** 일반 메뉴 다운받기 → Google Drive (링크 미정 시 no-op) */
  const handleDownloadClick = () => {
    if (subSlug) openExternal(getSongDownloadUrl(song.id, subSlug));
  };

  /** 악보 단선보 다운받기 */
  const handleSheetLeadClick = () => {
    openExternal(getSongSheetLeadUrl(song.id));
  };

  /** 악보 밴드보 다운받기 */
  const handleSheetBandClick = () => {
    openExternal(getSongSheetBandUrl(song.id));
  };

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(/assets/patterns/${menu.bgPattern})` }}
    >
      {/* 상단 라벨: 곡명(작게) + 메뉴 이름(크게) */}
      <MainTextLabel className={styles.titleWrap} align="left">
        <p className={styles.songTitle}>{song.title}</p>
        <h2 className={styles.menuName}>{menu.label}</h2>
      </MainTextLabel>

      {/* 가운데 콘텐츠 */}
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
                ariaLabel={`${menu.label} 영상 보기`}
                className={styles.thumbBtn}
              />
            )}
            {menu.hasDownload && (
              <DownloadButton text="다운받기" onClick={handleDownloadClick} className={styles.downloadBtn} />
            )}
          </>
        )}
      </div>

      {/* 좌측 하단 Home 버튼 */}
      <HomeButton className={styles.homeBtn} onClick={handleHome} />

      {/* 하단 메뉴 보기 버튼 */}
      <SongDetailBottomButton
        className={styles.menuViewBtn}
        onClick={handleMenuOpen}
        text="메뉴 보기"
      />

      {/* 곡 메뉴 바텀시트 (현재 페이지 슬러그는 자동 제외) */}
      <SongMenuBottomSheet
        isOpen={isMenuOpen}
        songId={song.id}
        currentSlug={subSlug}
        onClose={handleMenuClose}
      />
    </div>
  );
};

/* ── 악보 화면 컨텐츠 ── */
interface SheetContentProps {
  songId: number;
  onDownloadLead: () => void;
  onDownloadBand: () => void;
}

const SheetContent: React.FC<SheetContentProps> = ({ songId, onDownloadLead, onDownloadBand }) => (
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
      <DownloadButton text="단선보 다운받기" onClick={onDownloadLead} />
      <DownloadButton text="밴드보 다운받기" onClick={onDownloadBand} />
    </div>
  </>
);

export default VillageSongResourcePage;
