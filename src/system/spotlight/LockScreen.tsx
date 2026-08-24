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

  // Liquid Glass Materialization State (Slow transition from liquid transparent -> clearly visible)
  const [isMaterialized, setIsMaterialized] = useState(false);

  useEffect(() => {
    if (!isLocked) {
      // Trigger liquid glass materialization as desktop is revealed
      const timer = setTimeout(() => {
        setIsMaterialized(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsMaterialized(false);
    }
  }, [isLocked]);

  return (
    /* Desktop Background Layer (z-10: Below application windows at z-100+) */
    <div className="absolute inset-0 z-10 select-none overflow-hidden pointer-events-none">
      
      {/* Soft Feathered Deep Blue Radial Glow (Slow Materialization) */}
      <div
        className={`absolute top-[38%] left-[18%] -translate-x-1/2 -translate-y-1/2 h-[440px] w-[440px] rounded-full bg-[#0055FF]/20 blur-[150px] pointer-events-none transition-all duration-[1400ms] ${
          isMaterialized ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      />

      {/* Middle-Left Spotlight Greeting & Search Section (Liquid Glass Materialization) */}
      <div
        className={`absolute top-[38%] left-[8%] -translate-y-1/2 flex flex-col items-start w-[300px] md:w-[330px] pointer-events-auto z-10 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMaterialized
            ? "opacity-100 scale-100 blur-0 translate-x-0"
            : "opacity-0 scale-95 blur-2xl -translate-x-4"
        }`}
      >
        {/* Personalized Greeting with 2.0s Bubble Pop-Up & Side Wobble Animation on "Heyy" */}
        <h1 className="font-sans font-extralight tracking-tight text-white/95 text-left leading-tight text-[21px] md:text-[24px] mb-2.5 drop-shadow-md">
          <span
            className={`inline-block origin-bottom-left ${
              isMaterialized ? "animate-heyy-wobble" : "opacity-0 scale-50"
            }`}
          >
            Heyy
          </span>{" "}
          <span className="font-normal text-white">{displayName}</span>, what's the plan?
        </h1>

        {/* Search Bar Container */}
        <div className="relative w-full flex flex-col items-start">
          <SpotlightSearchBar />
          {/* Floating 3D Cards Panel popping out to the RIGHT */}
          <SpotlightResultsPanel />
        </div>

        {/* Shortcut Hint */}
        <div className="mt-3.5 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9.5px] text-white/50 backdrop-blur-md">
          <Command size={9.5} />
          <span>+ Space for Spotlight</span>
        </div>
      </div>

      {/* First-time Visitor Name Modal Prompt */}
      <VisitorNameModal />
    </div>
  );
}
