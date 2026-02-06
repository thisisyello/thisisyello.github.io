export default function ContactSection() {
    return (
        <section
            id="contact"
            className="w-full max-w-[1200px] min-h-screen py-20 px-4 flex flex-col justify-center gap-10"
        >
            <h2 className="text-4xl font-bold text-primary">Contact</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    <p className="text-2xl font-medium">
                        Let&apos;s work together.
                    </p>
                    <p className="text-base text-text-muted">
                        새로운 기회와 협업을 언제나 환영합니다.
                        <br />
                        이메일로 연락주시면 빠르게 회신 드리겠습니다.
                    </p>
                    <a
                        href="mailto:yello.3617@gmail.com"
                        className="inline-block text-xl font-bold underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                        yello.3617@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}
