import type { VillageSongSubSlug } from '@/data/villageSongSubPages';

/**
 * 리소스 화면 배경에 깔리는 미세 벡터 장식 (목업의 은은한 에셋 레이어)
 * - position % / width % 로 반응형 배치
 * TODO: 실제 목업 캡처와 비교해 위치·크기·불투명도 미세 조정
 */
export interface ResourceVectorDecoItem {
  src: string;
  top: string;
  left: string;
  width: string;
  opacity: number;
  rotate?: number;
}

export const RESOURCE_VECTOR_DECO: Record<
  VillageSongSubSlug,
  readonly ResourceVectorDecoItem[]
> = {
  guide: [
    { src: '/assets/vectors/vector_small_sun.png', top: '6%', left: '72%', width: '16%', opacity: 0.14, rotate: 18 },
    { src: '/assets/vectors/vector_flower.png', top: '42%', left: '4%', width: '18%', opacity: 0.12, rotate: -8 },
    { src: '/assets/vectors/vector_cloud.png', top: '68%', left: '78%', width: '20%', opacity: 0.11, rotate: 6 },
    { src: '/assets/vectors/vector_star.png', top: '22%', left: '38%', width: '12%', opacity: 0.1, rotate: -22 },
    { src: '/assets/vectors/vector_wave.png', top: '82%', left: '12%', width: '22%', opacity: 0.09, rotate: 4 },
  ],
  inst: [
    { src: '/assets/vectors/vector_wave.png', top: '10%', left: '8%', width: '24%', opacity: 0.12, rotate: -6 },
    { src: '/assets/vectors/vector_cloud.png', top: '48%', left: '68%', width: '22%', opacity: 0.14, rotate: 10 },
    { src: '/assets/vectors/vector_flower.png', top: '72%', left: '6%', width: '16%', opacity: 0.1, rotate: -12 },
    { src: '/assets/vectors/vector_small_sun.png', top: '28%', left: '52%', width: '11%', opacity: 0.11, rotate: 25 },
    { src: '/assets/vectors/vector_star.png', top: '58%', left: '40%', width: '10%', opacity: 0.08, rotate: -18 },
  ],
  'ko-ver': [
    { src: '/assets/vectors/vector_cloud.png', top: '8%', left: '62%', width: '21%', opacity: 0.13, rotate: 8 },
    { src: '/assets/vectors/vector_flower.png', top: '38%', left: '10%', width: '17%', opacity: 0.12, rotate: -5 },
    { src: '/assets/vectors/vector_star.png', top: '62%', left: '74%', width: '13%', opacity: 0.1, rotate: 15 },
    { src: '/assets/vectors/vector_wave.png', top: '78%', left: '28%', width: '20%', opacity: 0.09, rotate: -4 },
    { src: '/assets/vectors/vector_crunch.png', top: '18%', left: '32%', width: '12%', opacity: 0.08, rotate: 22 },
  ],
  'en-ver': [
    { src: '/assets/vectors/vector_star.png', top: '12%', left: '18%', width: '14%', opacity: 0.14, rotate: -14 },
    { src: '/assets/vectors/vector_small_sun.png', top: '8%', left: '70%', width: '15%', opacity: 0.12, rotate: 8 },
    { src: '/assets/vectors/vector_flower.png', top: '52%', left: '6%', width: '16%', opacity: 0.1, rotate: 6 },
    { src: '/assets/vectors/vector_cloud.png', top: '66%', left: '58%', width: '22%', opacity: 0.11, rotate: -10 },
    { src: '/assets/vectors/vector_wave.png', top: '30%', left: '44%', width: '18%', opacity: 0.09, rotate: 3 },
  ],
  'es-ver': [
    { src: '/assets/vectors/vector_cloud.png', top: '6%', left: '12%', width: '20%', opacity: 0.13, rotate: -8 },
    { src: '/assets/vectors/vector_wave.png', top: '36%', left: '72%', width: '24%', opacity: 0.12, rotate: 12 },
    { src: '/assets/vectors/vector_star.png', top: '70%', left: '8%', width: '12%', opacity: 0.1, rotate: 20 },
    { src: '/assets/vectors/vector_flower.png', top: '22%', left: '48%', width: '14%', opacity: 0.09, rotate: -16 },
    { src: '/assets/vectors/vector_sun.png', top: '80%', left: '62%', width: '16%', opacity: 0.08, rotate: -6 },
  ],
  sheet: [
    { src: '/assets/vectors/vector_small_sun.png', top: '10%', left: '68%', width: '17%', opacity: 0.13, rotate: 12 },
    { src: '/assets/vectors/vector_flower.png', top: '44%', left: '6%', width: '18%', opacity: 0.11, rotate: -8 },
    { src: '/assets/vectors/vector_wave.png', top: '72%', left: '70%', width: '22%', opacity: 0.1, rotate: 6 },
    { src: '/assets/vectors/vector_star.png', top: '28%', left: '36%', width: '11%', opacity: 0.1, rotate: -20 },
    { src: '/assets/vectors/vector_cloud.png', top: '58%', left: '48%', width: '16%', opacity: 0.09, rotate: 4 },
    { src: '/assets/vectors/vector_quasar.png', top: '84%', left: '18%', width: '14%', opacity: 0.08, rotate: -10 },
  ],
};
