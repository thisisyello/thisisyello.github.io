export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    techStack: string[];
    link?: string;
    github?: string;
    imageUrl?: string;
    pdfUrl?: string;
    date: string;
}

export const projects: Project[] = [
    {
        id: "1",
        title: "ALLEY",
        description:
            "서울시 상권 데이터 기반 AI 챗봇과 지도 시각화를 통해 매출·생존율·손익분기점 분석을 제공하는 창업 입지 분석 서비스",
        category: "Web",
        techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        link: "https://star-ter.shop/",
        github: "https://github.com/star-ter/star-ter",
        pdfUrl: "/Alley_portfolio.pdf",
        date: "2025.12 ~ 2026.01",
    },
    {
        id: "2",
        title: "Pay Mini Checkout",
        description: "결제 금액 검증, 서버 승인, 상태 관리까지 토스 페이먼츠 연동 결제 시스템 PG 연동 플로우를 학습하며 구현한 미니 프로젝트",
        category: "Web",
        techStack: ["Next.js", "PostgreSQL(Neon)", "Prisma ORM", "Tailwind CSS", "TypeScript"],
        github: "https://github.com/thisisyello/pay-mini-checkout",
        link: "https://pay-mini-checkout.vercel.app/",
        pdfUrl: "/Mini_payment.pdf",
        date: "2026.02",
    },
    {
        id: "3",
        title: "k!mjuhyeon by 覺",
        description:
            "자사 브랜드의 온라인 판매 채널 구축과 브랜드 철학과 비스포크 테일러링의 가치를 효과적으로 전달하는 쇼핑몰 웹사이트를 기획·구현",
        category: "Web",
        techStack: ["HTML", "CSS", "JavaScript", "카페24"],
        github: "",
        link: "https://bykak.com/",
        pdfUrl: "/Designer_portfolio.pdf",
        date: "2024.01 ~ 2024.02",
    },
];
