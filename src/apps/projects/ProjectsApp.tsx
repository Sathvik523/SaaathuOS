"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ExternalLink, ChevronUp, ChevronDown, Layers, Cpu, Code2, Database, Activity } from "lucide-react";
import GithubIcon from "@/shared/icons/GithubIcon";
import { TechIcon } from "@/shared/icons/TechIcons";
import { PROJECTS, ProjectItem } from "@/content/portfolioData";

interface ProjectsAppProps {
  scrollProgress?: number;
}

export default function ProjectsApp({ scrollProgress = 1 }: ProjectsAppProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev" | null>(null);
  const [panelOpacity, setPanelOpacity] = useState(1);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);

  const totalProjects = PROJECTS.length;

  // Check prefers-reduced-motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Synchronized Left Panel Crossfade & Card Stack Transition Engine
  const goToProject = useCallback(
    (targetIdx: number, dir: "next" | "prev" = "next") => {
      if (isTransitioning || targetIdx === activeIndex) return;

      setIsTransitioning(true);
      setTransitionDirection(dir);

      if (reducedMotion) {
        setActiveIndex(targetIdx);
        setDisplayIndex(targetIdx);
        setIsTransitioning(false);
        setTransitionDirection(null);
        return;
      }

      // 1. Crossfade out left panel text (160ms)
      setPanelOpacity(0);

      // 2. Midpoint: Update left panel text to new target project (180ms)
      setTimeout(() => {
        setDisplayIndex(targetIdx);
        setPanelOpacity(1);
      }, 180);

      // 3. Complete card stack fan animation (580ms silky spring curve)
      setTimeout(() => {
        setActiveIndex(targetIdx);
        setIsTransitioning(false);
        setTransitionDirection(null);
      }, 580);
    },
    [activeIndex, isTransitioning, reducedMotion]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % totalProjects;
    goToProject(nextIdx, "next");
  }, [activeIndex, totalProjects, goToProject]);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + totalProjects) % totalProjects;
    goToProject(prevIdx, "prev");
  }, [activeIndex, totalProjects, goToProject]);

  // Debounced Wheel / Trackpad Scroll Navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollProgress < 0.7) return;

      if (Math.abs(e.deltaY) > 18 && !wheelLockRef.current) {
        wheelLockRef.current = true;
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }

        setTimeout(() => {
          wheelLockRef.current = false;
        }, 580);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollProgress, handleNext, handlePrev]);

  // Keyboard Arrow Navigation (ArrowUp, ArrowDown, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Real-Time Touch Drag & Gesture Engine for Mobile & Touchscreens
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null || touchStartXRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartYRef.current;
    const deltaX = currentX - touchStartXRef.current;

    // Direct real-time touch feedback with elastic damping
    setTouchOffset({
      x: deltaX * 0.45,
      y: deltaY * 0.45,
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const { x: diffX, y: diffY } = touchOffset;

    // Trigger next/prev if drag distance exceeds 30px threshold
    if (diffY < -30 || diffX < -30) {
      handleNext();
    } else if (diffY > 30 || diffX > 30) {
      handlePrev();
    }

    // Elastic snap-back
    setTouchOffset({ x: 0, y: 0 });
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  };

  // Subtle Ambient Parallax Tilt on Mouse Hover across Card Stack (Max ±3.5deg)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 3.5, y: -y * 3.5 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const activeProject: ProjectItem = PROJECTS[displayIndex] || PROJECTS[0];

  /**
   * CONSTANT PER-PROJECT SIGNATURE COLOR TREATMENT:
   * - Real-time Analytics Lakehouse: Vibrant Pink + Violet Gradient Blend
   * - Autonomous AI Agent Orchestrator: Extremely Glassmorphed / Transparent Grey
   * - SaaathuOS & HyperUI: Solid Near-Black
   */
  const getProjectSignatureMaterial = (projectId: string, isFront: boolean) => {
    if (projectId === "realtime-data-lakehouse") {
      return {
        background: "linear-gradient(135deg, #7e22ce 0%, #c026d3 50%, #ec4899 100%)",
        boxShadow: isFront
          ? "0 24px 48px rgba(217, 70, 239, 0.38), 0 0 40px rgba(126, 34, 206, 0.3)"
          : "0 10px 30px rgba(0, 0, 0, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.35)",
        backdropFilter: "none",
        theme: "pink-violet",
      };
    } else if (projectId === "ai-agent-platform") {
      return {
        background: "rgba(255, 255, 255, 0.10)",
        boxShadow: isFront
          ? "0 24px 50px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
          : "0 10px 30px rgba(0, 0, 0, 0.6)",
        borderColor: "rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(24px)",
        theme: "glass-grey",
      };
    } else {
      return {
        background: "#0a0a0a",
        boxShadow: isFront
          ? "0 24px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 255, 255, 0.08)"
          : "0 10px 30px rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "none",
        theme: "solid-black",
      };
    }
  };

  /**
   * EXACT 3-CARD FANNED FINTECH STACK GEOMETRY & REAL-TIME TOUCH ENGINE:
   */
  const getCardStyleAndMaterial = (idx: number, projectId: string) => {
    const relPos = (idx - activeIndex + totalProjects) % totalProjects;

    let translateX = 0;
    let translateY = 0;
    let translateZ = 0;
    let rotateZ = -3;
    let scale = 1.0;
    let opacity = 1.0;
    let zIndex = 30;
    let isClickable = false;
    let isVisibleInStack = false;
    let slotType: "front" | "middle" | "back" | "exiting" | "hidden" = "hidden";

    if (!isTransitioning) {
      if (relPos === 0) {
        // FRONT SLIT (Bottom-Left)
        translateX = -50;
        translateY = 70;
        translateZ = 40;
        rotateZ = -5;
        scale = 1.0;
        opacity = 1.0;
        zIndex = 30;
        isClickable = true;
        isVisibleInStack = true;
        slotType = "front";
      } else if (relPos === 1) {
        // MIDDLE SLIT (Center)
        translateX = 0;
        translateY = 0;
        translateZ = 0;
        rotateZ = -2.5;
        scale = 0.96;
        opacity = 0.70;
        zIndex = 20;
        isClickable = true;
        isVisibleInStack = true;
        slotType = "middle";
      } else if (relPos === 2) {
        // BACK SLIT (Top-Right Clockwise)
        translateX = 60;
        translateY = -60;
        translateZ = -40;
        rotateZ = 7;
        scale = 0.90;
        opacity = 0.38;
        zIndex = 10;
        isClickable = true;
        isVisibleInStack = true;
        slotType = "back";
      } else {
        // HIDDEN 4TH+ QUEUED SLIT
        translateX = 120;
        translateY = -120;
        translateZ = -80;
        rotateZ = 10;
        scale = 0.80;
        opacity = 0;
        zIndex = 5;
        isClickable = false;
        isVisibleInStack = false;
        slotType = "hidden";
      }
    } else {
      // Transition Engine Mapping
      if (transitionDirection === "next") {
        if (relPos === 0) {
          // Front Slit -> Exits Down-Left
          translateX = -120;
          translateY = 140;
          translateZ = 60;
          rotateZ = -8;
          scale = 0.85;
          opacity = 0;
          zIndex = 35;
          isClickable = false;
          isVisibleInStack = true;
          slotType = "exiting";
        } else if (relPos === 1) {
          // Middle Slit -> Promotes to Front Slit
          translateX = -50;
          translateY = 70;
          translateZ = 40;
          rotateZ = -5;
          scale = 1.0;
          opacity = 1.0;
          zIndex = 30;
          isClickable = true;
          isVisibleInStack = true;
          slotType = "front";
        } else if (relPos === 2) {
          // Back Slit -> Promotes to Middle Slit
          translateX = 0;
          translateY = 0;
          translateZ = 0;
          rotateZ = -2.5;
          scale = 0.96;
          opacity = 0.70;
          zIndex = 20;
          isClickable = true;
          isVisibleInStack = true;
          slotType = "middle";
        } else if (relPos === 3 % totalProjects) {
          // Offscreen Slit -> Refills as Back Slit
          translateX = 60;
          translateY = -60;
          translateZ = -40;
          rotateZ = 7;
          scale = 0.90;
          opacity = 0.38;
          zIndex = 10;
          isClickable = false;
          isVisibleInStack = true;
          slotType = "back";
        } else {
          translateX = 120;
          translateY = -120;
          translateZ = -80;
          rotateZ = 10;
          scale = 0.80;
          opacity = 0;
          zIndex = 5;
          isClickable = false;
          isVisibleInStack = false;
          slotType = "hidden";
        }
      } else {
        // Transition Prev
        const prevTargetPos = (idx - ((activeIndex - 1 + totalProjects) % totalProjects) + totalProjects) % totalProjects;
        if (prevTargetPos === 0) {
          // Exiting Slit -> Promotes to Front Slit
          translateX = -50;
          translateY = 70;
          translateZ = 40;
          rotateZ = -5;
          scale = 1.0;
          opacity = 1.0;
          zIndex = 30;
          isClickable = true;
          isVisibleInStack = true;
          slotType = "front";
        } else if (prevTargetPos === 1) {
          // Front Slit -> Shifts to Middle Slit
          translateX = 0;
          translateY = 0;
          translateZ = 0;
          rotateZ = -2.5;
          scale = 0.96;
          opacity = 0.70;
          zIndex = 20;
          isClickable = true;
          isVisibleInStack = true;
          slotType = "middle";
        } else if (prevTargetPos === 2) {
          // Middle Slit -> Shifts to Back Slit
          translateX = 60;
          translateY = -60;
          translateZ = -40;
          rotateZ = 7;
          scale = 0.90;
          opacity = 0.38;
          zIndex = 10;
          isClickable = true;
          isVisibleInStack = true;
          slotType = "back";
        } else {
          translateX = -120;
          translateY = 140;
          translateZ = 60;
          rotateZ = -8;
          scale = 0.85;
          opacity = 0;
          zIndex = 5;
          isClickable = false;
          isVisibleInStack = false;
          slotType = "hidden";
        }
      }
    }

    // Combine Mouse Parallax Tilt & Real-Time Touch Drag Offset
    const tiltX = reducedMotion ? 0 : mouseTilt.x;
    const tiltY = reducedMotion ? 0 : mouseTilt.y;

    const dragX = isDragging ? touchOffset.x : 0;
    const dragY = isDragging ? touchOffset.y : 0;

    const finalX = translateX + tiltX * 2 + dragX;
    const finalY = translateY + tiltY * 2 + dragY;
    const finalRotateZ = rotateZ + tiltX * 0.4 + dragX * 0.05;

    const transformStr = `translate3d(${finalX}px, ${finalY}px, ${translateZ}px) rotateZ(${finalRotateZ}deg) rotateX(${tiltY * 0.4}deg) rotateY(${tiltX * 0.4}deg) scale(${scale})`;

    const isFront = slotType === "front";
    const mat = getProjectSignatureMaterial(projectId, isFront);
    const textOpacityClass = isFront ? "opacity-100" : slotType === "middle" ? "opacity-90" : "opacity-40";

    const transitionCss = reducedMotion
      ? "none"
      : isDragging
      ? "none"
      : "transform 580ms cubic-bezier(0.16, 1, 0.3, 1), opacity 580ms cubic-bezier(0.16, 1, 0.3, 1), background 580ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 580ms cubic-bezier(0.16, 1, 0.3, 1), border-color 580ms cubic-bezier(0.16, 1, 0.3, 1)";

    const transformStyle: React.CSSProperties = {
      transform: transformStr,
      opacity,
      zIndex,
      background: mat.background,
      boxShadow: mat.boxShadow,
      borderColor: mat.borderColor,
      backdropFilter: mat.backdropFilter,
      WebkitBackdropFilter: mat.backdropFilter,
      display: isVisibleInStack ? "flex" : "none",
      transition: transitionCss,
      willChange: "transform, opacity, background, box-shadow",
    };

    return { transformStyle, isClickable, slotType, textOpacityClass, isVisibleInStack, theme: mat.theme };
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex h-full w-full bg-[#000000] text-[#F9F9F9] overflow-hidden select-none font-helvetica p-4 sm:p-6 md:p-10"
    >
      {/* Seamless Dark Background Canvas */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none z-0" />

      {/* Asymmetrical Layout Grid (Left 38% Info Panel / Right 62% Card Stack Canvas) */}
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row justify-between items-stretch gap-6 md:gap-0">
        
        {/* ========================================================================= */}
        {/* LEFT-SIDE INFO PANEL (38% AREA): SYNCHRONIZED CROSSFADE CONTENT           */}
        {/* ========================================================================= */}
        <div
          style={{
            opacity: scrollProgress,
            transform: `translate3d(${(1 - scrollProgress) * -160}px, 0, 0)`,
            willChange: "transform, opacity",
          }}
          className="relative flex h-auto md:h-full w-full md:w-[38%] flex-col justify-start items-start z-20 max-w-[480px] pl-2 sm:pl-6 md:pl-12 pt-2 md:pt-6 transform-gpu"
        >
          {/* Synchronized Left Info Panel Container */}
          <div
            style={{
              opacity: panelOpacity,
              transform: `translate3d(0, ${(1 - panelOpacity) * 12}px, 0)`,
              transition: reducedMotion
                ? "none"
                : "opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="flex flex-col justify-start w-full text-left"
          >
            {/* Monospace Project Index (e.g., 03 / 04 | Category 2025) */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-white tracking-widest">
                {(displayIndex + 1).toString().padStart(2, "0")} / {totalProjects.toString().padStart(2, "0")}
              </span>
              <span className="h-3 w-[1px] bg-white/20" />
              <span className="font-mono text-[11px] text-white/50 tracking-wider">
                {activeProject.category}
              </span>
              <span className="font-mono text-[11px] text-white/70 px-2 py-0.5 rounded-full border border-white/20 bg-white/5 ml-auto">
                {activeProject.date}
              </span>
            </div>

            {/* High-Contrast Display Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-3.5 leading-tight font-helvetica">
              {activeProject.title}
            </h1>

            {/* Narrative Description Paragraph */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-3 font-normal max-w-md">
              {activeProject.longDescription || activeProject.description}
            </p>

            {/* Tech Stack Manuscript Pills */}
            <div className="mt-5 w-full">
              <span className="font-mono text-[9px] uppercase font-semibold text-white/40 tracking-widest block mb-2">
                TECH STACK MANUSCRIPT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 rounded-md border border-white/20 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono text-white/90 backdrop-blur-md hover:border-white/50 transition-colors cursor-default"
                  >
                    <TechIcon name={tech} className="h-3.5 w-3.5 flex-shrink-0 filter brightness-0 invert" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT-SIDE FANNED FINTECH CARD STACK CANVAS WITH 3D PERSPECTIVE (62% AREA) */}
        {/* ========================================================================= */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            opacity: scrollProgress,
            transform: `translate3d(0, ${(1 - scrollProgress) * 200}px, 0) scale(${0.75 + 0.25 * scrollProgress})`,
            willChange: "transform, opacity",
          }}
          className="relative flex h-[380px] sm:h-[460px] md:h-[540px] w-full md:w-[62%] items-center justify-center md:justify-end pr-0 md:pr-12 z-10 perspective-[1100px] [transform-style:preserve-3d] overflow-visible transform-gpu"
        >
          {/* Card Stack Bounding Canvas Box */}
          <div className="relative h-[340px] sm:h-[400px] md:h-[450px] w-full max-w-[460px] sm:max-w-[540px] md:max-w-[580px] flex items-center justify-center [transform-style:preserve-3d]">
            {PROJECTS.map((project, idx) => {
              const { transformStyle, isClickable, slotType, textOpacityClass, isVisibleInStack, theme } = getCardStyleAndMaterial(idx, project.id);

              if (!isVisibleInStack) return null;

              const isFront = slotType === "front";
              const isPinkViolet = theme === "pink-violet";
              const isGlassGrey = theme === "glass-grey";

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isClickable && !isFront) {
                      goToProject(idx, "next");
                    }
                  }}
                  style={transformStyle}
                  className={`
                    absolute inset-0 rounded-[24px] border p-6 sm:p-7 flex flex-col justify-between select-none transform-gpu [backface-visibility:hidden] overflow-hidden
                    ${
                      isFront
                        ? "cursor-default"
                        : "hover:border-white/40 cursor-pointer"
                    }
                  `}
                >
                  {/* Subtle Grain / Noise Overlay Texture */}
                  <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none" />

                  {/* Soft Ambient Radial Glow for Glass-Grey Slit */}
                  {isGlassGrey && (
                    <div
                      className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none z-0"
                      style={{
                        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.35) 0%, rgba(99, 102, 241, 0.20) 50%, transparent 75%)",
                        filter: "blur(35px)",
                      }}
                    />
                  )}

                  {/* Specular Surface Gloss Reflection Overlay for Pink-Violet Slit */}
                  {isPinkViolet && (
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 pointer-events-none" />
                  )}

                  {/* Header Row: Icon Badge + SLIT Manuscript Tag + Active Status Pill */}
                  <div className={`relative z-10 flex items-center justify-between border-b ${isPinkViolet ? "border-white/30" : "border-white/10"} pb-3.5 ${textOpacityClass}`}>
                    <div className="flex items-center gap-3">
                      {/* Square Icon Badge */}
                      <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border ${isPinkViolet ? "border-white/40 bg-white/25 text-white" : isGlassGrey ? "border-white/30 bg-white/15 text-white" : "border-white/20 bg-white/10 text-white"} shadow-inner backdrop-blur-md`}>
                        {idx === 0 && <Layers size={20} />}
                        {idx === 1 && <Cpu size={20} />}
                        {idx === 2 && <Database size={20} />}
                        {idx === 3 && <Code2 size={20} />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                          SLIT-0{(idx + 1)} // ANALYTICAL MANUSCRIPT
                        </span>
                        <span className={`font-mono text-[10px] sm:text-xs ${isPinkViolet ? "text-white/80" : "text-white/50"}`}>
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Top-Right Status Pill */}
                    <div className={`flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-white/90 px-2.5 sm:px-3 py-1 rounded-full border backdrop-blur-md shadow-sm ${isPinkViolet ? "bg-white/25 border-white/40 text-white" : isGlassGrey ? "bg-white/15 border-white/25 text-white" : "bg-white/10 border-white/20"}`}>
                      <Activity size={12} className={`animate-pulse ${isFront ? "text-emerald-400" : "text-emerald-400/70"}`} />
                      <span>{isFront ? "⚡ ACTIVE // ONLINE" : "PREVIEW"}</span>
                    </div>
                  </div>

                  {/* Inner Content Panel (Manuscript Motif with Corner Plus Marks) */}
                  <div className={`relative z-10 my-3 flex flex-col items-center justify-center p-5 rounded-2xl border ${isPinkViolet ? "border-white/30 bg-black/30" : isGlassGrey ? "border-white/15 bg-black/40" : "border-white/10 bg-black/80"} backdrop-blur-md overflow-hidden min-h-[160px] sm:min-h-[190px] shadow-inner text-center ${textOpacityClass}`}>
                    {/* Corner Plus Corner Marks */}
                    <div className="absolute top-2 left-2.5 font-mono text-xs text-white/40 select-none">+</div>
                    <div className="absolute top-2 right-2.5 font-mono text-xs text-white/40 select-none">+</div>
                    <div className="absolute bottom-2 left-2.5 font-mono text-xs text-white/40 select-none">+</div>
                    <div className="absolute bottom-2 right-2.5 font-mono text-xs text-white/40 select-none">+</div>

                    {/* Matrix Readouts & Centered Icons */}
                    {idx === 0 && (
                      <div className="flex flex-col items-center space-y-2.5">
                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                          [ SYSTEM MATRIX // SAAATHU_OS ]
                        </span>
                        <div className="w-48 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent my-1" />
                        <span className={`font-mono text-[10px] sm:text-xs ${isFront ? "text-white/90" : "text-white/70"}`}>
                          Z-Order Focus • Zsh Shell • Mac Dock
                        </span>
                      </div>
                    )}

                    {idx === 1 && (
                      <div className="flex flex-col items-center space-y-2.5">
                        <Cpu className={`h-7 w-7 animate-pulse mb-1 ${isPinkViolet ? "text-amber-200" : "text-indigo-400"}`} />
                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                          [ AGENTIC RUNTIME // AGY_CORE ]
                        </span>
                        <div className="w-48 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent my-1" />
                        <span className={`font-mono text-[10px] sm:text-xs ${isFront ? "text-white/90" : "text-white/70"}`}>
                          Subagent Swarms • Task Graph Engine
                        </span>
                      </div>
                    )}

                    {idx === 2 && (
                      <div className="flex flex-col items-center space-y-2.5">
                        <Database className={`h-7 w-7 mb-1 ${isPinkViolet ? "text-cyan-200" : "text-sky-400"}`} />
                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                          [ LAKEHOUSE // 50K_EVENTS/SEC ]
                        </span>
                        <div className="w-48 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent my-1" />
                        <span className={`font-mono text-[10px] sm:text-xs ${isFront ? "text-white/90" : "text-white/70"}`}>
                          BigQuery • Dataproc Spark • dbt Models
                        </span>
                      </div>
                    )}

                    {idx === 3 && (
                      <div className="flex flex-col items-center space-y-2.5">
                        <Code2 className={`h-7 w-7 mb-1 ${isPinkViolet ? "text-pink-200" : "text-pink-400"}`} />
                        <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                          [ HYPER_UI // GLASSMORPHIC ]
                        </span>
                        <div className="w-48 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent my-1" />
                        <span className={`font-mono text-[10px] sm:text-xs ${isFront ? "text-white/90" : "text-white/70"}`}>
                          40+ Primitives • Spring Motion
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Base / Bottom Project Title Overlay & Meta Row */}
                  <div className={`relative z-10 ${textOpacityClass}`}>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-helvetica">
                      {project.title}
                    </h3>
                    <div className={`flex items-center justify-start gap-2 mt-1.5 font-mono text-[10px] sm:text-xs ${isPinkViolet ? "text-white/90" : "text-white/60"}`}>
                      <span>{project.techStack[0]}</span>
                      <span>•</span>
                      <span>{project.techStack[1]}</span>
                      <span>•</span>
                      <span>{project.techStack[2] || "TypeScript"}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CONTROL BAR: SOURCE CODE + PAGINATION DOTS + CHEVRONS                */}
      {/* ========================================================================= */}
      <div
        style={{
          opacity: scrollProgress,
          transform: `translate(-50%, ${(1 - scrollProgress) * 90}px)`,
          willChange: "transform, opacity",
        }}
        className="absolute bottom-5 sm:bottom-6 left-1/2 z-40 flex items-center gap-3 sm:gap-5 rounded-2xl border border-white/20 bg-black/85 px-4 sm:px-5 py-2 sm:py-2.5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] max-w-[92vw] overflow-x-auto no-scrollbar transform-gpu"
      >
        {/* Action Pill Buttons (Source Code & Launch System) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {activeProject.githubUrl && (
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all cursor-pointer"
            >
              <GithubIcon className="h-3.5 w-3.5 fill-white" />
              <span>Source Code</span>
            </a>
          )}

          {activeProject.liveUrl && (
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-1.5 text-xs font-mono font-bold text-black shadow-[0_0_16px_rgba(255,255,255,0.25)] hover:bg-white/90 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Launch System</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Vertical Separator Divider */}
        <div className="h-5 w-[1px] bg-white/20 flex-shrink-0" />

        {/* Pagination Dots (Elongated Pill for Active Dot) */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToProject(idx, idx > activeIndex ? "next" : "prev")}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                  : "w-2 bg-white/25 hover:bg-white/50"
              }`}
              title={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

        {/* Vertical Separator Divider */}
        <div className="h-5 w-[1px] bg-white/20 flex-shrink-0" />

        {/* Up / Down Chevron Navigation Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/80 hover:bg-white/25 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Previous Card (Up)"
          >
            <ChevronUp size={15} />
          </button>
          <button
            onClick={handleNext}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/80 hover:bg-white/25 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Next Card (Down)"
          >
            <ChevronDown size={15} />
          </button>
        </div>

      </div>

    </div>
  );
}
