"use client";

import { useEffect, useState } from "react";

export interface BatteryState {
  level: number; // 0 to 100
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  isSupported: boolean;
}

export function useBattery(): BatteryState {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    level: 66,
    charging: false,
    chargingTime: 0,
    dischargingTime: Infinity,
    isSupported: false,
  });

  useEffect(() => {
    let battery: any = null;

    const updateBattery = () => {
      if (!battery) return;
      setBatteryState({
        level: Math.round(battery.level * 100),
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        isSupported: true,
      });
    };

    if (typeof window !== "undefined" && "getBattery" in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        battery = batt;
        updateBattery();

        batt.addEventListener("levelchange", updateBattery);
        batt.addEventListener("chargingchange", updateBattery);
        batt.addEventListener("chargingtimechange", updateBattery);
        batt.addEventListener("dischargingtimechange", updateBattery);
      }).catch(() => {
        // Fallback to 66%
      });
    }

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", updateBattery);
        battery.removeEventListener("chargingchange", updateBattery);
        battery.removeEventListener("chargingtimechange", updateBattery);
        battery.removeEventListener("dischargingtimechange", updateBattery);
      }
    };
  }, []);

  return batteryState;
}
