"use client";
import { Project } from "@/lib/types";
import Link from "next/link";

interface ProjectSectionProps {
  projects: Project[];
  limit?: number;
  isProjectPage?: boolean;
}

const ProjectSection = ({ projects, limit = 2, isProjectPage = false }: ProjectSectionProps) => {
  const displayedProjects = isProjectPage ? projects : projects.slice(0, limit);

  const columns = 2; // since you use sm:grid-cols-2

  return (
    <div>
      {!isProjectPage && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <h2 className="text-lg font-bold">Recent Projects</h2>
          </div>
          <Link href="/projects" className="text-xs flex items-center gap-1 animated-gradient-text">
            View All <span className="text-sm">➜</span>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {displayedProjects?.map((project, index) => {
          const { id, name, description, project_url, repo_url, technologies, access_type } = project;
          const techStack = technologies?.split(",").map((tech) => tech.trim()) || [];

          const rowIndex = Math.floor(index / columns);
          const delay = 200 + rowIndex * 200; // delay increases per row

          return (
             <div
              key={id}
className={isProjectPage ? "animate-fade-in opacity-0" : ""}
  style={isProjectPage ? { animationDelay: `${delay}ms`, animationFillMode: "forwards" } : {}}
              >
            <div
             
              className="border rounded-lg p-4 hover:-translate-y-0.5 transition-transform duration-200 dark:bg-neutral-900 space-y-2"
            >
             
                <a
                  href={project_url || repo_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-1"
                >
                  <h3 className={`font-semibold ${isProjectPage ? "text-lg" : "text-sm"}`}>{name}</h3>
                  <p className={`${isProjectPage ? "text-sm" : "text-xs"} line-clamp-2`}>{description}</p>
                </a>

                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-1.5 py-0.5 font-medium border rounded-md dark:border-white ${
                          isProjectPage ? "text-xs" : "text-[10px]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-1 pt-1">
                  {project_url && (
                    <a
                      href={project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Project"
                      title="View Project"
                      className={`flex items-center justify-center rounded-md transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-black dark:text-white hover:dark:bg-neutral-800 ${
                        isProjectPage ? "p-2" : "p-1.5"
                      }`}
                    >
                      <svg
                        className={isProjectPage ? "w-5 h-5" : "w-4 h-4"}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}

                  {repo_url && access_type === "public" && (
                    <a
                      href={repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View GitHub Repo"
                      title="View GitHub Repo"
                      className={`flex items-center justify-center rounded-md transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-black dark:text-white hover:dark:bg-neutral-800 ${
                        isProjectPage ? "p-2" : "p-1.5"
                      }`}
                    >
                      <svg
                        className={isProjectPage ? "w-5 h-5" : "w-4 h-4"}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12.017c0 4.425 2.87 8.18 6.85 9.504.5.092.68-.217.68-.483 0-.238-.01-.869-.014-1.704-2.78.606-3.37-1.343-3.37-1.343-.45-1.157-1.11-1.466-1.11-1.466-.91-.62.07-.608.07-.608 1 .07 1.53 1.032 1.53 1.032.89 1.53 2.34 1.088 2.91.832.09-.647.35-1.088.64-1.338-2.22-.253-4.56-1.113-4.56-4.951 0-1.093.39-1.988 1.03-2.688-.1-.253-.45-1.272.1-2.65 0 0 .84-.27 2.75 1.026.81-.226 1.67-.34 2.52-.336.85-.004 1.7.11 2.5.337 1.91-1.296 2.75-1.027 2.75-1.027.55 1.379.2 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.34 4.695-4.57 4.943.36.309.68.92.68 1.855 0 1.338-.01 2.419-.01 2.747 0 .268.18.58.69.482A10.02 10.02 0 0022 12.017C22 6.48 17.52 2 12 2z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSection;
