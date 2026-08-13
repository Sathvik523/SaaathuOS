"use client";

import { useState } from "react";
import { Bluetooth, Moon, Sun, Volume2, Wifi, Music, Airplay } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenterPopup({ isOpen, onClose }: Props) {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);
  const [darkMode, setDarkMode] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-[120px] z-50 w-80 rounded-2xl border border-white/10 bg-[#1E1F24]/95 p-3 text-white shadow-2xl backdrop-blur-3xl select-none animate-in fade-in zoom-in-95 duration-120">
        <div className="grid grid-cols-2 gap-2">
          {/* Top Left Connectivity Group */}
          <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
            <button
              onClick={() => setWifiEnabled(!wifiEnabled)}
              className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/10"
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${wifiEnabled ? "bg-[#007AFF] text-white" : "bg-white/10 text-white/40"}`}>
                <Wifi size={15} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[12px] font-medium leading-none">Wi-Fi</span>
                <span className="text-[10px] text-white/50">{wifiEnabled ? "Saaathu_5G" : "Off"}</span>
              </div>
            </button>

            <button
              onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
              className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/10"
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${bluetoothEnabled ? "bg-[#007AFF] text-white" : "bg-white/10 text-white/40"}`}>
                <Bluetooth size={15} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[12px] font-medium leading-none">Bluetooth</span>
                <span className="text-[10px] text-white/50">{bluetoothEnabled ? "AirPods Pro" : "Off"}</span>
              </div>
            </button>

            <button
              onClick={() => setAirdropEnabled(!airdropEnabled)}
              className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/10"
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${airdropEnabled ? "bg-[#007AFF] text-white" : "bg-white/10 text-white/40"}`}>
                <Airplay size={15} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[12px] font-medium leading-none">AirDrop</span>
                <span className="text-[10px] text-white/50">{airdropEnabled ? "Contacts Only" : "Off"}</span>
              </div>
            </button>
          </div>

          {/* Top Right Mode Group */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex flex-1 items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 transition-colors hover:bg-white/10"
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${darkMode ? "bg-indigo-600 text-white" : "bg-white/10 text-white/40"}`}>
                <Moon size={15} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[12px] font-medium leading-none">Dark Mode</span>
                <span className="text-[10px] text-white/50">{darkMode ? "On" : "Off"}</span>
              </div>
            </button>

            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80">
                <Sun size={15} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[12px] font-medium leading-none">Focus</span>
                <span className="text-[10px] text-white/50">Coding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Display Brightness Slider */}
        <div className="mt-3 flex flex-col gap-1.5 rounded-xl border border-white/5 bg-white/[0.04] p-3">
          <span className="text-[11px] font-medium text-white/60">Display</span>
          <div className="flex items-center gap-2">
            <Sun size={14} className="text-white/40" />
            <input
              type="range"
              min="10"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#007AFF]"
            />
            <Sun size={18} className="text-white/80" />
          </div>
        </div>

        {/* Sound Volume Slider */}
        <div className="mt-2 flex flex-col gap-1.5 rounded-xl border border-white/5 bg-white/[0.04] p-3">
          <span className="text-[11px] font-medium text-white/60">Sound</span>
          <div className="flex items-center gap-2">
            <Volume2 size={14} className="text-white/40" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#007AFF]"
            />
          </div>
        </div>

        {/* Now Playing Widget */}
        <div className="mt-2 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.04] p-2.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md">
              <Music size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-white">SaaathuOS Theme</span>
              <span className="text-[10px] text-white/50">Ambient Synthwave</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
