import type { Metadata } from "next";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = projects.find((item) => item.id === id);
    return { title: project ? `thisisyello - ${project.title}` : "thisisyello - 프로젝트" };
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = projects.find((item) => item.id === id);
    if (!project) notFound();

    return (
        <main className={styles.document}>
            <Link className={styles.backLink} href="/#projects">← 프로젝트 목록</Link>
            <header className={styles.header}>
                <p className={styles.meta}>{project.category} · {project.period}{project.status && ` · ${project.status}`}</p>
                <h1>{project.title}</h1>
                <p className={styles.description}>{project.description}</p>
                <dl className={styles.facts}>
                    <div><dt>담당 범위</dt><dd>{project.role}</dd></div>
                    <div><dt>사용 기술</dt><dd>{project.technologies.join(" · ")}</dd></div>
                </dl>
                <div className={styles.links}>
                    {project.website.status === "active" && (
                        <a href={project.website.url} target="_blank" rel="noreferrer">
                            <FiGlobe size={15} aria-hidden="true" focusable="false" />
                            사이트<span className="sr-only"> (새 탭에서 열기)</span>
                        </a>
                    )}
                    {project.website.status === "closed" && <span>사이트 운영 종료{project.website.note && ` · ${project.website.note}`}</span>}
                    {project.links.map((link) => (
                        <a key={`${link.type}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                            {link.type === "github"
                                ? <FaGithub size={15} aria-hidden="true" focusable="false" />
                                : <FaYoutube size={16} aria-hidden="true" focusable="false" />}
                            {link.label || (link.type === "github" ? "GitHub" : "소개 영상")}
                            <span className="sr-only"> (새 탭에서 열기)</span>
                        </a>
                    ))}
                </div>
            </header>

            <section className={styles.section} aria-labelledby="implementation-title">
                <h2 id="implementation-title">주요 구현 내용</h2>
                {project.caseStudies.map((study) => (
                    <article className={styles.caseStudy} key={study.title}>
                        <h3>{study.title}</h3>
                        <dl>
                            {study.challenge && <div><dt>고민한 문제</dt><dd>{study.challenge}</dd></div>}
                            <div><dt>구현 내용</dt><dd>{study.approach}</dd></div>
                        </dl>
                    </article>
                ))}
            </section>

            {project.retrospective && (
                <section className={styles.section} aria-labelledby="retrospective-title">
                    <h2 id="retrospective-title">프로젝트 회고</h2>
                    <dl>
                        <div><dt>배운 점</dt><dd>{project.retrospective.learned}</dd></div>
                        <div><dt>아쉬운 점</dt><dd>{project.retrospective.limitations}</dd></div>
                        <div><dt>개선 방향</dt><dd>{project.retrospective.nextSteps}</dd></div>
                    </dl>
                </section>
            )}
            <footer className={styles.footer}><Link className={styles.backLink} href="/#projects">← 프로젝트 목록으로 돌아가기</Link></footer>
        </main>
    );
}
