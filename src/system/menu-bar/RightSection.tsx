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
    <div className="flex h-full items-center gap-[10px] pr-[12px] select-none antialiased">
      {/* Battery Cluster (Percentage & Icon 15% Diminished) */}
      <button
        onClick={() => setIsBatteryOpen(!isBatteryOpen)}
        aria-label="Battery Info"
        className="group relative flex items-center gap-[5px] p-[2.5px] rounded-[5px] hover:bg-white/[0.08] active:scale-[0.94] transition-all focus:outline-none cursor-pointer"
      >
        <span className="font-sans font-semibold text-[13px] tracking-[0px] text-[#FFFFFF] tabular-nums leading-none">
          {battery.level}%
        </span>
        <AppleBatterySymbol
          width={18}
          height={14}
          level={battery.level}
          charging={battery.charging}
          color="#FFFFFF"
        />
      </button>

      {/* WiFi Icon (15% Diminished) */}
      <button
        onClick={() => setIsWifiOpen(!isWifiOpen)}
        aria-label="WiFi Networks"
        className="group relative flex items-center justify-center p-[2.5px] rounded-[5px] hover:bg-white/[0.08] active:scale-[0.94] transition-all focus:outline-none cursor-pointer"
      >
        <AppleWifiSymbol size={15} color="#FFFFFF" />
      </button>

      {/* Control Center Icon (15% Diminished) */}
      <button
        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
        aria-label="Control Center"
        className="group relative flex items-center justify-center p-[2.5px] rounded-[5px] hover:bg-white/[0.08] active:scale-[0.94] transition-all focus:outline-none cursor-pointer"
      >
        <AppleControlCenterSymbol size={15} color="#FFFFFF" />
      </button>

      {/* Date & Time (15% Diminished) */}
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        aria-label="Open Calendar"
        className="group relative flex items-center p-[2.5px] rounded-[5px] hover:bg-white/[0.08] active:scale-[0.94] transition-all focus:outline-none cursor-pointer ml-0.5"
      >
        <span className="font-sans font-semibold text-[13px] tracking-[0px] text-[#FFFFFF] whitespace-nowrap leading-none">
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
