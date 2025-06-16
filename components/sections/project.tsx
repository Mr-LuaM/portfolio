"use client";
import { Project } from "@/lib/types";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectSectionProps {
  projects: Project[];
  limit?: number;
  isProjectPage?: boolean;
}

const ProjectSection = ({ projects, limit = 4, isProjectPage = false }: ProjectSectionProps) => {
  const displayedProjects = isProjectPage ? projects : projects.slice(0, limit);

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
              ></path>
            </svg>
            <h2 className="text-lg font-bold">Recent Projects</h2>
          </div>
          <Link href="/projects" className="text-xs flex items-center gap-1 animated-gradient-text">
            View All <span className="text-sm">➜</span>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {displayedProjects?.map((project) => {
          const showProjectLink = !!project.project_url;
          const showRepoLink = !!project.repo_url;

          return (
            <div
              key={project.id}
              className="border rounded-lg p-4 space-y-2 hover:-translate-y-0.5 transition-transform duration-200 dark:bg-neutral-900"
            >
              <a
                href={project.project_url || project.repo_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block space-y-1"
              >
                <h3 className={`font-semibold ${isProjectPage ? "text-lg" : "text-sm"}`}>
                  {project.name}
                </h3>
                <p className={isProjectPage ? "text-sm" : "text-xs"}>{project.description}</p>
              </a>

              <div className="flex items-center gap-2 mt-1">
                {showProjectLink && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-orange-500"
                    title="View Live Project"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                {showRepoLink && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-500"
                    title="View Source Code"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSection;
