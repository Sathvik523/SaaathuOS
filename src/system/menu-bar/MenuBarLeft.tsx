"use client";

import { useState } from "react";
import { useWindowManager } from "@/system/window-manager";
import { Laptop, Settings, Sparkles, RefreshCw } from "lucide-react";

export default function MenuBarLeft() {
  const { openWindow } = useWindowManager();
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-6 select-none text-[13px] font-medium text-white flex-1">
      {/* 1. SaaathuOS Brand Trigger (Clean Helvetica, No Box) */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
          className="font-helvetica font-bold text-[14px] tracking-tight text-white hover:text-white/80 transition-colors focus:outline-none cursor-pointer"
        >
          SaaathuOS
        </button>

        {/* System Dropdown Popover */}
        {isSystemMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsSystemMenuOpen(false)} />
            <div className="absolute top-7 left-0 z-50 w-52 rounded-xl border border-white/15 bg-[#1C1D22]/95 p-1.5 text-[13px] text-white shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-120">
              <div className="px-3 py-2 border-b border-white/10">
                <p className="text-[12px] font-bold text-white">SaaathuOS 2.0</p>
                <p className="text-[10px] text-white/50">macOS Sequoia Dark Edition</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("settings");
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
                >
                  <span>About SaaathuOS</span>
                  <Laptop size={14} />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("settings");
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
                >
                  <span>System Settings...</span>
                  <Settings size={14} />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("projects");
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-white/90 hover:bg-[#007AFF] hover:text-white transition-colors"
                >
                  <span>App Store...</span>
                  <Sparkles size={14} />
                </button>
              </div>

              <div className="my-1 border-t border-white/10" />

              <button
                onClick={() => {
                  setIsSystemMenuOpen(false);
                  window.location.reload();
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-amber-300 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <span>Restart SaaathuOS</span>
                <RefreshCw size={14} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 2. Calligraphic Quote Line (Clean, No Box, Occupies Larger Space) */}
      <div className="flex-1 flex items-center justify-start pl-2">
        <span className="font-calligraphy font-bold text-[22px] md:text-[24px] text-white/90 tracking-wide truncate">
          I don't build, I engineer
        </span>
      </div>
    </div>
  );
}