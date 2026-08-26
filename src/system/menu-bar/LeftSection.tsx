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
    <div className="flex h-full items-center gap-3.5 select-none text-[11px] font-normal text-white/90 flex-1 pl-[14px] font-system">
      {/* 1. SaaathuOS Brand */}
      <div className="relative flex-shrink-0 flex items-center h-full">
        <button
          onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
          className="font-system font-semibold text-[12px] tracking-[-0.01em] text-white/90 hover:text-white transition-colors focus:outline-none cursor-pointer flex items-center h-full"
        >
          SaaathuOS
        </button>

        {/* System Dropdown Popover */}
        {isSystemMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsSystemMenuOpen(false)} />
            <div className="absolute top-7 left-0 z-50 w-48 rounded-xl border border-white/[0.06] bg-[#18181b]/95 p-1.5 text-[11px] text-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-120 font-system">
              <div className="px-2.5 py-1.5 border-b border-white/[0.06]">
                <p className="text-[10.5px] font-medium text-white/90">SaaathuOS 2.0</p>
                <p className="text-[9px] text-white/35 font-light">macOS Sequoia Dark Edition</p>
              </div>

              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("settings");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/80 hover:bg-[var(--accent)]/90 hover:text-white transition-colors"
                >
                  <span>About SaaathuOS</span>
                  <Laptop size={11} className="opacity-50" />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("settings");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/80 hover:bg-[var(--accent)]/90 hover:text-white transition-colors"
                >
                  <span>System Settings...</span>
                  <Settings size={11} className="opacity-50" />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    openWindow("projects");
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/80 hover:bg-[var(--accent)]/90 hover:text-white transition-colors"
                >
                  <span>App Store...</span>
                  <Sparkles size={11} className="opacity-50" />
                </button>

                <div className="my-1 border-t border-white/[0.06]" />

                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    lockOS();
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-white/80 hover:bg-[var(--accent)]/90 hover:text-white transition-colors"
                >
                  <span>Lock Screen</span>
                  <Lock size={11} className="opacity-50" />
                </button>
                <button
                  onClick={() => {
                    setIsSystemMenuOpen(false);
                    window.location.reload();
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-amber-300/80 hover:bg-amber-600/90 hover:text-white transition-colors"
                >
                  <span>Restart SaaathuOS</span>
                  <RefreshCw size={11} className="opacity-50" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 2. Calligraphic Tagline — tighter, quieter */}
      <span className="font-calligraphy text-[14px] text-white/40 tracking-normal truncate leading-none">
        I don&apos;t build, I engineer
      </span>
    </div>
  );
}
