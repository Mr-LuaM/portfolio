"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Ensure the Supabase client is properly configured
import { ArrowLeft } from "lucide-react";
import { Project } from "@/lib/types";
import Link from "next/link";

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient(); // Initialize Supabase client

      try {
        // Fetch projects from Supabase
        const { data, error } = await supabase.from("projects").select("*"); // Modify the table name if necessary

        if (error) throw error;
        setProjects(data); // Set the fetched projects data
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(); // Fetch the data when the component mounts
  }, []);

  if (loading) {
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
          <div className="text-sm text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

    function getDomainFromUrl(project_url: string): React.ReactNode {
        try {
            const url = new URL(project_url);
            return url.hostname.replace(/^www\./, "");
        } catch {
            return project_url;
        }
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {projects?.map((project) => (
          <div key={project.id} className="border rounded-lg p-3 space-y-1 hover:-translate-y-0.5 hover:bg-muted transition-transform duration-200">
            <a target="_blank" rel="noopener noreferrer" className="block space-y-1" href={project.project_url}>
              <h3 className="text-sm font-semibold">{project.name}</h3>
              <p className="text-xs text-foreground/70">{project.description}</p>
              <p className="text-xs text-foreground/50 font-mono bg-gray-100 px-2 py-1 rounded-md inline-block mt-1">
                {getDomainFromUrl(project.project_url)}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
