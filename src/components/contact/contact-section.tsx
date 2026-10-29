import { FiMail } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { contact } from "@/data/contact";
import styles from "./contact-section.module.css";

export default function ContactSection() {
    return (
        <section className={styles.section} id="contact" aria-labelledby="contact-title">
            <header className={styles.header}>
                <h2 id="contact-title">연락</h2>
                <span>Contact</span>
            </header>

            <p className={styles.invitation}>함께 만들 다음 화면을 기대합니다.</p>
            <p className={styles.description}>
                채용과 협업에 관한 이야기를 편하게 나눠주세요.<br />
                퍼블리싱, 프론트엔드 구현에 대한 이야기도 환영합니다.
            </p>

            <div className={styles.links}>
                {contact.email && (
                    <a className={styles.contactLink} href={`mailto:${contact.email}`}>
                        <FiMail className={styles.icon} size={20} aria-hidden="true" focusable="false" />
                        <span className={styles.linkText}>
                            <span className={styles.label}>이메일</span>
                            <span className={styles.value}>{contact.email}</span>
                        </span>
                    </a>
                )}
                <a className={styles.contactLink} href={contact.github.url} target="_blank" rel="noreferrer">
                    <FaGithub className={styles.icon} size={20} aria-hidden="true" focusable="false" />
                    <span className={styles.linkText}>
                        <span className={styles.label}>GitHub</span>
                        <span className={styles.value}>{contact.github.label}</span>
                    </span>
                    <span className="sr-only"> (새 탭에서 열기)</span>
                </a>
            </div>
        </section>
    );
}
