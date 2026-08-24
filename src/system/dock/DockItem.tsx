"use client";

import { useState, forwardRef } from "react";

interface DockItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  scale?: number;
  badge?: string | number;
  isOpen?: boolean;
  isActive?: boolean;
  isMinimized?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

const DockItem = forwardRef<HTMLDivElement, DockItemProps>(function DockItem(
  {
    icon: Icon,
    label,
    scale = 1,
    badge,
    isOpen = false,
    isActive = false,
    isMinimized = false,
    onMouseEnter,
    onClick,
  },
  ref
) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 800);
    onClick?.();
  };

  const baseSize = 52; // 52px base size for prominent macOS icons
  const currentSize = baseSize * scale;

  return (
    <div
      ref={ref}
      style={{
        width: `${currentSize}px`,
        margin: `0 ${Math.max(0, (scale - 1) * 3)}px`,
        flexShrink: 0,
      }}
      className="relative flex flex-col items-center justify-end select-none origin-bottom"
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* macOS Floating Tooltip */}
      {isHovered && (
        <div className="absolute -top-12 z-50 rounded-lg bg-[#1E1F24]/90 px-3 py-1 text-[11px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl border border-white/20 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
          {label}
        </div>
      )}

      {/* 3D Glass App Icon Container */}
      <button
        onClick={handleClick}
        aria-label={label}
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          transform: `translateY(${(scale - 1) * -18}px)`,
        }}
        className={`
          relative flex items-center justify-center rounded-[18px] origin-bottom
          focus:outline-none transition-[opacity,filter] duration-200
          ${isBouncing ? "animate-bounce" : ""}
          ${isMinimized ? "opacity-50 blur-[0.5px]" : "opacity-100"}
        `}
      >
        <Icon className="w-full h-full" />

        {/* Notification Badge */}
        {badge && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF3B30] text-[10px] font-bold text-white shadow-md border border-white/80 z-20">
            {badge}
          </span>
        )}
      </button>

      {/* macOS Active Dot Indicator */}
      <div className="h-1.5 flex items-center justify-center mt-1">
        {isOpen && (
          <div
            className={`h-1 rounded-full transition-all duration-200 ${
              isActive
                ? "w-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                : "w-1 bg-white/40"
            }`}
          />
        )}
      </div>
    </div>
  );
});

export default DockItem;