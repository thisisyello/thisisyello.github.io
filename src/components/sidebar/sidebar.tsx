"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./sidebar.module.css";

const navigation = [
  { id: "about", label: "소개" },
  { id: "projects", label: "프로젝트" },
  { id: "skills", label: "구현 역량" },
  { id: "notes", label: "탐구 기록" },
  { id: "contact", label: "연락" },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section) => section !== null);
    let frameId: number | null = null;

    function updateActiveSection() {
      frameId = null;
      if (sections.length === 0) return;

      const readingLine = Math.min(160, window.innerHeight * 0.25);
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
    <aside className={styles.sidebar}>
      <a className={styles.identity} href="#about" aria-label="Yello 소개">
        <h1 className={styles.name}>
          yello
          <span>생각을 화면으로 옮기는 사람</span>
        </h1>
      </a>

      <p className={styles.role}>
        Frontend Dev
        <br />
        & Web Publisher
      </p>

      <nav className={styles.nav} aria-label="포트폴리오 목차">
        <ol>
          {navigation.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={item.id === activeId ? "location" : undefined}
              >
                <span className={styles.number}>0{index + 1}</span>
                <span>{item.label}</span>
                {item.id === activeId && (
                  <span className={styles.dot} aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <footer className={styles.footer}>
        <a
          href="https://github.com/thisisyello"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={15} aria-hidden="true" focusable="false" />
          GitHub
          <span className="sr-only"> (새 탭에서 열기)</span>
        </a>
        <small>© {new Date().getFullYear()} yello</small>
      </footer>
    </aside>
  );
}
