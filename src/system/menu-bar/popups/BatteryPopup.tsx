"use client";

import { BatteryState } from "../hooks/useBattery";
import { Zap, ShieldCheck, Cpu } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  battery: BatteryState;
}

export default function BatteryPopup({ isOpen, onClose, battery }: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-24 z-50 w-72 rounded-2xl border border-white/10 bg-[#1E1F24]/95 p-3 text-white shadow-2xl backdrop-blur-3xl select-none animate-in fade-in zoom-in-95 duration-120">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Zap className={`h-4 w-4 ${battery.charging ? "text-emerald-400" : "text-amber-400"}`} />
            <span className="text-[13px] font-bold">Battery</span>
          </div>
          <span className="text-sm font-extrabold text-white">{battery.level}%</span>
        </div>

        <div className="py-2.5 space-y-2 text-[12px]">
          <div className="flex justify-between text-white/70">
            <span>Power Source:</span>
            <span className="font-semibold text-white">{battery.charging ? "Power Adapter" : "Battery"}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Status:</span>
            <span className="font-semibold text-white">{battery.charging ? "Charging..." : "Using Battery"}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Estimated Remaining:</span>
            <span className="font-semibold text-white">{battery.charging ? "Fully Charged Soon" : "4 hrs 12 mins"}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Condition / Health:</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={13} /> Normal (100%)
            </span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Low Power Mode:</span>
            <span className="font-semibold text-white/50">Off</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-1.5 text-[12px] font-semibold text-white hover:bg-white/20 transition-colors">
            <Cpu size={14} /> Battery Settings...
          </button>
        </div>
      </div>
    </>
  );
}
