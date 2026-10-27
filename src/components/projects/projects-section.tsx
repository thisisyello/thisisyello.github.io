import Link from "next/link";
import Image from "next/image";
import { FiFileText, FiGlobe } from "react-icons/fi";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { projects, type Project } from "@/data/projects";
import styles from "./projects-section.module.css";

function ProjectPreview({ project }: { project: Project }) {
    const hasActions = project.detailPath || project.links.length > 0 || project.website.status === "active";

    return (
        <div className={styles.preview}>
            <div className={styles.previewVisual}>
                {project.image ? (
                    <Image
                        className={styles.previewImage}
                        src={project.image.src}
                        alt={project.image.alt}
                        fill
                        sizes="(max-width: 1000px) 100vw, 385px"
                    />
                ) : (
                    <>
                        <span className={styles.previewTitle} aria-hidden="true">{project.title}</span>
                        <span className={styles.previewLabel}>프로젝트 이미지 준비 중</span>
                    </>
                )}
            </div>

            {project.website.status === "closed" && (
                <span className={styles.websiteStatus} title={project.website.note}>사이트 운영 종료</span>
            )}

            {hasActions && (
                <div className={styles.overlay}>
                    {project.detailPath && (
                        <Link className={styles.primaryLink} href={project.detailPath}>
                            <FiFileText size={16} aria-hidden="true" focusable="false" />
                            자세히 보기
                            <span className="sr-only"> — {project.title}</span>
                        </Link>
                    )}
                    <div className={styles.externalLinks}>
                        {project.website.status === "active" && (
                            <a href={project.website.url} target="_blank" rel="noreferrer">
                                <FiGlobe size={15} aria-hidden="true" focusable="false" />
                                사이트
                                <span className="sr-only"> — {project.title} (새 탭에서 열기)</span>
                            </a>
                        )}
                        {project.links.map((link) => (
                            <a key={`${link.type}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                                {link.type === "github"
                                    ? <FaGithub size={15} aria-hidden="true" focusable="false" />
                                    : <FaYoutube size={16} aria-hidden="true" focusable="false" />}
                                {link.label || (link.type === "github" ? "GitHub" : "소개 영상")}
                                <span className="sr-only"> — {project.title} (새 탭에서 열기)</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProjectsSection() {
    return (
        <section className={styles.section} id="projects" aria-labelledby="projects-title">
            <header className={styles.header}>
                <h2 id="projects-title">프로젝트</h2>
                <span>Projects</span>
            </header>

            <div className={styles.grid}>
                {projects.map((project) => (
                    <article className={styles.card} key={project.id}>
                        <ProjectPreview project={project} />
                        <div className={styles.cardBody}>
                            <span className={styles.category}>{project.category} · {project.period}{project.status && ` · ${project.status}`}</span>
                            <h3>{project.title}</h3>
                            <p className={styles.projectDescription}>{project.summary}</p>
                            <p className={styles.role}><span>담당 범위</span>{project.role}</p>
                            <ul className={styles.tags} aria-label="사용 기술">
                                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
