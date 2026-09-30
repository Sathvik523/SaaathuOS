"use client";

import { useState } from "react";
import {
  AppleBatterySymbol,
  AppleWifiSymbol,
  AppleControlCenterSymbol,
} from "./icons/SFSymbols";
import { useBattery } from "./hooks/useBattery";
import { useDateTime } from "./hooks/useDateTime";
import BatteryPopup from "./popups/BatteryPopup";
import WifiPopup from "./popups/WifiPopup";
import ControlCenterPopup from "./popups/ControlCenterPopup";
import CalendarPopup from "./popups/CalendarPopup";

export default function RightSection() {
  const battery = useBattery();
  const dateTime = useDateTime();

  const [isBatteryOpen, setIsBatteryOpen] = useState(false);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="relative flex h-full items-center select-none antialiased font-system">
      <div className="relative flex h-full items-center gap-[10px] rounded-2xl pr-3">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-2xl border border-white/[0.06] bg-white/[0.035] backdrop-blur-[20px] backdrop-saturate-[140%] shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        />
        <div className="relative flex h-full items-center gap-[10px] pl-3">
          {/* Battery Cluster */}
          <button
            onClick={() => setIsBatteryOpen(!isBatteryOpen)}
            aria-label="Battery Info"
            className="group relative flex cursor-pointer items-center gap-[4px] rounded-[4px] p-[2px] transition-all hover:bg-white/[0.06] active:scale-[0.95] focus:outline-none"
          >
            <span className="font-system text-[11.5px] font-normal leading-none tracking-[0px] text-white/80 tabular-nums">
              {battery.level}%
            </span>
            <AppleBatterySymbol
              width={16}
              height={12}
              level={battery.level}
              charging={battery.charging}
              color="rgba(255,255,255,0.80)"
            />
          </button>

          {/* WiFi Icon */}
          <button
            onClick={() => setIsWifiOpen(!isWifiOpen)}
            aria-label="WiFi Networks"
            className="group relative flex cursor-pointer items-center justify-center rounded-[4px] p-[2px] transition-all hover:bg-white/[0.06] active:scale-[0.95] focus:outline-none"
          >
            <AppleWifiSymbol size={13} color="rgba(255,255,255,0.80)" />
          </button>

          {/* Control Center Icon */}
          <button
            onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
            aria-label="Control Center"
            className="group relative flex cursor-pointer items-center justify-center rounded-[4px] p-[2px] transition-all hover:bg-white/[0.06] active:scale-[0.95] focus:outline-none"
          >
            <AppleControlCenterSymbol size={13} color="rgba(255,255,255,0.80)" />
          </button>

          {/* Date & Time */}
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            aria-label="Open Calendar"
            className="group relative ml-0.5 flex cursor-pointer items-center rounded-[4px] p-[2px] transition-all hover:bg-white/[0.06] active:scale-[0.95] focus:outline-none"
          >
            <span className="whitespace-nowrap font-system text-[11.5px] font-normal leading-none tracking-[0px] text-white/80">
              {dateTime.formatted}
            </span>
          </button>
        </div>
      </div>

      {/* Popovers */}
      <BatteryPopup isOpen={isBatteryOpen} onClose={() => setIsBatteryOpen(false)} battery={battery} />
      <WifiPopup isOpen={isWifiOpen} onClose={() => setIsWifiOpen(false)} />
      <ControlCenterPopup isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
      <CalendarPopup isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
}
