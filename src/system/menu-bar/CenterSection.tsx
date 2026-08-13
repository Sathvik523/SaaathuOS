"use client";

import { useState } from "react";
import {
  AppleBatterySymbol,
  AppleWifiSymbol,
  AppleControlCenterSymbol,
} from "./icons/SFSymbols";
import { useBattery } from "./hooks/useBattery";
import BatteryPopup from "./popups/BatteryPopup";
import WifiPopup from "./popups/WifiPopup";
import ControlCenterPopup from "./popups/ControlCenterPopup";

export default function CenterSection() {
  const battery = useBattery();
  const [isBatteryOpen, setIsBatteryOpen] = useState(false);
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  return (
    <div className="flex items-center gap-[24px] select-none">
      {/* Battery Percentage & Icon */}
      <button
        onClick={() => setIsBatteryOpen(!isBatteryOpen)}
        aria-label="Battery Info"
        className="group relative flex items-center gap-[10px] p-[4px] rounded-[8px] transition-all duration-[180ms] ease-out hover:bg-white/[0.08] hover:scale-[1.05] active:scale-[0.95] focus:outline-none cursor-pointer"
      >
        <span className="font-sans font-semibold text-[18px] tracking-[0px] text-[#FFFFFF] tabular-nums">
          {battery.level}%
        </span>
        <AppleBatterySymbol
          width={24}
          height={20}
          level={battery.level}
          charging={battery.charging}
          color="#FFFFFF"
        />
      </button>

      {/* WiFi Icon */}
      <button
        onClick={() => setIsWifiOpen(!isWifiOpen)}
        aria-label="WiFi Networks"
        className="group relative flex items-center justify-center p-[4px] rounded-[8px] transition-all duration-[180ms] ease-out hover:bg-white/[0.08] hover:scale-[1.05] active:scale-[0.95] focus:outline-none cursor-pointer"
      >
        <AppleWifiSymbol size={24} color="#FFFFFF" />
      </button>

      {/* Control Center Icon */}
      <button
        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
        aria-label="Control Center"
        className="group relative flex items-center justify-center p-[4px] rounded-[8px] transition-all duration-[180ms] ease-out hover:bg-white/[0.08] hover:scale-[1.05] active:scale-[0.95] focus:outline-none cursor-pointer"
      >
        <AppleControlCenterSymbol size={24} color="#FFFFFF" />
      </button>

      <BatteryPopup isOpen={isBatteryOpen} onClose={() => setIsBatteryOpen(false)} battery={battery} />
      <WifiPopup isOpen={isWifiOpen} onClose={() => setIsWifiOpen(false)} />
      <ControlCenterPopup isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
    </div>
  );
}
