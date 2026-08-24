"use client";

import { WindowProvider, useWindowManager } from "@/system/window-manager";
import { WallpaperProvider } from "./WallpaperContext";
import { SpotlightProvider } from "@/system/spotlight/SpotlightContext";
import LockScreenView from "@/system/lockscreen/LockScreenView";
import LockScreen from "@/system/spotlight/LockScreen";
import SpotlightOverlay from "@/system/spotlight/SpotlightOverlay";
import Wallpaper from "./Wallpaper";
import Desktop from "./Desktop";
import { MenuBar } from "@/system/menu-bar";
import { Dock } from "@/system/dock";
import ProjectsFullPage from "@/apps/projects/ProjectsFullPage";
import ConnectFullPage from "@/apps/connect/ConnectFullPage";
import DesktopWidgets from "./DesktopWidgets";

function DesktopShellContent() {
  const { isProjectsFullPageOpen, isConnectFullPageOpen, disassemblyStep, connectDisassemblyStep } = useWindowManager();

  // Desktop elements (wallpaper, lockscreen greeting, apps, dock, menu bar) dim into complete darkness
  const isDesktopFadingToDarkness = disassemblyStep >= 2 || connectDisassemblyStep >= 2;

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none bg-black no-scrollbar">
      {/* 1. Projects Full-Page Experience (Slow-Reveal Materialization: Blur + Opacity + Soft Upward Float over 2.8s) */}
      <div
        className={`
          fixed inset-0 h-full w-full overflow-y-auto transform-gpu transition-all duration-[2800ms] ease-[cubic-bezier(0.16,1,0.3,1)] no-scrollbar
          ${isProjectsFullPageOpen ? "z-50 opacity-100 translate-y-0 blur-none pointer-events-auto" : "z-10 opacity-0 translate-y-12 blur-xl pointer-events-none"}
        `}
      >
        <ProjectsFullPage />
      </div>

      {/* 2. Connect Full-Page Experience (Slow-Reveal Materialization: Blur + Opacity + Soft Glide over 2.8s) */}
      <div
        className={`
          fixed inset-0 h-full w-full overflow-y-auto transform-gpu transition-all duration-[2800ms] ease-[cubic-bezier(0.16,1,0.3,1)] no-scrollbar
          ${isConnectFullPageOpen ? "z-50 opacity-100 translate-x-0 blur-none pointer-events-auto" : "z-10 opacity-0 translate-x-16 blur-xl pointer-events-none"}
        `}
      >
        <ConnectFullPage />
      </div>

      {/* 3. Entire macOS Desktop Setup Container */}
      <div
        className={`
          relative h-full w-full transform-gpu
          ${isProjectsFullPageOpen || isConnectFullPageOpen ? "z-10 pointer-events-none" : "z-40 pointer-events-auto"}
        `}
      >
        {/* Layer 0-600: Background Desktop Elements (Dim into pitch black darkness on Step 2) */}
        <div
          className={`
            relative h-full w-full transform-gpu transition-opacity duration-900 ease-out
            ${isDesktopFadingToDarkness ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          {/* Layer 0: Wallpaper */}
          <Wallpaper />

          {/* Layer 10: Middle-Left Spotlight Greeting & Search Experience */}
          <LockScreen />

          {/* Layer 100+: Application Windows */}
          <Desktop />

          {/* Layer 500: Bottom macOS Dock */}
          <Dock />

          {/* Layer 600: Top macOS Menu Bar */}
          <MenuBar />
        </div>

        {/* Layer 650: Isolated Desktop Widgets */}
        <DesktopWidgets />

        {/* Layer 700: Global Spotlight Modal Overlay */}
        <SpotlightOverlay />

        {/* Layer 9999999: Dedicated macOS Sonoma Lock Screen Interface */}
        <LockScreenView />
      </div>
    </div>
  );
}

export default function DesktopShell() {
  return (
    <SpotlightProvider>
      <WallpaperProvider>
        <WindowProvider>
          <DesktopShellContent />
        </WindowProvider>
      </WallpaperProvider>
    </SpotlightProvider>
  );
}