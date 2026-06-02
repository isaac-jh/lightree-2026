import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './CustomScrollArea.module.css';

/** 썸이 너무 작아져 잡기 어려워지는 것을 막는 최소 높이(px) */
const MIN_THUMB_HEIGHT = 24;

interface CustomScrollAreaProps {
  children: React.ReactNode;
  /** 외곽 컨테이너(.root)에 덧붙일 클래스 — 보통 크기/CSS 변수(테마) 지정용 */
  className?: string;
  /** 스크롤 뷰포트(.viewport)에 덧붙일 클래스 — 보통 내부 padding 지정용 */
  viewportClassName?: string;
}

/**
 * 커스텀 스크롤 영역.
 *
 * 네이티브 스크롤바를 숨기고, 트랙(배경)과 썸을 직접 렌더링해
 * "항상 표시 / 슬림 / 트랙·썸 동일 폭으로 정확히 겹침 / 라운딩" 요구를
 * OS·브라우저 설정과 무관하게 보장한다.
 *
 * - 휠/터치 스크롤: 뷰포트의 네이티브 스크롤을 그대로 사용(부드러움·관성 유지)
 * - 썸 드래그: 포인터 이벤트로 scrollTop 직접 제어(마우스/터치 공통)
 * - 콘텐츠/컨테이너 크기 변화: ResizeObserver 로 썸 크기·위치 재계산
 *
 * 테마는 `--scrollbar-size` / `--scrollbar-track-color` / `--scrollbar-thumb-color`
 * CSS 변수로 조정한다.
 */
const CustomScrollArea: React.FC<CustomScrollAreaProps> = ({
  children,
  className,
  viewportClassName,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // 드래그 시작 시점의 포인터 Y / scrollTop 스냅샷
  const dragRef = useRef<{startY: number; startScrollTop: number} | null>(null);
  const [thumb, setThumb] = useState<{height: number; top: number}>({
    height: 0,
    top: 0,
  });

  /** 현재 스크롤 상태로부터 썸의 높이/위치를 다시 계산 */
  const update = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const trackHeight = track.clientHeight;
    const {scrollTop, scrollHeight, clientHeight} = viewport;

    // 스크롤이 필요 없으면 썸이 트랙을 가득 채우도록(항상 표시)
    if (scrollHeight <= clientHeight + 1) {
      setThumb({height: trackHeight, top: 0});
      return;
    }

    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      MIN_THUMB_HEIGHT,
    );
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - thumbHeight;
    const top = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0;
    setThumb({height: thumbHeight, top});
  }, []);

  // 최초 렌더 및 children 변경 시 즉시 반영
  useLayoutEffect(() => {
    update();
  }, [update, children]);

  // 뷰포트/콘텐츠 크기 변화 및 창 리사이즈에 대응
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    const content = viewport.firstElementChild;
    if (content) observer.observe(content);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const handleThumbPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      e.preventDefault();
      dragRef.current = {startY: e.clientY, startScrollTop: viewport.scrollTop};
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [],
  );

  const handleThumbPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!drag || !viewport || !track) return;

      const trackHeight = track.clientHeight;
      const {scrollHeight, clientHeight} = viewport;
      const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * trackHeight,
        MIN_THUMB_HEIGHT,
      );
      const maxThumbTop = trackHeight - thumbHeight;
      const maxScroll = scrollHeight - clientHeight;
      if (maxThumbTop <= 0 || maxScroll <= 0) return;

      // 썸 이동량(px) → 스크롤량 비례 변환
      const deltaScroll =
        ((e.clientY - drag.startY) / maxThumbTop) * maxScroll;
      viewport.scrollTop = drag.startScrollTop + deltaScroll;
    },
    [],
  );

  const handleThumbPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // 이미 해제된 경우 무시
      }
    },
    [],
  );

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div
        ref={viewportRef}
        className={[styles.viewport, viewportClassName]
          .filter(Boolean)
          .join(' ')}
        onScroll={update}
      >
        {children}
      </div>
      <div ref={trackRef} className={styles.track} aria-hidden="true">
        <div
          className={styles.thumb}
          style={{
            height: `${thumb.height}px`,
            transform: `translateY(${thumb.top}px)`,
          }}
          onPointerDown={handleThumbPointerDown}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={handleThumbPointerUp}
          onPointerCancel={handleThumbPointerUp}
        />
      </div>
    </div>
  );
};

export default CustomScrollArea;
