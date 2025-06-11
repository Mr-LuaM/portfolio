"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import useSWR from "swr"; // Import SWR for data fetching
import { fetcher } from "@/lib/fetcher"; // The fetcher function you created
import { BlogPost } from "@/lib/types";
import BlogPostsSection from "@/components/sections/blog";

export default function BlogPage() {
  // Fetch projects using SWR
  const { data: blogPosts, error, isLoading } =  useSWR<BlogPost[]>("blog_posts", fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-foreground/70">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-red-500">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Link
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
          href="/"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">All Projects</h1>
      </div>

      {/* Pass the projects data as a prop with limit and isProjectPage as true */}
      <BlogPostsSection blogPosts={blogPosts ?? []} limit={blogPosts?.length ?? 0} isPage={true} />
    </div>
  );
}
