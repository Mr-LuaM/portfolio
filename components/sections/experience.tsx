"use client";

import { Experience } from "@/lib/types";

const ExperienceSectionComponent = ({
  experience,
}: {
  experience: Experience[];
}) => {
  const sortedExperience = [...experience].sort((a, b) => b.id - a.id);

  return (
    <div>
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <h2 className="text-lg font-bold">Experience</h2>
      </div>

      <div className="relative space-y-4 mt-4">
        <div className="absolute left-1.5 top-1.5 bottom-2 w-px bg-border"></div>

        {sortedExperience.map((exp, index) => {
          const isLatest = index === 0;
          const startYear = new Date(exp.start_date).getFullYear();
          const endYear = exp.end_date
            ? new Date(exp.end_date).getFullYear()
            : "Present";

          return (
            <div key={exp.id} className="relative pl-6 group/role">
              {/* Timeline vertical glow line */}
              <div className="absolute left-1.5 top-1.5 w-px h-full bg-foreground/20 opacity-0 group-hover/role:opacity-100 transition-opacity duration-300" />

              {/* Dot indicator */}
              <div
                className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isLatest
                    ? "border-foreground bg-foreground shadow-[0_0_0_4px_hsl(var(--foreground)/0.1)]"
                    : "border-border bg-background group-hover/role:bg-foreground group-hover/role:border-foreground group-hover/role:shadow-[0_0_0_4px_hsl(var(--foreground)/0.1)]"
                }`}
              />

              {/* Content */}
              <div className="space-y-1">
                <h3
                  className={`text-sm font-semibold transition-colors ${
                    isLatest
                      ? "text-foreground"
                      : "group-hover/role:text-foreground"
                  }`}
                >
                  {exp.role}
                </h3>

                <p className="text-xs">{exp.company}</p>

                <p
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full w-fit transition-colors ${
                    isLatest
                      ? " border border-foreground/20 "
                      : " border border-foreground/10 "
                  }`}
                >
                  {startYear} {startYear !== endYear && ` – ${endYear}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceSectionComponent;
