"use client";

import { useState } from "react";
import { useWindowManager } from "@/system/window-manager";
import { useSpotlight } from "@/system/spotlight/SpotlightContext";
import { Laptop, Settings, Sparkles, RefreshCw, Lock } from "lucide-react";

export default function LeftSection() {
  const { openWindow } = useWindowManager();
  const { lockOS } = useSpotlight();
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);

  return (
    <div className="flex h-full items-center gap-4 select-none text-[11.5px] font-medium text-white flex-1 pl-[12px]">
      {/* 1. SaaathuOS Brand Trigger (15% Diminished Text) */}
      <div className="relative flex-shrink-0 flex items-center h-full">
        <button
          onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
          className="font-helvetica font-bold text-[12px] tracking-tight text-white hover:text-white/80 transition-colors focus:outline-none cursor-pointer flex items-center h-full"
        >
          SaaathuOS
        </button>

        {/* System Dropdown Popover */}
        {isSystemMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsSystemMenuOpen(false)} />
            <div className="absolute top-7 left-0 z-50 w-48 rounded-xl border border-white/15 bg-[#1C1D22]/95 p-1.5 text-[11.5px] text-white shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-120">
              <div className="px-2.5 py-1.5 border-b border-white/10">
                <p className="text-[11px] font-bold text-white">SaaathuOS 2.0</p>
                <p className="text-[9.5px] text-white/50">macOS Sequoia Dark Edition</p>
              </div>

              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("settings");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
                >
                  <span>About SaaathuOS</span>
                  <Laptop size={12} />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("settings");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
                >
                  <span>System Settings...</span>
                  <Settings size={12} />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("projects");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
                >
                  <span>App Store...</span>
                  <Sparkles size={12} />
                </button>
              </div>

              <div className="my-1 border-t border-white/10" />

              <button
                onClick={() => {
                  setIsSystemMenuOpen(false);
                  lockOS();
                }}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
              >
                <span>Lock Screen</span>
                <Lock size={12} />
              </button>

              <button
                onClick={() => {
                  setIsSystemMenuOpen(false);
                  window.location.reload();
                }}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-amber-300 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <span>Restart SaaathuOS</span>
                <RefreshCw size={12} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 2. Calligraphic Quote Line (15% Diminished Text) */}
      <div className="flex-1 flex items-center justify-start h-full">
        <span className="font-calligraphy font-bold text-[17px] md:text-[18.5px] text-white/90 tracking-wide truncate leading-none">
          I don't build, I engineer
        </span>
      </div>
    </div>
  );
}
