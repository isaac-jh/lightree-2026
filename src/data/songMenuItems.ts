/**
 * 곡 상세 페이지(/home/:songId) 및 곡 리소스 페이지(/home/:songId/:subSlug)에서
 * 공통으로 쓰이는 메뉴 항목 정의.
 */
export interface SongMenuItem {
  /** 라우팅 sub-slug (URL: /home/{songId}/{key}) */
  key: string;
  /** 버튼에 노출되는 벡터 아이콘 SVG 경로 */
  vector: string;
  /** 버튼/라벨에 표시되는 메뉴명 */
  label: string;
}

export const SONG_MENU_ITEMS: readonly SongMenuItem[] = [
  { key: 'mv',    vector: '/assets/buttons/song_button_music_video_vector.svg',   label: '뮤직비디오' },
  { key: 'ko',    vector: '/assets/buttons/song_button_korean_vector.svg',        label: '한국어 ver.' },
  { key: 'en',    vector: '/assets/buttons/song_button_english_vector.svg',       label: '영어 ver.' },
  { key: 'es',    vector: '/assets/buttons/song_button_spanish_vector.svg',       label: '스페인어 ver.' },
  { key: 'inst',  vector: '/assets/buttons/song_button_inst_vector.svg',          label: 'Inst.' },
  { key: 'guide', vector: '/assets/buttons/song_button_worship_guide_vector.svg', label: '워십 가이드 영상' },
  { key: 'sheet', vector: '/assets/buttons/song_button_song_sheet_vector.svg',    label: '악보 (단선보, 밴드보)' },
];
