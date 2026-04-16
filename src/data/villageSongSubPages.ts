/**
 * 집(곡) 안 — 각 리소스 화면(워십 가이드, Inst., 언어 ver., 악보) 정의
 * - left / right: 하단 양쪽 이동 버튼
 * - 바텀시트 목록 순서: SHEET_LINK_ORDER
 * - 기존 MR 화면은 Inst. 로 통합(슬러그 inst, 다운로드 노출 등 MR 계열 유지)
 * TODO: 곡별 유튜브·구글 드라이브 URL을 villageSongMeta 또는 별도 맵으로 이관
 */
export const VILLAGE_SONG_SUB_SLUGS = [
  'guide',
  'inst',
  'ko-ver',
  'en-ver',
  'es-ver',
  'sheet',
] as const;

export type VillageSongSubSlug = (typeof VILLAGE_SONG_SUB_SLUGS)[number];

/** 바텀시트에 표시할 링크 순서 (스크롤 목록) */
export const SHEET_LINK_ORDER: readonly { slug: VillageSongSubSlug; label: string }[] = [
  { slug: 'guide', label: '워십 가이드 영상' },
  { slug: 'inst', label: 'Inst.' },
  { slug: 'ko-ver', label: '한국어 ver.' },
  { slug: 'en-ver', label: '영어 ver.' },
  { slug: 'es-ver', label: '스페인어 ver.' },
  { slug: 'sheet', label: '악보 (단선보, 밴드보)' },
] as const;

export type SubPageLayout = 'video' | 'sheet';

export interface SubPageNavSide {
  slug: VillageSongSubSlug;
  label: string;
  vectorSrc: string;
  /** 벡터 뒤 직사각 래퍼 배경색 (모든 곡 화면 공통 팔레트) */
  wrapBg: string;
}

export interface SubPageConfig {
  slug: VillageSongSubSlug;
  /** 상단 카드 첫 줄 제목 */
  listTitle: string;
  layout: SubPageLayout;
  showDownload: boolean;
  left: SubPageNavSide;
  right: SubPageNavSide;
}

const T = {
  flower: '#1b6b4a',
  star: '#f2c94c',
  wave: '#3d8fd4',
  cloud: '#8ecff2',
  guide: '#2ecc71',
  sheet: '#f2994a',
  crunch: '#2ecc71',
} as const;

export const SUB_PAGE_BY_SLUG: Record<VillageSongSubSlug, SubPageConfig> = {
  guide: {
    slug: 'guide',
    listTitle: '워십 가이드 영상',
    layout: 'video',
    showDownload: false,
    left: {
      slug: 'inst',
      label: 'Inst.',
      vectorSrc: '/assets/vectors/vector_cloud.png',
      wrapBg: T.cloud,
    },
    right: {
      slug: 'sheet',
      label: '악보',
      vectorSrc: '/assets/vectors/vector_sun.png',
      wrapBg: T.sheet,
    },
  },
  inst: {
    slug: 'inst',
    listTitle: 'Inst.',
    layout: 'video',
    showDownload: true,
    left: {
      slug: 'es-ver',
      label: '스페인어 ver.',
      vectorSrc: '/assets/vectors/vector_wave.png',
      wrapBg: T.wave,
    },
    right: {
      slug: 'guide',
      label: '워십 가이드 영상',
      vectorSrc: '/assets/vectors/vector_crunch.png',
      wrapBg: T.crunch,
    },
  },
  'ko-ver': {
    slug: 'ko-ver',
    listTitle: '한국어 ver.',
    layout: 'video',
    showDownload: true,
    left: {
      slug: 'sheet',
      label: '악보',
      vectorSrc: '/assets/vectors/vector_sun.png',
      wrapBg: T.sheet,
    },
    right: {
      slug: 'en-ver',
      label: '영어 ver.',
      vectorSrc: '/assets/vectors/vector_star.png',
      wrapBg: T.star,
    },
  },
  'en-ver': {
    slug: 'en-ver',
    listTitle: '영어 ver.',
    layout: 'video',
    showDownload: false,
    left: {
      slug: 'ko-ver',
      label: '한국어 ver.',
      vectorSrc: '/assets/vectors/vector_flower.png',
      wrapBg: T.flower,
    },
    right: {
      slug: 'es-ver',
      label: '스페인어 ver.',
      vectorSrc: '/assets/vectors/vector_wave.png',
      wrapBg: T.wave,
    },
  },
  'es-ver': {
    slug: 'es-ver',
    listTitle: '스페인어 ver.',
    layout: 'video',
    showDownload: false,
    left: {
      slug: 'en-ver',
      label: '영어 ver.',
      vectorSrc: '/assets/vectors/vector_star.png',
      wrapBg: T.star,
    },
    right: {
      slug: 'inst',
      label: 'Inst.',
      vectorSrc: '/assets/vectors/vector_cloud.png',
      wrapBg: T.cloud,
    },
  },
  sheet: {
    slug: 'sheet',
    listTitle: '악보 (단선보, 밴드보)',
    layout: 'sheet',
    showDownload: true,
    left: {
      slug: 'guide',
      label: '워십 가이드 영상',
      vectorSrc: '/assets/vectors/vector_crunch.png',
      wrapBg: T.crunch,
    },
    right: {
      slug: 'ko-ver',
      label: '한국어 ver.',
      vectorSrc: '/assets/vectors/vector_flower.png',
      wrapBg: T.flower,
    },
  },
};

/** 외부 링크 플레이스홀더 — TODO: 곡·슬러그별 실 URL로 교체 */
export const PLACEHOLDER_YOUTUBE_URL = 'https://www.youtube.com/';
export const PLACEHOLDER_DRIVE_URL = 'https://drive.google.com/';

export function isVillageSongSubSlug(s: string): s is VillageSongSubSlug {
  return (VILLAGE_SONG_SUB_SLUGS as readonly string[]).includes(s);
}

/**
 * 리소스 화면 배경색·뒤로가기 화살표색 (제공 목업 톤)
 * - 패턴 레이어는 VillageSongResourcePage.module.css 의 .pat* 로 구현
 */
export const RESOURCE_PAGE_THEME: Record<
  VillageSongSubSlug,
  { base: string; chevron: string }
> = {
  guide: { base: '#3fe085', chevron: '#15803d' },
  inst: { base: '#9ee5fc', chevron: '#0369a1' },
  'ko-ver': { base: '#5edd7a', chevron: '#166534' },
  'en-ver': { base: '#fef08a', chevron: '#b45309' },
  'es-ver': { base: '#5eb0f5', chevron: '#1d4ed8' },
  sheet: { base: '#fb923c', chevron: '#c2410c' },
};
