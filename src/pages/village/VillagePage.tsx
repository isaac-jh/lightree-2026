import MainBottomButton from '@/components/buttons/MainBottomButton';
import MainTextLabel from '@/components/labels/MainTextLabel';
import SkyBackgroundClouds from '@/components/layout/SkyBackgroundClouds';
import VillageHouse from '@/components/village/VillageHouse';
import VillageSign from '@/components/village/VillageSign';
import { VILLAGE_CREDITS_PATH, villageSongDetailPath } from '@/constants/albumPaths';
import { useLocale } from '@/context/LocaleContext';
import { getVillageSongById, type VillageSongId } from '@/data/villageSongMeta';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const LIST_SIGN_SRC = '/assets/signs/list_sign.svg';
const CREDIT_GRID_SIGN_SRC = '/assets/signs/credit_sign.svg';
const CREDIT_LIST_SIGN_SRC = '/assets/signs/list_credit_sign.svg';

/** 렌더 순서: 뒤(5) → 앞(1). 집·나무 좌표는 HomePage(AlbumPage)와 동일 */
const HOUSES = [
  {
    houseClass: 'house5',
    signClass: 'sign5',
    houseSrc: '/assets/houses/house5.svg',
    songId: 5 as VillageSongId,
    tree1Src: '/assets/trees/tree1.svg',
    tree1Class: 'house5Tree1',
    tree2Src: '/assets/trees/tree1.svg',
    tree2Class: 'house5Tree2',
  },
  {
    houseClass: 'house4',
    signClass: 'sign4',
    houseSrc: '/assets/houses/house4.svg',
    songId: 4 as VillageSongId,
    tree1Src: '/assets/trees/tree3.svg',
    tree1Class: 'house4Tree1',
    tree2Src: '/assets/trees/tree1.svg',
    tree2Class: 'house4Tree2',
  },
  {
    houseClass: 'house3',
    signClass: 'sign3',
    houseSrc: '/assets/houses/house3.svg',
    songId: 3 as VillageSongId,
    tree1Src: '/assets/trees/tree4.svg',
    tree1Class: 'house3Tree1',
  },
  {
    houseClass: 'house2',
    signClass: 'sign2',
    houseSrc: '/assets/houses/house2.svg',
    songId: 2 as VillageSongId,
    tree1Src: '/assets/trees/tree1.svg',
    tree1Class: 'house2Tree1',
    tree2Src: '/assets/trees/tree1.svg',
    tree2Class: 'house2Tree2',
  },
  {
    houseClass: 'house1',
    signClass: 'sign1',
    houseSrc: '/assets/houses/house1.svg',
    songId: 1 as VillageSongId,
    tree1Src: '/assets/trees/tree5.svg',
    tree1Class: 'house1Tree1',
  },
] as const;

const reversedHouses = [...HOUSES].reverse();

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
   * 클릭 위치에서 곡 상세 배경색(wallColor) ripple 후 라우팅 — 그리드·리스트 공통
   */
  const navigateWithRipple = useCallback(
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

  const handleHouseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, songId: number) => {
      navigateWithRipple(e, songId);
    },
    [navigateWithRipple],
  );

  const toggleView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMode((m) => (m === 'grid' ? 'list' : 'grid'));
  }, []);

  return (
    <div className={styles.page} ref={pageRef}>
      {/* 배경: bg.svg 기저색 + cloud.svg 애니메이션 */}
      <div className={styles.background} aria-hidden="true">
        <SkyBackgroundClouds />
      </div>

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
            <img
              src="/assets/trees/tree6.svg"
              className={[styles.backTree, styles.backTree3, isList ? styles.gridHidden : ''].join(' ')}
              alt=""
            />
            <button
              type="button"
              className={[styles.signCreditTouchable, isList ? styles.gridHidden : ''].join(' ')}
              onClick={() => navigate(VILLAGE_CREDITS_PATH)}
              aria-label={messages.village.ariaCredits}
            >
              <VillageSign
                signSrc={CREDIT_GRID_SIGN_SRC}
                label={messages.credits.screenTitle}
                className={styles.signCreditSign}
                overlayLayout="house"
                animated={false}
              />
            </button>
          </div>
        </div>

        <img src="/assets/hill2.svg" className={styles.hill} alt="" aria-hidden="true" />

        {/* 씬 나무 — HomePage(AlbumPage)와 동일 */}
        <img src="/assets/trees/tree2.svg" className={`${styles.tree} ${styles.tree1}`} alt="" aria-hidden="true" />
        <img src="/assets/trees/tree3.svg" className={`${styles.tree} ${styles.tree2}`} alt="" aria-hidden="true" />

        {/* 집 + 집별 나무 + 팻말 — HomePage(AlbumPage)와 동일 좌표 */}
        {HOUSES.map((h) => (
          <VillageHouse
            key={h.houseClass}
            houseSrc={h.houseSrc}
            signLabel={messages.songs[h.songId].title}
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
        {reversedHouses.map((h) => (
          <button
            key={`list-${h.houseClass}`}
            className={styles.listSignBtn}
            onClick={(e) => navigateWithRipple(e, h.songId)}
            aria-label={messages.village.ariaGoToSong(h.songId)}
          >
            <VillageSign
              signSrc={LIST_SIGN_SRC}
              label={messages.songs[h.songId].title}
              className={styles.listSign}
              overlayLayout="list"
              animated={false}
            />
          </button>
        ))}
        <button
          type="button"
          className={`${styles.listSignBtn} ${styles.listSignCredit}`}
          aria-label={messages.village.ariaCredits}
          onClick={() => navigate(VILLAGE_CREDITS_PATH)}
        >
          <VillageSign
            signSrc={CREDIT_LIST_SIGN_SRC}
            label={messages.credits.screenTitle}
            className={styles.listSign}
            overlayLayout="list"
            animated={false}
          />
        </button>
      </div>

      {/* 상단 안내 */}
      <MainTextLabel className={styles.mainLabelWrap} align="left">
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
