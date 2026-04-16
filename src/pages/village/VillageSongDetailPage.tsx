import React, { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { VILLAGE_HOME_PATH, villageSongResourcePath } from '@/constants/albumPaths';
import type { VillageSongSubSlug } from '@/data/villageSongSubPages';
import styles from './VillageSongDetailPage.module.css';

/**
 * 곡 허브 — 지그재그(미세 좌우 오프셋), 라벨은 벡터 위 겹침, 버튼은 벡터 PNG만
 */
const HUB_ACTION_TO_SUB: Record<string, VillageSongSubSlug> = {
  ko: 'ko-ver',
  star: 'en-ver',
  wave: 'es-ver',
  inst: 'inst',
  guide: 'guide',
  sheet: 'sheet',
};

const SHAPE_ACTIONS = [
  {
    id: 'ko',
    label: '한국어 ver.',
    vectorSrc: '/assets/vectors/vector_flower.png',
  },
  {
    id: 'star',
    label: '영어 ver.',
    vectorSrc: '/assets/vectors/vector_star.png',
    tiltClass: styles.shapeTiltStar,
  },
  {
    id: 'wave',
    label: '스페인어 ver.',
    vectorSrc: '/assets/vectors/vector_wave.png',
  },
  {
    id: 'inst',
    label: 'Inst.',
    vectorSrc: '/assets/vectors/vector_cloud.png',
  },
  {
    id: 'guide',
    label: '워십 가이드 영상',
    vectorSrc: '/assets/vectors/vector_crunch.png',
  },
  {
    id: 'sheet',
    label: '악보',
    vectorSrc: '/assets/vectors/vector_sun.png',
  },
] as const;

const VillageSongDetailPage: React.FC = () => {
  const { songId: songIdParam } = useParams<{ songId: string }>();
  const navigate = useNavigate();

  const songId = useMemo(() => {
    const n = Number.parseInt(songIdParam ?? '', 10);
    if (!Number.isFinite(n) || n < 1 || n > 5) return null;
    return n as 1 | 2 | 3 | 4 | 5;
  }, [songIdParam]);

  const song = songId != null ? getVillageSongById(songId) : undefined;

  if (songId == null || song == null) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  const pageStyle = { ['--wall-color' as string]: song.wallColor } as React.CSSProperties;
  const infoBg = `color-mix(in srgb, ${song.wallColor} 24%, white 76%)`;

  return (
    <div className={styles.page} style={pageStyle}>
      <div className={styles.main}>
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

        <div className={styles.actionStack}>
          {SHAPE_ACTIONS.map((act, index) => {
            const isLeft = index % 2 === 0;
            const shiftClass = isLeft ? styles.shapeShiftLeft : styles.shapeShiftRight;
            return (
              <button
                key={act.id}
                type="button"
                className={`${styles.shapeBtn} ${shiftClass} ${
                  'tiltClass' in act ? act.tiltClass : ''
                }`}
                onClick={() => {
                  const sub = HUB_ACTION_TO_SUB[act.id];
                  if (sub) navigate(villageSongResourcePath(songId, sub));
                }}
              >
                <span className={styles.shapeHitArea}>
                  <span className={styles.shapeLabel}>{act.label}</span>
                  <span className={styles.shapeImgWrap}>
                    <img src={act.vectorSrc} className={styles.shapeImg} alt="" aria-hidden />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
