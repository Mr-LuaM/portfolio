"use client";
import useSWR from "swr"; // Import SWR for data fetching
import { fetcher } from "@/lib/fetcher"; // The fetcher function we created earlier
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TechStackSection from "@/components/sections/techStack"; // Import TechStackSection component
import { Skill } from "@/lib/types"; // Import Skill type

export default function TechStackPage() {
  // Fetch tech stack data using SWR
  const { data, error, isLoading } = useSWR<Skill[]>("skills", fetcher);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-red-500">Error: {error?.message || "An error occurred"}</div>
      </div>
    );
  }

  if (isLoading || !data) {  
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm   hover:text-foreground transition-colors ">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Tech Stack</h1>
        </div>
        <div className="text-sm  ">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Link href="/" className="flex items-center gap-2 text-sm   hover:text-foreground transition-colors ">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Tech Stack</h1>
      </div>

      {/* Tech Stack Section */}
      <TechStackSection techStack={data} isTechStackPage={true} />
    </div>
  );
}
