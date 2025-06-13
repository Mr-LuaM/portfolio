"use client";
import { Testimonial } from "@/lib/types";
import { useEffect, useRef, useState, TouchEvent } from "react";

const AUTO_SCROLL_INTERVAL = 30000; // 30 seconds

const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-scroll
  useEffect(() => {
  if (!testimonials || testimonials.length <= 1) return;

  intervalRef.current = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, AUTO_SCROLL_INTERVAL);

  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [testimonials]);


  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (testimonials.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SCROLL_INTERVAL);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartXRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe right
        setCurrentIndex((prev) =>
          prev === 0 ? testimonials.length - 1 : prev - 1
        );
      } else {
        // Swipe left
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }

    touchStartXRef.current = null;
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  if (!testimonials || testimonials.length === 0) {
    return <div>No testimonials available.</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <h2 className="text-lg font-bold">Testimonials</h2>
      </div>

      <div
        className="space-y-4 mt-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="min-h-[120px] overflow-hidden relative">
          <div
            className="transition-transform duration-500 ease-in-out"
style={{
  transform: `translateX(-${currentIndex * 100}%)`,
  transition: "transform 0.5s ease-in-out",
  display: "flex"
}}
          >
            {testimonials.map((t, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <blockquote className="text-sm leading-relaxed text-foreground/90 mb-4">
                  &quot;{t.testimonial}&quot;
                </blockquote>
                <div className="pt-3 border-t border-border"></div>
                <div>
                  <p className="text-sm font-semibold">{t.author_name}</p>
                  <p className="text-xs text-foreground/70">
                    {t.author_role} at {t.company}
                  </p>
                </div>
              </div>
            ))}
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
};

export default TestimonialsSection;
