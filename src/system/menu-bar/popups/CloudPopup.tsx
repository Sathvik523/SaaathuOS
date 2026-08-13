"use client";

import { useState } from "react";
import { Cloud, Check, RefreshCw } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CloudPopup({ isOpen, onClose }: Props) {
  const [synced, setSynced] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 left-24 z-50 w-64 rounded-2xl border border-white/10 bg-[#1E1F24]/95 p-3 text-white shadow-2xl backdrop-blur-3xl select-none animate-in fade-in zoom-in-95 duration-120">
        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-[#007AFF]" />
            <span className="text-[13px] font-bold">Cloud Sync</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <Check size={13} /> Active
          </span>
        </div>

        <div className="py-3 text-[12px] space-y-1.5 text-white/80">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-medium text-white">{synced ? "Up to date" : "Syncing..."}</span>
          </div>
          <div className="flex justify-between">
            <span>Storage Used:</span>
            <span className="font-medium text-white">4.2 GB of 200 GB</span>
          </div>
          <div className="flex justify-between">
            <span>Last Sync:</span>
            <span className="font-medium text-white">Just now</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <button
            onClick={() => {
              setSynced(false);
              setTimeout(() => setSynced(true), 1200);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-1.5 text-[12px] font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <RefreshCw size={13} className={synced ? "" : "animate-spin"} /> Sync Now
          </button>
        </div>
      </div>
    </>
  );
}
