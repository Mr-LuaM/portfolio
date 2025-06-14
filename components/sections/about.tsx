"use client";
import { Profile } from "@/lib/types"; // Import the Profile type

const AboutSectionComponent = ({ profileData }: { profileData: Profile }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <h2 className="text-lg font-bold">About</h2>
      </div>

      {/* About Description */}
      <p className="text-sm leading-relaxed mt-1">
        {profileData?.bio || "No bio available."}
      </p>
    </div>
  );
};

export default AboutSectionComponent;
