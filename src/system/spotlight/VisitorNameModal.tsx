"use client";

import { useState } from "react";
import { useSpotlight } from "./SpotlightContext";
import { Sparkles, ArrowRight } from "lucide-react";

export default function VisitorNameModal() {
  const { isNameModalOpen, setIsNameModalOpen, setVisitorName } = useSpotlight();
  const [nameInput, setNameInput] = useState("");

  if (!isNameModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setVisitorName(nameInput.trim());
      setIsNameModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-3xl animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#1C1D22]/95 p-8 text-center text-white shadow-2xl backdrop-blur-3xl animate-in zoom-in-95 duration-150">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg border border-white/20 mb-5">
          <Sparkles className="h-7 w-7 text-white" />
        </div>

        <h2 className="font-sans text-2xl font-extrabold tracking-tight text-white">Welcome to SaaathuOS</h2>

        <div className="mt-3 space-y-1 text-sm text-white/70">
          <p>Before we begin,</p>
          <p className="font-semibold text-white">what should I call you?</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            autoFocus
            placeholder="Enter your name..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full rounded-2xl bg-white/[0.03] px-4 py-3 text-center text-lg font-semibold text-white placeholder-white/35 border border-white/15 backdrop-blur-3xl focus:outline-none focus:bg-white/[0.07] focus:border-white/35 focus:ring-2 focus:ring-white/10 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
          />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#007AFF] px-5 py-3.5 text-base font-bold text-white shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
          >
            <span>Continue to SaaathuOS</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <button
          onClick={() => {
            setVisitorName("Friend");
            setIsNameModalOpen(false);
          }}
          className="mt-4 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
