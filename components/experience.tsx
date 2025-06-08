"use client"
import { useEffect, useState } from "react"
import { createClient } from "../lib/supabase/client"
import type { Experience } from "../lib/types"

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.from("experience").select("*").order("start_date", { ascending: false })
        if (error) throw error
        setExperiences(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <div className="bento-card p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Experience</h2>
        </div>
        <div className="text-sm text-foreground/70">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bento-card p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <h2 className="text-lg font-bold">Experience</h2>
        </div>
        <div className="text-sm text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div >
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {experiences?.map((experience, index) => {
          const isLatest = index === 0 // First item is the latest due to ordering

          return (
            <div key={experience.id} className="relative pl-6 group/role">
              {/* Add glowing line segment for hover */}
              <div className="absolute left-1.5 top-1.5 w-px h-full bg-foreground/20 opacity-0 group-hover/role:opacity-100 transition-opacity duration-300"></div>

              <div
                className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isLatest
                    ? "border-foreground bg-foreground shadow-[0_0_0_4px_hsl(var(--foreground)/0.1)]"
                    : "border-border bg-background group-hover/role:bg-foreground group-hover/role:border-foreground group-hover/role:shadow-[0_0_0_4px_hsl(var(--foreground)/0.1)]"
                }`}
              ></div>

              <div className="space-y-1">
                <h3
                  className={`text-sm font-semibold transition-colors ${
                    isLatest ? "text-foreground" : "group-hover/role:text-foreground"
                  }`}
                >
                  {experience.role}
                </h3>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs text-foreground/70 ${
                      isLatest ? "text-foreground/70" : "group-hover/role:text-foreground/70"
                    }`}
                  >
                    {experience.company}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                      isLatest
                        ? "bg-foreground/10 border-foreground/20 border"
                        : "bg-foreground/5 border border-foreground/10 group-hover/role:bg-foreground/10 group-hover/role:border-foreground/20"
                    }`}
                  >
                    {new Date(experience.start_date).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExperienceSection
