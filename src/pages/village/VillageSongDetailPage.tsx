import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { VILLAGE_HOME_PATH } from '@/constants/albumPaths';
import {
  VILLAGE_SONG_ENTRY_ZOOM,
  VILLAGE_SONG_ENTRY_ZOOM_MS,
} from '@/pages/village/villageSongEntryConfig';
import styles from './VillageSongDetailPage.module.css';

/**
 * 곡 상세 화면의 액션 버튼 정의
 * - 벡터 에셋 + 공통 배경색 (집/곡과 무관하게 동일)
 * - TODO: 각 버튼 클릭 시 오디오·영상·악보 URL 연결
 */
const SHAPE_ACTIONS = [
  {
    id: 'ko',
    label: '한국어 ver.',
    vectorSrc: '/assets/vectors/vector_flower.png',
    wrapClass: styles.tFlower,
    posClass: styles.posFlower,
  },
  {
    id: 'wave',
    label: '스페인어 ver.',
    vectorSrc: '/assets/vectors/vector_wave.png',
    wrapClass: styles.tWave,
    posClass: styles.posWave,
  },
  {
    id: 'star',
    label: '영어 ver.',
    vectorSrc: '/assets/vectors/vector_star.png',
    wrapClass: styles.tStar,
    posClass: styles.posStar,
  },
  {
    id: 'inst',
    label: 'Inst.',
    vectorSrc: '/assets/vectors/vector_cloud.png',
    wrapClass: styles.tCloud,
    posClass: styles.posInst,
  },
  {
    id: 'guide',
    label: '워십 가이드 영상',
    vectorSrc: '/assets/vectors/vector_crunch.png',
    wrapClass: styles.tGuide,
    posClass: styles.posGuide,
  },
  {
    id: 'sheet',
    label: '악보',
    vectorSrc: '/assets/vectors/vector_sun.png',
    wrapClass: styles.tSheet,
    posClass: styles.posSheet,
  },
] as const;

/**
 * 빌리지에서 집을 눌렀을 때 열리는 곡 상세 페이지
 *
 * - 경로: /albums/2026/{UUID}/home/:songId (songId = 1~5)
 * - 배경: 해당 집 벽면색(wallColor)
 * - 진입 연출: villageSongEntryConfig 의 VILLAGE_SONG_ENTRY_ZOOM 으로 on/off
 */
const VillageSongDetailPage: React.FC = () => {
  const { songId: songIdParam } = useParams<{ songId: string }>();
  const navigate = useNavigate();

  const songId = useMemo(() => {
    const n = Number.parseInt(songIdParam ?? '', 10);
    if (!Number.isFinite(n) || n < 1 || n > 5) return null;
    return n as 1 | 2 | 3 | 4 | 5;
  }, [songIdParam]);

  const song = songId != null ? getVillageSongById(songId) : undefined;

  const [entryPhase, setEntryPhase] = useState<'zoom' | 'ready'>(() =>
    VILLAGE_SONG_ENTRY_ZOOM ? 'zoom' : 'ready',
  );

  useEffect(() => {
    if (!VILLAGE_SONG_ENTRY_ZOOM) return;
    const timer = window.setTimeout(() => {
      setEntryPhase('ready');
    }, VILLAGE_SONG_ENTRY_ZOOM_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (songId == null || song == null) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  const pageStyle = { ['--wall-color' as string]: song.wallColor } as React.CSSProperties;
  const infoBg = `color-mix(in srgb, ${song.wallColor} 24%, white 76%)`;

  return (
    <div className={styles.page} style={pageStyle}>
      <div className={`${styles.main} ${entryPhase === 'ready' ? styles.mainReady : ''}`}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(VILLAGE_HOME_PATH)}
          aria-label="마을로 돌아가기"
        >
          <span className={styles.backCircle}>
            <span className={styles.backChevron} style={{ color: song.wallColor }}>
              ‹
            </span>
          </span>
        </button>

        <div className={styles.infoPanel} style={{ background: infoBg }}>
          <h1 className={styles.songTitle}>{song.title}</h1>
          <p className={styles.creditLine}>작사: {song.lyricist}</p>
          <p className={styles.creditLine}>작곡: {song.composer}</p>
        </div>

        <div className={styles.actionGrid}>
          {SHAPE_ACTIONS.map((act) => (
            <button
              key={act.id}
              type="button"
              className={`${styles.shapeBtn} ${act.posClass}`}
              onClick={() => {
                /* TODO: act.id 별 리소스 오픈 */
              }}
            >
              <span className={`${styles.shapeImgWrap} ${act.wrapClass}`}>
                <img src={act.vectorSrc} className={styles.shapeImg} alt="" aria-hidden />
              </span>
              <span className={styles.shapeLabel}>{act.label}</span>
            </button>
          ))}
        </div>
      </div>

      {entryPhase === 'zoom' && VILLAGE_SONG_ENTRY_ZOOM && (
        <div className={styles.entryZoomLayer} aria-hidden="true">
          <img
            src={`/assets/houses/${song.houseImg}.png`}
            className={styles.entryZoomHouse}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default VillageSongDetailPage;
