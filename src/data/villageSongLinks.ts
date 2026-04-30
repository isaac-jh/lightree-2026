/**
 * 곡별 외부 링크 데이터 (YouTube 영상, Google Drive 다운로드)
 *
 * 모든 thumbnail 클릭 → videos[slug] (YouTube)
 * "다운받기" 버튼 클릭 → downloads[slug] (Google Drive)
 * "단선보 / 밴드보 다운받기" → sheetLead / sheetBand (Google Drive)
 *
 * 링크가 준비되면 아래 VILLAGE_SONG_LINKS 객체에 채워 넣으면 됨.
 * 모든 값이 optional 이므로 비어있는 항목은 클릭해도 아무 동작 없음.
 */

type SlugUrlMap = Partial<Record<string, string>>;

interface VillageSongLinks {
  /** 메뉴 슬러그(mv / ko / en / es / inst / guide) → YouTube URL */
  videos?: SlugUrlMap;
  /** 메뉴 슬러그(ko / en / es / inst / guide) → Google Drive 다운로드 URL */
  downloads?: SlugUrlMap;
  /** 악보 단선보 다운로드 URL */
  sheetLead?: string;
  /** 악보 밴드보 다운로드 URL */
  sheetBand?: string;
}

/**
 * TODO: 링크 준비되면 곡 id 별로 채우기.
 * 예시:
 *   1: {
 *     videos: { mv: 'https://youtu.be/...', ko: 'https://youtu.be/...', ... },
 *     downloads: { ko: 'https://drive.google.com/...', ... },
 *     sheetLead: 'https://drive.google.com/...',
 *     sheetBand: 'https://drive.google.com/...',
 *   },
 */
const VILLAGE_SONG_LINKS: Partial<Record<number, VillageSongLinks>> = {};

export function getSongVideoUrl(songId: number, slug: string): string | undefined {
  return VILLAGE_SONG_LINKS[songId]?.videos?.[slug];
}

export function getSongDownloadUrl(songId: number, slug: string): string | undefined {
  return VILLAGE_SONG_LINKS[songId]?.downloads?.[slug];
}

export function getSongSheetLeadUrl(songId: number): string | undefined {
  return VILLAGE_SONG_LINKS[songId]?.sheetLead;
}

export function getSongSheetBandUrl(songId: number): string | undefined {
  return VILLAGE_SONG_LINKS[songId]?.sheetBand;
}
