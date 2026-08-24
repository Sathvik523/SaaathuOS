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
      <div className="
        relative flex h-[40px] w-full items-center justify-between
        rounded-[34px] border border-white/[0.05] bg-white/[0.03] px-3
        backdrop-blur-[52px] backdrop-saturate-[180%] backdrop-brightness-[108%]
        shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_30px_0_rgba(0,0,0,0.05)]
        transition-all duration-240 ease-[cubic-bezier(0.16,1,0.3,1)]
        focus-within:border-[#007AFF]/40 focus-within:ring-2 focus-within:ring-[#007AFF]/15 focus-within:bg-white/[0.06]
        before:absolute before:top-0 before:left-0 before:right-0 before:h-[25%] before:bg-gradient-to-b before:from-white/[0.04] before:to-transparent before:rounded-t-[34px] before:pointer-events-none
      ">
        
        {/* Center: Search Input & Icon */}
        <div className="flex flex-1 items-center px-0.5 z-10">
          <Search size={14} className="text-white/40 mr-2 flex-shrink-0" />
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
            className="w-full bg-transparent font-sans text-[13.5px] font-medium text-white placeholder-white/40 focus:outline-none"
          />
        </div>

        {/* Right Side: Voice Search Button */}
        <div className="flex items-center gap-1.5 flex-shrink-0 z-10">
          <button
            onClick={handleVoiceSearch}
            aria-label="Voice Search"
            className={`flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.04] transition-all focus:outline-none cursor-pointer ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-white/[0.05] text-white/80 hover:bg-white/[0.12] hover:text-white"
            }`}
          >
            <Mic size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
