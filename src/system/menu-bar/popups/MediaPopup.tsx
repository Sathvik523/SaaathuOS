"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaPopup({ isOpen, onClose }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 left-32 z-50 w-72 rounded-2xl border border-white/10 bg-[#1E1F24]/95 p-3 text-white shadow-2xl backdrop-blur-3xl select-none animate-in fade-in zoom-in-95 duration-120">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md">
            <Music size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-white truncate max-w-[170px]">SaaathuOS Theme</span>
            <span className="text-[11px] text-white/60">Ambient Synthwave</span>
          </div>
        </div>

        <div className="py-3 flex items-center justify-center gap-6">
          <button className="text-white/70 hover:text-white transition-colors">
            <SkipBack size={18} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-0.5" />}
          </button>
          <button className="text-white/70 hover:text-white transition-colors">
            <SkipForward size={18} />
          </button>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center gap-2 px-1">
          <Volume2 size={14} className="text-white/50" />
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="70"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#007AFF]"
          />
        </div>
      </div>
    </>
  );
}
