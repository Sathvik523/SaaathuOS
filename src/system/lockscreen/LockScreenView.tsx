"use client";

import { useState, useCallback } from "react";
import { useSpotlight } from "@/system/spotlight/SpotlightContext";
import { ArrowRight, User } from "lucide-react";
import CursiveHelloStroke from "./CursiveHelloStroke";

export default function LockScreenView() {
  const { isLocked, visitorName, setVisitorName, unlockOS } = useSpotlight();
  const [inputName, setInputName] = useState(visitorName || "");
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Stage 1: Pure Full-Screen Animated "hello." Focus in Screen Center
  const [isHandwritingDone, setIsHandwritingDone] = useState(false);
  // Stage 2: Materialize remaining LockScreen elements AFTER "hello." shrinks in center
  const [isRestRevealed, setIsRestRevealed] = useState(false);

  const handleHandwritingComplete = useCallback(() => {
    setIsHandwritingDone(true);
    // Smoothly reveal remaining LockScreen controls as "hello." shrinks in-place
    setTimeout(() => {
      setIsRestRevealed(true);
    }, 150);
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isUnlocking) return;

    const trimmed = inputName.trim();
    setVisitorName(trimmed || "Guest");

    // Trigger 1.3s Gravitational Pull-Down Vortex Unlock Animation
    setIsUnlocking(true);
    setTimeout(() => {
      unlockOS();
      setIsUnlocking(false);
    }, 1300);
  };

  if (!isLocked && !isUnlocking) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999999] flex flex-col items-center justify-center p-6 bg-black select-none overflow-hidden transition-all duration-[1300ms] ease-in-out ${
        isUnlocking
          ? "opacity-0 backdrop-blur-none pointer-events-none"
          : "opacity-100 backdrop-blur-3xl"
      }`}
    >
      {/* Container to permanently hold "hello." and form centered in the middle of screen */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[650px] my-auto">
        
        {/* ========================================================================= */}
        {/* 1. ICONIC APPLE "hello." CENTERPIECE (PERMANENTLY CENTERED IN MIDDLE)     */}
        {/* ========================================================================= */}
        <div
          className={`relative flex flex-col items-center justify-center transform-gpu will-change-transform transition-all duration-[1800ms] ease-[cubic-bezier(0.12,1,0.22,1)] ${
            isUnlocking
              ? "translate-y-[220px] scale-[0.05] opacity-0 blur-md"
              : isHandwritingDone
              ? "scale-[0.70] opacity-100 mb-2"
              : "scale-[1.12] sm:scale-[1.30] md:scale-[1.47] opacity-100 mb-0"
          }`}
        >
          {/* Real-Time SVG Cursive Handwriting Stroke Engine */}
          <CursiveHelloStroke onComplete={handleHandwritingComplete} />

          {/* Subtitle "I'm Sathvik" with Blue Period Dot (Hidden until "hello." shrinks) */}
          <div className="relative flex flex-col items-center justify-center mt-3 w-full">
            {/* Slow Dispersed Blue Backlight */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[112px] w-[350px] sm:w-[455px] md:w-[560px] rounded-full bg-gradient-to-r from-[#0055FF]/30 via-[#007AFF]/35 to-[#38BDF8]/25 blur-[120px] md:blur-[150px] pointer-events-none transition-all duration-[1800ms] ease-out ${
                isRestRevealed && !isUnlocking
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
            />

            <h2
              className={`relative flex items-center justify-center gap-1.5 font-helvetica font-medium text-[17px] sm:text-[19px] md:text-[21px] text-white/90 tracking-wide drop-shadow-[0_4px_20px_rgba(0,122,255,0.5)] transition-all duration-1000 ease-out delay-100 ${
                isRestRevealed && !isUnlocking ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <span>I'm Sathvik</span>
              {/* Cyan/Blue Dot falling from above and landing right beside "I'm Sathvik" */}
              <span className="inline-block animate-dot-fall-instant h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_14px_#38BDF8] ml-0.5" />
            </h2>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. USER AVATAR & VISITOR INPUT FORM (HIDDEN UNTIL "hello." SHRINKS)        */}
        {/* ========================================================================= */}
        <form
          onSubmit={handleUnlock}
          className={`flex flex-col items-center mt-6 w-full max-w-[320px] transition-all duration-[1400ms] ease-[cubic-bezier(0.12,1,0.22,1)] ${
            isUnlocking
              ? "scale-[0.80] opacity-0 blur-sm"
              : isRestRevealed
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          }`}
        >
          {/* User Profile Avatar Bubble (Claymorphism + Glassmorphism Hybrid) */}
          <div
            className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white backdrop-blur-3xl transition-all duration-300 hover:scale-105 mb-2.5"
            style={{
              boxShadow: "inset 3px 3px 6px rgba(255, 255, 255, 0.25), inset -3px -3px 8px rgba(0, 0, 0, 0.6), 0 16px 36px rgba(0, 0, 0, 0.55)",
            }}
          >
            <User size={38} className="text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
          </div>

          <span className="text-xs font-semibold text-white/90 mb-2.5 tracking-tight">
            {inputName.trim() ? inputName : "SaaathuOS Visitor"}
          </span>

          {/* Input Name Field (Claymorphism + Glassmorphism Hybrid) */}
          <div
            className="relative flex w-full items-center rounded-full border border-white/20 bg-[#08090C]/60 backdrop-blur-3xl"
            style={{
              boxShadow: "inset 3px 3px 6px rgba(255, 255, 255, 0.20), inset -3px -3px 8px rgba(0, 0, 0, 0.65), 0 16px 36px rgba(0, 0, 0, 0.5)",
            }}
          >
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter your name..."
              autoFocus={isRestRevealed}
              className="w-full h-[38px] rounded-full bg-transparent px-4 pr-10 text-center text-sm font-medium text-white placeholder-white/35 focus:outline-none focus:placeholder-white/60 transition-all"
            />

            <button
              type="submit"
              aria-label="Unlock"
              className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 hover:bg-white/25 hover:border-white/40 transition-all active:scale-95 cursor-pointer shadow-sm z-10"
              style={{
                boxShadow: "inset 1px 1px 3px rgba(255, 255, 255, 0.3), inset -1px -1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              <ArrowRight size={13} />
            </button>
          </div>

          <span className="text-[10px] text-white/40 mt-2 font-medium tracking-tight">
            Press Enter to unlock SaaathuOS
          </span>
        </form>

      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM LOCK SCREEN FOOTER (HIDDEN UNTIL "hello." SHRINKS)              */}
      {/* ========================================================================= */}
      <div
        className={`absolute bottom-6 text-[10px] font-mono text-white/30 tracking-widest uppercase transition-opacity duration-1000 ${
          isRestRevealed && !isUnlocking ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        SaaathuOS v2.0 • Personal Web OS
      </div>
    </div>
  );
}
