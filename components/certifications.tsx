"use client";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client"; // Ensure you have this client configured
import { Certification } from "@/lib/types";

export default function CertificationsSection() {
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
      <div className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group animate-fade-in animation-delay-400">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Recent Certifications</h2>
        </div>
        <div className="text-sm text-foreground/70">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group animate-fade-in animation-delay-400">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Recent Certifications</h2>
        </div>
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Recent Certifications</h2>
        </div>
        <a
          className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
          href="/certifications"
        >
          View All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

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
