import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { villageSongDetailPath, VILLAGE_CREDITS_PATH } from '@/constants/albumPaths';
import { getVillageSongById } from '@/data/villageSongMeta';
import MainTextLabel from '@/components/labels/MainTextLabel';
import MainBottomButton from '@/components/buttons/MainBottomButton';
import VillageHouse from '@/components/village/VillageHouse';
import { useLocale } from '@/context/LocaleContext';
import styles from './VillagePage.module.css';

type ViewMode = 'grid' | 'list';

interface RippleState {
  x: number;
  y: number;
  color: string;
}

/**
 * 빌리지 집 슬롯 정의 (아래→위 순서)
 * - houseClass / signClass : page CSS 의 위치 className 키
 * - 집 클릭 시 ripple 색상은 곡 상세 페이지 배경색(songMeta.wallColor)을 그대로 사용
 *   → 다음 페이지로 자연스럽게 이어지는 화면 전환
 */
/** 렌더 순서: 뒤(5) → 앞(1). 집·나무 좌표는 HomePage(AlbumPage)와 동일 */
const HOUSES = [
  {
    houseClass: 'house5',
    signClass: 'sign5',
    houseSrc: '/assets/houses/house5.svg',
    signSrc: '/assets/signs/sign_song5.svg',
    listSrc: '/assets/signs/list_sign_song5.svg',
    songId: 5,
    tree1Src: '/assets/trees/tree1.svg',
    tree1Class: 'house5Tree1',
    tree2Src: '/assets/trees/tree1.svg',
    tree2Class: 'house5Tree2',
  },
  {
    houseClass: 'house4',
    signClass: 'sign4',
    houseSrc: '/assets/houses/house4.svg',
    signSrc: '/assets/signs/sign_song4.svg',
    listSrc: '/assets/signs/list_sign_song4.svg',
    songId: 4,
    tree1Src: '/assets/trees/tree3.svg',
    tree1Class: 'house4Tree1',
    tree2Src: '/assets/trees/tree1.svg',
    tree2Class: 'house4Tree2',
  },
  {
    houseClass: 'house3',
    signClass: 'sign3',
    houseSrc: '/assets/houses/house3.svg',
    signSrc: '/assets/signs/sign_song3.svg',
    listSrc: '/assets/signs/list_sign_song3.svg',
    songId: 3,
    tree1Src: '/assets/trees/tree4.svg',
    tree1Class: 'house3Tree1',
  },
  {
    houseClass: 'house2',
    signClass: 'sign2',
    houseSrc: '/assets/houses/house2.svg',
    signSrc: '/assets/signs/sign_song2.svg',
    listSrc: '/assets/signs/list_sign_song2.svg',
    songId: 2,
    tree1Src: '/assets/trees/tree1.svg',
    tree1Class: 'house2Tree1',
    tree2Src: '/assets/trees/tree1.svg',
    tree2Class: 'house2Tree2',
  },
  {
    houseClass: 'house1',
    signClass: 'sign1',
    houseSrc: '/assets/houses/house1.svg',
    signSrc: '/assets/signs/sign_song1.svg',
    listSrc: '/assets/signs/list_sign_song1.svg',
    songId: 1,
    tree1Src: '/assets/trees/tree5.svg',
    tree1Class: 'house1Tree1',
  },
] as const;

/** 팻말 pop 애니메이션 시작 시점 */
const SIGN_BASE_DELAY = 0.45;
/** 팻말간 stagger 간격 */
const SIGN_STEP_DELAY = 0.1;
/** ripple 확장 → 라우팅 시점 (CSS 키프레임과 동기화) */
const RIPPLE_DURATION = 550;

const VillagePage: React.FC = () => {
  const navigate = useNavigate();
  const { messages } = useLocale();
  const pageRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [ripple, setRipple] = useState<RippleState | null>(null);

  const isList = viewMode === 'list';

  /**
   * 집 버튼 클릭 → 클릭 위치에서 곡 상세 페이지 배경색으로 ripple 시작
   *               → 0.55s 후 /home/{songId} 로 라우팅
   */
  const handleHouseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, songId: number) => {
      if (ripple || !pageRef.current) return;
      const song = getVillageSongById(songId);
      if (!song) return;
      const btnRect = e.currentTarget.getBoundingClientRect();
      const pageRect = pageRef.current.getBoundingClientRect();
      setRipple({
        x: btnRect.left + btnRect.width / 2 - pageRect.left,
        y: btnRect.top + btnRect.height / 2 - pageRect.top,
        color: song.wallColor,
      });
      window.setTimeout(() => navigate(villageSongDetailPath(songId)), RIPPLE_DURATION);
    },
    [ripple, navigate],
  );

  /** 리스트 뷰의 팻말 버튼 클릭 (ripple 없이 바로 라우팅) */
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

  return (
    <div className={styles.page} ref={pageRef}>
      {/* 배경 */}
      <div className={styles.background} />

      {/* 메인 씬 — hill(375×322) 좌표계 */}
      <div className={styles.scene}>
        <div className={styles.hillSecondWrap} aria-hidden="true">
          <img
            src="/assets/hill_second.svg"
            className={styles.hillSecond}
            alt=""
          />
          <div className={styles.backLayer}>
            <img src="/assets/trees/tree2.svg" className={`${styles.backTree} ${styles.backTree1}`} alt="" />
            <img src="/assets/trees/tree2.svg" className={`${styles.backTree} ${styles.backTree4}`} alt="" />
            <img src="/assets/trees/tree3.svg" className={`${styles.backTree} ${styles.backTree2}`} alt="" />
            <img src="/assets/trees/tree6.svg" className={`${styles.backTree} ${styles.backTree3}`} alt="" />
            <button
              type="button"
              className={[styles.signCreditTouchable, isList ? styles.gridHidden : ''].join(' ')}
              onClick={() => navigate(VILLAGE_CREDITS_PATH)}
              aria-label={messages.village.ariaCredits}
            >
              <img src="/assets/signs/sign_credit.svg" alt="" aria-hidden="true" />
            </button>
          </div>
        </div>

        <img src="/assets/hill.svg" className={styles.hill} alt="" aria-hidden="true" />

        {/* 씬 나무 — HomePage(AlbumPage)와 동일 */}
        <img src="/assets/trees/tree2.svg" className={`${styles.tree} ${styles.tree1}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree3.svg" className={`${styles.tree} ${styles.tree2}`} alt="" aria-hidden="true" />

        {/* 집 + 집별 나무 + 팻말 — HomePage(AlbumPage)와 동일 좌표 */}
        {HOUSES.map((h) => (
          <VillageHouse
            key={h.houseClass}
            houseSrc={h.houseSrc}
            signSrc={h.signSrc}
            songId={h.songId}
            houseClassName={styles[h.houseClass]}
            signClassName={styles[h.signClass]}
            tree1Src={'tree1Src' in h ? h.tree1Src : undefined}
            tree2Src={'tree2Src' in h ? h.tree2Src : undefined}
            tree1ClassName={'tree1Class' in h ? styles[h.tree1Class] : undefined}
            tree2ClassName={'tree2Class' in h ? styles[h.tree2Class] : undefined}
            ariaLabel={messages.village.ariaGoToSong(h.songId)}
            signDelay={`${SIGN_BASE_DELAY + (h.songId - 1) * SIGN_STEP_DELAY}s`}
            hidden={isList}
            onClick={handleHouseClick}
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
            aria-label={messages.village.ariaGoToSong(h.songId)}
          >
            <img src={h.listSrc} alt="" aria-hidden="true" />
          </button>
        ))}
        <button
          type="button"
          className={`${styles.listSignBtn} ${styles.listSignCredit}`}
          aria-label={messages.village.ariaCredits}
          onClick={() => navigate(VILLAGE_CREDITS_PATH)}
        >
          <img src="/assets/signs/list_sign_credit.svg" alt="" aria-hidden="true" />
        </button>
      </div>

      {/* 상단 안내 */}
      <MainTextLabel className={styles.mainLabelWrap} align="center">
        <p>{messages.village.bubbleLine1}</p>
        <p>{messages.village.bubbleLine2}</p>
      </MainTextLabel>

      <MainBottomButton
        className={styles.viewToggleBtn}
        onClick={toggleView}
        text={isList ? messages.village.viewGrid : messages.village.viewList}
      />

      {/* 화면 전환 ripple — 클릭 위치에서 wallColor 가 화면 전체로 퍼짐 */}
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
