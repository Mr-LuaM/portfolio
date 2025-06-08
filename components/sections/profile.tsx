"use client";
import { Profile } from "../../lib/types"; // Import the Profile type
import Image from "next/image"; // Import the next/image component
import { ThemeSwitcher } from "../theme-switcher";
import ActionButtons from "../actionButtons";
import HackathonBadge from "../hackathonBadge";

// Accept profileData as props
const ProfileSectionComponent = ({ profileData }: { profileData: Profile }) => {
  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center gap-4 md:gap-6">
        {/* Profile Image */}
        <Image
          src={profileData?.image_url || "/fallback-image.jpg"} // Fallback image if profile image is unavailable
          alt={profileData?.name || "Profile Image"}
          width={160}
          height={160}
          className="rounded-lg w-32 h-32 md:w-40 md:h-40 object-cover flex-shrink-0"
        />
        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg md:text-2xl font-bold truncate">{profileData?.name || "Mark Lua"}</h1>
            <ThemeSwitcher />
          </div>
          {/* Location and Bio */}
          <p className="text-xs md:text-sm text-foreground/70 mt-0.5 flex items-center gap-1">
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className="truncate">{profileData?.location || "Oriental Mindoro, Philippines"}</span>
          </p>
          <p className="text-sm md:text-base mt-1.5 md:mt-2">
            {profileData?.title || "Software Developer"}
          </p>
          {/* Action Buttons */}
          <div className="mt-4 flex gap-6 justify-start md:justify-start flex-col md:flex-row">
            <ActionButtons />
            <HackathonBadge className="md:block hidden" />
          </div>
        </div>
      </div>
      {/* Hackathon Badge below the profile content (for small screens) */}
      <div className="md:hidden mt-6">
        <HackathonBadge />
      </div>
    </section>
  );
};

export default ProfileSectionComponent;
