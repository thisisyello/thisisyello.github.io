"use client";

import { projects, Project } from "@/data/projects";
import Card from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import ProjectModal from "@/components/ui/project-modal";

export default function ProjectSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

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
                        className="p-6"
                        onClick={() => setSelectedProject(project)}
                    >
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

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}
