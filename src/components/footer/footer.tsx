import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <p>사용자의 흐름을 화면으로 구현하는 사람</p>
                <small>© {new Date().getFullYear()} yello</small>
            </div>
        </footer>
    );
}
