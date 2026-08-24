"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Folder,
  Code2,
  FileText,
  Image,
  Settings,
  Lock,
  Palette,
  Download,
  Mail,
  FolderKanban,
  FileCode,
  Cpu,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { SEARCH_INDEX, SearchResultItem } from "./searchIndex";
import { useSpotlight } from "./SpotlightContext";
import { useWindowManager } from "@/system/window-manager";
import { useWallpaper } from "@/system/desktop/WallpaperContext";

interface Props {
  onClose?: () => void;
}

// 5 Organic Spatial Slots (Shifted Downwards relative to Search Bar with 20% expanded occupancy area)
const ORGANIC_RIGHT_SLOTS = [
  { id: 0, x: 180, y: 50, width: 220, height: 72, scale: 1.0, opacity: 1.0, phase: 0 },         // Rank 1: Primary Match (Closest, darkest/most intense thread)
  { id: 1, x: 460, y: 10, width: 195, height: 60, scale: 0.95, opacity: 0.95, phase: 1.3 },   // Rank 2: Top-Right
  { id: 2, x: 440, y: 175, width: 180, height: 54, scale: 0.90, opacity: 0.90, phase: 2.7 },   // Rank 3: Bottom-Right
  { id: 3, x: 180, y: -30, width: 160, height: 48, scale: 0.85, opacity: 0.85, phase: 4.1 },  // Rank 4: Top-Left
  { id: 4, x: 180, y: 210, width: 145, height: 42, scale: 0.80, opacity: 0.80, phase: 5.5 },   // Rank 5: Bottom-Left
];

// Thread Opacity & Intensity per Rank (Index 0 is darkest/most intense)
const THREAD_PROPERTIES = [
  { opacity: 0.95, strokeWidth: 2.5, color: "#0099FF", glow: "rgba(0,153,255,0.75)" }, // Rank 1: Darkest & most intense
  { opacity: 0.60, strokeWidth: 1.7, color: "#33A6FF", glow: "rgba(51,166,255,0.35)" }, // Rank 2: Medium intensity
  { opacity: 0.45, strokeWidth: 1.3, color: "#66B8FF", glow: "rgba(102,184,255,0.25)" },// Rank 3: Lower intensity
  { opacity: 0.30, strokeWidth: 1.1, color: "#99CFFF", glow: "transparent" },           // Rank 4: Faint
  { opacity: 0.20, strokeWidth: 0.9, color: "#CCE6FF", glow: "transparent" },           // Rank 5: Subtle
];

export default function SpotlightResultsPanel({ onClose }: Props) {
  const { searchQuery, unlockOS, lockOS, setSearchQuery } = useSpotlight();
  const { openWindow } = useWindowManager();
  const { setWallpaper } = useWallpaper();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [floatTime, setFloatTime] = useState(0);

  // 60 FPS Idle Floating Drift Loop
  useEffect(() => {
    let animFrame: number;
    const updateFloat = () => {
      setFloatTime((prev) => prev + 0.03);
      animFrame = requestAnimationFrame(updateFloat);
    };
    animFrame = requestAnimationFrame(updateFloat);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Intelligent Ranking Algorithm
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    const scored = SEARCH_INDEX.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const subtitleLower = item.subtitle.toLowerCase();

      // Prefix match on title
      if (titleLower.startsWith(q)) {
        score += 100;
      } else if (titleLower.split(/\s+/).some((word) => word.startsWith(q))) {
        score += 80;
      } else if (titleLower.includes(q)) {
        score += 50;
      }

      // Keywords match
      item.keywords.forEach((kw) => {
        if (kw.startsWith(q)) score += 40;
        else if (kw.includes(q)) score += 20;
      });

      // Subtitle match
      if (subtitleLower.includes(q)) score += 10;

      return { item, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item)
      .slice(0, 5); // Maximum 5 floating results
  }, [searchQuery]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredResults.length === 0) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selectedItem = filteredResults[selectedIndex];
        if (selectedItem) {
          executeAction(selectedItem);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredResults, selectedIndex]);

  const executeAction = (item: SearchResultItem) => {
    if (item.action.type === "open_app" && item.action.payload) {
      unlockOS();
      openWindow(item.action.payload);
    } else if (item.action.type === "exec_command") {
      if (item.action.payload === "lock_screen") {
        lockOS();
      } else if (item.action.payload === "open_wallpaper") {
        unlockOS();
        openWindow("settings");
      } else if (item.action.payload === "download_resume") {
        window.open("/resume.pdf", "_blank");
      } else if (item.action.payload === "open_contact") {
        unlockOS();
        openWindow("terminal");
      }
    } else if (item.action.type === "filter_skill" && item.action.payload) {
      unlockOS();
      openWindow("projects");
    }
    setSearchQuery("");
    onClose?.();
  };

  const getLucideIcon = (iconName: string) => {
    switch (iconName) {
      case "Folder":
        return <Folder className="text-sky-400 h-4 w-4" />;
      case "Code2":
        return <Code2 className="text-emerald-400 h-4 w-4" />;
      case "FileText":
        return <FileText className="text-amber-400 h-4 w-4" />;
      case "Image":
        return <Image className="text-purple-400 h-4 w-4" />;
      case "Settings":
        return <Settings className="text-indigo-400 h-4 w-4" />;
      case "Lock":
        return <Lock className="text-rose-400 h-4 w-4" />;
      case "Palette":
        return <Palette className="text-pink-400 h-4 w-4" />;
      case "Download":
        return <Download className="text-cyan-400 h-4 w-4" />;
      case "Mail":
        return <Mail className="text-[#007AFF] h-4 w-4" />;
      case "FolderKanban":
        return <FolderKanban className="text-blue-400 h-4 w-4" />;
      case "FileCode":
        return <FileCode className="text-teal-400 h-4 w-4" />;
      case "Cpu":
        return <Cpu className="text-amber-400 h-4 w-4" />;
      default:
        return <Search className="text-white/50 h-4 w-4" />;
    }
  };

  if (!searchQuery.trim() || filteredResults.length === 0) return null;

  // Exact vertical center alignment matching SearchBar right edge (440px canvas height / 2 = 220px)
  const centerY = 220;
  const rootX = 0;      // SearchBar right edge
  const rootY = centerY; // Center Y of SearchBar

  return (
    /* Invisible Right-Side Search Canvas positioned downwards relative to SearchBar */
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 h-[440px] w-[640px] md:w-[740px] select-none pointer-events-auto">
      
      {/* 1. SVG Network Threads starting from SINGLE COMMON ROOT POINT right on the SearchBar */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <defs>
          <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {filteredResults.map((_, index) => {
          const slot = ORGANIC_RIGHT_SLOTS[index] || ORGANIC_RIGHT_SLOTS[0];
          const threadProp = THREAD_PROPERTIES[index] || THREAD_PROPERTIES[4];
          const isSelected = index === selectedIndex;

          const idleDriftY = Math.sin(floatTime + slot.phase) * 2.5;
          const targetX = slot.x - slot.width / 2; // Left edge of the floating card
          const targetY = centerY + slot.y + idleDriftY; // Middle Y of the floating card

          // Organic Bezier control points starting from common root (rootX, rootY) right on SearchBar
          const cp1X = rootX + (targetX - rootX) * 0.40;
          const cp1Y = rootY;
          const cp2X = rootX + (targetX - rootX) * 0.60;
          const cp2Y = targetY;

          const pathD = `M ${rootX} ${rootY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;

          const currentOpacity = isSelected ? 1.0 : threadProp.opacity;
          const currentWidth = isSelected ? threadProp.strokeWidth + 1.2 : threadProp.strokeWidth;

          return (
            <g key={`thread-${index}`}>
              {/* Network Thread Path */}
              <path
                d={pathD}
                fill="none"
                stroke={threadProp.color}
                strokeWidth={currentWidth}
                strokeOpacity={currentOpacity}
                strokeDasharray={isSelected ? "none" : index === 0 ? "none" : "4,4"}
                filter={isSelected || index === 0 ? "url(#threadGlow)" : undefined}
                className="transition-all duration-300"
              />

              {/* Network Node Dot directly at target card left edge */}
              <circle
                cx={targetX}
                cy={targetY}
                r={isSelected ? 4 : 2.8}
                fill={threadProp.color}
                fillOpacity={currentOpacity}
                className="transition-all duration-300"
              />
            </g>
          );
        })}

        {/* SINGLE COMMON ROOT HUB NODE DOT RIGHT AT THE SEARCHBAR EDGE */}
        <circle cx={rootX} cy={rootY} r="5" fill="#0099FF" fillOpacity="0.95" filter="url(#threadGlow)" />
      </svg>

      {/* 2. Floating Object Cards (Shifted Downwards with 20% expanded spatial occupancy) */}
      {filteredResults.map((item, index) => {
        const slot = ORGANIC_RIGHT_SLOTS[index] || ORGANIC_RIGHT_SLOTS[0];
        const isSelected = index === selectedIndex;

        // Dynamic 1-3px vertical idle drift
        const idleDriftY = Math.sin(floatTime + slot.phase) * 2.5;

        // Position coordinates popping out to the right & downwards
        const posX = slot.x;
        const posY = centerY + slot.y + idleDriftY;
        const cardScale = isSelected ? slot.scale * 1.08 : slot.scale;

        return (
          <div
            key={item.id}
            onClick={() => executeAction(item)}
            onMouseEnter={() => setSelectedIndex(index)}
            style={{
              position: "absolute",
              left: `${posX}px`,
              top: `${posY}px`,
              width: `${slot.width}px`,
              height: `${slot.height}px`,
              transform: `translate(-50%, -50%) scale(${cardScale})`,
              opacity: isSelected ? 1 : slot.opacity,
              transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out",
              zIndex: isSelected ? 50 : 20 - index,
            }}
            className={`
              group flex items-center justify-between p-2.5 rounded-xl cursor-pointer
              border backdrop-blur-2xl transition-all duration-300
              ${
                isSelected
                  ? "bg-[#1C1D22]/95 border-[#007AFF] shadow-[0_8px_30px_rgba(0,122,255,0.35)] ring-2 ring-[#007AFF]/50"
                  : "bg-[#15161A]/85 border-white/10 hover:border-white/25 hover:bg-[#1C1D22]/90 shadow-lg"
              }
            `}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${isSelected ? "bg-[#007AFF] text-white" : "bg-white/10 text-white/90"}`}>
                {getLucideIcon(item.icon)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-semibold tracking-tight truncate leading-tight ${index === 0 ? "text-[13px] text-white" : "text-[11.5px] text-white/90"}`}>
                  {item.title}
                </span>
                <span className="text-[9px] text-white/50 truncate mt-0.5 leading-none">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0 ml-1.5">
              <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${isSelected ? "bg-[#007AFF]/30 text-white" : "bg-white/10 text-white/50"}`}>
                {item.category}
              </span>
              {isSelected && <ArrowUpRight size={12} className="text-[#007AFF]" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
