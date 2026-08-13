"use client";

import { useState } from "react";
import { Palette, Info, ShieldCheck, Cpu, HardDrive, Upload, Check } from "lucide-react";
import { USER_PROFILE } from "@/content/portfolioData";
import { useWallpaper, WallpaperPreset } from "@/system/desktop/WallpaperContext";

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState<"about" | "appearance">("about");
  const { wallpaper, setWallpaper, customImageUrl, setCustomImageUrl } = useWallpaper();
  const [inputUrl, setInputUrl] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomImageUrl(result);
        setWallpaper("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setCustomImageUrl(inputUrl.trim());
      setWallpaper("custom");
      setInputUrl("");
    }
  };

  const wallpapersList: { id: WallpaperPreset; name: string; colors: string }[] = [
    { id: "sequoia", name: "macOS Sequoia Dark", colors: "from-indigo-900 via-purple-900 to-slate-950" },
    { id: "sonoma", name: "macOS Sonoma Dark", colors: "from-amber-900 via-rose-950 to-slate-950" },
    { id: "ventura", name: "macOS Ventura Dark", colors: "from-cyan-900 via-teal-950 to-slate-950" },
    { id: "capsules", name: "Vertical Capsules", colors: "from-orange-600 via-amber-500 to-slate-800" },
    { id: "cyber", name: "Cyberpunk Grid", colors: "from-indigo-950 via-slate-900 to-black" },
    { id: "obsidian", name: "Solid Dark Obsidian", colors: "from-neutral-900 to-black" },
  ];

  return (
    <div className="flex h-full w-full bg-[#15161A] text-white select-none">
      {/* Settings Sidebar */}
      <aside className="w-52 flex-shrink-0 border-r border-white/[0.06] bg-[#111215] p-3 space-y-1">
        <button
          onClick={() => setActiveTab("about")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
            activeTab === "about" ? "bg-[#007AFF] text-white" : "text-white/70 hover:bg-white/10"
          }`}
        >
          <Info size={16} />
          About SaaathuOS
        </button>

        <button
          onClick={() => setActiveTab("appearance")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
            activeTab === "appearance" ? "bg-[#007AFF] text-white" : "text-white/70 hover:bg-white/10"
          }`}
        >
          <Palette size={16} />
          Appearance & Wallpaper
        </button>
      </aside>

      {/* Main Settings Panel */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "about" && (
          <div className="max-w-md space-y-6">
            {/* System Info Banner with SaaathuOS Logo */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 shadow-xl border border-white/10 mb-4 px-1">
                <span className="font-helvetica font-bold text-[11px] text-white tracking-tighter leading-tight select-none">
                  SaaathuOS
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">SaaathuOS 2.0</h2>
              <span className="text-xs text-white/50 mt-1">macOS Sequoia Dark Edition</span>

              <div className="mt-6 w-full space-y-2 border-t border-white/[0.06] pt-4 text-[12px] text-left">
                <div className="flex justify-between text-white/60">
                  <span className="flex items-center gap-2"><Cpu size={14} /> Processor</span>
                  <span className="text-white font-mono">Apple M3 Max (Emulated)</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span className="flex items-center gap-2"><HardDrive size={14} /> Memory</span>
                  <span className="text-white font-mono">32 GB Unified Memory</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span className="flex items-center gap-2"><ShieldCheck size={14} /> System Kernel</span>
                  <span className="text-white font-mono">Darwin 24.0.0</span>
                </div>
              </div>
            </div>

            {/* Developer Bio Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-2">
              <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Created By</span>
              <h3 className="text-base font-bold text-white">{USER_PROFILE.name}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{USER_PROFILE.bio}</p>
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h2 className="text-lg font-bold text-white">Desktop Wallpaper</h2>
              <p className="text-xs text-white/60 mt-0.5">
                Choose your favorite wallpaper preset or upload your custom background image.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-4">
              {wallpapersList.map((wp) => {
                const isSelected = wallpaper === wp.id;
                return (
                  <div
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    className={`group relative flex flex-col rounded-xl border p-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#007AFF] bg-[#007AFF]/10 shadow-lg ring-1 ring-[#007AFF]"
                        : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className={`h-24 w-full rounded-lg bg-gradient-to-br ${wp.colors} shadow-inner flex items-center justify-center relative overflow-hidden`}>
                      {isSelected && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-md">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-white/90 mt-2 px-1">{wp.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Custom Image Upload & URL */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Custom Wallpaper Image</h3>

              <div className="flex flex-col md:flex-row gap-3">
                {/* Local Upload */}
                <label className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 cursor-pointer hover:border-[#007AFF] hover:bg-white/10 transition-colors">
                  <Upload size={16} className="text-[#007AFF]" />
                  <span className="text-xs font-medium text-white/80">Upload Image File</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* URL Input */}
              <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste Image URL..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-xs text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  Apply URL
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
