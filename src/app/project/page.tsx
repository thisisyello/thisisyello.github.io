"use client";

import { projects } from "@/data/projects";
import Card from "@/components/ui/card";

export default function ProjectPage() {
    return (
        <section className="w-full max-w-[1200px] mx-auto py-32 px-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-12 text-left text-primary">
                Projects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
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
                                        className="text-sm text-primary"
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
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                                >
                                    GitHub
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                                >
                                    사이트
                                </a>
                            )}
                            {project.pdfUrl && (
                                <a
                                    href={project.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                                >
                                    자세히보기
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
