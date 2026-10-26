import styles from "./about-section.module.css";

const skillGroups = [
    {
        label: "주요 기술",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML/CSS", "Dart", "Flutter", "Tailwind CSS"],
    },
    {
        label: "경험 기술",
        items: ["REST API", "Zustand", "GitHub Actions", "Prisma", "PostgreSQL", "Recharts", "Firebase", "Supabase"],
    },
];

export default function AboutSection() {
    return (
        <section className={styles.about} id="about" aria-labelledby="about-title">
            <p className={styles.greeting}>안녕하세요, Yello입니다.</p>

            <h2 className={styles.title} id="about-title">
                사용자의 흐름을 이해하고,<br />
                화면의 <span className={styles.highlight}>상태를 설계합니다.</span>
            </h2>

            <p className={styles.description}>
                TypeScript와 React/Next.js를 기반으로 웹 UI를 구현합니다.<br />
                지도, 차트, 결제 플로우 등 다양한 화면에서 API 응답과 사용자 상태를 UI에 연결해왔습니다.
            </p>

            <p className={styles.description}>
                반복되는 요소는 공통 컴포넌트로 정리하고, 데이터 흐름과 예외 상황을 함께 고려합니다.<br />
                사용자가 마주하는 여러 상황에서도 안정적으로 동작하는 화면을 중요하게 생각합니다.
            </p>

            <div className={styles.skills}>
                {skillGroups.map((group) => (
                    <div className={styles.skillGroup} key={group.label}>
                        <h3>{group.label}</h3>
                        <ul className={styles.tags} aria-label={group.label}>
                            {group.items.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
