import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Locale } from '@/content/siteContent';
import { SITE_MESSAGES } from '@/content/siteContent';

const STORAGE_KEY = 'lightree-locale';

interface LocaleContextValue {
  /** 현재 UI 로케일 */
  locale: Locale;
  /** 현재 로케일의 모든 문자열 뭉치 */
  messages: (typeof SITE_MESSAGES)[Locale];
  /** ENG/KO 전환 */
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * 로케일 상태 프로바이더.
 *
 * - 기본값 ko, ENG 버튼으로 en 전환 후 KO 라벨로 되돌림
 * - 선택값은 localStorage 에 저장되어 새로고침 후에도 유지
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ko');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === 'ko' || raw === 'en') setLocale(raw);
    } catch {
      /* SSR 또는 저장 불가 환경 → 기본 ko 유지 */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* no-op */
    }
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'ko' ? 'en' : 'ko'));
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      messages: SITE_MESSAGES[locale],
      toggleLocale,
    }),
    [locale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/**
 * 로케일 컨텍스트 접근 훅 (Provider 바깥에서 호출 시 에러)
 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}
