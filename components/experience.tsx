"use client";
import React from 'react';

const ExperienceSection = () => {
  return (
    <div className="bento-card p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <h2 className="text-lg font-bold">Experience</h2>
      </div>

      {/* Experience List */}
      <div className="relative space-y-4 mt-4">
        {/* Timeline Item 1 */}
        <div className="absolute left-1.5 top-1.5 bottom-2 w-px bg-border"></div>
        <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-accent transition-colors">AI Ops Engineer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70 text-accent/70">Centre of Excellence for GenAI, Cambridge</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 bg-accent/10 border-accent/20">2025</span>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Senior Full-Stack Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Core Technology, Cambridge</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2024</span>
            </div>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Founder</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">BASE404</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2023</span>
            </div>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Software Engineering Lead</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">PocketDevs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2022</span>
            </div>
          </div>
        </div>

        {/* Timeline Item 5 */}
        <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div>
 <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div>
        {/* Addition <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div> <div className="relative pl-6 group/role">
          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background group-hover/role:bg-accent transition-colors"></div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover/role:text-accent transition-colors">Lead Application Developer</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/70">Bluewind Asia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10">2021</span>
            </div>
          </div>
        </div>al timeline items go here */}
      </div>
    </div>
  );
};

export default ExperienceSection;
