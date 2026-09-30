"use client";

import { WindowProvider, useWindowManager } from "@/system/window-manager";
import { WallpaperProvider } from "./WallpaperContext";
import { SpotlightProvider, useSpotlight } from "@/system/spotlight/SpotlightContext";
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
import DisassemblyPortals from "./DisassemblyPortals";

// Focus mode: with a window open, everything behind it drops in brightness so the
// window is the only fully lit thing on screen. The Dock and menu bar stay a little
// brighter than the backdrop because they remain clickable.
const DIM_TRANSITION = "transition-opacity duration-500 ease-out";
const BACKDROP_DIM = "opacity-[0.34]";
const DOCK_DIM = "opacity-[0.55]";

function DesktopShellContent() {
  const {
    windows,
    isProjectsFullPageOpen,
    isConnectFullPageOpen,
    disassemblyStep,
    connectDisassemblyStep,
  } = useWindowManager();
  const { searchQuery, isFocused } = useSpotlight();

  // Desktop elements dim into complete darkness during disassembly
  const isDesktopFadingToDarkness = disassemblyStep >= 2 || connectDisassemblyStep >= 2;

  // Dim everything except the search area when user is actively typing
  const isSearchActive = isFocused && searchQuery.length > 0;

  // A window is on screen (not minimized, not on its way out) → dim the rest
  const isWindowFocusMode = windows.some((w) => !w.isMinimized && !w.isClosing);

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
          {/* Layer 0: Wallpaper (dims behind an open window / while searching) */}
          <div className={`${DIM_TRANSITION} ${isSearchActive ? "opacity-[0.15]" : isWindowFocusMode ? BACKDROP_DIM : "opacity-100"}`}>
            <Wallpaper />
          </div>

          {/* Layer 10: Middle-Left Spotlight Greeting & Search Experience */}
          <div className={`${DIM_TRANSITION} ${isWindowFocusMode ? BACKDROP_DIM : "opacity-100"}`}>
            <LockScreen />
          </div>

          {/* Layer 20: Hanging widgets — inside this layer, and before the windows, so an
              open window always sits above them and takes the clicks */}
          <div className={`${DIM_TRANSITION} ${isSearchActive ? "opacity-[0.08]" : isWindowFocusMode ? BACKDROP_DIM : "opacity-100"}`}>
            <DesktopWidgets />
          </div>

          {/* Layer 100+: Application Windows — the one thing that never dims */}
          <div className={`${DIM_TRANSITION} ${isSearchActive ? "opacity-[0.08]" : "opacity-100"}`}>
            <Desktop />
          </div>

          {/* Layer 500: Bottom macOS Dock */}
          <div className={`${DIM_TRANSITION} ${isSearchActive ? "opacity-[0.12]" : isWindowFocusMode ? DOCK_DIM : "opacity-100"}`}>
            <Dock />
          </div>
        </div>

        {/* Layer 660: Top macOS Menu Bar — kept outside the fading layer above (whose transform
            would sink it below the windows) so the bar and its dropdowns stay on top */}
        <div
          className={`relative z-30 transition-opacity ease-out ${
            isDesktopFadingToDarkness
              ? "duration-900 opacity-0 pointer-events-none"
              : `duration-500 ${isSearchActive ? "opacity-[0.12]" : isWindowFocusMode ? DOCK_DIM : "opacity-100"}`
          }`}
        >
          <MenuBar />
        </div>

        {/* Layer 650: Projects / Connect intro portals — above the windows, and outside the
            fading layer, so they stay lit while the desktop behind them goes dark */}
        <DisassemblyPortals />

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