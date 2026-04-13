# Lightree 2026

모바일 전용 React 웹 애플리케이션 보일러플레이트.

## 지원 환경

| 환경 | 범위 | 동작 방식 |
|------|------|-----------|
| 모바일 세로 | iPhone 8+ (375px ~) | 전체 너비 사용 |
| 세로 태블릿 | ~768px | 전체 너비 사용 |
| 가로 태블릿 & 데스크톱 | 769px 이상 | 중앙 고정 (max-width: 480px) + 양 옆 여백 |

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **CSS Modules** (컴포넌트 스코프 스타일)
- **CSS 변수** (디자인 토큰)

## 프로젝트 구조

```
src/
├── components/
│   └── layout/
│       ├── MobileContainer.tsx        # 모바일 전용 레이아웃 컨테이너
│       └── MobileContainer.module.css
├── pages/
│   └── home/
│       ├── HomePage.tsx
│       └── HomePage.module.css
├── styles/
│   └── global.css                     # CSS 변수 및 리셋
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## 시작하기

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 레이아웃 구조

```
┌─────────────────────────────────────────┐  ← 전체 화면 (overlay: 회색 배경)
│         │                   │           │
│  여백   │   모바일 앱 영역   │   여백    │
│ (회색)  │   (max 480px)     │  (회색)   │
│         │                   │           │
└─────────────────────────────────────────┘
```

## iOS Safe Area 대응

`env(safe-area-inset-*)` CSS 변수를 통해 노치, Dynamic Island, 홈 인디케이터 영역을 자동으로 처리합니다.  
`index.html`의 viewport meta에 `viewport-fit=cover`가 설정되어 있습니다.
