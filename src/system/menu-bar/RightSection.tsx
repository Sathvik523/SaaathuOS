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
    <div className="flex h-full items-center gap-[10px] pr-[14px] select-none antialiased font-system">
      {/* Battery Cluster */}
      <button
        onClick={() => setIsBatteryOpen(!isBatteryOpen)}
        aria-label="Battery Info"
        className="group relative flex items-center gap-[4px] p-[2px] rounded-[4px] hover:bg-white/[0.06] active:scale-[0.95] transition-all focus:outline-none cursor-pointer"
      >
        <span className="font-system font-normal text-[11.5px] tracking-[0px] text-white/80 tabular-nums leading-none">
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
        className="group relative flex items-center justify-center p-[2px] rounded-[4px] hover:bg-white/[0.06] active:scale-[0.95] transition-all focus:outline-none cursor-pointer"
      >
        <AppleWifiSymbol size={13} color="rgba(255,255,255,0.80)" />
      </button>

      {/* Control Center Icon */}
      <button
        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
        aria-label="Control Center"
        className="group relative flex items-center justify-center p-[2px] rounded-[4px] hover:bg-white/[0.06] active:scale-[0.95] transition-all focus:outline-none cursor-pointer"
      >
        <AppleControlCenterSymbol size={13} color="rgba(255,255,255,0.80)" />
      </button>

      {/* Date & Time */}
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        aria-label="Open Calendar"
        className="group relative flex items-center p-[2px] rounded-[4px] hover:bg-white/[0.06] active:scale-[0.95] transition-all focus:outline-none cursor-pointer ml-0.5"
      >
        <span className="font-system font-normal text-[11.5px] tracking-[0px] text-white/80 whitespace-nowrap leading-none">
          {dateTime.formatted}
        </span>
      </button>

      {/* Popovers */}
      <BatteryPopup isOpen={isBatteryOpen} onClose={() => setIsBatteryOpen(false)} battery={battery} />
      <WifiPopup isOpen={isWifiOpen} onClose={() => setIsWifiOpen(false)} />
      <ControlCenterPopup isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
      <CalendarPopup isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
}
