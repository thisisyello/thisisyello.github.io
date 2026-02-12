import { IconType } from "react-icons";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiNestjs,
    SiFastapi,
    SiPrisma,
    SiPostgresql,
} from "react-icons/si";

export interface Skill {
    name: string;
    icon: IconType;
}

export const frontendSkills: Skill[] = [
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss3 },
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TailwindCSS", icon: SiTailwindcss },
];

export const backendSkills: Skill[] = [
    { name: "Node.js (NestJS)", icon: SiNestjs },
    { name: "Python (FastAPI)", icon: SiFastapi },
    // { name: "Prisma", icon: SiPrisma },
    // { name: "PostgreSQL", icon: SiPostgresql },
];
