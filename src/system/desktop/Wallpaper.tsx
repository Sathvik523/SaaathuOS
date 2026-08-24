"use client";

import { useWallpaper } from "./WallpaperContext";

export default function Wallpaper() {
  const { wallpaper, customImageUrl } = useWallpaper();

  if (wallpaper === "custom" && customImageUrl) {
    return (
      <div className="absolute inset-0 -z-10 bg-black overflow-hidden select-none">
        <div
          className="h-full w-full bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${customImageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0A0B0E] select-none transition-all duration-300">
      {/* 1. macOS Sequoia Glow */}
      {wallpaper === "sequoia" && (
        <div className="relative h-full w-full">
          <div className="absolute top-[-10%] left-[-10%] h-[65%] w-[65%] rounded-full bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-transparent blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[75%] w-[75%] rounded-full bg-gradient-to-tl from-blue-900/40 via-violet-950/30 to-transparent blur-[150px]" />
          <div className="absolute top-[25%] right-[20%] h-[45%] w-[45%] rounded-full bg-gradient-to-tr from-cyan-900/25 via-blue-950/20 to-transparent blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0B0E]/60 to-[#050507]" />
        </div>
      )}

      {/* 2. macOS Sonoma Glow */}
      {wallpaper === "sonoma" && (
        <div className="relative h-full w-full">
          <div className="absolute top-[-15%] right-[-10%] h-[70%] w-[70%] rounded-full bg-gradient-to-bl from-amber-900/40 via-rose-950/30 to-transparent blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[65%] w-[65%] rounded-full bg-gradient-to-tr from-purple-950/40 via-indigo-950/30 to-transparent blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0B0E]/60 to-[#050507]" />
        </div>
      )}

      {/* 3. macOS Ventura Glow */}
      {wallpaper === "ventura" && (
        <div className="relative h-full w-full">
          <div className="absolute top-[-10%] left-[20%] h-[65%] w-[65%] rounded-full bg-gradient-to-b from-cyan-900/40 via-teal-950/30 to-transparent blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[10%] h-[70%] w-[70%] rounded-full bg-gradient-to-t from-blue-900/40 via-indigo-950/30 to-transparent blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0B0E]/60 to-[#050507]" />
        </div>
      )}

      {/* 4. Capsule Stripes */}
      {wallpaper === "capsules" && (
        <div className="relative flex h-full w-full items-center justify-center bg-[#0D0D0F]">
          <div className="flex items-center justify-center gap-3 w-full max-w-4xl h-[70%] px-4">
            <div className="h-full flex-1 rounded-[60px] bg-[#D84913] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#EE7B16] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#F7A61B] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#F9C958] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#ECECE1] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#BEBFB0] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#5B604E] shadow-lg" />
            <div className="h-full flex-1 rounded-[60px] bg-[#2E3135] shadow-lg" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0D0D0F]/40 to-[#070709]" />
        </div>
      )}

      {/* 5. Cyber Grid */}
      {wallpaper === "cyber" && (
        <div className="relative h-full w-full bg-[#08080C]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-indigo-600/15 blur-[130px]" />
        </div>
      )}

      {/* 6. Solid Obsidian */}
      {wallpaper === "obsidian" && (
        <div className="relative h-full w-full bg-[#070709]" />
      )}
    </div>
  );
}