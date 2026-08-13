"use client";

import TrafficLights from "./TrafficLights";

interface WindowTitleBarProps {
  title: string;
  active?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export default function WindowTitleBar({
  title,
  active = true,
  onClose,
  onMinimize,
  onMaximize,
  onMouseDown,
}: WindowTitleBarProps) {
  return (
    <header
      onMouseDown={onMouseDown}
      onDoubleClick={onMaximize}
      className={`
        relative flex h-10 w-full items-center justify-between border-b select-none transition-colors px-4
        ${
          active
            ? "bg-[#1E1F24]/80 border-white/[0.08] text-white/90"
            : "bg-[#18191D]/70 border-white/[0.04] text-white/50"
        }
        backdrop-blur-2xl rounded-t-[14px]
      `}
    >
      <div className="z-10 flex items-center">
        <TrafficLights
          active={active}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
        <span
          className={`
            text-[13px] font-medium tracking-[0.01em] truncate transition-opacity
            ${active ? "text-white/85" : "text-white/40"}
          `}
        >
          {title}
        </span>
      </div>

      {/* Spacer for right balancing */}
      <div className="w-12 pointer-events-none" />
    </header>
  );
}