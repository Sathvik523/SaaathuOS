"use client";

import { useSpotlight } from "./SpotlightContext";
import SpotlightSearchBar from "./SpotlightSearchBar";
import SpotlightResultsPanel from "./SpotlightResultsPanel";

export default function SpotlightOverlay() {
  const { isSpotlightOpen, isLocked, toggleSpotlight } = useSpotlight();

  if (isLocked || !isSpotlightOpen) return null;

  return (
    <div className="fixed inset-0 z-[99990] flex flex-col items-center pt-[18vh] bg-black/40 backdrop-blur-[20px] animate-in fade-in zoom-in-[0.98] duration-150 select-none">
      <div className="fixed inset-0" onClick={() => toggleSpotlight(false)} />
      <div className="relative z-10 flex w-full max-w-[780px] flex-col items-center px-4">
        <SpotlightSearchBar />
        <SpotlightResultsPanel onClose={() => toggleSpotlight(false)} />
      </div>
    </div>
  );
}
