"use client";
import useSWR from "swr"; // Import SWR
import { fetcher } from "@/lib/fetcher"; // The fetcher function we just created
import ProfileSection from "@/components/sections/profile";
import AboutSection from "@/components/sections/about";
import TechStackSection from "@/components/sections/techStack";
import ExperienceSection from "@/components/sections/experience";
import HobbySection from "@/components/sections/hobby";
import ProjectSection from "@/components/sections/project";
import CertificationSection from "@/components/sections/certification";
import TestimonialSection from "@/components/sections/testimonial";
import ContactSection from "@/components/sections/contact";
import BlogPostSection from "@/components/sections/blog";
import { Skill, Testimonial, Profile, BlogPost, Experience, Project, Certification, Contact, Membership } from "@/lib/types"; // Import necessary types

const HomePage = () => {
  // Fetch data with SWR and cache it
  const { data: profile, error: profileError, isLoading: profileLoading } = useSWR<Profile[]>("profile", fetcher);
  const { data: techStack, error: techStackError, isLoading: techStackLoading } = useSWR<Skill[]>("skills", fetcher);
  const { data: experience, error: experienceError, isLoading: experienceLoading } = useSWR<Experience[]>("experience", fetcher);
  const { data: projects, error: projectsError, isLoading: projectsLoading } = useSWR<Project[]>("projects", () => fetcher<Project>("projects", {
    sort: [
      { column: "date", ascending: false },
      { column: "id", ascending: false },
    ],
  }));
  const { data: certifications, error: certificationsError, isLoading: certificationsLoading } = useSWR<Certification[]>("certifications", fetcher);
  const { data: testimonials, error: testimonialsError, isLoading: testimonialsLoading } = useSWR<Testimonial[]>("testimonials", fetcher);
  const { data: contact, error: contactError, isLoading: contactLoading } = useSWR<Contact[]>("contact", fetcher);
  const { data: membership, error: membershipError, isLoading: membershipLoading } = useSWR<Membership[]>("memberships", fetcher);
  const { data: blogPosts, error: blogPostsError, isLoading: blogPostsLoading } = useSWR<BlogPost[]>("blog_posts", fetcher);

  // Combine loading state
  const isLoading = profileLoading || techStackLoading || experienceLoading || projectsLoading || certificationsLoading || testimonialsLoading || contactLoading || membershipLoading || blogPostsLoading;
  
  // Error state
  const error = profileError || techStackError || experienceError || projectsError || certificationsError || testimonialsError || contactError || membershipError || blogPostsError;
  
  // If there's an error, display it
  if (error) {
    return <div className="max-w-4xl mx-auto">Error fetching data: {error.message || "Please try again later."}</div>;
  }

  // If data is still loading, show loading state
  if (isLoading || !profile || !techStack || !experience || !testimonials || !blogPosts || !experience || !projects || !certifications || !contact || !membership) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-sm">Loading...</div>
      </div>
    );
  }


  // Use the first profile from the array
  const profileData = profile[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Pass the fetched data as props */}
      <ProfileSection profileData={profileData} />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
          <AboutSection profileData={profileData} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group animate-fade-in animation-delay-200">
          <ExperienceSection experience={experience}/>
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-200">
          <TechStackSection techStack={techStack} limit={3} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 space-y-2 group animate-fade-in animation-delay-200">
          <HobbySection hobby={profileData?.hobby ?? []} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-300">
          <ProjectSection projects={projects} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-3 space-y-2 group animate-fade-in animation-delay-400">
          <CertificationSection certifications={certifications} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-3 space-y-2 group overflow-hidden animate-fade-in animation-delay-400">
          <TestimonialSection testimonials={testimonials} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-2 space-y-3 group animate-fade-in animation-delay-500">
          <ContactSection contact={contact[0]} memberships={membership} />
        </div>

        <div className="border dark:bg-neutral-900 rounded-lg p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-500">
          <BlogPostSection blogPosts={blogPosts} limit={2}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
