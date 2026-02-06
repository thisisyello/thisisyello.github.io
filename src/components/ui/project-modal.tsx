"use client";

import { Project } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Close on click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200 relative"
            >
                <div className="p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
                    >
                        <FaTimes size={24} />
                    </button>

                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-text-muted font-medium">
                                    {project.category}
                                </span>
                                <span className="text-sm text-text-muted">
                                    {project.date}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-primary">
                                {project.title}
                            </h2>
                        </div>

                        <div className="text-lg text-text-muted leading-relaxed">
                            {project.description}
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-sm px-3 py-1 bg-primary/10 text-primary font-bold rounded-full"
                                    >
                                        #{tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {(project.github || project.link) && (
                            <div className="flex gap-4 mt-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                                {project.github && (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition-opacity"
                                    >
                                        <FaGithub size={20} />
                                        깃 허브
                                    </Link>
                                )}
                                {project.link && (
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold transition-colors"
                                    >
                                        <FaExternalLinkAlt size={18} />
                                        사이트
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
