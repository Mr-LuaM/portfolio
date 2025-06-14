"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { BlogPost } from "@/lib/types"

import BlogCard from "./BlogCard" // Optional: create this for individual post display

export default function BlogPage() {
  const { data: blogPosts, error, isLoading } = useSWR<BlogPost[]>("blog_posts", fetcher)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        dddd
      </div>
    )
  }

  if (error || !blogPosts) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-red-500">
          Failed to load blog posts.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Blog</h1>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
