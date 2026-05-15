/**
 * 사이트 전역 텍스트(한국어·영어) 및 외부 링크(YouTube·악보 등) 단일 소스.
 *
 * - UI 문자열: SITE_MESSAGES.ko / SITE_MESSAGES.en
 * - 곡별 영상·다운로드 URL: SITE_LINKS (비어 있으면 해당 버튼은 동작 없음)
 * - 메뉴 벡터 경로: SONG_MENU_STRUCTURE (라벨은 locale별 SITE_MESSAGES.songMenu 에서 조회)
 *
 * TODO: 영문 작사·작곡 표기 방식 확정 시 songs 영역 수정
 */

/** 지원 로케일 */
export type Locale = 'ko' | 'en';

/** 곡 메뉴·리소스 슬러그 */
export type SongMenuSlug =
  | 'mv'
  | 'ko'
  | 'en'
  | 'es'
  | 'inst'
  | 'guide'
  | 'sheet';

export type VillageSongId = 1 | 2 | 3 | 4 | 5;

/** 슬러그 → YouTube URL, 슬러그 → 파일 다운로드 URL 등 */
type SlugUrlMap = Partial<Record<string, string>>;

export interface SongLinksEntry {
  /** 메뉴 슬러그(mv / ko / en / es / inst / guide) → YouTube URL */
  videos?: SlugUrlMap;
  /** 메뉴 슬러그(ko / en / es / inst / guide) → 다운로드 URL */
  downloads?: SlugUrlMap;
  /** 악보 단선보 다운로드 URL */
  sheetLead?: string;
  /** 악보 밴드보 다운로드 URL */
  sheetBand?: string;
}

/** 로케일별 문자열 묶음 */
export interface LocaleMessages {
  brandAlt: string;
  landingLogoAlt: string;
  langToggleLabel: string;
  langToggleAria: string;
  home: {
    subtitle2026: string;
    introTitle: string;
    introBodyLines: readonly string[];
    btnEnterVillage: string;
    btnNext: string;
  };
  village: {
    bubbleLine1: string;
    bubbleLine2: string;
    viewGrid: string;
    viewList: string;
    ariaGoToSong: (songId: number) => string;
    ariaCredits: string;
  };
  songDetail: {
    goBack: string;
    lyricistPrefix: string;
    composerPrefix: string;
  };
  songMenu: Record<SongMenuSlug, string>;
  resource: {
    download: string;
    downloadLead: string;
    downloadBand: string;
    openVideoAria: (menuLabel: string) => string;
    showMenu: string;
    /** Home 버튼에 표시되는 짧은 라벨 */
    homeButtonLabel: string;
    homeButtonAria: string;
  };
  menuSheet: {
    close: string;
  };
  songs: Record<VillageSongId, { title: string; lyricist: string; composer: string }>;
  credits: {
    /** main_text_label 타이틀 (스텝 크레딧 등) */
    screenTitle: string;
    /** credit_text_label 안 스크롤 영역 본문 (여러 줄) */
    all: string;
  };
}

/** 한국어·영어 UI 문자열 */
export const SITE_MESSAGES: Record<Locale, LocaleMessages> = {
  ko: {
    brandAlt: '라이트리 빌리지',
    landingLogoAlt: '라이트리 빌리지',
    langToggleLabel: 'ENG',
    langToggleAria: '영어로 전환',
    home: {
      subtitle2026: '2026 라이트리 빌리지',
      introTitle: '라이트리 어린이 몸찬양 앨범',
      introBodyLines: [
        '라이트리는 어린이 찬양을 위한 디지털 앨범 플랫폼입니다.',
        '곡 감상, 영상 시청, 악보까지',
        '모든 콘텐츠를 직관적으로 이용할 수 있도록 구성되어 있습니다.',
      ],
      btnEnterVillage: '라이트리 빌리지 입장하기',
      btnNext: '다음',
    },
    village: {
      bubbleLine1: '라이트리 빌리지에는 5개의 곡이 있어요!',
      bubbleLine2: '한번 돌아볼까요? 선택해주세요!',
      viewGrid: '그림 뷰 보기',
      viewList: '리스트 뷰 보기',
      ariaGoToSong: (songId: number) => `${songId}번 곡으로 이동`,
      ariaCredits: '스텝 크레딧',
    },
    songDetail: {
      goBack: '뒤로 가기',
      lyricistPrefix: '작사',
      composerPrefix: '작곡',
    },
    songMenu: {
      mv: '뮤직비디오',
      ko: '한국어 ver.',
      en: '영어 ver.',
      es: '스페인어 ver.',
      inst: 'Inst.',
      guide: '워십 가이드 영상',
      sheet: '악보 (단선보, 밴드보)',
    },
    resource: {
      download: '다운받기',
      downloadLead: '단선보 다운받기',
      downloadBand: '밴드보 다운받기',
      openVideoAria: (menuLabel: string) => `${menuLabel} 영상 보기`,
      showMenu: '메뉴 보기',
      homeButtonLabel: '홈',
      homeButtonAria: '마을 지도로 이동',
    },
    menuSheet: {
      close: '메뉴 닫기',
    },
    songs: {
      1: { title: '믿음으로 승리해요', lyricist: '오권', composer: '성희경' },
      2: { title: '나는야 하나님 자녀', lyricist: '김영순', composer: '김은지' },
      3: { title: '나는 기쁨의 예배자', lyricist: '김모세', composer: '김은지' },
      4: { title: '감사로 살아가요', lyricist: '박성준', composer: '김희연' },
      5: { title: '기쁜 걸 어떡해!', lyricist: '정성민', composer: '임채민' },
    },
    credits: {
      screenTitle: '스텝 크레딧',
      all: `Singers
고은유, 이율, 이현, 전하율, 정하영, 조선율

Worship
김유은, 나예린, 문라희, 박세영, 배이엘, 서현,
신주아, 오하라, 이하엘, 이하은, 전현서, 정이은,
최보혜, 최소영, 최신우, 홍예린

Lead Pastor 박성진
Assistant Pastor 김모세
Chief Advisor 장형철
Executive Director 이서경

Praise Coaches
김은지, 김해니, 이은지, 장이수, 정미금, 정인영

Worship Coaches
박새롬, 방혜주, 손솔미, 원예진, 이다은

Praise Director 김은지
Arrangement 김은지, 김희연, 임채민

Session Musicians
- 김희연, 임채민 (Main Synth)
- 임채민, 이예연 (Second Synth)
- 박건우, 신인섭 (Bass Guitar)
- 김종성, 서석현 (Electric Guitar)
- 김종성 (Acoustic Guitar)
- 정홍수 (Drums / Percussion)

English Vocalists
이은지, 정민제, Coco McKinley
Spanish Vocalists
양진서, 이지예

Recording Engineers 김도원, 신인섭, 조영광
Mixing & Mastering 정태균

Video Directors 최병호, 이여진, 이장훈
Video Support  김세원, 김주형, 손형란
Color Editor 김세원

Art Director 김하영
Album Design 고지연, 김하영
Website Developers 이여진, 이장훈
Website Designer 정희제

Project Coordinators
이상훈, 이성욱, 이홍석
Production Assistants 강상진, 고현경
Accounting 박혜민

Translation Team
장에스더, 공은아, 김은진, 정김사무엘,
정레베카김, 정민제, Juliana M.S`
    },
  },
  en: {
    brandAlt: 'Lightree Village',
    landingLogoAlt: 'Lightree Village',
    langToggleLabel: 'KOR',
    langToggleAria: 'Switch to Korean',
    home: {
      subtitle2026: '2026 Lightree Village',
      introTitle: "Lightree Children’s Worship Album",
      introBodyLines: [
        'Lightree is the digital album platform for children’s praise.',
        'From the praises, the videos, and even the scores.', 
        'This website is curated to enjoy each content intuitively. ',
      ],
      btnEnterVillage: 'Enter Lightree Village',
      btnNext: 'Next',
    },
    village: {
      bubbleLine1: 'There are 5 songs in the Lightree village.',
      bubbleLine2: 'Should we take a look? Please select one!',
      viewGrid: 'Image view',
      viewList: 'List view',
      ariaGoToSong: (songId: number) => `Go to song ${songId}`,
      ariaCredits: 'Staff Credits',
    },
    songDetail: {
      goBack: 'Back',
      lyricistPrefix: 'Lyrics',
      composerPrefix: 'Composition',
    },
    songMenu: {
      mv: 'Music Video',
      ko: 'Korean Ver.',
      en: 'English Ver.',
      es: 'Spanish Ver.',
      inst: 'Inst.',
      guide: 'Worship Guide Video',
      sheet: 'Score (Lead sheet, Band sheet)',
    },
    resource: {
      download: 'Download',
      downloadLead: 'Download lead sheet',
      downloadBand: 'Download band chart',
      openVideoAria: (menuLabel: string) => `Watch ${menuLabel}`,
      showMenu: 'View Menu',
      homeButtonLabel: 'Home',
      homeButtonAria: 'Go to village map',
    },
    menuSheet: {
      close: 'Close menu',
    },
    songs: {
      1: {
        title: 'Every Day in Victory',
        lyricist: 'Kwon Oh',
        composer: 'HeeKyung Sung',
      },
      2: {
        title: "Yes I Am, I’m a Child of God",
        lyricist: 'YoungSoon Kim',
        composer: 'EunJi Kim',
      },
      3: {
        title: 'Joy of Worship',
        lyricist: 'Moses Kim',
        composer: 'EunJi Kim',
      },
      4: {
        title: 'I Will Live With Thanks',
        lyricist: 'SungJoon Park',
        composer: 'HeeYeon Kim',
      },
      5: {
        title: 'Can’t Help the Joy I Feel',
        lyricist: 'SungMin Chung',
        composer: 'ChaeMin Lim',
      },
    },
    credits: {
      screenTitle: 'Staff Credits',
      all: `Singers 
Eunyu Ko, Yool Lee, Hyun Lee,
Hayul Jeon, Hayeong Jeong, Sun yul Jo 

Worship 
Yueun Kim, Yerin Na, Rahee Mun,
SayYoung Park, EL Bae, Hyun Seo,
Jua Shin, Hara Oh, Ha-el Lee,
Ha-eun Lee, Hyunseo Jeon, Ieun Jung,
Bohye Choi, Soyoung Choi,
Shin Woo Choi , Yerin Hong

Lead Pastor Seong Jin Park 
Assistant Pastor Moses Kim
Chief Advisor Hyoungchul Jang
Executive Director Seokyung Lee

Praise Coaches 
Eunji Kim, Haeni Kim, Eunji Lee,
Yisoo Jang, Migeum Chung, Inyoung Jung

Worship Coaches 
Saerom Park, Hye joo Bang , Solmi Son,
Yejin Won, Daeun Lee

Praise Director Eunji Kim
Arrangement 
Eunji Kim, Heeyeon Kim, Chaemin Lim

Session Musicians
- Heeyeon Kim, Chaemin Lim (Main Synth)
- Chaemin Lim, Yeyeon Lee (Second Synth)
- Gunwoo Park, InSub Shin (Bass Guitar)
- JongSeong Kim, Seokhyun Seo (Electric Guitar)
- JongSeong Kim (Acoustic Guitar)
- 정홍수 Hong Su Jung (Drums / Percussion)

English Vocalists 
Eunji Lee, Becky Jeong, Coco McKinley
Spanish Vocalists 
Jinseo Yang, Jiye Lee 

Recording Engineers
Do Won Kim, InSub Shin, Yeong Gwang Cho
Mixing & Mastering Tai Kyun Jung

Video Directors 
Byungho Choi, Yeojin Lee, Janghun Lee
Video Support
Dong Hyeok LEE, Saewon Kim,
HyungRan Son, Juhyung Kim
Color Editor Saewon Kim

Art Director Hayeong Kim
Album Design Jiyeon Ko, Hayeong Kim 
Website Developers Yeojin Lee, Janghun Lee
Website Designer Ashley Jeong

Project Coordinators 
Sanghoon Lee, Sungwook Lee, Hongseok Lee
Production Assistants 
Sangjin Kang, Hyunkyoung Ko
Accounting Hyemin Park 

Translation Team 
Esther Chang, Euna Kong, Eunjin Kim, 
Jong Kim Samuel, Rebekah Kim Jong,
Becky Jeong, Juliana M.S`
    }
  },
};

/**
 * 메뉴 항목 순서 및 벡터 아이콘 경로 (라벨은 SITE_MESSAGES[locale].songMenu[key])
 */
export const SONG_MENU_STRUCTURE: readonly {
  key: SongMenuSlug;
  vector: string;
}[] = [
  {
    key: 'mv',
    vector: '/assets/buttons/song_button_music_video_vector.svg',
  },
  {
    key: 'ko',
    vector: '/assets/buttons/song_button_korean_vector.svg',
  },
  {
    key: 'en',
    vector: '/assets/buttons/song_button_english_vector.svg',
  },
  {
    key: 'es',
    vector: '/assets/buttons/song_button_spanish_vector.svg',
  },
  {
    key: 'inst',
    vector: '/assets/buttons/song_button_inst_vector.svg',
  },
  {
    key: 'guide',
    vector: '/assets/buttons/song_button_worship_guide_vector.svg',
  },
  {
    key: 'sheet',
    vector: '/assets/buttons/song_button_song_sheet_vector.svg',
  },
];

/**
 * 리소스 페이지 배경 패턴 및 기능 플래그 (텍스트 라벨은 songMenu 와 동일 키 사용)
 */
export const RESOURCE_MENU_META: Record<
  SongMenuSlug,
  {
    bgPattern: string;
    hasVideo?: boolean;
    hasDownload?: boolean;
    isSheet?: boolean;
  }
> = {
  mv: {
    bgPattern: 'mv_bg_pattern.svg',
    hasVideo: true,
    hasDownload: false,
  },
  ko: {
    bgPattern: 'korean_bg_pattern.svg',
    hasVideo: true,
    hasDownload: true,
  },
  en: {
    bgPattern: 'english_bg_pattern.svg',
    hasVideo: true,
    hasDownload: true,
  },
  es: {
    bgPattern: 'spanish_bg_pattern.svg',
    hasVideo: true,
    hasDownload: true,
  },
  inst: {
    bgPattern: 'inst_bg_pattern.svg',
    hasVideo: true,
    hasDownload: true,
  },
  guide: {
    bgPattern: 'worship_guide_bg_pattern.svg',
    hasVideo: true,
    hasDownload: true,
  },
  sheet: {
    bgPattern: 'song_sheet_bg_pattern.svg',
    isSheet: true,
  },
};

/**
 * 곡별 YouTube·악보 등 외부 링크 (비워두면 해당 버튼은 미동작)
 *
 * 예시:
 *   1: {
 *     videos: { mv: 'https://youtu.be/...', ko: 'https://youtu.be/...' },
 *     downloads: { ko: 'https://drive.google.com/...', ... },
 *     sheetLead: 'https://...',
 *     sheetBand: 'https://...',
 *   },
 */
export const SITE_LINKS: Partial<Record<VillageSongId, SongLinksEntry>> = {
  // 1: {
  //   videos: { mv: 'https://youtu.be/...', ko: 'https://youtu.be/...' },
  //   downloads: { ko: 'https://drive.google.com/...', ... },
  //   sheetLead: 'https://...',
  //   sheetBand: 'https://...',
  // },
};

/** 로케일별 메시지 객체 반환 */
export function getLocaleMessages(locale: Locale): LocaleMessages {
  return SITE_MESSAGES[locale];
}

/** 곡 id로 해당 로케일의 제목·작사·작곡 문자열 반환 */
export function getSongLocaleCopy(
  locale: Locale,
  songId: number,
): LocaleMessages['songs'][VillageSongId] | undefined {
  const id = songId as VillageSongId;
  if (id < 1 || id > 5) return undefined;
  return SITE_MESSAGES[locale].songs[id];
}
