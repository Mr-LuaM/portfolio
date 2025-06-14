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
      className={`${isPage ? "space-y-3" : "space-y-1.5"} p-4 rounded-lg hover:-translate-y-0.5 hover:bg-muted transition-transform duration-200 border border-foreground/10 cursor-pointer`}
    >
     {isPage && (
      <div className={`flex items-center gap-2  ${isPage ? "text-xs" : "text-[10px]"}`}>
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.read_time}</span>
      </div>
      )}
      <h3 className={`font-semibold  ${isPage ? "text-lg" : "text-sm"}`}>
        {post.title}
      </h3>
         {!isPage && (
      <div className={`flex items-center gap-2  ${isPage ? "text-xs" : "text-[10px]"}`}>
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.read_time}</span>
      </div>
      )}
      <p className={`${isPage ? "text-sm" : "text-xs"} line-clamp-2`}>
        {post.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {post.tags &&
          post.tags.map((tag: string, tagIndex: number) => (
            <span
              key={tagIndex}
              className={`${isPage ? "text-xs" : "text-[10px]"} px-2 py-0.5 font-medium border dark:border-white rounded-md`}
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
