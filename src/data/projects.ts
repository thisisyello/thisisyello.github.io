export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    techStack: string[];
    link?: string;
    github?: string;
    imageUrl?: string;
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
        date: "2025.12 ~ 2026.01",
    },
    {
        id: "2",
        title: "k!mjuhyeon by 覺",
        description:
            "자사 브랜드의 온라인 판매 채널 구축과 브랜드 철학과 비스포크 테일러링의 가치를 효과적으로 전달하는 쇼핑몰 웹사이트를 기획·구현",
        category: "Web",
        techStack: ["HTML", "CSS", "JavaScript", "카페24"],
        github: "",
        link: "https://bykak.com/",
        date: "2024.01 ~ 2024.02",
    },
    {
        id: "",
        title: "프로젝트 추가 예정..",
        description: "",
        category: "Web",
        techStack: [""],
        github: "",
        date: "",
    },
];
