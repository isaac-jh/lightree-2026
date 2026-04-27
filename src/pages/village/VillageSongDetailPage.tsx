import React, { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { VILLAGE_HOME_PATH, villageSongResourcePath } from '@/constants/albumPaths';
import type { VillageSongSubSlug } from '@/data/villageSongSubPages';
import styles from './VillageSongDetailPage.module.css';

/**
 * 곡 허브
 *
 * - 6개 액션 버튼을 2열 그리드로 배치
 * - 왼쪽 열: 홀수 인덱스(0,2,4), 오른쪽 열: 짝수 인덱스(1,3,5)
 * - 오른쪽 열은 버튼 높이의 절반만큼 아래로 offset
 * - 라벨은 벡터 이미지 세로 중앙에 위치
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

const LEFT_ACTIONS  = SHAPE_ACTIONS.filter((_, i) => i % 2 === 0); // ko, wave, guide
const RIGHT_ACTIONS = SHAPE_ACTIONS.filter((_, i) => i % 2 !== 0); // star, inst, sheet

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

  const renderBtn = (act: (typeof SHAPE_ACTIONS)[number], colDelay: number) => (
    <button
      key={act.id}
      type="button"
      className={`${styles.shapeBtn} ${'tiltClass' in act ? (act as { tiltClass?: string }).tiltClass ?? '' : ''}`}
      style={{ animationDelay: `${colDelay}s` }}
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

        {/* 2열 그리드: 왼쪽(0,2,4) + 오른쪽(1,3,5) — 오른쪽은 반 버튼 높이 아래로 */}
        <div className={styles.actionGrid}>
          <div className={styles.actionColLeft}>
            {LEFT_ACTIONS.map((act, i) => renderBtn(act, 0.12 + i * 0.14))}
          </div>
          <div className={styles.actionColRight}>
            {RIGHT_ACTIONS.map((act, i) => renderBtn(act, 0.19 + i * 0.14))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillageSongDetailPage;
