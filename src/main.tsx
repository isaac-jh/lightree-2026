import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initViewportHeight, markBrowserEnv } from './utils/viewport';
import './styles/global.css';

// 인앱 브라우저 하단 컨트롤 바에 가려지지 않도록 가시 영역 높이(--app-height) 측정 시작
initViewportHeight();
// 카카오톡 인앱 브라우저 식별(intro 폰트 축소 분기에 사용)
markBrowserEnv();

/**
 * 앱 진입점
 * React 18 createRoot API 사용
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
