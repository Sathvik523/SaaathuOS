"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { useWindowManager } from "@/system/window-manager";
import ProjectsApp from "./ProjectsApp";

export default function ProjectsFullPage() {
  const { closeProjectsFullPage } = useWindowManager();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure Scroll Progress from top Hero banner to Laboratory section (0.0 to 1.0)
  useEffect(() => {
    const parentContainer = containerRef.current?.parentElement;

    const handleScroll = () => {
      const scrollTop = parentContainer ? parentContainer.scrollTop : window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollTop / heroHeight));
      setScrollProgress(progress);
    };

    handleScroll();

    if (parentContainer) {
      parentContainer.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (parentContainer) {
        parentContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Wheel & Touch Scroll-Up to Return to Desktop Detector
  useEffect(() => {
    let isTriggered = false;
    const parentContainer = containerRef.current?.parentElement;

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = parentContainer ? parentContainer.scrollTop : window.scrollY;
      if (scrollTop <= 10 && e.deltaY < -25 && !isTriggered) {
        isTriggered = true;
        closeProjectsFullPage();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const touchY = e.touches[0].clientY;
      const diffY = touchY - touchStartYRef.current;
      const scrollTop = parentContainer ? parentContainer.scrollTop : window.scrollY;

      if (scrollTop <= 10 && diffY > 60 && !isTriggered) {
        isTriggered = true;
        closeProjectsFullPage();
      }
    };

    const target = parentContainer || window;
    target.addEventListener("wheel", handleWheel as EventListener, { passive: true });
    target.addEventListener("touchstart", handleTouchStart as EventListener, { passive: true });
    target.addEventListener("touchmove", handleTouchMove as EventListener, { passive: true });

    return () => {
      target.removeEventListener("wheel", handleWheel as EventListener);
      target.removeEventListener("touchstart", handleTouchStart as EventListener);
      target.removeEventListener("touchmove", handleTouchMove as EventListener);
    };
  }, [closeProjectsFullPage]);

  const scrollToLaboratory = () => {
    const parentContainer = containerRef.current?.parentElement;
    if (parentContainer) {
      parentContainer.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#000000] text-[#F9F9F9] font-helvetica select-none overflow-x-hidden no-scrollbar scroll-smooth"
    >
      {/* Continuous Ambient Grid Dots Overlay across the entire unified page */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none z-0" />

      {/* Floating Return to Desktop Glass Button */}
      <button
        onClick={closeProjectsFullPage}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4.5 py-2 text-xs font-mono text-white/90 backdrop-blur-2xl hover:bg-white/20 hover:border-white/50 transition-all cursor-pointer shadow-2xl group"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-blue-400" />
        <span>Return to Desktop</span>
      </button>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: UNIFIED PITCH-BLACK CANVAS WITH LIMITED BLOOM            */}
      {/* ========================================================================= */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center bg-[#000000] overflow-hidden text-center px-4 z-10">
        
        {/* Top Scroll Up Navigation Hint Prompt */}
        <div
          onClick={closeProjectsFullPage}
          className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-mono text-[10px] text-blue-300/60 hover:text-blue-200 transition-colors cursor-pointer z-30 group"
        >
          <ArrowUp size={13} className="text-blue-400 animate-pulse group-hover:-translate-y-0.5 transition-transform" />
          <span className="tracking-widest uppercase">SCROLL UP TO RETURN TO DESKTOP</span>
        </div>

        {/* Layer 1: Subtle Submerged Warm Orange Edge Halo (Border halo around dark blue bloom) */}
        <div className="animate-dark-blue-glow-appear absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] md:w-[580px] h-[130px] sm:h-[180px] md:h-[230px] rounded-full bg-[#ff5500]/22 blur-[65px] pointer-events-none" />

        {/* Layer 2: Core Dark Blue Bloom (Positioned tightly behind "PROJECTS") */}
        <div className="animate-dark-blue-glow-appear absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[380px] md:w-[480px] h-[100px] sm:h-[140px] md:h-[180px] rounded-full bg-[#003882]/75 blur-[45px] pointer-events-none" />

        {/* Ultra-Slow 4.5s Big "PROJECTS" Display Title & Subtitle Container */}
        <div className="animate-projects-hero-appear flex flex-col items-center justify-center z-10">
          {/* Big "PROJECTS" Display Title */}
          <h1 className="text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] font-black tracking-tighter text-white font-helvetica uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] leading-none">
            PROJECTS
          </h1>

          {/* Monospace Blueprint Subtitle */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-blue-300/80 uppercase mt-6 sm:mt-8">
            LABORATORY MANUSCRIPT // FEATURED SYSTEM ARCHITECTURES
          </p>
        </div>

        {/* Scroll Down Navigation Prompt */}
        <div
          onClick={scrollToLaboratory}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-white/50 hover:text-white transition-colors cursor-pointer z-20 group"
        >
          <span className="tracking-widest uppercase text-blue-300/70 group-hover:text-blue-200">
            SCROLL DOWN TO EXPLORE LABORATORY SLITS
          </span>
          <ArrowDown size={16} className="text-blue-400 animate-bounce mt-1" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EMBEDDED LABORATORY SLITS SHOWCASE (SINGLE PAGE IN-PLACE SCROLL REVEAL) */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full bg-[#000000] overflow-hidden z-10">
        <ProjectsApp scrollProgress={scrollProgress} />
      </section>

    </div>
  );
}
