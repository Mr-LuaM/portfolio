"use client";
import { Skill } from "@/lib/types"; // Import Skill type
import Link from "next/link";

interface TechStackSectionProps {
  techStack: Skill[]; // Array of skills
  limit?: number; // Optional prop to limit the number of categories displayed
  isTechStackPage?: boolean; // Prop to determine if it's the full tech stack page
}
// Helper function to render skills for each category
const renderSkills = (
  skills: Skill[],
  isTechStackPage: boolean // Add isTechStackPage prop to conditionally apply styles
) => {
  return skills.map((skill) => (
    <span
      key={skill.id}
      className={`${
        isTechStackPage
          ? "px-3 py-1 text-sm font-medium border border-foreground/10 rounded-lg hover:bg-foreground/10 transition-colors cursor-pointer"
          : "px-2 py-0.5 text-xs rounded-md border border-foreground/10"
      }`}
    >
      {skill.name}
    </span>
  ));
};

// TechStackSection now expects 'techStack' and 'limit' as props
const TechStackSection = ({
  techStack,
  limit = 3, // Default to 3 if no limit is passed
  isTechStackPage = false, // Prop to indicate if we're in the full tech stack page
}: TechStackSectionProps) => {
  // Extract unique categories from techStack
  const categories = Array.from(new Set(techStack.map((skill) => skill.category)));

  // Create an array of categories to display, considering the limit
  const displayedCategories = categories.slice(0, limit);

  // Group the techStack by category for the full page view
  const groupedTechStack = categories.reduce((acc, category) => {
    acc[category] = techStack.filter((skill) => skill.category === category);
    return acc;
  }, {} as { [key: string]: Skill[] });

  return (
    <div>
      {!isTechStackPage && (
        <div className="flex items-center justify-between">
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
            <h2 className="text-lg font-bold">Tech Stack</h2>
          </div>
          <Link
            className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
            href="/tech-stack"
          >
            View All
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Link>
        </div>
      )}
     
      {!isTechStackPage && (
      <div className="space-y-2 mt-2">
        {displayedCategories.map((category, index) => {
          const filteredSkills = techStack.filter(
            (skill) => skill.category === category
          );

          if (filteredSkills.length === 0) return null;

          return (
            <div key={index}>
              <h3 className="text-sm font-semibold mb-2">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {renderSkills(filteredSkills, isTechStackPage)}
              </div>
            </div>
          );
        })}
      </div>
  )}
      {isTechStackPage && (
        <div className="space-y-8 animate-fade-in">
          {Object.entries(groupedTechStack).map(([category, skills], index) => (
            <div key={index}>
              <h2 className="text-lg font-bold mb-4">{category}</h2>
              <div className="flex flex-wrap gap-2">
                {renderSkills(skills, isTechStackPage)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechStackSection;
