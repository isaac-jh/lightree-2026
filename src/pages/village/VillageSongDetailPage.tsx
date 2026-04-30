import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { villageSongResourcePath, VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import SongButton from '@/components/buttons/SongButton';
import MainTextLabel from '@/components/labels/MainTextLabel';
import styles from './VillageSongDetailPage.module.css';

/**
 * 곡별 메뉴 버튼 (이미지 순서대로)
 * key는 라우팅 sub-slug. resource page에서 추후 매핑
 */
const SONG_BUTTONS = [
  { key: 'mv',    vector: '/assets/buttons/song_button_music_video_vector.svg',   label: '뮤직비디오' },
  { key: 'ko',    vector: '/assets/buttons/song_button_korean_vector.svg',        label: '한국어 ver.' },
  { key: 'en',    vector: '/assets/buttons/song_button_english_vector.svg',       label: '영어 ver.' },
  { key: 'es',    vector: '/assets/buttons/song_button_spanish_vector.svg',       label: '스페인어 ver.' },
  { key: 'inst',  vector: '/assets/buttons/song_button_inst_vector.svg',          label: 'Inst.' },
  { key: 'guide', vector: '/assets/buttons/song_button_worship_guide_vector.svg', label: '워십 가이드 영상' },
  { key: 'sheet', vector: '/assets/buttons/song_button_song_sheet_vector.svg',    label: '악보 (단선보, 밴드보)' },
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
      {/* 상단 안내 라벨 (곡 정보 오버레이) */}
      <MainTextLabel className={styles.titleWrap} align="left">
        <h1 className={styles.title}>{song.title}</h1>
        <p className={styles.authors}>
          작사: {song.lyricist}&nbsp;&nbsp;&nbsp;작곡: {song.composer}
        </p>
      </MainTextLabel>

      {/* 곡 메뉴 버튼 리스트 */}
      <div className={styles.buttons}>
        {SONG_BUTTONS.map((btn) => (
          <SongButton
            key={btn.key}
            vectorSrc={btn.vector}
            label={btn.label}
            onClick={() => handleButtonClick(btn.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
