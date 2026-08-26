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

  const baseSize = 48; // Slightly smaller for minimalism
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
      {/* macOS Floating Tooltip — quieter, less heavy */}
      {isHovered && (
        <div className="absolute -top-10 z-50 rounded-md bg-[#1a1a1e]/90 px-2.5 py-1 text-[10.5px] font-normal text-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.45)] backdrop-blur-xl border border-white/[0.06] whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 font-system">
          {label}
        </div>
      )}

      {/* App Icon Container */}
      <button
        onClick={handleClick}
        aria-label={label}
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          transform: `translateY(${(scale - 1) * -16}px)`,
        }}
        className={`
          relative flex items-center justify-center rounded-[14px] origin-bottom
          focus:outline-none transition-[opacity,filter,transform] duration-200
          ${isBouncing ? "animate-bounce" : ""}
          ${isMinimized ? "opacity-40 blur-[0.5px]" : "opacity-100"}
        `}
      >
        <Icon className="w-full h-full" />

        {/* Notification Badge */}
        {badge && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#FF3B30] text-[9px] font-medium text-white shadow-sm border border-white/50 z-20">
            {badge}
          </span>
        )}
      </button>

      {/* macOS Active Dot Indicator — minimal single-color, low opacity */}
      <div className="h-1.5 flex items-center justify-center mt-0.5">
        {isOpen && (
          <div
            className={`rounded-full transition-all duration-300 ${
              isActive
                ? "h-[3px] w-[3px] bg-white/70"
                : "h-[3px] w-[3px] bg-white/25"
            }`}
          />
        )}
      </div>
    </div>
  );
});

export default DockItem;