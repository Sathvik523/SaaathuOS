"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type WallpaperPreset = "sequoia" | "sonoma" | "ventura" | "capsules" | "cyber" | "obsidian" | "custom";

interface WallpaperContextType {
  wallpaper: WallpaperPreset;
  customImageUrl: string | null;
  setWallpaper: (preset: WallpaperPreset) => void;
  setCustomImageUrl: (url: string | null) => void;
}

const WallpaperContext = createContext<WallpaperContextType | null>(null);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<WallpaperPreset>("sequoia");
  const [customImageUrl, setCustomImageUrlState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWallpaper = localStorage.getItem("saathuos_wallpaper") as WallpaperPreset;
      const savedCustom = localStorage.getItem("saathuos_custom_wallpaper");
      if (savedWallpaper) setWallpaperState(savedWallpaper);
      if (savedCustom) setCustomImageUrlState(savedCustom);
    }
  }, []);

  const setWallpaper = (preset: WallpaperPreset) => {
    setWallpaperState(preset);
    if (typeof window !== "undefined") {
      localStorage.setItem("saathuos_wallpaper", preset);
    }
  };

  const setCustomImageUrl = (url: string | null) => {
    setCustomImageUrlState(url);
    if (typeof window !== "undefined") {
      if (url) localStorage.setItem("saathuos_custom_wallpaper", url);
      else localStorage.removeItem("saathuos_custom_wallpaper");
    }
  };

  return (
    <WallpaperContext.Provider
      value={{
        wallpaper,
        customImageUrl,
        setWallpaper,
        setCustomImageUrl,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
}
