"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./header.module.css";

const navigation = [
  { id: "about", label: "소개" },
  { id: "projects", label: "프로젝트" },
  { id: "contact", label: "연락" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section) => section !== null);
    let frameId: number | null = null;

    function updateActiveSection() {
      frameId = null;
      if (sections.length === 0) return;

      const readingLine = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 32;
      let currentId = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) {
          currentId = section.id;
        }
      }

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (window.scrollY > 0 && atBottom) {
        currentId = sections[sections.length - 1].id;
      }

      setActiveId(currentId);
    }

    function scheduleUpdate() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <a className={styles.identity} href="#about" aria-label="yello 소개">
          <span className={styles.name}>yello</span>
          <span className={styles.role}>Frontend Dev &amp; Web Publisher</span>
        </a>

        <nav className={styles.nav} aria-label="포트폴리오 목차">
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={item.id === activeId ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className={styles.github}
          href="https://github.com/thisisyello"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub (새 탭에서 열기)"
        >
          <FaGithub size={18} aria-hidden="true" focusable="false" />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
