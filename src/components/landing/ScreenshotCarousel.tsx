"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 400 : -400,
    rotateY: dir > 0 ? 30 : -30,
    scale: 0.6,
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -400 : 400,
    rotateY: dir > 0 ? -30 : 30,
    scale: 0.6,
    opacity: 0,
    filter: "blur(8px)",
  }),
};

export default function ScreenshotCarousel() {
  const [[currentIndex, direction], setState] = useState([0, 0]);
  const touchStart = useRef<number | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setState(([current]) => {
      const next = (current + newDirection + images.length) % images.length;
      return [next, newDirection];
    });
  }, []);

  const handlePrev = () => paginate(-1);
  const handleNext = () => paginate(1);

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
          className="relative mx-auto max-w-5xl"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative aspect-video flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 26 },
                  rotateY: { type: "spring", stiffness: 260, damping: 26 },
                  scale: { type: "spring", stiffness: 260, damping: 26 },
                  opacity: { duration: 0.35 },
                  filter: { duration: 0.35 },
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-indigo-500/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
                  <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute -inset-x-4 -inset-y-4 -z-10 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:px-4">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-90"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-90"
              aria-label="Next screenshot"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > currentIndex ? 1 : -1;
                setState([i, dir]);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 bg-indigo-500"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-sm text-[#a8a7a2] mt-4 font-medium">
          {images[currentIndex].alt}
        </p>
      </div>
    </section>
  );
}
