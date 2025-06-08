"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Ensure the Supabase client is properly configured
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Certification } from "@/lib/types";

export default function AllProjects() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCertifications = async () => {
        const supabase = createClient(); // Initialize Supabase client
  
        try {
          // Fetch certifications from Supabase
          const { data, error } = await supabase.from("certifications").select("*");
  
          if (error) throw error;
          setCertifications(data); // Set the fetched certifications data
        } catch (error) {
          setError(error instanceof Error ? error.message : String(error));
        } finally {
          setLoading(false);
        }
      };
  
      fetchCertifications(); // Fetch the data when the component mounts
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
      <div className="space-y-2 mt-4">
        {certifications.map((cert, index) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-black dark:text-white hover:dark:bg-neutral-800 border "
            href={cert.certificate_url}
          >
            <h3 className="text-xs font-semibold">{cert.name}</h3>
            <p className="text-[11px] text-foreground/70 dark:text-foreground/50">{cert.issuer}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
