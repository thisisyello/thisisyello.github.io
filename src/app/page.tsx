import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
    return (
        <div className={styles.layout}>
            <a className="skip-link" href="#about">본문으로 건너뛰기</a>
            <Sidebar />
            <main className={styles.main} id="about" tabIndex={-1}>
                안녕하세요
            </main>
        </div>
    );
}
