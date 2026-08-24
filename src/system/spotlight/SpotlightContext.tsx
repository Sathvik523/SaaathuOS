"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AIModelType = "GPT-4o" | "Gemini 1.5 Pro" | "Claude 3.5 Sonnet";

interface SpotlightContextType {
  isLocked: boolean;
  visitorName: string | null;
  aiModel: AIModelType;
  isSpotlightOpen: boolean;
  searchQuery: string;
  isFocused: boolean;
  isNameModalOpen: boolean;
  setSearchQuery: (query: string) => void;
  setIsFocused: (focused: boolean) => void;
  setAiModel: (model: AIModelType) => void;
  setVisitorName: (name: string) => void;
  unlockOS: () => void;
  lockOS: () => void;
  toggleSpotlight: (open?: boolean) => void;
  setIsNameModalOpen: (open: boolean) => void;
}

const SpotlightContext = createContext<SpotlightContextType | null>(null);

export function SpotlightProvider({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(true);
  const [visitorName, setVisitorNameState] = useState<string | null>(null);
  const [aiModel, setAiModel] = useState<AIModelType>("GPT-4o");
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("saathuos_visitor_name");
      if (savedName) {
        setVisitorNameState(savedName);
      } else {
        setIsNameModalOpen(true);
      }
    }
  }, []);

  // Global Keyboard Shortcuts listener (⌘ + K or ⌘ + Space or Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === "k" || e.code === "Space")) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSpotlightOpen(false);
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setVisitorName = (name: string) => {
    const trimmed = name.trim();
    if (trimmed) {
      setVisitorNameState(trimmed);
      if (typeof window !== "undefined") {
        localStorage.setItem("saathuos_visitor_name", trimmed);
      }
    }
  };

  const unlockOS = () => {
    setIsLocked(false);
    setIsSpotlightOpen(false);
    setIsFocused(false);
  };

  const lockOS = () => {
    setIsLocked(true);
    setIsSpotlightOpen(false);
    setIsFocused(false);
    setSearchQuery("");
  };

  const toggleSpotlight = (open?: boolean) => {
    setIsSpotlightOpen((prev) => (open !== undefined ? open : !prev));
  };

  return (
    <SpotlightContext.Provider
      value={{
        isLocked,
        visitorName,
        aiModel,
        isSpotlightOpen,
        searchQuery,
        isFocused,
        isNameModalOpen,
        setSearchQuery,
        setIsFocused,
        setAiModel,
        setVisitorName,
        unlockOS,
        lockOS,
        toggleSpotlight,
        setIsNameModalOpen,
      }}
    >
      {children}
    </SpotlightContext.Provider>
  );
}

export function useSpotlight() {
  const context = useContext(SpotlightContext);
  if (!context) {
    throw new Error("useSpotlight must be used within a SpotlightProvider");
  }
  return context;
}
