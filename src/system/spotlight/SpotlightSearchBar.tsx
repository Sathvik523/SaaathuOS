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
        relative flex h-[38px] w-full items-center justify-between
        rounded-xl border border-white/[0.06] bg-white/[0.035] px-3
        backdrop-blur-[20px] backdrop-saturate-[140%]
        shadow-[0_2px_12px_rgba(0,0,0,0.25)]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        focus-within:border-[var(--accent)]/30 focus-within:bg-white/[0.05]
      ">
        
        {/* Center: Search Input & Icon */}
        <div className="flex flex-1 items-center z-10">
          <Search size={13} className="text-white/30 mr-2 flex-shrink-0" />
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
            className="w-full bg-transparent font-system text-[13px] font-light text-white/85 placeholder-white/25 focus:outline-none"
          />
        </div>

        {/* Right Side: Voice Search Button */}
        <div className="flex items-center gap-1.5 flex-shrink-0 z-10">
          <button
            onClick={handleVoiceSearch}
            aria-label="Voice Search"
            className={`flex h-5.5 w-5.5 items-center justify-center rounded-full transition-all focus:outline-none cursor-pointer ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "text-white/30 hover:text-white/60"
            }`}
          >
            <Mic size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
