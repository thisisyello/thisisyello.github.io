"use client";

import Link from "next/link";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Prevent hydration mismatch
    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const scrollTo = (id: string) => {
        if (pathname === "/") {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <header className="w-full h-18 border-b border-gray-200 dark:border-gray-800 fixed bg-background/80 backdrop-blur-md z-50">
            <div className="mx-auto h-full flex max-w-[1200px] items-center justify-between px-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold relative inline-block">
                        thisisyello
                        <span className="absolute top-0 -right-2 w-2 h-2 bg-primary rounded-full" />
                    </h1>
                </Link>
                <div className="flex items-center gap-6">
                    <nav>
                        <ul className="flex gap-6 text-lg font-medium items-center">
                            <li>
                                <button
                                    onClick={() => scrollTo("about")}
                                    className="hover:text-text-muted transition-colors cursor-pointer"
                                >
                                    about
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollTo("project")}
                                    className="hover:text-text-muted transition-colors cursor-pointer"
                                >
                                    project
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollTo("skills")}
                                    className="hover:text-text-muted transition-colors cursor-pointer"
                                >
                                    skills
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollTo("blog")}
                                    className="hover:text-text-muted transition-colors cursor-pointer"
                                >
                                    blog
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollTo("contact")}
                                    className="hover:text-text-muted transition-colors cursor-pointer"
                                >
                                    contact
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {mounted && (
                        <button
                            onClick={() =>
                                setTheme(
                                    resolvedTheme === "dark" ? "light" : "dark",
                                )
                            }
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            aria-label="Toggle Dark Mode"
                        >
                            {resolvedTheme === "dark" ? (
                                <MdOutlineLightMode size="24" />
                            ) : (
                                <MdOutlineDarkMode size="24" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
