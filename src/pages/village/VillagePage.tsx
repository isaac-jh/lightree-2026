import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { villageSongDetailPath } from '@/constants/albumPaths';
import styles from './VillagePage.module.css';

type ViewMode = 'grid' | 'list';

/**
 * 집 위치(아래→위) → 곡 번호 매핑.
 * 사인 SVG는 시각 순서(아래→위)로 sign_song1~5,
 * 라우팅은 반대(아래 = /home/5, 위 = /home/1)
 */
const HOUSES = [
  { houseClass: 'house1', houseSrc: '/assets/houses/house1.svg', signClass: 'sign1', signSrc: '/assets/signs/sign_song1.svg', listSrc: '/assets/signs/list_sign_song1.svg', songId: 5 },
  { houseClass: 'house2', houseSrc: '/assets/houses/house2.svg', signClass: 'sign2', signSrc: '/assets/signs/sign_song2.svg', listSrc: '/assets/signs/list_sign_song2.svg', songId: 4 },
  { houseClass: 'house3', houseSrc: '/assets/houses/house3.svg', signClass: 'sign3', signSrc: '/assets/signs/sign_song3.svg', listSrc: '/assets/signs/list_sign_song3.svg', songId: 3 },
  { houseClass: 'house4', houseSrc: '/assets/houses/house4.svg', signClass: 'sign4', signSrc: '/assets/signs/sign_song4.svg', listSrc: '/assets/signs/list_sign_song4.svg', songId: 2 },
  { houseClass: 'house5', houseSrc: '/assets/houses/house5.svg', signClass: 'sign5', signSrc: '/assets/signs/sign_song5.svg', listSrc: '/assets/signs/list_sign_song5.svg', songId: 1 },
];

const VillagePage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const goToSong = useCallback(
    (songId: number) => {
      navigate(villageSongDetailPath(songId));
    },
    [navigate],
  );

  const toggleView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMode((m) => (m === 'grid' ? 'list' : 'grid'));
  }, []);

  const handleEng = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 언어 전환 시스템 연결
  }, []);

  const isList = viewMode === 'list';

  return (
    <div className={styles.page}>
      {/* 배경 */}
      <div className={styles.background} />

      {/* hill_second — bg 바로 위 (z-index: 1) */}
      <img
        src="/assets/hill_second.svg"
        className={styles.hillSecond}
        alt=""
        aria-hidden="true"
      />

      {/* 뒤쪽 레이어: 뒤쪽 나무 + sign_credit (hill_second와 함께 올라옴) */}
      <div className={styles.backLayer} aria-hidden="true">
        <img src="/assets/trees/tree2.svg" className={`${styles.backTree} ${styles.backTree1}`} alt="" />
        <img src="/assets/trees/tree3.svg" className={`${styles.backTree} ${styles.backTree2}`} alt="" />
        <img
          src="/assets/signs/sign_credit.svg"
          className={`${styles.signCredit} ${isList ? styles.gridHidden : ''}`}
          alt=""
        />
      </div>

      {/* 메인 씬 (홈과 동일 — 그대로 복사) */}
      <div className={styles.scene}>
        <img src="/assets/hill.svg" className={styles.hill} alt="" aria-hidden="true" />

        {/* 나무 — 홈 화면과 완전히 동일 */}
        <img src="/assets/trees/tree3.svg" className={`${styles.tree} ${styles.tree3}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree1.svg" className={`${styles.tree} ${styles.tree1}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree2.svg" className={`${styles.tree} ${styles.tree2}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree6.svg" className={`${styles.tree} ${styles.tree6}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree5.svg" className={`${styles.tree} ${styles.tree5}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree4.svg" className={`${styles.tree} ${styles.tree4}`} alt="" aria-hidden="true" />

        {/* 집 (버튼) — 홈과 완전히 동일 위치 */}
        {HOUSES.map((h) => (
          <button
            key={h.houseClass}
            className={`${styles.houseBtn} ${styles[h.houseClass]} ${isList ? styles.gridHidden : ''}`}
            onClick={() => goToSong(h.songId)}
            aria-label={`${h.songId}번 곡으로 이동`}
          >
            <img src={h.houseSrc} alt="" aria-hidden="true" />
          </button>
        ))}

        {/* 팻말 — 정적 이미지(클릭 X), 뿅 하고 등장 */}
        {HOUSES.map((h, idx) => (
          <img
            key={h.signClass}
            src={h.signSrc}
            className={`${styles.signImg} ${styles[h.signClass]} ${isList ? styles.gridHidden : ''}`}
            alt=""
            aria-hidden="true"
            style={{ animationDelay: `${0.45 + idx * 0.1}s` }}
          />
        ))}
      </div>

      {/* 리스트 뷰 (페이지 전체 영역) */}
      <div className={`${styles.listLayer} ${isList ? styles.listLayerVisible : ''}`}>
        {HOUSES.map((h) => (
          <button
            key={`list-${h.houseClass}`}
            className={styles.listSignBtn}
            onClick={() => goToSong(h.songId)}
            aria-label={`${h.songId}번 곡으로 이동`}
          >
            <img src={h.listSrc} alt="" aria-hidden="true" />
          </button>
        ))}
        <button className={`${styles.listSignBtn} ${styles.listSignCredit}`} aria-label="스텝 크레딧">
          <img src="/assets/signs/list_sign_credit.svg" alt="" aria-hidden="true" />
        </button>
      </div>

      {/* 상단 안내 (main_text_label) */}
      <div className={styles.mainLabelWrap}>
        <img src="/assets/main_text_label.svg" className={styles.mainLabelImg} alt="" aria-hidden="true" />
        <div className={styles.mainLabelText}>
          <p>라이트리 빌리지에는 5개의 곡이 있어요!</p>
          <p>한번 돌아볼까요? 선택해주세요!</p>
        </div>
      </div>

      {/* 하단 토글 버튼 (main_bottom_button.svg + 텍스트 오버레이) */}
      <button className={styles.viewToggleBtn} onClick={toggleView}>
        <img src="/assets/buttons/main_bottom_button.svg" className={styles.viewToggleImg} alt="" aria-hidden="true" />
        <span className={styles.viewToggleText}>{isList ? '그림 뷰 보기' : '리스트 뷰 보기'}</span>
      </button>

      {/* ENG 버튼 */}
      <button className={styles.engButton} onClick={handleEng} aria-label="Switch to English">
        ENG
      </button>
    </div>
  );
};

export default VillagePage;
