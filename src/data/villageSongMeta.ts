/**
 * 빌리지 곡(집) 메타 — 곡 상세 화면에서 공통 사용
 * wallColor: 곡 상세 페이지의 페이지 배경색
 */
export type VillageSongId = 1 | 2 | 3 | 4 | 5;

export type VillageSongStyleKey = 'song1' | 'song2' | 'song3' | 'song4' | 'song5';

export interface VillageSongMeta {
  id: VillageSongId;
  title: string;
  lyricist: string;
  composer: string;
  styleKey: VillageSongStyleKey;
  wallColor: string;
}

export const VILLAGE_SONGS: readonly VillageSongMeta[] = [
  {
    id: 1,
    title: '믿음으로 승리해요',
    lyricist: '오권',
    composer: '성희경',
    styleKey: 'song1',
    wallColor: '#BCD6F0',
  },
  {
    id: 2,
    title: '나는야 하나님 자녀',
    lyricist: '김영순',
    composer: '김은지',
    styleKey: 'song2',
    wallColor: '#EE9FB5',
  },
  {
    id: 3,
    title: '나는 기쁨의 예배자',
    lyricist: '김모세',
    composer: '김은지',
    styleKey: 'song3',
    wallColor: '#F8E4A0',
  },
  {
    id: 4,
    title: '감사로 살아가요',
    lyricist: '박성준',
    composer: '김희연',
    styleKey: 'song4',
    wallColor: '#B091CD',
  },
  {
    id: 5,
    title: '기쁜 걸 어떡해!',
    lyricist: '정성민',
    composer: '임채민',
    styleKey: 'song5',
    wallColor: '#8DAE7C',
  },
] as const;

/** 숫자 id로 곡 메타 조회 (1~5만 유효) */
export function getVillageSongById(id: number): VillageSongMeta | undefined {
  return VILLAGE_SONGS.find((s) => s.id === id);
}
