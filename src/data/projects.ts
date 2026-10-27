export interface ProjectCaseStudy {
    title: string;
    challenge?: string;
    approach: string;
}

// 개발 진행 상태와 사이트 운영 상태는 별개로 관리합니다.
export type ProjectWebsite =
    | { status: "unknown" }
    | { status: "active"; url: string }
    | { status: "closed"; previousUrl?: string; note?: string };

export interface ProjectLink {
    type: "github" | "video";
    url: string;
    // 예: "프론트엔드 코드", "백엔드 코드", "YouTube 소개 영상"
    label?: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    period: string;
    status?: "진행 중";
    summary: string;
    description: string;
    role: string;
    technologies: string[];
    // 사이트가 종료되어도 GitHub와 소개 영상은 독립적으로 연결할 수 있습니다.
    website: ProjectWebsite;
    links: ProjectLink[];
    // 상세 페이지가 만들어졌을 때만 경로를 지정합니다.
    detailPath?: string;
    caseStudies: ProjectCaseStudy[];
    retrospective?: {
        learned: string;
        limitations: string;
        nextSteps: string;
    };
}

// 출처: 루트의 「프론트엔드_포트폴리오.pdf」.
// 문서에 명시된 담당 범위와 구현 내용만 정리합니다.
// 외부 링크는 제공받은 주소를 사용하고, 사이트 주소가 없는 경우 운영 상태를 unknown으로 둡니다.
export const projects: Project[] = [
    // PDF 2–7쪽
    {
        id: "alley",
        detailPath: "/projects/alley",
        title: "ALLEY",
        category: "크래프톤 정글 최종 프로젝트",
        period: "2025.12 ~ 2026.01",
        website: { status: "unknown" },
        links: [
            { type: "github", url: "https://github.com/star-ter/star-ter" },
            { type: "video", url: "https://youtu.be/WQJ41tTqtSc?si=UncpqXweNrLzsLdm", label: "YouTube 소개 영상" },
        ],
        summary: "서울시 상권 데이터와 AI 분석 결과를 지도·카드·차트로 비교하는 상권 분석 서비스입니다.",
        description: "복잡한 상권 데이터를 사용자가 빠르게 이해하고 입지를 판단할 수 있도록 정보 구조를 설계했습니다. 사용자 입력부터 분석 요청, 결과 확인까지 이어지는 화면 흐름을 구성했습니다.",
        role: "지도·분석 화면 설계 · API/SSE 상태 연동 · 공통 UI 구성",
        technologies: ["Next.js 16", "React 19", "TypeScript", "Zustand", "Tailwind CSS v4", "Kakao Maps SDK", "Recharts", "REST API", "SSE"],
        caseStudies: [
            {
                title: "AI/API 응답과 화면 상태 동기화",
                challenge: "AI 분석과 상권 데이터 API의 응답 시간이 길고, 처리 결과마다 보여줘야 하는 화면 상태가 달랐습니다.",
                approach: "SSE와 API 응답을 화면 상태에 연결해 로딩·에러·빈 상태·결과 화면을 분리했습니다. 분석이 완료되면 응답 데이터를 카드·차트·지도에 반영했습니다.",
            },
            {
                title: "공통 UI 기준과 재사용 컴포넌트",
                challenge: "팀원별로 화면을 나누어 구현하면서 간격·카드·배지·차트의 표현 방식이 달라졌습니다.",
                approach: "Tailwind 기반 공통 스타일 규칙을 정리하고, 카드·배지·차트를 재사용 가능한 컴포넌트로 구성해 화면의 표현 방식과 수정 기준을 통일했습니다.",
            },
            {
                title: "서로 다른 상권 데이터의 비교 기준 통일",
                challenge: "서로 다른 출처의 데이터가 업종 분류와 지표 기준을 다르게 사용해 동일 업종도 일관되게 비교하기 어려웠습니다.",
                approach: "업종 코드를 공통 기준으로 연결하는 매핑 테이블을 구성하고, 통일된 기준을 차트와 추천 점수 UI에 반영했습니다.",
            },
        ],
        retrospective: {
            learned: "어떤 정보를 어떤 기준과 순서로 보여줄지 정하고, 이를 화면 전반에 일관되게 적용하는 과정의 중요성을 배웠습니다.",
            limitations: "여러 컴포넌트에서 SSE 응답을 직접 처리해 상태 흐름이 복잡해졌고, Tool Calling 실패 상황과 핵심 계산 로직의 테스트가 충분하지 않았습니다.",
            nextSteps: "SSE 이벤트 처리를 별도 모듈로 분리하고, 점수 계산과 AI 응답 파서부터 테스트를 도입하고자 합니다.",
        },
    },
    // PDF 8–13쪽
    {
        id: "mini-payment-demo",
        detailPath: "/projects/mini-payment-demo",
        title: "Mini Payment Demo",
        category: "개인 미니 프로젝트",
        period: "2026.02",
        website: { status: "active", url: "https://pay-mini-checkout.vercel.app/" },
        links: [
            { type: "github", url: "https://github.com/thisisyello/pay-mini-checkout?tab=readme-ov-file" },
        ],
        summary: "주문 생성부터 결제 요청·승인 검증·결과 확인까지 연결한 결제 미니 프로젝트입니다.",
        description: "TossPayments 테스트 환경에서 결제 흐름을 구현했습니다. 클라이언트 화면이 아닌 서버 검증 결과와 DB 주문 상태를 기준으로 결제 결과를 보여주도록 구성했습니다.",
        role: "결제 UI · 주문/승인 API · 서버 검증 · 주문 상태 관리",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Next.js Route Handler", "Prisma", "PostgreSQL", "TossPayments", "Vercel"],
        caseStudies: [
            {
                title: "서버 검증을 기준으로 결제 결과 표시",
                challenge: "클라이언트에 결제 완료 화면이 표시되더라도 실제 결제가 정상 승인됐다고 보장할 수 없었습니다.",
                approach: "주문 상태를 CREATED → PAID로 관리하고, 서버의 결제 승인 검증 결과와 DB 상태를 기준으로 결과 화면을 표시했습니다.",
            },
            {
                title: "이미 처리한 주문의 중복 승인 요청 방어",
                challenge: "같은 orderId로 승인 요청이 반복되면 이미 처리한 주문에 다시 상태 변경을 시도할 수 있었습니다.",
                approach: "주문 상태가 PAID이면 추가 결제 처리를 제한하고 기존 결제 결과를 반환하도록 분기했습니다.",
            },
            {
                title: "결제 완료와 대기 상태의 UI 분리",
                challenge: "결제 요청 이후 결과 화면만으로는 주문이 완료됐는지 아직 처리 중인지 판단하기 어려웠습니다.",
                approach: "PAID와 CREATED 상태에 따라 아이콘·상태 문구·안내 메시지를 다르게 구성해 결제 완료와 대기를 구분했습니다.",
            },
        ],
        retrospective: {
            learned: "결제 화면은 서버와 DB의 신뢰할 수 있는 상태를 사용자가 이해할 수 있는 UI로 연결해야 한다는 점을 배웠습니다.",
            limitations: "PAID 상태를 중심으로 기본적인 재요청 방어를 구현했지만, 실패·취소 상태와 Webhook 예외 상황은 충분히 다루지 못했습니다.",
            nextSteps: "실패·취소 상태와 Webhook 처리 흐름을 보강해 서버 상태와 사용자 화면의 일관성을 높이고자 합니다.",
        },
    },
    // PDF 14–15쪽
    {
        id: "luckez",
        detailPath: "/projects/luckez",
        title: "Luckez",
        category: "개인 프로젝트",
        period: "2026.08 ~",
        status: "진행 중",
        website: { status: "unknown" },
        links: [
            { type: "github", url: "https://github.com/thisisyello/luckez" },
        ],
        summary: "로또 번호 추천·저장, 당첨번호 조회와 커뮤니티 기능을 구현하는 Flutter 프로젝트입니다.",
        description: "모바일 환경을 고려한 번호 추첨·저장·조회 화면을 구성하고, Firebase 인증과 Firestore 데이터를 UI 상태에 연결하는 개인 프로젝트입니다.",
        role: "Flutter UI · 인증/데이터 연동 · 상태 관리 · 공통 Widget 구성",
        technologies: ["Flutter", "Dart", "Firebase Authentication", "Cloud Firestore", "Google Sign-In", "Flutter Web", "Vercel"],
        caseStudies: [
            {
                title: "번호 추첨부터 저장·결과 조회까지",
                approach: "중복 없는 6개 번호 생성과 정렬·재추첨·저장 흐름을 구현했습니다. 회차별 저장 번호를 조회하고 구매 상태와 당첨 결과를 화면에 반영했습니다.",
            },
            {
                title: "Firebase 인증과 데이터의 UI 연결",
                approach: "이메일·Google 로그인과 Firestore 기반 사용자·번호·게시글 데이터를 연동하고, Stream 기반 변경 사항을 화면에 반영했습니다.",
            },
            {
                title: "반복되는 UI의 공통 Widget 구성",
                approach: "AppButton·AppCard·LottoBall 등 반복되는 UI를 공통 Widget으로 구성했습니다.",
            },
        ],
    },
    // PDF 16–20쪽
    {
        id: "kimjuhyeon-brand",
        detailPath: "/projects/kimjuhyeon-brand",
        title: "데시그너 k!mjuhyeon by 覺",
        category: "브랜드 쇼핑몰",
        period: "2024.01 ~ 2024.03",
        website: { status: "active", url: "https://bykak.com/" },
        links: [],
        summary: "브랜드 아이덴티티와 상품 정보 전달 방식을 함께 고민해 구현한 Cafe24 기반 쇼핑몰입니다.",
        description: "브랜드 로고·컬러·화면 분위기를 일관되게 적용하고, 브랜드 소개부터 상품 탐색과 오프라인 방문 문의까지 이어지는 화면 흐름을 구성했습니다.",
        role: "기획 · 화면 설계 · UI 구현 · 반응형 · 운영/유지보수",
        technologies: ["Cafe24", "HTML", "CSS", "JavaScript", "Media Query", "FTP"],
        caseStudies: [
            {
                title: "브랜드 방향 정리부터 화면 구현까지",
                approach: "브랜드 대표와 콘텐츠 및 기획 방향을 논의하고, 페이지 구조·레이아웃·컬러·UI를 직접 설계했습니다. 상단바·플로팅 버튼·반응형 화면을 구현하고 Cafe24의 상품 그리드·상세보기·게시판 기능을 활용했습니다.",
            },
            {
                title: "모바일에서도 유지되는 정보와 브랜드 경험",
                challenge: "브랜드 메시지와 상품 정보가 늘어나면서 모바일에서 주요 정보를 탐색하기 어려워졌습니다.",
                approach: "콘텐츠 우선순위를 기준으로 레이아웃을 재구성하고, 화면 크기에 따라 콘텐츠가 자연스럽게 재배치되도록 반응형 레이아웃을 적용했습니다.",
            },
        ],
        retrospective: {
            learned: "브랜드 사이트에서도 시각적 완성도만큼 정보 구조와 사용자 흐름이 중요하다는 점을 배웠습니다.",
            limitations: "초기에는 이미지 중심 구성에 집중해 콘텐츠가 늘어날수록 모바일의 가독성과 탐색성이 떨어졌습니다.",
            nextSteps: "콘텐츠 목적과 우선순위를 먼저 정의하고, 모바일과 데스크톱에서 같은 정보가 자연스럽게 전달되는 반응형 구조를 설계하고자 합니다.",
        },
    },
];
