import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getVillageSongById } from '@/data/villageSongMeta';
import { villageSongDetailPath, VILLAGE_HOME_PATH } from '@/constants/albumPaths';

/**
 * 곡 리소스 화면 임시 스텁
 * TODO: 곡 메뉴별(뮤직비디오, 한국어 ver., 영어 ver., 스페인어 ver., Inst., 워십 가이드, 악보) 화면 구현
 */
const VillageSongResourcePage: React.FC = () => {
  const { songId, subSlug } = useParams<{ songId: string; subSlug: string }>();
  const navigate = useNavigate();
  const song = getVillageSongById(Number(songId));

  if (!song) {
    return <Navigate to={VILLAGE_HOME_PATH} replace />;
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: song.wallColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 24,
        fontFamily: "'Default', 'Noto Sans KR', sans-serif",
        color: '#5C4A1F',
      }}
    >
      <h1 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{song.title}</h1>
      <p style={{ margin: 0 }}>메뉴: {subSlug}</p>
      <button
        onClick={() => navigate(villageSongDetailPath(song.id))}
        style={{
          marginTop: 12,
          padding: '10px 24px',
          background: 'rgba(255,255,255,0.92)',
          border: '1.5px solid rgba(0,0,0,0.08)',
          borderRadius: 999,
          fontWeight: 700,
          color: '#5C4A1F',
          cursor: 'pointer',
        }}
      >
        ← 뒤로
      </button>
    </div>
  );
};

export default VillageSongResourcePage;
