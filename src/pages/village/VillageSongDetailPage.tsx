import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { SONG_MENU_ITEMS } from '@/data/songMenuItems';
import { villageSongResourcePath, VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import SongButton from '@/components/buttons/SongButton';
import MainTextLabel from '@/components/labels/MainTextLabel';
import styles from './VillageSongDetailPage.module.css';

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
        {SONG_MENU_ITEMS.map((item) => (
          <SongButton
            key={item.key}
            vectorSrc={item.vector}
            label={item.label}
            onClick={() => handleButtonClick(item.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
