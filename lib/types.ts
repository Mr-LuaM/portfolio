// lib/types.ts

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  image_url: string;
  contact_email: string;
  linkedin_url: string;
  github_url: string;
  location: string;
  hobby: string;
}

export interface Hobby{
    hobby: string | null;
}

export interface Achievement {
  id: number;
  name: string;
  type: string;
  organization: string;
  date: string; // You could use Date if you want, or string for formatted date
  details: string;
  achievement_url: string; // URL to the achievement details or certificate
}


export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  project_url: string;
  repo_url: string;
  image_url: string;
  date: string; // Date as string or Date object
  access_type: string; // e.g., "public", "private", "internal"
}


export interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
}


export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string; // Or Date type
  end_date: string; // Or Date type
  description: string;
  technologies: string;
}


export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date_issued: string; // Or Date type
  certificate_url: string;
  description: string;
}


export interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  testimonial: string;
  company?: string;
  date: string;
}

export interface Contact {
  id: number;
  email: string;
  linkedin_url: string;
  github_url: string;
  facebook_url: string;
  other_links: Record<string, string>;
}

export interface Membership {
  organization_name: string; 
  organization_url: string
}

export interface BlogPost  {
  id: number; // Unique identifier for the blog post
  title: string; // The title of the blog post
  slug: string; // A URL-friendly version of the title, used for routing
  date: string; // The date the blog post was published (use ISO format or Date object)
  read_time: string; // The estimated reading time (e.g., "3 min read")
  content: string; // The full content of the blog post, typically in Markdown or HTML format
  description: string; // A short description or excerpt of the blog post
  tags: string[]; // An array of tags related to the blog post
  created_at: string; // Timestamp of when the post was created
}
