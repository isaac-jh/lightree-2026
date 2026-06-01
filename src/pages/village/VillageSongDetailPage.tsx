import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import {
  getSongLocaleCopy,
  isSongMenuItemComingSoon,
  SONG_MENU_STRUCTURE,
  type SongMenuSlug,
} from '@/content/siteContent';
import { villageSongResourcePath, VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import { useLocale } from '@/context/LocaleContext';
import SongButton from '@/components/buttons/SongButton';
import MainTextLabel from '@/components/labels/MainTextLabel';
import ScreenBackUnderlineButton from '@/components/navigation/ScreenBackUnderlineButton';
import styles from './VillageSongDetailPage.module.css';

const VillageSongDetailPage: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();
  const { locale, messages } = useLocale();
  const song = getVillageSongById(Number(songId));
  const copy = song ? getSongLocaleCopy(locale, song.id) : undefined;

  const handleBack = useCallback(() => {
    navigate(VILLAGE_HOME_PATH);
  }, [navigate]);

  const handleButtonClick = useCallback(
    (subSlug: SongMenuSlug) => {
      if (!song || isSongMenuItemComingSoon(subSlug)) return;
      navigate(villageSongResourcePath(song.id, subSlug));
    },
    [navigate, song],
  );

  if (!song || !copy) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  return (
    <div className={styles.page} style={{ backgroundColor: song.wallColor }}>
      <ScreenBackUnderlineButton
        label={messages.songDetail.goBack}
        onClick={handleBack}
        className={styles.backTop}
      />
      <MainTextLabel className={styles.titleWrap} align="left" balanceVertical>
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
            comingSoon={isSongMenuItemComingSoon(item.key)}
            onClick={() => handleButtonClick(item.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
