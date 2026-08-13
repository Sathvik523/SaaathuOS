"use client";

import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";

interface TrafficLightsProps {
  active?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export default function TrafficLights({
  active = true,
  onClose,
  onMinimize,
  onMaximize,
}: TrafficLightsProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-[7px] py-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Close Button (Red Dot) */}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose?.();
        }}
        aria-label="Close window"
        className={`
          group relative flex h-3 w-3 items-center justify-center rounded-full transition-all cursor-pointer
          ${active ? "bg-[#FF5F56] border border-[#E0443E]" : isHovered ? "bg-[#FF5F56] border border-[#E0443E]" : "bg-[#4E4F51] border border-[#3A3B3D]"}
          active:brightness-90 focus:outline-none
        `}
      >
        {isHovered && (
          <X className="h-2 w-2 text-[#4C0000] stroke-[3]" />
        )}
      </button>

      {/* Minimize Button (Yellow Dot) */}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onMinimize?.();
        }}
        aria-label="Minimize window"
        className={`
          group relative flex h-3 w-3 items-center justify-center rounded-full transition-all cursor-pointer
          ${active ? "bg-[#FFBD2E] border border-[#DEA123]" : isHovered ? "bg-[#FFBD2E] border border-[#DEA123]" : "bg-[#4E4F51] border border-[#3A3B3D]"}
          active:brightness-90 focus:outline-none
        `}
      >
        {isHovered && (
          <Minus className="h-2 w-2 text-[#5C3C00] stroke-[3]" />
        )}
      </button>

      {/* Maximize Button (Green Dot) */}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onMaximize?.();
        }}
        aria-label="Maximize window"
        className={`
          group relative flex h-3 w-3 items-center justify-center rounded-full transition-all cursor-pointer
          ${active ? "bg-[#27C93F] border border-[#1AAB29]" : isHovered ? "bg-[#27C93F] border border-[#1AAB29]" : "bg-[#4E4F51] border border-[#3A3B3D]"}
          active:brightness-90 focus:outline-none
        `}
      >
        {isHovered && (
          <Plus className="h-2 w-2 text-[#0A480D] stroke-[3]" />
        )}
      </button>
    </div>
  );
}