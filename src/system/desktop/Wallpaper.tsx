"use client";

import { useWallpaper } from "./WallpaperContext";

// Tailwind v4 palette values used by the ambient glows
const PALETTE = {
  "slate-800": "27.9% 0.041 260.031",
  "slate-950": "12.9% 0.042 264.695",
  "amber-950": "27.9% 0.077 45.635",
  "rose-950": "27.1% 0.105 12.094",
  "purple-950": "29.1% 0.149 302.717",
  "indigo-900": "35.9% 0.144 278.697",
  "indigo-950": "25.7% 0.09 281.288",
  "cyan-900": "39.8% 0.07 227.392",
  "cyan-950": "30.2% 0.056 229.695",
  "teal-950": "27.7% 0.046 192.524",
  "blue-950": "28.2% 0.091 267.935",
};

const tw = (color: keyof typeof PALETTE, alpha: number) => `oklch(${PALETTE[color]} / ${alpha})`;

// Soft ambient glow drawn as a radial gradient. These used to be shapes under
// blur(150–180px), which Chrome renders as blocky, stepped rings on a dark canvas.
function Glow({ className, from, via, at = "50% 50%" }: { className: string; from: string; via: string; at?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ background: `radial-gradient(ellipse at ${at}, ${from} 0%, ${via} 35%, transparent 70%)` }}
    />
  );
}

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
          <Glow className="top-[calc(-15%-160px)] left-[calc(-5%-160px)] h-[calc(65%+320px)] w-[calc(65%+320px)]" at="35% 35%" from={tw("indigo-950", 0.25)} via={tw("purple-950", 0.12)} />
          <Glow className="bottom-[calc(-15%-180px)] right-[calc(-5%-180px)] h-[calc(70%+360px)] w-[calc(70%+360px)]" at="65% 65%" from={tw("slate-800", 0.15)} via={tw("slate-950", 0.1)} />
        </div>
      )}

      {/* 2. macOS Sonoma — warm amber/rose ambient */}
      {wallpaper === "sonoma" && (
        <div className="relative h-full w-full">
          <Glow className="top-[calc(-15%-160px)] right-[calc(-5%-160px)] h-[calc(65%+320px)] w-[calc(65%+320px)]" at="65% 35%" from={tw("amber-950", 0.18)} via={tw("rose-950", 0.1)} />
          <Glow className="bottom-[calc(-10%-150px)] left-[calc(-5%-150px)] h-[calc(60%+300px)] w-[calc(60%+300px)]" at="35% 65%" from={tw("purple-950", 0.18)} via={tw("indigo-950", 0.1)} />
        </div>
      )}

      {/* 3. macOS Ventura — cool teal ambient */}
      {wallpaper === "ventura" && (
        <div className="relative h-full w-full">
          <Glow className="top-[calc(-10%-150px)] left-[calc(15%-150px)] h-[calc(60%+300px)] w-[calc(60%+300px)]" at="50% 35%" from={tw("cyan-950", 0.18)} via={tw("teal-950", 0.1)} />
          <Glow className="bottom-[calc(-10%-160px)] right-[calc(10%-160px)] h-[calc(65%+320px)] w-[calc(65%+320px)]" at="50% 65%" from={tw("blue-950", 0.18)} via={tw("indigo-950", 0.1)} />
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
          <Glow className="top-[calc(33.333%-180px)] left-[calc(33.333%-180px)] h-[744px] w-[744px]" from={tw("cyan-900", 0.1)} via={tw("cyan-900", 0.05)} />
          <Glow className="bottom-[calc(25%-160px)] right-[calc(25%-160px)] h-[640px] w-[640px]" from={tw("indigo-900", 0.08)} via={tw("indigo-900", 0.04)} />
        </div>
      )}

      {/* 6. Solid Obsidian */}
      {wallpaper === "obsidian" && (
        <div className="relative h-full w-full bg-[#0c0c0e]" />
      )}
    </div>
  );
}