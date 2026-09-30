"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Palette, ExternalLink, Cloud, Database, Cpu, ArrowRight, MessageSquareCode } from "lucide-react";
import { useWindowManager } from "@/system/window-manager";

export default function DesktopWidgets() {
  const { openWindow, disassemblyStep, connectDisassemblyStep } = useWindowManager();
  const [time, setTime] = useState(0);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);

  // 60 FPS Continuous Pendulum Swinging Animation Loop
  useEffect(() => {
    let animFrame: number;
    const updateSwing = () => {
      setTime((prev) => prev + 0.025);
      animFrame = requestAnimationFrame(updateSwing);
    };
    animFrame = requestAnimationFrame(updateSwing);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Pendulum Swing Angles (Sine wave physics with phase offset)
  const angleProjects = Math.sin(time * 1.1) * 3.2; // -3.2deg to +3.2deg
  const angleGithub = Math.sin(time * 1.1 + 1.6) * 2.8; // Phase-shifted swing

  // Step 1: Disassembly step >= 1
  const isGithubVanishing = disassemblyStep >= 1 || connectDisassemblyStep >= 1;
  // Step 2: Everything else dims into pitch black darkness EXCEPT Projects/Connect portal (step >= 2)
  const isDesktopDimmed = disassemblyStep >= 2;
  const isConnectDimmed = connectDisassemblyStep >= 2;
  // Step 3: Condense step >= 3
  const isProjectsCondensing = disassemblyStep >= 3;
  const isConnectCondensing = connectDisassemblyStep >= 3;

  return (
    <>
      {/* ========================================================================= */}
      {/* 3. STANDARD TOP-RIGHT HANGING DESKTOP WIDGETS CONTAINER                  */}
      {/* ========================================================================= */}
      {/* Only the cards and the wallpaper pill take clicks: the threads hang over the
          menu bar, so the rest of this container must let clicks through to it */}
      <div className="fixed top-0 right-6 z-20 flex gap-10 select-none pointer-events-none">

        {/* PROJECTS Folder Widget */}
        <div
          style={{
            transformOrigin: "top center",
            transform: !isProjectsCondensing && !isConnectCondensing ? `rotate(${angleProjects}deg)` : undefined,
          }}
          className={`relative flex flex-col items-center cursor-pointer group transform-gpu will-change-transform ${
            isDesktopDimmed || isConnectDimmed ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Hanging Thread Line */}
          <div className="w-[1.5px] h-20 bg-gradient-to-b from-white/40 via-white/20 to-white/10 shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-700" />
          
          {/* Metallic Hanging Ring */}
          <div className="h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#0F1015] shadow-[0_0_10px_rgba(6,182,212,0.6)] -mt-1.5 z-10 transition-all duration-700" />

          {/* PROJECTS Folder Card */}
          <div
            onClick={() => openWindow("projects")}
            onMouseEnter={() => setIsProjectsHovered(true)}
            onMouseLeave={() => setIsProjectsHovered(false)}
            className={`
              relative flex h-28 w-48 flex-col justify-between p-3.5 text-white transition-all duration-700 -mt-1 z-10 rounded-2xl border bg-[#12131A]/90 backdrop-blur-3xl
              ${isDesktopDimmed || isConnectDimmed ? "pointer-events-none" : "pointer-events-auto"}
              ${
                isProjectsHovered
                  ? "border-cyan-400 shadow-[0_0_45px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/50 scale-105"
                  : "border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_45px_rgba(6,182,212,0.45)]"
              }
            `}
          >
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-extrabold tracking-widest text-cyan-400 uppercase shadow-sm">
                  PROJECTS
                </span>
                <span className="rounded-full bg-cyan-400/20 px-1.5 py-0.5 text-[8px] font-bold text-cyan-300">
                  FOLDER
                </span>
              </div>
              <FolderKanban size={16} className="text-cyan-300" />
            </div>

            <div className="relative z-10 flex flex-col">
              <span className="text-[14px] font-bold text-white tracking-tight">
                Featured Work
              </span>
              <span className="text-[10px] font-medium text-cyan-200/70 mt-0.5">
                {isProjectsHovered ? "Any of these opens the projects" : "Click to open my projects"}
              </span>
            </div>

            {/* Vertically Aligned Glassmorphic Bubbles */}
            <div
              className={`
                absolute right-[calc(100%+10px)] top-0 h-full flex flex-col justify-between py-0.5 z-30
                ${isProjectsHovered && !isGithubVanishing ? "pointer-events-auto" : "pointer-events-none"}
              `}
            >
              {/* Bubble 1: Circular Glassmorphic Cloud */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow("projects");
                }}
                title="Cloud Architecture Projects"
                style={{
                  transition: "all 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms",
                  transform: isProjectsHovered && !isGithubVanishing ? "scale(1) translateX(0)" : "scale(0.2) translateX(24px)",
                  opacity: isProjectsHovered && !isGithubVanishing ? 1 : 0,
                }}
                className="group/b flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-sky-300/60 bg-sky-500/25 backdrop-blur-3xl shadow-[0_4px_16px_rgba(56,189,248,0.4)] shadow-inner hover:scale-125 hover:border-sky-200 hover:shadow-[0_0_20px_rgba(56,189,248,0.7)] cursor-pointer"
              >
                <Cloud size={12} className="text-sky-200 drop-shadow-[0_0_6px_rgba(56,189,248,0.9)]" />
              </div>

              {/* Bubble 2: Circular Glassmorphic Database */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow("projects");
                }}
                title="Database & Data Systems"
                style={{
                  transition: "all 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 60ms",
                  transform: isProjectsHovered && !isGithubVanishing ? "scale(1) translateX(0)" : "scale(0.2) translateX(24px)",
                  opacity: isProjectsHovered && !isGithubVanishing ? 1 : 0,
                }}
                className="group/b flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-purple-300/60 bg-purple-500/25 backdrop-blur-3xl shadow-[0_4px_16px_rgba(192,132,252,0.4)] shadow-inner hover:scale-125 hover:border-purple-200 hover:shadow-[0_0_20px_rgba(192,132,252,0.7)] cursor-pointer"
              >
                <Database size={12} className="text-purple-200 drop-shadow-[0_0_6px_rgba(192,132,252,0.9)]" />
              </div>

              {/* Bubble 3: Circular Glassmorphic DevOps */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow("projects");
                }}
                title="DevOps & CI/CD Pipelines"
                style={{
                  transition: "all 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms",
                  transform: isProjectsHovered && !isGithubVanishing ? "scale(1) translateX(0)" : "scale(0.2) translateX(24px)",
                  opacity: isProjectsHovered && !isGithubVanishing ? 1 : 0,
                }}
                className="group/b flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-rose-300/60 bg-rose-500/25 backdrop-blur-3xl shadow-[0_4px_16px_rgba(251,113,133,0.4)] shadow-inner hover:scale-125 hover:border-rose-200 hover:shadow-[0_0_20px_rgba(251,113,133,0.7)] cursor-pointer"
              >
                <Cpu size={12} className="text-rose-200 drop-shadow-[0_0_6px_rgba(251,113,133,0.9)]" />
              </div>

              {/* Bubble 4: Tiny Circular "more" Button */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow("projects");
                }}
                title="Explore All Domains"
                style={{
                  transition: "all 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 180ms",
                  transform: isProjectsHovered && !isGithubVanishing ? "scale(1) translateX(0)" : "scale(0.2) translateX(24px)",
                  opacity: isProjectsHovered && !isGithubVanishing ? 1 : 0,
                }}
                className="group/b flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/25 backdrop-blur-3xl shadow-[0_4px_16px_rgba(255,255,255,0.4)] shadow-inner hover:scale-125 hover:border-white hover:bg-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] cursor-pointer"
              >
                <ArrowRight size={11} className="text-white transition-transform group-hover/b:translate-x-0.5" />
              </div>

            </div>
          </div>
        </div>

        {/* 2. "Connect with me" Widget (Formerly GitHub Widget) */}
        <div
          style={{
            transformOrigin: "top center",
            transform: !isGithubVanishing ? `rotate(${angleGithub}deg)` : undefined,
          }}
          className={`flex flex-col items-center cursor-pointer group transform-gpu will-change-transform ${
            isGithubVanishing ? "animate-github-stretch-fly" : ""
          }`}
        >
          {/* Hanging Thread Line */}
          <div className="w-[1.5px] h-28 bg-gradient-to-b from-white/40 via-white/20 to-white/10 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          
          {/* Metallic Hanging Ring */}
          <div className="h-3 w-3 rounded-full border-2 border-indigo-400 bg-[#0F1015] shadow-[0_0_10px_rgba(129,140,248,0.6)] -mt-1.5 z-10" />

          {/* Connect Card (Square Shape - Opens Connect page overlay from the right) */}
          <div
            onClick={() => openWindow("connect")}
            className="relative flex h-36 w-36 flex-col justify-between rounded-2xl pointer-events-auto border border-indigo-500/20 bg-[#14151D]/90 p-3.5 text-white shadow-[0_0_30px_rgba(129,140,248,0.15)] backdrop-blur-3xl transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_40px_rgba(129,140,248,0.3)] -mt-1"
          >
            <div className="flex items-center justify-between">
              <MessageSquareCode className="h-7 w-7 text-indigo-400" />
              <ExternalLink size={14} className="text-white/50" />
            </div>

            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white tracking-tight">
                Connect with me
              </span>
              <span className="text-[10px] font-mono text-indigo-300/80 mt-0.5">
                @Sathvik523
              </span>
              <span className="text-[9px] text-white/40 mt-1">
                Email, GitHub & a message to me
              </span>
            </div>
          </div>
        </div>

        {/* Floating Wallpaper Switcher Pill */}
        <div
          className={`
            absolute top-80 right-0 transition-all duration-700
            ${isGithubVanishing ? "opacity-0 -translate-y-12 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"}
          `}
        >
          <button
            onClick={() => openWindow("settings")}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-[#1C1D22]/85 px-3 py-1.5 text-xs font-semibold text-white/90 shadow-xl backdrop-blur-2xl transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
          >
            <Palette size={14} className="text-[#007AFF]" />
            <span>Change Wallpaper</span>
          </button>
        </div>
      </div>
    </>
  );
}
