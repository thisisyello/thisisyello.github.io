import { /* getAllPostIds, */ getPostData, getSortedPostsData } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        id: post.id,
    }));
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const postData = await getPostData(id);

    return (
        <article className="w-full max-w-[1200px] mx-auto py-32 px-4 min-h-screen">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
            >
                <IoArrowBack />
                <span>목록보기</span>
            </Link>

            <div className="mb-8">
                <time className="text-text-muted text-sm font-medium">
                    {postData.date}
                </time>
                <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-primary">
                    {postData.title}
                </h1>
                <p className="text-sm text-text-muted">
                    {postData.description}
                </p>
            </div>

            <hr className="mb-4" />

            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-text-muted prose-strong:text-foreground prose-ul:text-text-muted prose-li:text-text-muted">
                <ReactMarkdown>{postData.contentHtml || ""}</ReactMarkdown>
            </div>
        </article>
    );
}
