"use client";
import React from 'react';

const TechStackSection = () => {
  return (
    <div >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
          <h2 className="text-lg font-bold">Tech Stack</h2>
        </div>
        <a className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors" href="/tech-stack">
          View All
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>

      {/* Tech Stack Categories */}
      <div className="space-y-4">
        {/* Frontend */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Frontend</h3>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">JavaScript</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">TypeScript</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">React</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Next.js</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Vue.js</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Tailwind CSS</span>
          </div>
        </div>

        {/* Backend */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Backend</h3>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Node.js</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Python</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">PHP</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Laravel</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">PostgreSQL</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">MongoDB</span>
          </div>
        </div>

        {/* DevOps & Cloud */}
        <div>
          <h3 className="text-sm font-semibold mb-2">DevOps & Cloud</h3>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">AWS</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Docker</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">Kubernetes</span>
            <span className="px-2 py-0.5 text-xs rounded-md bg-foreground/5 border border-foreground/10">GitHub Actions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSection;
