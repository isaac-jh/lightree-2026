/// <reference types="vite/client" />

/**
 * Vite 환경변수 타입 선언
 * .env 파일의 VITE_ 접두사 변수를 타입 안전하게 사용하기 위해 선언
 * TODO: 환경변수 추가 시 여기에 타입 선언도 함께 추가
 */
interface ImportMetaEnv {
  /** 2026 앨범 페이지 경로 UUID */
  readonly VITE_ALBUM_2026_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
