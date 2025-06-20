"use client";

import { Hobby } from "@/lib/types";

const HobbySectionComponent = ({ hobby }: Hobby) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <h2 className="text-lg font-bold">Hobby</h2>
      </div>

      {/* Hobby Description */}
      <p className="text-sm   leading-relaxed mt-1">
        {hobby || "No hobby information available."}
      </p>
    </div>
  );
};

export default HobbySectionComponent;
