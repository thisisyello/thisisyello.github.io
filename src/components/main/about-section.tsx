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
                    Front-end Product Engineer
                </p>
                <p className="text-xl text-text-muted leading-relaxed">
                    사용자에게 전달되는 화면을 중심으로 복잡한 정보를 직관적인
                    UI로 풀어내는 프론트엔드 개발자입니다.
                    <br />
                    데이터와 상태 변화에 따라 동작하는 화면을 구현하며 사용성
                    문제를 개선해왔습니다.
                    <br />
                    프로젝트 과정에서 발생한 오류와 불편 사항을 분석하고 UI
                    구조를 반복적으로 개선했습니다.
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
