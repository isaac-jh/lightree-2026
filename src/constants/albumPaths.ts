/**
 * 2026 앨범 관련 URL 경로
 * - .env 의 VITE_ALBUM_2026_PATH 와 동기화
 */
const ALBUM_2026_PATH = import.meta.env.VITE_ALBUM_2026_PATH;

/** 앨범 루트: /albums/2026/{UUID} */
export const ALBUM_2026_BASE = `/albums/2026/${ALBUM_2026_PATH}`;

/** 빌리지(마을) 지도 */
export const VILLAGE_HOME_PATH = `${ALBUM_2026_BASE}/home`;

/**
 * 곡 상세(집 안) 경로
 * @param songId 1~5
 */
export function villageSongDetailPath(songId: number): string {
  return `${VILLAGE_HOME_PATH}/${songId}`;
}

/**
 * 곡 안 리소스 화면 (뮤직비디오 / 한국어·영어·스페인어 ver. / Inst. / 워십 가이드 / 악보)
 * @param subSlug `siteContent` 의 `SongMenuSlug` (mv, ko, en, es, inst, guide, sheet)
 */
export function villageSongResourcePath(songId: number, subSlug: string): string {
  return `${VILLAGE_HOME_PATH}/${songId}/${subSlug}`;
}
