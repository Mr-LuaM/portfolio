"use client"
import { useEffect, useState } from "react"
import { createClient } from "../../lib/supabase/client" // Ensure you have this client configured
import { BlogPost } from "@/lib/types"

export default function BlogPostsSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]) // State to hold blog posts
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const supabase = createClient() // Initialize Supabase client

      try {
        // Fetch blog posts from Supabase
        const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false }) // Ordering by date
        if (error) throw error
        setBlogPosts(data) // Set the blog posts to the state
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err)) // Handle error
      } finally {
        setLoading(false) // Set loading to false when data is fetched
      }
    }

    fetchBlogPosts() // Fetch the data when the component mounts
  }, [])

  if (loading) {
    return <div>Loading...</div> // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div> // Show error message
  }

  return (
    <div className="">
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

      <div className="space-y-3">
        {blogPosts.slice(0, 2).map((post, index) => ( 
          <div
            key={index}
            className="p-4 rounded-lg hover:-translate-y-0.5 hover:bg-muted transition-transform duration-200 border border-foreground/10  cursor-pointer "
          >
            <h3 className="text-sm font-semibold mb-2">{post.title}</h3>
            <div className="flex items-center gap-2 text-xs text-foreground/70 mb-2">
              <span>{new Date(post.date).toLocaleDateString()}</span> {/* Display formatted date */}
              <span>•</span>
              <span>{post.read_time}</span>
            </div>
            <p className="text-xs text-foreground/70 mb-3 leading-relaxed">{post.description}</p>
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
  )
}
