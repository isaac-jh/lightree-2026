import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VILLAGE_SONGS } from '@/data/villageSongMeta';
import { villageSongDetailPath } from '@/constants/albumPaths';
import styles from './VillagePage.module.css';

/**
 * 빌리지(마을) 페이지
 *
 * - 경로: /albums/2026/${VITE_ALBUM_2026_PATH}/home
 * - 안개 속에서 등장하는 동화책 마을 씬
 * - 5채의 집이 원근감 있게 배치, 각 집+팻말이 하나의 버튼으로 동작
 * - 집들은 느린 흔들림(sway) 애니메이션 적용
 */
const VillagePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* ── 배경 ── */}
      <div className={styles.background} />

      {/* ── 말풍선 안내 문구 ── */}
      <div className={styles.speechBubble} role="note">
        <p>라이트리 빌리지에는 5개의 곡이 있어요!</p>
        <p>한번 돌아볼까요? 집을 선택해주세요!</p>
      </div>

      {/*
       * 나무 레이어: bottom은 집 이미지 하단에 맞춤(CSS: 집 bottom% + 팻말 높이 변수)
       * left는 집보다 ±5% 이내, z-index 3으로 집(5)보다 뒤
       */}
      <div className={styles.treeLayer} aria-hidden="true">
        <img src="/assets/trees/tree1.png" className={`${styles.vTree} ${styles.treeBeside1}`} alt="" />
        <img src="/assets/trees/tree2.png" className={`${styles.vTree} ${styles.treeBeside2}`} alt="" />
        <img src="/assets/trees/tree3.png" className={`${styles.vTree} ${styles.treeBeside3}`} alt="" />
        <img src="/assets/trees/tree4.png" className={`${styles.vTree} ${styles.treeBeside4}`} alt="" />
        <img src="/assets/trees/tree5.png" className={`${styles.vTree} ${styles.treeBeside5}`} alt="" />
      </div>

      {/* ── 집 씬 ── */}
      <div className={styles.scene}>
        {VILLAGE_SONGS.map((song) => (
          <button
            key={song.id}
            className={`${styles.houseBtn} ${styles[song.styleKey as keyof typeof styles]}`}
            aria-label={song.title}
            onClick={() => navigate(villageSongDetailPath(song.id))}
          >
            <img
              src={`/assets/houses/${song.houseImg}.png`}
              className={styles.houseImg}
              alt=""
              aria-hidden="true"
            />
            {/* ── 팻말 ── */}
            <div className={styles.signPost}>
              <div className={styles.signBoard}>
                <span className={styles.signText}>{song.title}</span>
              </div>
              <div className={styles.signStick} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VillagePage;
