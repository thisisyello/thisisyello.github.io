import type { Metadata } from "next";
import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/sidebar";
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
            <Sidebar />
            <main className={styles.main} id="content" tabIndex={-1}>
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
        </div>
    );
}
