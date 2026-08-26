"use client";

import { useWallpaper } from "./WallpaperContext";

export default function Wallpaper() {
  const { wallpaper, customImageUrl } = useWallpaper();

  if (wallpaper === "custom" && customImageUrl) {
    return (
      <div className="absolute inset-0 -z-10 bg-[#0c0c0e] overflow-hidden select-none">
        <div
          className="h-full w-full bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${customImageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0c0c0e] select-none transition-all duration-700">
      {/* Soft radial vignette — warm graphite center fading to near-black edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(20,20,24,0.6)_0%,rgba(12,12,14,1)_70%,rgba(6,6,8,1)_100%)] pointer-events-none" />

      {/* 1. macOS Sequoia — muted indigo/purple ambient */}
      {wallpaper === "sequoia" && (
        <div className="relative h-full w-full">
          <div className="absolute top-[-15%] left-[-5%] h-[65%] w-[65%] rounded-full bg-gradient-to-br from-indigo-950/25 via-purple-950/12 to-transparent blur-[160px]" />
          <div className="absolute bottom-[-15%] right-[-5%] h-[70%] w-[70%] rounded-full bg-gradient-to-tl from-slate-800/15 via-slate-950/10 to-transparent blur-[180px]" />
        </div>
      )}

      {/* 2. macOS Sonoma — warm amber/rose ambient */}
      {wallpaper === "sonoma" && (
        <div className="relative h-full w-full">
          <div className="absolute top-[-15%] right-[-5%] h-[65%] w-[65%] rounded-full bg-gradient-to-bl from-amber-950/18 via-rose-950/10 to-transparent blur-[160px]" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[60%] w-[60%] rounded-full bg-gradient-to-tr from-purple-950/18 via-indigo-950/10 to-transparent blur-[150px]" />
        </div>
      )}

      {/* 3. macOS Ventura — cool teal ambient */}
      {wallpaper === "ventura" && (
        <div className="relative h-full w-full">
          <div className="absolute top-[-10%] left-[15%] h-[60%] w-[60%] rounded-full bg-gradient-to-b from-cyan-950/18 via-teal-950/10 to-transparent blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[10%] h-[65%] w-[65%] rounded-full bg-gradient-to-t from-blue-950/18 via-indigo-950/10 to-transparent blur-[160px]" />
        </div>
      )}

      {/* 4. Capsule Stripes — muted, receded */}
      {wallpaper === "capsules" && (
        <div className="relative flex h-full w-full items-center justify-center bg-[#0c0c0e]">
          <div className="flex items-center justify-center gap-3 w-full max-w-4xl h-[70%] px-4 opacity-25">
            <div className="h-full flex-1 rounded-[60px] bg-[#D84913]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#EE7B16]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#F7A61B]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#F9C958]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#ECECE1]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#BEBFB0]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#5B604E]" />
            <div className="h-full flex-1 rounded-[60px] bg-[#2E3135]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0c0c0e]/70 to-[#060608]" />
        </div>
      )}

      {/* 5. Cyber Grid — faded to near-invisible texture */}
      {wallpaper === "cyber" && (
        <div className="relative h-full w-full bg-[#0c0c0e]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-cyan-900/10 blur-[180px]" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-indigo-900/8 blur-[160px]" />
        </div>
      )}

      {/* 6. Solid Obsidian */}
      {wallpaper === "obsidian" && (
        <div className="relative h-full w-full bg-[#0c0c0e]" />
      )}
    </div>
  );
}