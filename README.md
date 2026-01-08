# BookFinder — Kakao Book Search API 기반 책 검색 · 즐겨찾기 · 검색 기록 프로젝트

BookFinder는 **카카오 책 검색 API**를 기반으로, 사용자가 원하는 책을 빠르게 찾고 저장할 수 있도록 만든 검색 서비스입니다.  
단순히 “검색 결과를 보여주는 화면”을 만드는 것이 아니라, **검색 흐름(입력 → 요청 → 로딩/에러 → 결과/더보기)**을 안정적으로 구성하고,  
**즐겨찾기/최근 검색어를 LocalStorage로 영속화**해 실제 서비스에 가까운 사용자 경험을 목표로 설계했습니다.

---

## Live Demo

🔗 https://cxfls-book-finder.vercel.app/

---

## 문제 정의 (Problem Statement)

검색 UI는 구현 자체는 간단해 보이지만, 실제로는 다음과 같은 요구사항이 함께 따라옵니다.

- 입력 값 정리(공백 처리) 및 “빈 검색” 상태 관리
- 요청 중 로딩 상태와 에러 상태를 명확히 분리
- 동일 키워드 재검색 시 UX(스크롤/결과 갱신) 일관성 유지
- 페이지네이션(더 보기)에서 중복 요청 및 경쟁 상태(race condition) 방지
- 즐겨찾기/검색 기록을 새로고침 이후에도 유지(영속화)
- 결과가 없을 때의 빈 화면 처리 및 안내 문구

BookFinder는 위 문제를 **단방향 데이터 흐름**으로 정리하고, 상태를 예측 가능하게 유지하는 방식으로 해결합니다.

---

## 핵심 설계 방향 (Core Design Principles)

### 1. 검색 흐름을 상태로 모델링

- `query`(URL), `lastQuery`(화면 표시), `books`, `loading`, `error`, `hasMore`로 검색 상태를 분리
- “검색 전(초기)” / “검색 중” / “결과 없음” / “결과 있음”을 명확히 구분

### 2. 검색 기록과 즐겨찾기는 UI가 아니라 lib에서 관리

- LocalStorage 접근을 컴포넌트에서 분리해 `lib/`로 이동
- 저장/로드/초기화 로직을 함수로 캡슐화해 재사용과 테스트 가능성 확보

### 3. UX를 제품처럼 다듬기

- Sticky SearchBar로 입력 컨텍스트 유지
- 검색 직후 스크롤 상단 이동으로 결과 탐색 효율 개선
- Skeleton UI로 로딩 체감 개선
- Top 버튼으로 긴 목록 탐색 편의 제공

---

## 주요 기능 (Features)

- 책 검색 (Kakao Book Search API)
  - 키워드 기반 검색
  - 로딩/에러/빈 결과 UI 처리
  - “더 보기” 기반 페이지네이션(append)
- 책 상세 페이지
  - ISBN 기반 조회
  - 제목/저자/설명/이미지 렌더링
  - 목록으로 돌아가기 UX
- 즐겨찾기
  - 목록/상세에서 토글
  - 즐겨찾기 전용 페이지
  - 전체 삭제(확인 다이얼로그)
- 최근 검색어
  - 최대 10개 저장
  - 중복 제거 후 최신순 정렬
  - 전체 삭제
- 초기 화면 섹션
  - 인기도서 / 추천도서(목업 데이터)
- 편의 기능
  - Top 버튼(부드러운 스크롤)
  - Skeleton 로딩 카드

---

## Architecture Overview

```
book-finder/
├── src/
│   ├── components/
│   │   ├── BookCard.tsx
│   │   ├── BookCardSkeleton.tsx
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   └── TopButton.tsx
│   ├── pages/
│   │   ├── SearchPage.tsx
│   │   ├── BookDetailPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── lib/
│   │   ├── favorites.ts
│   │   ├── search.ts
│   │   └── recommendedBook.ts
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

- `pages/`: 라우팅 단위 화면 구성(검색/상세/즐겨찾기)
- `components/`: 재사용 UI 컴포넌트(표현 중심)
- `lib/`: LocalStorage 기반 영속화 로직 및 목업 데이터
- `SearchPage`: 검색 상태 모델링(로딩/에러/결과/더보기)과 UX 제어의 중심

---

## 기술 스택 (Tech Stack)

- React (Vite)
- TypeScript
- React Router DOM
- Tailwind CSS
- Kakao Book Search API
- LocalStorage (즐겨찾기/검색 기록)
- Vercel (배포)

---

## 환경 변수 (Environment Variables)

Kakao REST API 키 설정이 필요합니다.

```bash
VITE_KAKAO_REST_API_KEY=YOUR_KAKAO_REST_API_KEY
```

Vercel 배포 환경에서는 `Project → Settings → Environment Variables`에서 동일하게 설정합니다.

---

## 로컬 실행 (Getting Started)

```bash
npm install
npm run dev
```

---

## 회고 (What This Project Shows)

이 프로젝트는 “API 연동을 해봤다”에 그치지 않고,  
**검색 UI에서 발생하는 상태/UX 문제를 구조적으로 정리**하는 것을 목표로 했습니다.

- 검색 흐름을 상태로 모델링하고, 로딩/에러/빈 결과를 안정적으로 처리한 경험
- URL query 기반으로 검색 컨텍스트를 유지하고, 화면 상태와 연결한 경험
- LocalStorage를 util로 분리해 영속화 로직을 재사용 가능한 형태로 만든 경험
- Skeleton/TopButton/Sticky UI 등 실제 서비스 수준의 UX 디테일을 적용한 경험
