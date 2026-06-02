/* ============================================
   viewport 높이 보정 유틸
   ============================================ */

/**
 * 인앱 브라우저/모바일 브라우저의 하단 컨트롤 바 가림 문제를 해결하기 위한 유틸.
 *
 * 배경:
 * - iOS Safari, Android Chrome, 그리고 카카오톡·네이버·인스타그램 등 인앱 브라우저는
 *   하단에 동적으로 나타나는 컨트롤 바(주소창/네비게이션 바)를 가진다.
 * - `100vh` 는 "가장 큰 뷰포트"(컨트롤 바가 접힌 상태)를 기준으로 하므로,
 *   화면을 100vh 로 채우면 하단 UI(메인 버튼·언덕 등)가 컨트롤 바 뒤로 가려진다.
 * - `100dvh` 는 동적 뷰포트를 따르지만 일부 인앱 브라우저(특히 카카오톡)는
 *   지원이 불완전하거나 값이 부정확할 수 있다.
 *
 * 해결:
 * - `window.visualViewport.height` 는 브라우저 크롬(컨트롤 바)을 제외한
 *   "실제로 보이는 영역"의 높이를 정확히 반환한다.
 * - 이 값을 `--app-height` CSS 변수로 노출하여 레이아웃 루트 높이에 사용하면,
 *   어떤 브라우저에서도 콘텐츠가 항상 가시 영역 안에 들어온다.
 *
 * 적용 위치: `:root` 의 `--app-height` (global.css / MobileContainer 에서 사용)
 */
export function initViewportHeight(): void {
  const root = document.documentElement;

  /** 현재 가시 영역 높이를 측정해 CSS 변수로 반영 */
  const apply = (): void => {
    const visualViewport = window.visualViewport;
    // visualViewport 미지원 브라우저는 innerHeight 로 폴백
    const height = visualViewport ? visualViewport.height : window.innerHeight;
    root.style.setProperty('--app-height', `${Math.round(height)}px`);
  };

  apply();

  // visualViewport 의 resize/scroll(컨트롤 바 노출 변화 포함)에 반응
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', apply);
    window.visualViewport.addEventListener('scroll', apply);
  }
  // 폴백 및 회전 대응
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
}

/**
 * 인앱 브라우저(특히 카카오톡) 감지 후 `<html>` 에 식별 클래스를 부여한다.
 *
 * 카카오톡 인앱 브라우저는 상·하단 네이티브 바로 가용 높이가 줄고 폰트가 다르게
 * 렌더링되어, intro 라벨 텍스트가 라벨 밖으로 넘치는 문제가 있다.
 * 이 클래스(`kakaotalk`)가 있을 때만 폰트를 라벨 폭 기준(cqw)으로 축소하고,
 * 그 외 브라우저에서는 기존(고정) 폰트 크기를 그대로 유지한다.
 */
export function markBrowserEnv(): void {
  const ua = navigator.userAgent || '';
  if (/KAKAOTALK/i.test(ua)) {
    document.documentElement.classList.add('kakaotalk');
  }
}
