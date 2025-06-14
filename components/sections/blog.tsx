"use client";
import { BlogPost } from "@/lib/types"; // Import BlogPost type
import Link from "next/link";

interface BlogPostsSectionProps {
  blogPosts: BlogPost[]; // Expecting blog posts data as a prop
  limit?: number; // Optional prop to limit the number of blog posts displayed
  isPage?: boolean; // Prop to indicate if it's the full blog posts page
}

const BlogPostsSection = ({ blogPosts, limit = 2, isPage = false }: BlogPostsSectionProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        {!isPage && (
          <h2 className="text-lg font-bold">Recent Blog Posts</h2>
        )}
        {!isPage && (
          <Link
            className="text-xs   hover:text-foreground flex items-center gap-1 transition-colors"
            href="/blog"
          >
            View All
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {blogPosts.slice(0, limit).map((post, index) => ( 
          <div
            key={index}
            className="p-4 rounded-lg hover:-translate-y-0.5 hover:bg-muted transition-transform duration-200 border border-foreground/10 cursor-pointer"
          >
            <h3 className="text-sm font-semibold mb-2">{post.title}</h3>
            <div className="flex items-center gap-2 text-xs   mb-2">
              <span>{new Date(post.date).toLocaleDateString()}</span> {/* Display formatted date */}
              <span>•</span>
              <span>{post.read_time}</span>
            </div>
            <p className="text-xs   mb-3 leading-relaxed">{post.description}</p>
            <div className="flex flex-wrap gap-1">
              {post.tags && post.tags.map((tag: string, tagIndex: number) => (
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
};

export default BlogPostsSection;
