import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { getSongLocaleCopy, SONG_MENU_STRUCTURE } from '@/content/siteContent';
import { villageSongResourcePath, VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import { useLocale } from '@/context/LocaleContext';
import SongButton from '@/components/buttons/SongButton';
import MainTextLabel from '@/components/labels/MainTextLabel';
import styles from './VillageSongDetailPage.module.css';

const VillageSongDetailPage: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();
  const { locale, messages } = useLocale();
  const song = getVillageSongById(Number(songId));
  const copy = song ? getSongLocaleCopy(locale, song.id) : undefined;

  const handleButtonClick = useCallback(
    (subSlug: string) => {
      if (!song) return;
      navigate(villageSongResourcePath(song.id, subSlug));
    },
    [navigate, song],
  );

  if (!song || !copy) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  return (
    <div className={styles.page} style={{ backgroundColor: song.wallColor }}>
      <MainTextLabel className={styles.titleWrap} align="left">
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.authors}>
          {messages.songDetail.lyricistPrefix}: {copy.lyricist}
          &nbsp;&nbsp;&nbsp;
          {messages.songDetail.composerPrefix}: {copy.composer}
        </p>
      </MainTextLabel>

      <div className={styles.buttons}>
        {SONG_MENU_STRUCTURE.map((item) => (
          <SongButton
            key={item.key}
            vectorSrc={item.vector}
            label={messages.songMenu[item.key]}
            onClick={() => handleButtonClick(item.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
