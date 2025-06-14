import Link from "next/link"
import { BlogPost } from "@/lib/types"

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block p-5 border border-border rounded-lg hover:bg-muted transition">
      <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
      <p className="text-sm text-muted-foreground mb-2">{ post.description}</p>
      <span className="text-xs text-foreground/50">{new Date(post.created_at).toLocaleDateString()}</span>
    </Link>
  )
}
