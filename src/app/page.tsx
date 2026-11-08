import type { Metadata } from "next";
import styles from "./page.module.css";
import Header from "@/components/header/header";
import AboutSection from "@/components/about/about-section";
import ProjectsSection from "@/components/projects/projects-section";
import ContactSection from "@/components/contact/contact-section";

export const metadata: Metadata = {
    title: "thisisyello",
};

export default function Home() {
    return (
        <div className={styles.layout}>
            <a className="skip-link" href="#content">본문으로 건너뛰기</a>
            <Header />
            <main className={styles.main} id="content" tabIndex={-1}>
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <footer className={styles.footer}>
                <p>사용자의 흐름을 화면으로 구현하는 사람</p>
                <small>© {new Date().getFullYear()} yello</small>
            </footer>
        </div>
    );
}
