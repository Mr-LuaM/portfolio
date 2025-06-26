"use client";

import Link from "next/link";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, LinkIcon } from "lucide-react";
import { fetcher } from "@/lib/fetcher";
import { BlogPost } from "@/lib/types";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function BlogPostPage() {
  const { slug } = useParams() as { slug?: string };
  const [copySuccess, setCopySuccess] = useState(false);

  const { data, error, isLoading } = useSWR(
    slug ? `/blog_posts?slug=eq.${slug}` : null,
    fetcher
  );

  const post: BlogPost | null =
    Array.isArray(data) && data.length > 0 && typeof data[0] === "object"
      ? (data[0] as BlogPost)
      : null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const copyPageLink = async () => {
    await copyToClipboard(window.location.href);
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error || !post) {
    return <div className="p-6">Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm text-foreground/50 mb-3">
          <time>{new Date(post.created_at).toLocaleDateString()}</time>
          <span>•</span>
          <span>{Math.ceil(post.content.split(" ").length / 200)} min read</span>
        </div>
        <h1 className="text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-sm rounded-md bg-foreground/5 border border-foreground/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="bento-card p-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Share this post</h2>
        <div className="flex gap-3">
          <button
            onClick={copyPageLink}
            className="p-2 rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors group relative"
            title="Copy link"
          >
            <LinkIcon className="w-5 h-5" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-foreground/90 text-background rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {copySuccess ? "Copied!" : "Copy link"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
