import styles from "./sidebar.module.css";

const navigation = [
  { id: "about", label: "소개" },
  { id: "projects", label: "대표 작업" },
  { id: "skills", label: "구현 역량" },
  { id: "notes", label: "탐구 기록" },
  { id: "contact", label: "연락" },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <a className={styles.identity} href="#about" aria-label="Yello 소개">
        <h1 className={styles.name}>
          Yello
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
                aria-current={item.id === "about" ? "location" : undefined}
              >
                <span className={styles.number}>0{index + 1}</span>
                <span>{item.label}</span>
                {item.id === "about" && (
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
          GitHub <span aria-hidden="true">↗</span>
          <span className="sr-only"> (새 탭에서 열기)</span>
        </a>
        <small>© {new Date().getFullYear()} YELLO</small>
      </footer>
    </aside>
  );
}
