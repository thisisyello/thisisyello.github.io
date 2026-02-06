import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import Card from "@/components/ui/card";

export default function Blog() {
    const posts = getSortedPostsData();

    return (
        <section className="w-full max-w-[1200px] mx-auto py-32 px-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-12 text-left text-primary">
                Blog
            </h1>

            <div className="flex flex-col gap-8">
                {posts.length === 0 ? (
                    <div className="p-10 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
                        <p className="text-base text-text-muted">
                            포스트가 없습니다.
                        </p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                            <Card
                                hoverable
                                className="flex flex-col p-6 group hover:border-primary"
                            >
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className=" flex justify-between text-base text-text-muted leading-relaxed">
                                    {post.description}
                                    <span className="text-sm text-text-muted mb-2">
                                        {post.date}
                                    </span>
                                </p>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
}
