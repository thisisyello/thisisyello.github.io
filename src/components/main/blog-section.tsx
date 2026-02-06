import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import Card from "@/components/ui/card";

export default function BlogSection() {
    const posts = getSortedPostsData().slice(0, 6);

    return (
        <section
            id="blog"
            className="w-full max-w-[1200px] min-h-screen py-20 px-4 flex flex-col justify-center gap-10"
        >
            <h2 className="text-4xl font-bold text-primary">Latest Posts</h2>

            {posts.length === 0 ? (
                <div className="p-10 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
                    <p className="text-base text-text-muted">
                        포스트가 없습니다.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.id}`}>
                                <Card
                                    hoverable
                                    className="h-full flex flex-col p-6 group"
                                >
                                    <span className="text-sm text-text-muted mb-2 block">
                                        {post.date}
                                    </span>
                                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                                        {post.title}
                                    </h3>
                                    <p className="text-base text-text-muted line-clamp-2">
                                        {post.description}
                                    </p>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <Link
                            href="/blog"
                            className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                        >
                            더보기
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}
