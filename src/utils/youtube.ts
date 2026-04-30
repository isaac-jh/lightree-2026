/**
 * 다양한 형식의 YouTube URL에서 video id (11자) 를 추출한다.
 *
 * 지원하는 형식:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://www.youtube.com/v/VIDEO_ID
 *  - https://www.youtube.com/shorts/VIDEO_ID
 *  - http(s)://m.youtube.com/...
 *  - youtube-nocookie.com/embed/VIDEO_ID
 *
 * 추출에 실패하면 undefined 반환.
 */
export function extractYouTubeId(url: string | undefined | null): string | undefined {
  if (!url) return undefined;

  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase().replace(/^www\.|^m\./, '');

    // youtu.be/VIDEO_ID
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0];
      return id && id.length === 11 ? id : undefined;
    }

    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      // /watch?v=VIDEO_ID
      if (u.pathname === '/watch') {
        const v = u.searchParams.get('v');
        return v && v.length === 11 ? v : undefined;
      }
      // /embed/VIDEO_ID, /v/VIDEO_ID, /shorts/VIDEO_ID
      const segments = u.pathname.split('/').filter(Boolean);
      if (segments.length >= 2 && ['embed', 'v', 'shorts'].includes(segments[0])) {
        const id = segments[1];
        return id.length === 11 ? id : undefined;
      }
    }
  } catch {
    // invalid URL
  }
  return undefined;
}

/**
 * video id로 YouTube hqdefault 썸네일 URL을 생성.
 * (480×360 — 콘텐츠는 가운데 16:9 영역에 위치, 위/아래 검은 띠는 object-fit: cover로 잘라냄)
 */
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
