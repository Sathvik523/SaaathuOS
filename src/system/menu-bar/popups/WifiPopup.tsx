"use client";

import { useState } from "react";
import { Wifi, Check, Lock, Airplay, Settings } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WifiPopup({ isOpen, onClose }: Props) {
  const [wifiEnabled, setWifiEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-16 z-50 w-72 rounded-2xl border border-white/10 bg-[#1E1F24]/95 p-3 text-white shadow-2xl backdrop-blur-3xl select-none animate-in fade-in zoom-in-95 duration-120">
        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-[#007AFF]" />
            <span className="text-[13px] font-bold">Wi-Fi</span>
          </div>
          <button
            onClick={() => setWifiEnabled(!wifiEnabled)}
            className={`h-5 w-9 rounded-full p-0.5 transition-colors ${wifiEnabled ? "bg-[#007AFF]" : "bg-white/20"}`}
          >
            <div className={`h-4 w-4 rounded-full bg-white transition-transform ${wifiEnabled ? "translate-x-4" : "translate-x-0"}`} />
          </button>
        </div>

        {wifiEnabled ? (
          <div className="py-2 space-y-1">
            <div className="text-[10px] font-semibold uppercase text-white/40 px-1">Known Network</div>
            <div className="flex items-center justify-between rounded-xl bg-[#007AFF] px-2.5 py-1.5 text-[12px] font-medium text-white">
              <span className="flex items-center gap-2">
                <Check size={14} /> Saaathu_5G_Fiber
              </span>
              <Lock size={12} className="opacity-80" />
            </div>

            <div className="text-[10px] font-semibold uppercase text-white/40 px-1 pt-2">Other Networks</div>
            {["Studio_Guest_5G", "Saaathu_Mesh_East", "Neighbor_Net"].map((net) => (
              <button
                key={net}
                className="flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-[12px] text-white/80 hover:bg-white/10 transition-colors"
              >
                <span>{net}</span>
                <Lock size={12} className="text-white/40" />
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 space-y-1 text-[12px]">
              <button className="flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-white/80 hover:bg-white/10">
                <span className="flex items-center gap-2"><Airplay size={14} /> AirDrop & AirPlay</span>
                <span className="text-[10px] text-white/40">Everyone</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-white/40">Wi-Fi is turned off</div>
        )}

        <div className="pt-2 border-t border-white/10">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-1.5 text-[12px] font-semibold text-white hover:bg-white/20 transition-colors">
            <Settings size={14} /> Network Settings...
          </button>
        </div>
      </div>
    </>
  );
}
