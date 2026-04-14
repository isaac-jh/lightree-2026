import React from 'react';
import styles from './VillagePage.module.css';

/**
 * 마을의 곡 데이터
 * - houseImg: assets/houses/ 이미지 파일명
 * - styleKey: CSS module에서 위치/크기를 정의하는 클래스 키
 * TODO: path 설정 후 각 버튼 클릭 시 개별 곡 페이지로 라우팅 연결
 */
const SONGS = [
  { id: 1, title: '기쁜걸 어떡해!',      houseImg: 'house11', styleKey: 'song1' },
  { id: 2, title: '감사로 살아가요',      houseImg: 'house9',  styleKey: 'song2' },
  { id: 3, title: '나는 기쁨의 예배자',   houseImg: 'house6',  styleKey: 'song3' },
  { id: 4, title: '나는야 하나님 자녀',   houseImg: 'house3',  styleKey: 'song4' },
  { id: 5, title: '믿음으로 승리해요',    houseImg: 'house1',  styleKey: 'song5' },
] as const;

/**
 * 빌리지(마을) 페이지
 *
 * - 경로: /albums/2026/${VITE_ALBUM_2026_PATH}/home
 * - 안개 속에서 등장하는 동화책 마을 씬
 * - 5채의 집이 원근감 있게 배치, 각 집+팻말이 하나의 버튼으로 동작
 * - 집들은 느린 흔들림(sway) 애니메이션 적용
 * TODO: 각 HouseButton onClick에 개별 곡 페이지 라우팅 연결
 */
const VillagePage: React.FC = () => {
  return (
    <div className={styles.page}>
      {/* ── 배경 ── */}
      <div className={styles.background} />

      {/* ── 말풍선 안내 문구 ── */}
      <div className={styles.speechBubble} role="note">
        <p>라이트리 빌리지에는 5개의 곡이 있어요!</p>
        <p>한번 돌아볼까요? 집을 선택해주세요!</p>
      </div>

      {/* ── 집 씬 ── */}
      <div className={styles.scene}>
        {SONGS.map((song) => (
          <button
            key={song.id}
            className={`${styles.houseBtn} ${styles[song.styleKey]}`}
            aria-label={song.title}
            onClick={() => {
              /* TODO: navigate to song page */
            }}
          >
            <img
              src={`/assets/houses/${song.houseImg}.png`}
              className={styles.houseImg}
              alt=""
              aria-hidden="true"
            />
            {/* ── 팻말 ── */}
            <div className={styles.signPost}>
              <div className={styles.signBoard}>
                <span className={styles.signText}>{song.title}</span>
              </div>
              <div className={styles.signStick} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VillagePage;
