"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const images = [
  { src: "/assets/img/screenshots/01- start.png", alt: "Getting Started" },
  { src: "/assets/img/screenshots/02-my-course.png", alt: "My Courses" },
  { src: "/assets/img/screenshots/03-create-course.png", alt: "Create Course" },
  { src: "/assets/img/screenshots/04-similar-courses.png", alt: "Similar Courses" },
  { src: "/assets/img/screenshots/05-learning-blueprint.png", alt: "Learning Blueprint" },
  { src: "/assets/img/screenshots/06-ai-gen-content.png", alt: "AI Generated Content" },
  { src: "/assets/img/screenshots/07-all-courses.png", alt: "All Courses" },
  { src: "/assets/img/screenshots/08-course-details.png", alt: "Course Details" },
  { src: "/assets/img/screenshots/09-challenge-details.png", alt: "Challenge Details" },
  { src: "/assets/img/screenshots/10-setting.png", alt: "Settings" },
];

export default function ScreenshotCarousel() {
  const [centerIndex, setCenterIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const paginate = useCallback((dir: number) => {
    setCenterIndex((prev) => (prev + dir + images.length) % images.length);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paginate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) {
      paginate(diff > 0 ? -1 : 1);
    }
    touchStart.current = null;
  };

  const getSlide = (offset: number) => {
    return (centerIndex + offset + images.length) % images.length;
  };

  return (
    <section className="py-20 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-4">
            Explore the Platform
          </h2>
          <p className="text-[#a8a7a2] max-w-2xl mx-auto text-base md:text-lg">
            Take a visual tour through AcadXP&apos;s features and interface.
          </p>
        </div>

        <div
          className="relative mx-auto grid place-items-center select-none"
          style={{ perspective: "1200px", height: "clamp(260px, 50vw, 480px)", maxWidth: "960px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {[-1, 0, 1].map((offset) => {
            const idx = getSlide(offset);
            const abs = Math.abs(offset);
            const dir = offset > 0 ? 1 : offset < 0 ? -1 : 0;

            return (
              <motion.div
                key={images[idx].src}
                animate={{
                  rotateY: -dir * 28,
                  x: dir * abs * 170,
                  z: -abs * 140,
                  scale: 1 - abs * 0.25,
                  opacity: 1 - abs * 0.45,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 28,
                  mass: 0.8,
                }}
                className="col-span-full row-span-full cursor-pointer"
                style={{
                  width: "clamp(200px, 60%, 600px)",
                  aspectRatio: "16/10",
                  transformStyle: "preserve-3d",
                  zIndex: 10 - abs,
                }}
                onClick={() => {
                  if (offset === -1) paginate(-1);
                  else if (offset === 1) paginate(1);
                }}
              >
                <div
                  className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/10"
                  style={{
                    boxShadow:
                      offset === 0
                        ? "0 20px 60px -8px rgba(99,102,241,0.3)"
                        : "0 8px 24px -6px rgba(0,0,0,0.4)",
                  }}
                >
                  <Image
                    src={images[idx].src}
                    alt={images[idx].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 600px"
                    priority
                    draggable={false}
                  />
                </div>
              </motion.div>
            );
          })}

          <div
            className="absolute -inset-x-8 -inset-y-8 -z-10 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCenterIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === centerIndex
                    ? "w-8 bg-indigo-500"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>

        <p className="text-center text-sm text-[#a8a7a2] mt-4 font-medium">
          {images[centerIndex].alt}
        </p>
      </div>
    </section>
  );
}
