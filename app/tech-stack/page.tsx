"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Ensure you have this client configured
import { ArrowLeft } from "lucide-react";
import { Skill } from "@/lib/types";
import Link from "next/link";

export default function TechStackPage() {
  const [techStack, setTechStack] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      const supabase = createClient(); // Initialize Supabase client

      try {
        // Fetch tech stack categories and their corresponding technologies
        const { data, error } = await supabase.from("skills").select("*"); // Modify this query based on your table structure

        if (error) throw error;
        
        // Group the fetched data by category
        const groupedTechStack: { [category: string]: string[] } = {};

        data.forEach((item: Skill) => {
          if (!groupedTechStack[item.category]) {
            groupedTechStack[item.category] = [];
          }
          groupedTechStack[item.category].push(item.name); // Assuming 'name' is the technology name field
        });

        setTechStack(groupedTechStack);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  if (loading) {
    return (

              <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link  href="/" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors ">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">Tech Stack</h1>
          </div>
          <div className="text-sm text-foreground/70">Loading...</div>
        </div>
     
    );
  }

  if (error) {
    return (

        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-red-500">Error: {error}</div>
        </div>
     
    );
  }

  return (

      <div className="page-transition max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link  href="/" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors ">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          <h1 className="text-2xl font-bold">Tech Stack</h1>
        </div>

        {/* Tech Categories */}
        <div className="space-y-8 animate-fade-in">
          {Object.entries(techStack).map(([category, technologies], index) => (
            <div key={index}>
              <h2 className="text-lg font-bold mb-4">{category}</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm font-medium  border border-foreground/10 rounded-lg hover:bg-foreground/10 transition-colors cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

  );
}
