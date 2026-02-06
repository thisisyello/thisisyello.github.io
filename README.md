# thisisyello Portfolio

프론트엔드 엔지니어 **Yello**의 포트폴리오 웹사이트입니다.
Next.js 15+, TailwindCSS, TypeScript를 기반으로 제작되었습니다.

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: GitHub Pages (예정)

## 📚 주요 라이브러리 (Key Libraries)

이 프로젝트에서 사용된 주요 라이브러리와 사용 목적입니다.

### 1. 콘텐츠 및 블로그 (Blog System)

- **[`react-markdown`](https://github.com/remarkjs/react-markdown)**:
    - Markdown 텍스트를 React 컴포넌트(HTML)로 변환하여 렌더링하기 위해 사용합니다.
    - 블로그 포스트 본문을 보여주는 핵심 라이브러리입니다.
- **[`gray-matter`](https://github.com/jonschlinkert/gray-matter)**:
    - Markdown 파일 상단에 있는 메타 데이터(Frontmatter: 제목, 날짜, 태그 등)를 파싱하기 위해 사용합니다.
    - `---`로 감싸진 영역을 읽어 객체 형태로 변환해줍니다.
- **[`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography)**:
    - Markdown으로 렌더링된 HTML 요소들에 예쁜 기본 스타일을 자동으로 적용해줍니다. (`prose` 클래스 사용)

### 2. UI 및 테마 (UI & Theming)

- **[`next-themes`](https://github.com/pacocoursey/next-themes)**:
    - 다크 모드와 라이트 모드 전환을 쉽게 관리하기 위해 사용합니다.
    - 새로고침 시 화면이 깜빡이는 현상(FOUC)을 방지해줍니다.
- **[`react-icons`](https://react-icons.github.io/react-icons/)**:
    - 다양한 아이콘(Material Design, FontAwesome 등)을 React 컴포넌트 형태로 쉽게 가져와 사용합니다.

## 📂 프로젝트 구조 (Structure)

```
src/
├── app/              # Next.js App Router 페이지
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── main/         # 메인 페이지 섹션별 컴포넌트
│   └── ...
├── data/             # 정적 데이터 (스킬 목록 등)
├── lib/              # 유틸리티 함수 (블로그 포스트 로딩 로직 등)
└── posts/            # 블로그 Markdown 파일 (.md)
```
