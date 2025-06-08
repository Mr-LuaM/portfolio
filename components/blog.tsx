"use client";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

type BlogPost = {
  id: number;
  title: string;
  date: string;
  read_time: string;
  description: string;
  tags: string[];
};

export default function BlogPostsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("date", { ascending: false })
          .limit(3); // limit for recent posts

        if (error) throw error;
        setPosts(data as BlogPost[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-4 group animate-fade-in animation-delay-500">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Blog Posts</h2>
        <a
          className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
          href="/blog"
        >
          View All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

      {loading && <p className="text-sm text-foreground/70">Loading...</p>}
      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-lg bg-foreground/5 dark:bg-gray-800 border border-foreground/10 hover:bg-foreground/10 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <h3 className="text-sm font-semibold mb-2">{post.title}</h3>
            <div className="flex items-center gap-2 text-xs text-foreground/70 mb-2">
              <span>{new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}</span>
              <span>•</span>
              <span>{post.read_time}</span>
            </div>
            <p className="text-xs text-foreground/70 mb-3 leading-relaxed">{post.description}</p>
            <div className="flex flex-wrap gap-1">
              {post.tags?.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-[10px] font-medium bg-foreground/10 border border-foreground/20 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
