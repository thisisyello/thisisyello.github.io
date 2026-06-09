import Link from "next/link";
import { FaGithub, FaLinkedin, FaBlogger } from "react-icons/fa";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="w-full max-w-[1200px] flex flex-col justify-center p-4 min-h-screen"
        >
            <div className="w-full">
                <h1 className="text-5xl font-bold mb-1">
                    안녕하세요 <span className="text-primary">이태우</span>
                    입니다.
                </h1>
                <p className="text-2xl font-medium text-text-muted mb-8">
                    Front-end Developer
                </p>
                <p className="text-xl text-text-muted leading-relaxed">
                    Next.js와 TypeScript 기반으로 사용자 흐름을 고려한 UI를 설계하고 구현하는 프론트엔드 개발자입니다.
                    <br />
                    지도 시각화, 데이터 차트, 결제 플로우처럼 상태 변화가 화면 경험에 영향을 주는 기능을 구현하며,
                    <br />
                    예측 가능한 상태 관리와 명확한 인터랙션 설계를 중요하게 생각합니다.
                </p>

                <div className="pt-8 flex justify-start gap-8">
                    <Link
                        href="https://github.com/thisisyello"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-muted-hover transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub size={32} />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/thisisyello/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-muted-hover transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={32} />
                    </Link>
                    <Link
                        href="/blog"
                        className="text-text-muted hover:text-text-muted-hover transition-colors"
                        aria-label="Blog"
                    >
                        <FaBlogger size={32} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
