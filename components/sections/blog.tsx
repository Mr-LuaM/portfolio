"use client"

import type { BlogPost } from "@/lib/types"
import Link from "next/link"

interface BlogPostsSectionProps {
  blogPosts: BlogPost[]
  limit?: number
  isPage?: boolean
}

const BlogPostsSection = ({ blogPosts, limit = 2, isPage = false }: BlogPostsSectionProps) => {
  const displayedPosts = blogPosts.slice(0, limit)

  if (isPage) {
    return (
      <div className="space-y-4">
        {displayedPosts.map((post, index) => (
          <Link key={post.id || index} href={`/blog/${post.slug}`} className="group block">
            <article className="border rounded-lg p-4 space-y-3 transition-all duration-200 hover:scale-[1.01]">
              <header className="space-y-1">
                <div className="flex items-center gap-2 text-xs ">
                  <time>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.read_time}</span>
                </div>
                <h2 className="text-lg font-semibold transition-colors">{post.title}</h2>
              </header>

              <p className="text-sm line-clamp-2">{post.description}</p>

              <footer className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags?.slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 text-xs rounded-md border dark:border-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </footer>
            </article>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Blog Posts</h2>
        <Link
          href="/blog"
          className="text-xs flex items-center gap-1 transition-colors"
        >
          View All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="space-y-3">
        {displayedPosts.map((post, index) => (
          <Link key={post.id || index} href={`/blog/${post.slug}`} className="block">
            <div className="p-3 rounded-lg border transition-colors cursor-pointer space-y-1.5">
              <h3 className="text-sm font-semibold">{post.title}</h3>
              <div className="flex items-center gap-2 text-[10px]">
                <time>{new Date(post.date).toLocaleDateString()}</time>
                <span>•</span>
                <span>{post.read_time}</span>
              </div>
              <p className="text-xs line-clamp-2 leading-relaxed">{post.description}</p>
              <div className="flex flex-wrap gap-1">
                {post.tags?.slice(0, 4).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-1.5 py-0.5 text-[10px] font-medium border rounded-md dark:border-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogPostsSection
