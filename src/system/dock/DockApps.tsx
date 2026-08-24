"use client";

import { useEffect, useRef, useState } from "react";
import DockItem from "./DockItem";
import { useWindowManager } from "@/system/window-manager";
import {
  FinderIcon,
  FolderIcon,
  NotesIcon,
  PhotosIcon,
  SettingsIcon,
  TrashIcon,
  VSCodeIcon,
} from "@/shared/icons/MacIcons";

interface DockAppConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const DOCK_APPS: DockAppConfig[] = [
  { id: "explorer", label: "Finder", icon: FinderIcon },
  { id: "projects", label: "VS Code", icon: VSCodeIcon },
  { id: "terminal", label: "Notes", icon: NotesIcon },
  { id: "photos", label: "Photos", icon: PhotosIcon },
  { id: "settings", label: "System Settings", icon: SettingsIcon },
  { id: "folder", label: "Portfolio Documents", icon: FolderIcon },
  { id: "trash", label: "Trash", icon: TrashIcon },
];

// Custom Spreading & 3D Flight Parameters for each Dock icon
const DOCK_SPREAD_FLY_PARAMS = [
  { spreadX: "-140px", flyX: "-680px", flyRot: "-140deg", flyScale: "0.3" },
  { spreadX: "-90px", flyX: "580px", flyRot: "160deg", flyScale: "0.4" },
  { spreadX: "-45px", flyX: "-390px", flyRot: "-110deg", flyScale: "0.35" },
  { spreadX: "0px", flyX: "750px", flyRot: "210deg", flyScale: "0.5" },
  { spreadX: "45px", flyX: "-820px", flyRot: "-240deg", flyScale: "0.3" },
  { spreadX: "90px", flyX: "360px", flyRot: "120deg", flyScale: "0.45" },
  { spreadX: "140px", flyX: "-260px", flyRot: "-180deg", flyScale: "0.4" },
];

export default function DockApps() {
  const { windows, openWindow, toggleMinimizeWindow, disassemblyStep } = useWindowManager();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [scales, setScales] = useState<number[]>(DOCK_APPS.map(() => 1));

  const currentScalesRef = useRef<number[]>(DOCK_APPS.map(() => 1));
  const velocityRef = useRef<number[]>(DOCK_APPS.map(() => 0));
  const targetScalesRef = useRef<number[]>(DOCK_APPS.map(() => 1));
  const animFrameRef = useRef<number | null>(null);

  // Step 2: Dock icons spread out, vibrate intensely, then take off in random directions (disassemblyStep >= 2)
  const isDockFlying = disassemblyStep >= 2;

  // Precise macOS Cosine Dock Magnification Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDockFlying) return;
    const mouseX = e.clientX;
    const maxDistance = 140; // Pixel radius of influence
    const maxScale = 0.55;  // 1.55x peak magnification scale

    const newTargets = DOCK_APPS.map((_, index) => {
      const el = itemRefs.current[index];
      if (!el) return 1;

      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);

      if (distance < maxDistance) {
        // Continuous Cosine Interpolation Curve
        const cosVal = 0.5 + 0.5 * Math.cos((Math.PI * distance) / maxDistance);
        return 1 + maxScale * cosVal;
      }
      return 1;
    });

    targetScalesRef.current = newTargets;
  };

  const handleMouseLeave = () => {
    targetScalesRef.current = DOCK_APPS.map(() => 1);
  };

  // 60 FPS Spring Physics Animation Loop
  useEffect(() => {
    const stiffness = 0.20;
    const damping = 0.75;

    const updatePhysics = () => {
      let isAnimating = false;

      const nextScales = currentScalesRef.current.map((current, i) => {
        const target = targetScalesRef.current[i];
        const force = (target - current) * stiffness;
        velocityRef.current[i] = (velocityRef.current[i] + force) * damping;
        const next = current + velocityRef.current[i];

        if (Math.abs(velocityRef.current[i]) > 0.0005 || Math.abs(target - next) > 0.0005) {
          isAnimating = true;
        }
        return next;
      });

      currentScalesRef.current = nextScales;
      setScales([...nextScales]);

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-end px-3 py-1 origin-bottom gap-1 perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {DOCK_APPS.map((app, index) => {
        const windowInstance = windows.find((w) => w.applicationId === app.id);
        const isOpen = !!windowInstance;
        const isActive = isOpen && windowInstance.isActive && !windowInstance.isMinimized;
        const isMinimized = isOpen && windowInstance.isMinimized;
        const scale = scales[index] || 1;
        const params = DOCK_SPREAD_FLY_PARAMS[index] || {
          spreadX: "0px",
          flyX: "0px",
          flyRot: "0deg",
          flyScale: "0.5",
        };

        return (
          <div
            key={app.id}
            style={
              isDockFlying
                ? ({
                    "--spread-x": params.spreadX,
                    "--fly-x": params.flyX,
                    "--fly-rot": params.flyRot,
                    "--fly-scale": params.flyScale,
                  } as React.CSSProperties)
                : {}
            }
            className={isDockFlying ? "animate-dock-spread-vibrate-fly" : ""}
          >
            <DockItem
              ref={(el) => { itemRefs.current[index] = el; }}
              icon={app.icon}
              label={app.label}
              scale={scale}
              badge={app.badge}
              isOpen={isOpen}
              isActive={isActive}
              isMinimized={isMinimized}
              onClick={() => {
                if (app.id === "trash" || app.id === "folder") {
                  openWindow("explorer");
                  return;
                }
                if (!isOpen) {
                  openWindow(app.id);
                } else {
                  toggleMinimizeWindow(windowInstance.id);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}