"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/lib/types"

export default function Component() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false }).limit(4)

        if (error) throw error
        setProjects(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Helper function to extract domain from URL
  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return url
    }
  }

  if (loading) {
    return (
      <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-300">
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
          <a
            className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
            href="/projects"
          >
            View All
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div className="text-sm text-foreground/70">Loading projects...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-300">
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
        </div>
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    )
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
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Recent Projects</h2>
        </div>
        <a
          className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
          href="/projects"
        >
          View All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {projects?.map((project) => (
          <div key={project.id} className="border rounded-lg p-3 space-y-1 hover:-translate-y-0.5 hover:bg-muted transition-transform duration-200">
            <a target="_blank" rel="noopener noreferrer" className="block space-y-1" href={project.project_url}>
              <h3 className="text-sm font-semibold">{project.name}</h3>
              <p className="text-xs text-foreground/70">{project.description}</p>
            <p className="text-xs text-foreground/50 dark:text-foreground/70 font-mono bg-gray-100 dark:bg-black dark:text-white px-2 py-1 rounded-md inline-block mt-1">
  {getDomainFromUrl(project.project_url)}
</p>

            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
