📚 BookFinder – 책 검색 및 추천 서비스

🔗 배포 링크: https://book-finder-six-xi.vercel.app/
🔗 GitHub: https://github.com/cxfls/book-finder

사용자가 원하는 책을 쉽고 빠르게 찾을 수 있도록 만든 카카오 책 검색 API 기반 검색 서비스입니다.
즐겨찾기 / 최근 검색어 / 인기도서 / 추천도서 / 상세 페이지 등 도서 앱의 기본 기능을 모두 갖춘 프로젝트입니다.

🚀 기술 스택 (Tech Stack)

Frontend
• React (Vite)
• TypeScript
• React Router DOM
• Tailwind CSS
• React Icons

API
• Kakao Book Search API

Data Persistence
• LocalStorage
• 즐겨찾기 저장
• 검색 기록 저장

Deployment
• Vercel

✨ 주요 기능 (Features)

🔍 1. 책 검색 기능
• Kakao Book Search API 연동
• 검색 시 딜레이 없이 빠른 결과 제공
• 페이지네이션 기반 “더 보기” 기능 제공
• 검색 직후 자동 스크롤 상단 이동

⭐ 2. 즐겨찾기 기능
• 책 상세 페이지 & 목록에서 별 아이콘으로 추가/삭제
• LocalStorage 저장 → 새로고침/재접속해도 유지
• 즐겨찾기 목록 페이지 제공
• “전체 삭제” 버튼 + 확인 모달 기능 포함

🕒 3. 최근 검색어 저장
• LocalStorage 기반
• 클릭 시 해당 검색어로 다시 검색
• “기록 전체 지우기” 기능 포함

📖 4. 책 상세 정보 페이지
• 제목 / 저자 / 설명 / 이미지 확인 가능
• 즐겨찾기 버튼 존재 (상세 페이지에서도 추가/삭제 가능)
• 이전 페이지로 자연스럽게 이동 가능

🏆 5. 인기도서 & 추천도서 섹션

검색하기 전 초기 화면에 표시
• 인기도서(순위 표시)
• 추천 도서(순위 표시)
• 클릭 시 바로 상세 페이지로 이동

⬆️ 6. Top 버튼
• 스크롤 일정 거리 이상 시 자동으로 나타남
• 부드러운 스크롤 애니메이션
• 전체 페이지 어디서든 빠르게 상단 이동 가능

🗂️ 폴더 구조 (Folder Structure)

```bash
src/
 ├── components/
 │     ├── BookCard.tsx
 │     ├── BookCardSkeleton.tsx
 │     ├── SearchBar.tsx
 │     ├── TopButton.tsx
 │     └── ...
 │
 ├── pages/
 │     ├── SearchPage.tsx
 │     └── BookDetailPage.tsx
 │
 ├── lib/
 │     ├── favorite.ts
 │     ├── search.ts
 │     └── recommendedBook.ts
 │
 ├── App.tsx
 └── main.tsx
```

⚙️ 환경 변수 (Environment Variable)

Kakao REST API 키 설정 필요:
VITE_KAKAO_REST_API_KEY=YOUR_KAKAO_REST_API_KEY

Vercel에서는 Project → Settings → Environment Variables에서 설정 가능.

📦 설치 & 실행 방법 (How to Run)

1. 레포지토리 클론

```bash
git clone https://github.com/사용자명/book-finder.git
cd book-finder
```

2. 패키지 설치

```bash
npm install
```

3. 환경변수 파일 생성

```bash
VITE_KAKAO_REST_API_KEY=YOUR_API_KEY
```

4. 개발 서버 실행

```bash
npm run dev
```

🙋‍♀️ 프로젝트를 하며 배운 점
• Fetch와 컴포넌트 상태 관리를 체계적으로 정리
• LocalStorage를 구조화해서 사용하는 법
• UI/UX 관점에서 사용자 경험 개선(스크롤, 초기 상태, 빈 화면 처리 등)
• 컴포넌트 재사용성 및 상태 흐름 고민하는 습관
• Tailwind의 구조적 접근(레이아웃, 반응형, 커스터마이징)
