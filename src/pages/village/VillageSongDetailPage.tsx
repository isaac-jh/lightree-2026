import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { villageSongResourcePath, VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import styles from './VillageSongDetailPage.module.css';

/**
 * 곡별 메뉴 버튼 (이미지 순서대로)
 * key는 라우팅 sub-slug. resource page에서 추후 매핑
 */
const SONG_BUTTONS = [
  { key: 'mv',     src: '/assets/buttons/song_button_music_video.svg',   label: '뮤직비디오' },
  { key: 'ko',     src: '/assets/buttons/song_button_korean.svg',        label: '한국어 ver.' },
  { key: 'en',     src: '/assets/buttons/song_button_english.svg',       label: '영어 ver.' },
  { key: 'es',     src: '/assets/buttons/song_button_spanish.svg',       label: '스페인어 ver.' },
  { key: 'inst',   src: '/assets/buttons/song_button_inst.svg',          label: 'Inst.' },
  { key: 'guide',  src: '/assets/buttons/song_button_worship_guide.svg', label: '워십 가이드 영상' },
  { key: 'sheet',  src: '/assets/buttons/song_button_song_sheet.svg',    label: '악보 (단선보, 밴드보)' },
];

const VillageSongDetailPage: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();
  const song = getVillageSongById(Number(songId));

  const handleButtonClick = useCallback(
    (subSlug: string) => {
      if (!song) return;
      navigate(villageSongResourcePath(song.id, subSlug));
    },
    [navigate, song],
  );

  if (!song) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  return (
    <div className={styles.page} style={{ backgroundColor: song.wallColor }}>
      {/* 상단 안내 라벨 (main_text_label에 곡 정보 오버레이) */}
      <div className={styles.titleWrap}>
        <img src="/assets/main_text_label.svg" className={styles.titleImg} alt="" aria-hidden="true" />
        <div className={styles.titleText}>
          <h1 className={styles.title}>{song.title}</h1>
          <p className={styles.authors}>
            작사: {song.lyricist}&nbsp;&nbsp;&nbsp;작곡: {song.composer}
          </p>
        </div>
      </div>

      {/* 곡 메뉴 버튼 리스트 */}
      <div className={styles.buttons}>
        {SONG_BUTTONS.map((btn) => (
          <button
            key={btn.key}
            className={styles.songButton}
            onClick={() => handleButtonClick(btn.key)}
            aria-label={btn.label}
          >
            <img src={btn.src} alt="" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
