import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VILLAGE_SONGS, type VillageSongMeta } from '@/data/villageSongMeta';
import { villageSongDetailPath } from '@/constants/albumPaths';
import styles from './VillagePage.module.css';

interface RippleState {
  x: number;
  y: number;
  color: string;
}

/**
 * 빌리지(마을) 페이지
 *
 * - 경로: /albums/2026/${VITE_ALBUM_2026_PATH}/home
 * - 5채의 집이 원근감 있게 배치, 집 클릭 시 wallColor 리플 전환 애니메이션
 * - 집·나무 bottom은 vw 단위 → background-size: 200% 와 동일하게 스케일되어
 *   화면 높이에 무관하게 배경 이미지와 정렬 유지
 */
const VillagePage: React.FC = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const [ripple, setRipple] = useState<RippleState | null>(null);

  /**
   * 집 클릭 핸들러
   * pageRef를 기준으로 좌표 계산 → 데스크톱 center 레이아웃에서도 정확한 위치
   */
  const handleHouseClick = useCallback(
    (song: VillageSongMeta, e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple || !pageRef.current) return;
      const btnRect = e.currentTarget.getBoundingClientRect();
      const pageRect = pageRef.current.getBoundingClientRect();
      setRipple({
        x: btnRect.left + btnRect.width / 2 - pageRect.left,
        y: btnRect.top + btnRect.height / 2 - pageRect.top,
        color: song.wallColor,
      });
      setTimeout(() => navigate(villageSongDetailPath(song.id)), 550);
    },
    [ripple, navigate],
  );

  return (
    <div className={styles.page} ref={pageRef}>
      {/* ── 배경 ── */}
      <div className={styles.background} />

      {/* ── 말풍선 안내 문구 ── */}
      <div className={styles.speechBubble} role="note">
        <p>라이트리 빌리지에는 5개의 곡이 있어요!</p>
        <p>한번 돌아볼까요? 집을 선택해주세요!</p>
      </div>

      {/* ── 나무 레이어 ── */}
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
            onClick={(e) => handleHouseClick(song, e)}
          >
            <img
              src={`/assets/houses/${song.houseImg}.png`}
              className={styles.houseImg}
              alt=""
              aria-hidden="true"
            />
            <div className={styles.signPost}>
              <div className={styles.signBoard}>
                <span className={styles.signText}>{song.title}</span>
              </div>
              <div className={styles.signStick} />
            </div>
          </button>
        ))}
      </div>

      {/* ── 전환 리플: 집 클릭 시 wallColor가 화면 전체로 퍼짐 ── */}
      {ripple && (
        <div
          className={styles.transitionRipple}
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: ripple.color,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default VillagePage;
