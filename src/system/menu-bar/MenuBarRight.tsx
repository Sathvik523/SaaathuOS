"use client";

import { useEffect, useState } from "react";
import {
  Wifi,
  Sliders,
  Cloud,
  Sun,
  Battery,
  Disc,
} from "lucide-react";
import ControlCenterPopover from "./ControlCenterPopover";

export default function MenuBarRight() {
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [timeString, setTimeString] = useState("Sun 2 Aug 4:35 PM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-[13px] font-medium text-white/90 select-none">
      {/* Input Source Icon N */}
      <span className="flex h-5 w-5 items-center justify-center rounded border border-white/20 text-[11px] font-bold text-white/90">
        N
      </span>

      {/* Input Mode Icon A */}
      <span className="text-[12px] font-bold text-white/80">
        A
      </span>

      {/* Cloud Sync Icon */}
      <Cloud size={14} className="text-white/80" />

      {/* Weather Icon */}
      <Sun size={14} className="text-amber-300/90" />

      {/* Focus Mode Circle */}
      <Disc size={13} className="text-white/70" />

      {/* Battery Percentage & Bar */}
      <div className="flex items-center gap-1">
        <span className="text-[12px] font-medium text-white/90">19%</span>
        <div className="relative flex h-3 w-5 items-center rounded-sm border border-white/60 p-0.5">
          <div className="h-full w-[25%] rounded-xs bg-[#FF3B30]" />
          <div className="absolute -right-1 h-1.5 w-0.5 rounded-r bg-white/60" />
        </div>
      </div>

      {/* Wi-Fi Icon */}
      <Wifi size={14} className="text-white/90" />

      {/* Control Center Toggle Icon */}
      <button
        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
        className="flex h-5 w-5 items-center justify-center rounded transition-colors hover:bg-white/15 focus:outline-none"
      >
        <Sliders size={14} className="text-white/90" />
      </button>

      {/* Date & Time */}
      <span className="text-[13px] font-medium text-white tracking-tight">
        {timeString}
      </span>

      {/* Control Center Popover */}
      <ControlCenterPopover
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
      />
    </div>
  );
}