/**
 * 외부 URL을 새 창/탭으로 연다.
 * - url 이 비어있으면 아무 동작도 하지 않음 (링크 미정 상태에서 사용)
 * - 보안 옵션(noopener,noreferrer) 적용 — opener 노출 방지 + Referer 정보 차단
 */
export function openExternal(url: string | undefined | null): void {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}
