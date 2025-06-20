"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import useSWR from "swr"; // Import SWR for data fetching
import { fetcher } from "@/lib/fetcher"; // The fetcher function you created
import { Project } from "@/lib/types";
import ProjectSection from "@/components/sections/project"; // Import ProjectSection

export default function AllProjectsPage() {
  // Fetch projects using SWR
const { data: projects, error, isLoading } = useSWR<Project[]>(
  "projects",
  () => fetcher<Project>("projects", {
    sort: [
      { column: "date", ascending: false },
      { column: "id", ascending: false },
    ],
  })
);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm  ">Loading...</div>
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
          className="inline-flex items-center gap-2 text-sm group hover:text-foreground transition-colors"
          href="/"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">All Projects</h1>
      </div>

      {/* Pass the projects data as a prop with limit and isProjectPage as true */}
      <ProjectSection projects={projects ?? []} limit={projects?.length ?? 0} isProjectPage={true} />
    </div>
  );
}
