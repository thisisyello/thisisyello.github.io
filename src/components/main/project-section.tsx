"use client";

import { projects } from "@/data/projects";
import Card from "@/components/ui/card";
import Link from "next/link";
import { FaExternalLinkAlt, FaFilePdf, FaGithub } from "react-icons/fa";

export default function ProjectSection() {
    return (
        <section
            id="project"
            className="w-full max-w-[1200px] min-h-screen py-20 px-4 flex flex-col justify-center gap-10"
        >
            <h2 className="text-4xl font-bold text-primary">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project) => (
                    <Card
                        key={project.id}
                        hoverable
                        className="group relative overflow-hidden p-6"
                    >
                        <div className="transition-all duration-300 group-hover:opacity-30 group-hover:blur-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {project.title}
                                    </h3>
                                    <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-text-muted">
                                        {project.category}
                                    </span>
                                </div>
                                <span className="text-sm text-text-muted">
                                    {project.date}
                                </span>
                            </div>
                            <p className="text-base text-text-muted mb-6">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-sm text-primary font-bold"
                                    >
                                        #{tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
                                >
                                    <FaGithub className="text-sm" />
                                    GitHub
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
                                >
                                    <FaExternalLinkAlt className="text-sm" />
                                    사이트
                                </a>
                            )}
                            {project.pdfUrl && (
                                <a
                                    href={project.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
                                >
                                    <FaFilePdf className="text-sm" />
                                    자세히보기
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <Link
                    href="/project"
                    className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                    더보기
                </Link>
            </div>

        </section>
    );
}
