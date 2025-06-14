"use client";
import useSWR from "swr"; // Import SWR for data fetching
import { fetcher } from "@/lib/fetcher"; // The fetcher function you created
import CertificationsSection from "@/components/sections/certification"; // Import the CertificationsSection
import { Certification } from "@/lib/types"; // Import Certification type
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function CertificationsPage() {
  // Fetch certifications data using SWR
  const { data: certifications, error, isLoading } = useSWR<Certification[]>("certifications", fetcher);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (isLoading || !certifications) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm   hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Certifications</h1>
        </div>
        <div className="text-sm  ">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Link href="/" className="flex items-center gap-2 text-sm   hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">Certifications</h1>
      </div>

      {/* Certifications Section */}
      <CertificationsSection certifications={certifications ?? []} isPage={true} />
    </div>
  );
}
