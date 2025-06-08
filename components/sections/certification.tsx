"use client";
import { Certification } from "@/lib/types"; // Import Certification type
import Link from "next/link";

interface CertificationsSectionProps {
  certifications: Certification[]; // Expecting certifications data as a prop
  isPage?: boolean; // Prop to determine if it's the full certifications page
}

const CertificationsSection = ({ certifications, isPage = false }: CertificationsSectionProps) => {
  if (!certifications || certifications.length === 0) {
    return (
      <div className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group animate-fade-in animation-delay-400">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Recent Certifications</h2>
        </div>
        <div className="text-sm text-foreground/70">No certifications available.</div>
      </div>
    );
  }

  return (
    <div>
      {/* Show title only if it's not the full page view */}
      {!isPage && (
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
          <Link
            className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
            href="/certifications"
          >
            View All
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      )}

      <div className="space-y-2 mt-4">
        {certifications.map((cert, index) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-black dark:text-white hover:dark:bg-neutral-800 border"
            href={cert.certificate_url}
          >
            <h3 className="text-xs font-semibold">{cert.name}</h3>
            <p className="text-[11px] text-foreground/70 dark:text-foreground/50">{cert.issuer}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;
