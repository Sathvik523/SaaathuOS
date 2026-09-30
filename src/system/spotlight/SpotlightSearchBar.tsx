"use client";

import { useState, useRef } from "react";
import { Mic, Search } from "lucide-react";
import { useSpotlight } from "./SpotlightContext";

interface Props {
  onFocus?: () => void;
  onExecuteSelection?: () => void;
}

export default function SpotlightSearchBar({ onFocus }: Props) {
  const { searchQuery, setSearchQuery, setIsFocused } = useSpotlight();
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Voice Search
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice Search is supported in modern Chrome, Edge, and Safari browsers.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsFocused(true);
      inputRef.current?.focus();
    };

    recognition.start();
  };

  return (
    <div className="relative w-full select-none">
      {/* Blue-purple ambient glow behind the bar (a radial gradient: a stretched blur-xl
          showed up as stacked, stepped rings around the bar) */}
      <div
        className="absolute -inset-x-8 -inset-y-9 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse closest-side, rgba(79,91,213,0.2), rgba(99,102,241,0.08) 55%, transparent)",
        }}
      />

      <div className="
        relative flex h-[42px] w-full items-center justify-between
        rounded-full bg-[#1a1d2e]/75 px-4
        border border-[#4f5bd5]/20
        shadow-[8px_8px_20px_rgba(20,20,40,0.7),-4px_-4px_14px_rgba(80,90,210,0.06),inset_1px_1px_3px_rgba(100,120,255,0.08),inset_-1px_-1px_4px_rgba(0,0,0,0.35)]
        backdrop-blur-[24px]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        focus-within:border-[#6366f1]/35 focus-within:shadow-[8px_8px_20px_rgba(20,20,40,0.75),-4px_-4px_14px_rgba(80,90,210,0.08),inset_1px_1px_4px_rgba(100,120,255,0.12),inset_-1px_-1px_5px_rgba(0,0,0,0.4)]
      ">
        
        {/* Search Icon & Input */}
        <div className="flex flex-1 items-center z-10">
          <Search size={14} className="text-white/35 mr-2.5 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            placeholder="Search SaaathuOS..."
            className="w-full bg-transparent font-system text-[13.5px] font-light text-white/85 placeholder-white/30 focus:outline-none"
          />
        </div>

        {/* Mic Button — glowing blue circle */}
        <div className="flex items-center flex-shrink-0 z-10">
          <button
            onClick={handleVoiceSearch}
            aria-label="Voice Search"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer ${
              isListening
                ? "bg-red-500 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                : "bg-[#4f5bd5]/30 text-white/60 border border-[#6366f1]/25 hover:bg-[#4f5bd5]/50 hover:text-white/90 shadow-[inset_1px_1px_2px_rgba(100,120,255,0.15),0_2px_8px_rgba(30,30,60,0.4)]"
            }`}
          >
            <Mic size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
