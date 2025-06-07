"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client"; // Ensure you have this client configured
import { Skill } from "@/lib/types";

const TechStackSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<{ category: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const supabase = createClient(); // Initialize Supabase client

      try {
        // Fetch all categories and filter unique ones
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("skills")
          .select("category", { count: "exact", head: false }); // Get all categories

        if (categoriesError) throw categoriesError;
        // Filter unique categories
        const uniqueCategories = Array.from(
          new Set((categoriesData || []).map((item) => item.category))
        ).map((category) => ({ category }));
        setCategories(uniqueCategories);

        // Fetch all skills
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("id", { ascending: true }); // Order skills by their 'id'

        if (error) throw error;
        setSkills(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Tech Stack</h2>
        </div>
        <div className="text-sm text-foreground/70">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Tech Stack</h2>
        </div>
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Tech Stack</h2>
        </div>
        <a className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors" href="/tech-stack">
          View All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

      {/* Tech Stack Categories */}
      <div className="space-y-4">
        {categories.slice(0, 3).map((category) => { // Show only the first 3 categories
          const filteredSkills = skills.filter((skill) => skill.category === category.category);

          if (filteredSkills.length === 0) return null;

          return (
            <div key={category.category}>
              <h3 className="text-sm font-semibold mb-2">{category.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {filteredSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-0.5 text-xs rounded-md border border-foreground/10"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStackSection;
