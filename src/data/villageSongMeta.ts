/**
 * 빌리지 곡(집) 구조 메타 — 배경색·스타일 키 등 비언어 정보
 *
 * 제목·작사·작곡 문자열은 {@link SITE_MESSAGES} (`src/content/siteContent.ts`) 에서 로케일별로 관리합니다.
 */
export type VillageSongId = 1 | 2 | 3 | 4 | 5;

export type VillageSongStyleKey = 'song1' | 'song2' | 'song3' | 'song4' | 'song5';

export interface VillageSongMeta {
  id: VillageSongId;
  styleKey: VillageSongStyleKey;
  /** 곡 상세·ripple 전환 등 페이지 배경색 */
  wallColor: string;
}

export const VILLAGE_SONGS: readonly VillageSongMeta[] = [
  { id: 1, styleKey: 'song1', wallColor: '#BCD6F0' },
  { id: 2, styleKey: 'song2', wallColor: '#EE9FB5' },
  { id: 3, styleKey: 'song3', wallColor: '#F8E4A0' },
  { id: 4, styleKey: 'song4', wallColor: '#B091CD' },
  { id: 5, styleKey: 'song5', wallColor: '#8DAE7C' },
] as const;

/** 숫자 id로 곡 메타 조회 (1~5만 유효) */
export function getVillageSongById(id: number): VillageSongMeta | undefined {
  return VILLAGE_SONGS.find((s) => s.id === id);
}
