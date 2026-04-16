import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import {
  isVillageSongSubSlug,
  PLACEHOLDER_DRIVE_URL,
  PLACEHOLDER_YOUTUBE_URL,
  SHEET_LINK_ORDER,
  SUB_PAGE_BY_SLUG,
  type VillageSongSubSlug,
} from '@/data/villageSongSubPages';
import {
  VILLAGE_HOME_PATH,
  villageSongDetailPath,
  villageSongResourcePath,
} from '@/constants/albumPaths';
import styles from './VillageSongResourcePage.module.css';

/**
 * 유튜브 썸네일 영역 클릭 — 추후 썸네일 이미지·URL을 곡별로 연결
 */
function openYouTubePlaceholder(): void {
  window.open(PLACEHOLDER_YOUTUBE_URL, '_blank', 'noopener,noreferrer');
}

/**
 * 구글 드라이브 다운로드 — 추후 곡·리소스별 URL로 교체
 */
function openDrivePlaceholder(): void {
  window.open(PLACEHOLDER_DRIVE_URL, '_blank', 'noopener,noreferrer');
}

/**
 * 곡(집) 하위 리소스 화면 — 워십 가이드 / Inst. / 언어 ver. / 악보
 *
 * - 경로: /albums/2026/{UUID}/home/:songId/:subSlug
 * - 하단 좌·우: 인접 리소스로 이동, 가운데 햄버거 → 바텀시트 목록
 */
const VillageSongResourcePage: React.FC = () => {
  const { songId: songIdParam, subSlug: subSlugParam } = useParams<{
    songId: string;
    subSlug: string;
  }>();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const songId = useMemo(() => {
    const n = Number.parseInt(songIdParam ?? '', 10);
    if (!Number.isFinite(n) || n < 1 || n > 5) return null;
    return n as 1 | 2 | 3 | 4 | 5;
  }, [songIdParam]);

  const subSlug = useMemo((): VillageSongSubSlug | null => {
    if (!subSlugParam || !isVillageSongSubSlug(subSlugParam)) return null;
    return subSlugParam;
  }, [subSlugParam]);

  const song = songId != null ? getVillageSongById(songId) : undefined;
  const cfg = subSlug != null ? SUB_PAGE_BY_SLUG[subSlug] : undefined;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  if (songId == null || song == null || subSlug == null || cfg == null) {
    if (songId != null) {
      return <Navigate to={villageSongDetailPath(songId)} replace />;
    }
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  const pageStyle = { ['--wall-color' as string]: song.wallColor } as React.CSSProperties;
  const infoBg = `color-mix(in srgb, ${song.wallColor} 24%, white 76%)`;

  const goSub = (slug: VillageSongSubSlug): void => {
    navigate(villageSongResourcePath(songId, slug));
  };

  return (
    <div className={styles.page} style={pageStyle}>
      <div className={styles.patternLayer} aria-hidden />

      <div className={styles.content}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(villageSongDetailPath(songId))}
          aria-label="곡 메뉴로 돌아가기"
        >
          <span className={styles.backCircle}>
            <span className={styles.backChevron} style={{ color: song.wallColor }}>
              ‹
            </span>
          </span>
        </button>

        <div className={styles.infoPanel} style={{ background: infoBg }}>
          <h1 className={styles.infoTitle}>{cfg.listTitle}</h1>
          <p className={styles.infoSubtitle}>{song.title}</p>
        </div>

        <div className={styles.mediaBlock}>
          {cfg.layout === 'video' ? (
            <button
              type="button"
              className={styles.thumbCard}
              onClick={openYouTubePlaceholder}
              aria-label="유튜브에서 재생 (준비 중)"
            >
              <span className={styles.thumbDim} aria-hidden />
              <span className={styles.thumbPlay} aria-hidden>
                <span className={styles.thumbPlayIcon}>▶</span>
              </span>
            </button>
          ) : (
            <div className={styles.sheetRow} aria-label="악보 이미지 영역 (추가 예정)">
              <div className={styles.sheetSlot} />
              <div className={styles.sheetSlot} />
            </div>
          )}

          {cfg.showDownload && (
            <button type="button" className={styles.downloadBtn} onClick={openDrivePlaceholder}>
              다운받기
            </button>
          )}
        </div>

        <nav className={styles.bottomNav} aria-label="다른 리소스로 이동">
          <div className={`${styles.navCluster} ${styles.navClusterLeft}`}>
            <button
              type="button"
              className={styles.navShapeBtn}
              onClick={() => goSub(cfg.left.slug)}
            >
              <span
                className={styles.navImgWrap}
                style={{ backgroundColor: cfg.left.wrapBg }}
              >
                <img src={cfg.left.vectorSrc} className={styles.navImg} alt="" />
              </span>
              <span className={styles.navLabel}>{cfg.left.label}</span>
            </button>
          </div>

          <div className={`${styles.navCluster} ${styles.navClusterCenter}`}>
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-label="다른 버전·리소스 목록 열기"
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>

          <div className={`${styles.navCluster} ${styles.navClusterRight}`}>
            <button
              type="button"
              className={styles.navShapeBtn}
              onClick={() => goSub(cfg.right.slug)}
            >
              <span
                className={styles.navImgWrap}
                style={{ backgroundColor: cfg.right.wrapBg }}
              >
                <img src={cfg.right.vectorSrc} className={styles.navImg} alt="" />
              </span>
              <span className={styles.navLabel}>{cfg.right.label}</span>
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className={styles.sheetBackdrop}
            aria-label="메뉴 닫기"
            onClick={closeMenu}
          />
          <div
            className={styles.sheetPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-sheet-title"
            style={pageStyle}
          >
            <div className={styles.sheetHandle} />
            <p id="resource-sheet-title" className={styles.sheetTitle}>
              다른 버전·리소스로 이동
            </p>
            <div className={styles.sheetScroll}>
              {SHEET_LINK_ORDER.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  className={`${styles.sheetLink} ${
                    item.slug === subSlug ? styles.sheetLinkActive : ''
                  }`}
                  onClick={() => {
                    goSub(item.slug);
                    closeMenu();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VillageSongResourcePage;
