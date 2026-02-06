"use client";

import { projects, Project } from "@/data/projects";
import Card from "@/components/ui/card";
import { useState } from "react";
import ProjectModal from "@/components/ui/project-modal";

export default function ProjectPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

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
                                    className="text-sm text-primary"
                                >
                                    #{tech}
                                </span>
                            ))}
                        </div>
                    </Card>
                ))}
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
