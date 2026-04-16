/**
 * 빌리지 집(곡) 메타 — 마을 지도·곡 상세 화면에서 공통 사용
 * wallColor: 집 벽면과 동일한 배경색 (에셋 기준으로 추정, 필요 시 수정)
 * TODO: 1~4곡 작사·작곡 실명 확정 후 lyricist / composer 갱신
 */
export type VillageSongId = 1 | 2 | 3 | 4 | 5;

export type VillageSongStyleKey = 'song1' | 'song2' | 'song3' | 'song4' | 'song5';

export interface VillageSongMeta {
  id: VillageSongId;
  title: string;
  lyricist: string;
  composer: string;
  houseImg: string;
  styleKey: VillageSongStyleKey;
  wallColor: string;
}

export const VILLAGE_SONGS: readonly VillageSongMeta[] = [
  {
    id: 1,
    title: '기쁜걸 어떡해!',
    lyricist: '미정',
    composer: '미정',
    houseImg: 'house11',
    styleKey: 'song1',
    wallColor: '#e889a8',
  },
  {
    id: 2,
    title: '감사로 살아가요',
    lyricist: '미정',
    composer: '미정',
    houseImg: 'house9',
    styleKey: 'song2',
    wallColor: '#6eb8e0',
  },
  {
    id: 3,
    title: '나는 기쁨의 예배자',
    lyricist: '미정',
    composer: '미정',
    houseImg: 'house6',
    styleKey: 'song3',
    wallColor: '#b5a6e8',
  },
  {
    id: 4,
    title: '나는야 하나님 자녀',
    lyricist: '미정',
    composer: '미정',
    houseImg: 'house3',
    styleKey: 'song4',
    wallColor: '#8fd4a2',
  },
  {
    id: 5,
    title: '믿음으로 승리해요',
    lyricist: '오권',
    composer: '성희경',
    houseImg: 'house1',
    styleKey: 'song5',
    wallColor: '#ff7eb3',
  },
] as const;

/**
 * 숫자 id로 곡 메타 조회 (1~5만 유효)
 */
export function getVillageSongById(id: number): VillageSongMeta | undefined {
  return VILLAGE_SONGS.find((s) => s.id === id);
}
