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
                    Fullstack Developer
                </p>
                <p className="text-xl text-text-muted leading-relaxed">
                    사용자 문제를 빠르게 제품으로 구현하고, 프론트엔드부터 API·DB 구조까지 연결해
                    <br />
                    서비스 완성도를 높이는 개발자입니다.
                    <br />
                    React와 TypeScript 기반 웹 개발과 결제·상태관리·서버 로직 구현 경험을 보유하고 있습니다.
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
