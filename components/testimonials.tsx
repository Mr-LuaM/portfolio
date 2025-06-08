"use client";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client"; // Ensure you have this client configured
import { Testimonial } from "@/lib/types";
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const supabase = createClient();

      try {
        // Fetch testimonials from Supabase
        const { data, error } = await supabase.from("testimonials").select("*").order("date", { ascending: false });

        if (error) throw error;
        setTestimonials(data || []); // Set the fetched testimonials data
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <h2 className="text-lg font-bold">Testimonials</h2>
      </div>

      <div className="space-y-4 mt-4">
        <div className="min-h-[120px]">
          <blockquote className="text-sm leading-relaxed text-foreground/90 mb-4">
            "{testimonials[currentIndex].testimonial}"
          </blockquote>
<div className="pt-3 border-t border-border"></div>
          <div >
            <p className="text-sm font-semibold">{testimonials[currentIndex].author_name}</p>
            <p className="text-xs text-foreground/70">{testimonials[currentIndex].author_role} at {testimonials[currentIndex].company}</p>
           
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-foreground" : "bg-foreground/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
