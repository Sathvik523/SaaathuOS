"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Palette, ExternalLink, Cloud, Database, Cpu, ArrowRight, MessageSquareCode } from "lucide-react";
import { useWindowManager } from "@/system/window-manager";
import { USER_PROFILE } from "@/content/portfolioData";

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
      {/* 1. FULL-SCREEN DEAD-CENTER PORTAL OVERLAY FOR PROJECTS (STEP 2+)          */}
      {/* ========================================================================= */}
      {isDesktopDimmed && (
        <div className="fixed inset-0 z-[650] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="relative flex flex-col items-center justify-center animate-projects-condense transform-gpu">
            
            {/* 5 CONCENTRIC DOTTED CIRCULAR LAYERS WITH ULTRA-SMOOTH OUTWARD RADIAL WAVE PROPAGATION */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              
              {/* Shockwave Expanding Aura Past Ring 5 */}
              <div className="absolute h-[380px] w-[380px] rounded-full border border-cyan-400/40 bg-cyan-500/10 blur-xl animate-radial-wave-aura-5 pointer-events-none" />
              
              {/* Extremely Soft Submerged Ambient Glow */}
              <div className="absolute h-[240px] w-[240px] rounded-full bg-cyan-500/10 blur-3xl opacity-20 pointer-events-none" />

              {/* Layer 1 (Inner Ring 100px): Wave Stage 1 */}
              <div className="absolute animate-radial-wave-1">
                <svg className="w-[210px] h-[210px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 210 210">
                  <circle cx="105" cy="105" r="100" fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeDasharray="3 18" opacity="0.85" />
                </svg>
              </div>

              {/* Layer 2 (Inner-Mid Ring 145px): Wave Stage 2 */}
              <div className="absolute animate-radial-wave-2">
                <svg className="w-[300px] h-[300px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 300 300">
                  <circle cx="150" cy="150" r="145" fill="none" stroke="#38bdf8" strokeWidth="2.8" strokeDasharray="3 22" opacity="0.75" />
                </svg>
              </div>

              {/* Layer 3 (Center-Mid Ring 190px): Wave Stage 3 */}
              <div className="absolute animate-radial-wave-3">
                <svg className="w-[390px] h-[390px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 390 390">
                  <circle cx="195" cy="195" r="190" fill="none" stroke="#38bdf8" strokeWidth="2.6" strokeDasharray="3 24" opacity="0.65" />
                </svg>
              </div>

              {/* Layer 4 (Outer-Mid Ring 240px): Wave Stage 4 */}
              <div className="absolute animate-radial-wave-4">
                <svg className="w-[490px] h-[490px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 490 490">
                  <circle cx="245" cy="245" r="240" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="3 28" opacity="0.55" />
                </svg>
              </div>

              {/* Layer 5 (Outer Ring 295px): Wave Stage 5 */}
              <div className="absolute animate-radial-wave-5">
                <svg className="w-[600px] h-[600px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 600 600">
                  <circle cx="300" cy="300" r="295" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="3 32" opacity="0.45" />
                </svg>
              </div>
            </div>

            {/* Stretched Lowercase Helvetica "taking you in.." Headline */}
            <span className="relative z-10 inline-block font-helvetica text-2xl sm:text-3xl md:text-4xl font-medium text-white/95 lowercase scale-x-[1.25] transform-gpu drop-shadow-[0_2px_20px_rgba(56,189,248,0.5)] tracking-normal">
              taking you in..
            </span>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FULL-SCREEN DEAD-CENTER PORTAL OVERLAY FOR CONNECT (CONNECT STEP 2+)   */}
      {/* ========================================================================= */}
      {isConnectDimmed && (
        <div className="fixed inset-0 z-[650] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="relative flex flex-col items-center justify-center animate-connect-condense transform-gpu">
            
            {/* 5 CONCENTRIC INDIGO/CYAN SVG DOTTED CIRCULAR LAYERS WITH OUTWARD RADIAL WAVE PROPAGATION */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              
              {/* Shockwave Expanding Aura Past Ring 5 */}
              <div className="absolute h-[400px] w-[400px] rounded-full border border-indigo-400/40 bg-indigo-500/10 blur-xl animate-radial-wave-aura-5 pointer-events-none" />

              {/* Extremely Soft Submerged Indigo Ambient Glow */}
              <div className="absolute h-[260px] w-[260px] rounded-full bg-indigo-500/15 blur-3xl opacity-20 pointer-events-none" />

              {/* Layer 1 (Inner Ring 105px): Wave Stage 1 */}
              <div className="absolute animate-radial-wave-1">
                <svg className="w-[220px] h-[220px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="105" fill="none" stroke="#818cf8" strokeWidth="3.2" strokeDasharray="3 18" opacity="0.85" />
                </svg>
              </div>

              {/* Layer 2 (Inner-Mid Ring 155px): Wave Stage 2 */}
              <div className="absolute animate-radial-wave-2">
                <svg className="w-[320px] h-[320px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 320 320">
                  <circle cx="160" cy="160" r="155" fill="none" stroke="#6366f1" strokeWidth="2.8" strokeDasharray="3 22" opacity="0.75" />
                </svg>
              </div>

              {/* Layer 3 (Center-Mid Ring 205px): Wave Stage 3 */}
              <div className="absolute animate-radial-wave-3">
                <svg className="w-[420px] h-[420px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 420 420">
                  <circle cx="210" cy="210" r="205" fill="none" stroke="#4f46e5" strokeWidth="2.6" strokeDasharray="3 26" opacity="0.65" />
                </svg>
              </div>

              {/* Layer 4 (Outer-Mid Ring 260px): Wave Stage 4 */}
              <div className="absolute animate-radial-wave-4">
                <svg className="w-[530px] h-[530px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 530 530">
                  <circle cx="265" cy="265" r="260" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="3 30" opacity="0.55" />
                </svg>
              </div>

              {/* Layer 5 (Outer Ring 320px): Wave Stage 5 */}
              <div className="absolute animate-radial-wave-5">
                <svg className="w-[650px] h-[650px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 650 650">
                  <circle cx="325" cy="325" r="320" fill="none" stroke="#0ea5e9" strokeWidth="2.2" strokeDasharray="3 34" opacity="0.45" />
                </svg>
              </div>
            </div>

            {/* Headline: "gathering the sockets for you to connect" in Helvetica with "connect" in Indigo */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 max-w-xl text-center px-4 font-helvetica text-2xl sm:text-3xl md:text-4xl font-medium text-white/95 lowercase scale-x-[1.12] transform-gpu drop-shadow-[0_2px_22px_rgba(129,140,248,0.5)] tracking-normal">
              <span>gathering the sockets for you to</span>
              <span className="text-indigo-400 font-bold drop-shadow-[0_0_20px_rgba(129,140,248,0.9)]">
                connect
              </span>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STANDARD TOP-RIGHT HANGING DESKTOP WIDGETS CONTAINER                  */}
      {/* ========================================================================= */}
      <div className="fixed top-0 right-6 z-20 flex gap-10 select-none pointer-events-auto">
        
        {/* PROJECTS Folder Widget */}
        <div
          style={{
            transformOrigin: "top center",
            transform: !isProjectsCondensing && !isConnectCondensing ? `rotate(${angleProjects}deg)` : undefined,
          }}
          onMouseEnter={() => setIsProjectsHovered(true)}
          onMouseLeave={() => setIsProjectsHovered(false)}
          className={`relative flex flex-col items-center cursor-pointer group transform-gpu will-change-transform ${
            isDesktopDimmed || isConnectDimmed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          {/* Hanging Thread Line */}
          <div className="w-[1.5px] h-20 bg-gradient-to-b from-white/40 via-white/20 to-white/10 shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-700" />
          
          {/* Metallic Hanging Ring */}
          <div className="h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#0F1015] shadow-[0_0_10px_rgba(6,182,212,0.6)] -mt-1.5 z-10 transition-all duration-700" />

          {/* PROJECTS Folder Card */}
          <div
            onClick={() => openWindow("projects")}
            className={`
              relative flex h-28 w-48 flex-col justify-between p-3.5 text-white transition-all duration-700 -mt-1 z-10 rounded-2xl border bg-[#12131A]/90 backdrop-blur-3xl
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
                {isProjectsHovered ? "Hovering • Sub-stacks Pop Out" : "Hover to Reveal Glass Bubbles"}
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
            className="relative flex h-36 w-36 flex-col justify-between rounded-2xl border border-indigo-500/20 bg-[#14151D]/90 p-3.5 text-white shadow-[0_0_30px_rgba(129,140,248,0.15)] backdrop-blur-3xl transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_40px_rgba(129,140,248,0.3)] -mt-1"
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
                Socials & Direct Socket
              </span>
            </div>
          </div>
        </div>

        {/* Floating Wallpaper Switcher Pill */}
        <div
          className={`
            absolute top-80 right-0 transition-all duration-700
            ${isGithubVanishing ? "opacity-0 -translate-y-12 pointer-events-none" : "opacity-100 translate-y-0"}
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
