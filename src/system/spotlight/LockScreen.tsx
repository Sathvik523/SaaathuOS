"use client";

import { useState, useEffect } from "react";
import { useSpotlight } from "./SpotlightContext";
import SpotlightSearchBar from "./SpotlightSearchBar";
import SpotlightResultsPanel from "./SpotlightResultsPanel";
import VisitorNameModal from "./VisitorNameModal";
import { Command } from "lucide-react";

export default function LockScreen() {
  const { isLocked, visitorName } = useSpotlight();
  const displayName = visitorName || "there";

  // Gentle fade-in materialization
  const [isMaterialized, setIsMaterialized] = useState(false);

  useEffect(() => {
    if (!isLocked) {
      const timer = setTimeout(() => {
        setIsMaterialized(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsMaterialized(false);
    }
  }, [isLocked]);

  return (
    /* Desktop Background Layer (z-10: Below application windows) */
    <div className="absolute inset-0 z-10 select-none overflow-hidden pointer-events-none">
      
      {/* Subtle warm ambient glow — not blue, just warm graphite light */}
      <div
        className={`absolute top-[40%] left-[20%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/[0.015] blur-[180px] pointer-events-none transition-all duration-[2000ms] ${
          isMaterialized ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      />

      {/* Greeting & Search — optically centered in upper-middle third */}
      <div
        className={`absolute top-[38%] left-[8%] -translate-y-1/2 flex flex-col items-start w-[340px] md:w-[380px] pointer-events-auto z-10 transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMaterialized
            ? "opacity-100 scale-100 blur-0 translate-y-0"
            : "opacity-0 scale-[0.98] blur-sm translate-y-3"
        }`}
      >
        {/* Editorial Greeting — larger, lighter weight, more letter-spacing */}
        <h1 className="font-system font-light tracking-[-0.02em] text-white/90 text-left leading-[1.15] text-[26px] md:text-[30px] mb-4">
          <span
            className={`inline-block origin-bottom-left ${
              isMaterialized ? "animate-heyy-wobble" : "opacity-0 scale-75"
            }`}
          >
            Heyy
          </span>{" "}
          <span className="font-normal text-white">{displayName}</span>
          <span className="text-white/50">,</span>
          <br />
          <span className="text-white/45 font-light">what&apos;s the plan?</span>
        </h1>

        {/* Search Bar Container */}
        <div className="relative w-full flex flex-col items-start">
          <SpotlightSearchBar />
          <SpotlightResultsPanel />
        </div>

        {/* Shortcut Hint — styled as subtle keycap, not a chip */}
        <div className="mt-4 flex items-center gap-1.5 text-[9px] text-white/25 font-system font-light tracking-wide">
          <kbd className="inline-flex items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[9px] text-white/30 font-light">
            <Command size={8} className="opacity-60" />
            <span>Space</span>
          </kbd>
          <span>Spotlight</span>
        </div>
      </div>

      {/* First-time Visitor Name Modal Prompt */}
      <VisitorNameModal />
    </div>
  );
}
