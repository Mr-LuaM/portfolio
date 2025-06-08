"use client";
import useSWR from "swr"; // Import SWR
import { fetcher } from "@/lib/fetcher"; // The fetcher function we just created
import ProfileSection from "@/components/sections/profile";
import AboutSection from "@/components/sections/about";
import TechStackSection from "@/components/sections/techStack";
// import other sections as needed

import { Skill, Testimonial, Profile, BlogPost, Experience, Project, Certification, Contact } from "@/lib/types"; // Import necessary types

export default function HomePage() {
  // Fetch data with SWR and cache it
  const { data: profile } = useSWR<Profile[]>("profile", fetcher);
  const { data: techStack } = useSWR<Skill[]>("skills", fetcher);
  const { data: experience } = useSWR<Experience[]>("experience", fetcher);  
  const { data: projects } = useSWR<Project[]>("projects", fetcher);  
  const { data: certifications } = useSWR<Certification[]>("certifications", fetcher);  
  const { data: testimonials } = useSWR<Testimonial[]>("testimonials", fetcher);
  const { data: contact } = useSWR<Contact[]>("contact", fetcher);  
  const { data: blogPosts } = useSWR<BlogPost[]>("blog_posts", fetcher);

  // No need to handle loading/error manually as Suspense will manage this in the layout

  // Use the first profile from the array (assuming there is at least one profile)
  const profileData = profile ? profile[0] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Section */}
      {profileData && <ProfileSection profileData={profileData} />}
      
      {/* Grid layout for other sections */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        {/* About Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
          {profileData && <AboutSection profileData={profileData} />}
        </div>

        {/* Tech Stack Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-200">
          {techStack && <TechStackSection techStack={techStack} limit={3} />}
        </div>

        {/* Experience Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
          {/* <ExperienceSection experience={experience} /> */}
        </div>

        {/* Project Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-300">
          {/* <ProjectSection project={projects} /> */}
        </div>

        {/* Certification Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-3 space-y-2 group animate-fade-in animation-delay-400">
          {/* <CertificationSection certification={certifications} /> */}
        </div>

        {/* Testimonial Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-3 space-y-2 group overflow-hidden animate-fade-in animation-delay-400">
          {/* <TestimonialSection testimonials={testimonials} /> */}
        </div>

        {/* Contact Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 space-y-3 group animate-fade-in animation-delay-500">
          {/* <ContactSection contact={contact} /> */}
        </div>

        {/* Blog Post Section */}
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-500">
          {/* <BlogPostSection blogPosts={blogPosts} /> */}
        </div>
      </div>
    </div>
  );
}
