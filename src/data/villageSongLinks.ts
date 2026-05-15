/**
 * 곡별 외부 링크 접근 함수.
 *
 * 실제 URL 값은 {@link SITE_LINKS} (`src/content/siteContent.ts`) 한 곳에서 관리합니다.
 */

import type { VillageSongId } from '@/content/siteContent';
import { SITE_LINKS } from '@/content/siteContent';

export function getSongVideoUrl(songId: number, slug: string): string | undefined {
  return SITE_LINKS[songId as VillageSongId]?.videos?.[slug];
}

export function getSongDownloadUrl(songId: number, slug: string): string | undefined {
  return SITE_LINKS[songId as VillageSongId]?.downloads?.[slug];
}

export function getSongSheetLeadUrl(songId: number): string | undefined {
  return SITE_LINKS[songId as VillageSongId]?.sheetLead;
}

export function getSongSheetBandUrl(songId: number): string | undefined {
  return SITE_LINKS[songId as VillageSongId]?.sheetBand;
}
