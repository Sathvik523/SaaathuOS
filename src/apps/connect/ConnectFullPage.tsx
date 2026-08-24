"use client";

import { useState } from "react";
import { useWindowManager } from "@/system/window-manager";
import { USER_PROFILE } from "@/content/portfolioData";
import { ArrowLeft, Send, CheckCircle2, MessageSquare, AlertTriangle } from "lucide-react";

export default function ConnectFullPage() {
  const { closeConnectFullPage } = useWindowManager();
  const [viewMode, setViewMode] = useState<"connect" | "hireCheck" | "alertScreen">("connect");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hoveredMedium, setHoveredMedium] = useState<"github" | "linkedin" | "gmail" | "instagram" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
      setIsFormOpen(false);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#08090C] text-white font-helvetica select-none overflow-hidden p-6 sm:p-10 flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* GENTLE CALM AMBIENT NEON LIGHT SWEEP (PERFECT GOLDILOCKS ZONE)            */}
      {/* CONSTANTLY MOVING DIAGONALLY ACROSS THE ENTIRE CONNECT WITH ME PAGE      */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 h-[720px] w-[1250px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-calm-neon-sweep"
          style={{
            background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.35) 45%, rgba(168, 85, 247, 0.22) 75%, transparent 100%)",
            filter: "blur(110px)",
            boxShadow: "0 0 100px rgba(56, 189, 248, 0.30)",
          }}
        />
      </div>

      {/* FLOATING "<- Desktop" BUTTON ANCHORED AT LEFT MIDDLE OF THE SCREEN */}
      <button
        onClick={() => setViewMode("hireCheck")}
        className="fixed top-1/2 left-6 -translate-y-1/2 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-black/70 hover:bg-white/15 backdrop-blur-2xl text-xs font-mono text-white/80 hover:text-white transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.6)] group"
        title="Return to Desktop"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-indigo-400" />
        <span>Desktop</span>
      </button>

      {/* LEFT-ALIGNED HEADER TITLE, NEW SUBTITLE & AWAITING CONNECTION STATUS DISPLAY (20% REDUCED SIZE) */}
      <div className="relative z-40 flex flex-col items-start justify-start text-left w-full max-w-7xl mx-auto mt-2 sm:mt-4">
        {/* 1. Header Title with Darker Violet "Connect" and Explicit Space before & */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white font-helvetica leading-none">
          Let&apos;s <span className="text-violet-600 font-semibold">Connect</span>{" "}&amp; Build.
        </h1>
        
        {/* 2. Sub-heading in Helvetica Bold (20% reduced overall size) */}
        <p className="font-helvetica font-bold text-sm sm:text-base md:text-lg text-white/90 tracking-tight mt-2.5">
          Pioneer what working in teams can do
        </p>

        {/* 3. Awaiting Connection Area Placed Just Below the Subheader */}
        <div
          className={`
            mt-3.5 flex items-center gap-2.5 text-xs font-mono text-white/90 transition-all duration-300 transform-gpu pointer-events-none h-6
            ${hoveredMedium ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95"}
          `}
        >
          {/* Bright Light-Green Blinking Ball */}
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          </div>

          <span className="text-white/85 tracking-wide font-mono">awaiting connection...</span>
          <span className="text-white/35 font-light">|</span>
          
          <div className="flex items-center justify-center">
            {hoveredMedium === "github" && (
              <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            {hoveredMedium === "linkedin" && (
              <svg className="h-4.5 w-4.5 fill-sky-400" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            )}
            {hoveredMedium === "gmail" && (
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M3.75 6.75V17.25C3.75 18.0784 4.42157 18.75 5.25 18.75H7.5V11.25L12 14.625L16.5 11.25V18.75H18.75C19.5784 18.75 20.25 18.0784 20.25 17.25V6.75" />
                <path fill="#34A853" d="M18.75 18.75H17.25V11.25L20.25 8.875V17.25C20.25 18.0784 19.5784 18.75 18.75 18.75Z" />
                <path fill="#EA4335" d="M12 14.625L3.75 8.4375V6.75C3.75 5.5088 4.7588 4.5 6 4.5H18C19.2412 4.5 20.25 5.5088 20.25 6.75V8.4375L12 14.625Z" />
                <path fill="#FBBC05" d="M18 4.5H18.75C19.5784 4.5 20.25 5.17157 20.25 6V7.5L17.25 9.75V4.5H18Z" />
                <path fill="#C5221F" d="M6 4.5H5.25C4.42157 4.5 3.75 5.17157 3.75 6V7.5L6.75 9.75V4.5H6Z" />
              </svg>
            )}
            {hoveredMedium === "instagram" && (
              <svg className="h-4.5 w-4.5 fill-pink-400" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTRAL CONSTELLATION SETUP                                                */}
      {/* ========================================================================= */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-auto z-10 translate-y-[3vh]">
        
        {/* FLOATING ICON CONSTELLATION CANVAS CONTAINER */}
        <div className="relative flex items-center justify-center w-full">
          {/* Soft Ambient Breathing Backdrop Glow */}
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] rounded-full bg-gradient-to-r from-indigo-500/18 via-sky-400/12 to-purple-500/18 animate-connect-pulse-glow pointer-events-none z-0" />

          {/* UNIFIED FULL-SCREEN OVERLAY SVG CANVAS FOR SIGMOID TETHERS ANCHORED AT BOTH ENDS */}
          <svg className="absolute top-1/2 left-1/2 w-[800px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 overflow-visible opacity-60">
            
            {/* GitHub Sigmoid Tether: Bottom-Right Icon Edge (210,190) -> Top-Left Connect Button Edge (320,274) */}
            <path
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="4 12 2 8"
              strokeLinecap="round"
              className="animate-sigmoid-github"
            />

            {/* LinkedIn Sigmoid Tether: Bottom-Left Icon Edge (590,190) -> Top-Right Connect Button Edge (480,274) */}
            <path
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 10 3 12"
              strokeLinecap="round"
              className="animate-sigmoid-linkedin"
            />

            {/* Gmail Sigmoid Tether: Top-Right Icon Edge (210,410) -> Bottom-Left Connect Button Edge (320,326) */}
            <path
              fill="none"
              stroke="#ea4335"
              strokeWidth="2"
              strokeDasharray="3 14 5 10"
              strokeLinecap="round"
              className="animate-sigmoid-gmail"
            />

            {/* Instagram Sigmoid Tether: Top-Left Icon Edge (590,410) -> Bottom-Right Connect Button Edge (480,326) */}
            <path
              fill="none"
              stroke="#f472b6"
              strokeWidth="2"
              strokeDasharray="5 10 2 12"
              strokeLinecap="round"
              className="animate-sigmoid-instagram"
            />
          </svg>

          {/* 1. CENTRAL COMPACT "connect" BUTTON */}
          <div className="relative group z-20 cursor-default">
            {/* Gentle Glassmorphism & Subtle Inner Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
            
            <button className="relative flex items-center justify-center rounded-full border border-white/30 bg-white/[0.06] px-8 py-3.5 sm:px-9 sm:py-4 backdrop-blur-3xl shadow-[0_0_30px_rgba(255,255,255,0.18)] transition-all duration-500 hover:scale-105 hover:border-white/50 hover:bg-white/[0.12]">
              <span className="font-helvetica text-lg sm:text-xl md:text-2xl font-medium text-white lowercase tracking-tight drop-shadow-[0_2px_18px_rgba(255,255,255,0.7)]">
                connect
              </span>
            </button>
          </div>

          {/* 2. 4 FLOATING BORDERLESS SOCIAL ICONS FLOATING RANDOMLY & SMOOTHLY */}

          {/* Floating Icon 1: GITHUB (Top-Left Node) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[180px] -translate-y-[150px] sm:-translate-x-[270px] sm:-translate-y-[190px] z-30 animate-float-organic-1">
            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile (@Sathvik523)"
              onMouseEnter={() => setHoveredMedium("github")}
              onMouseLeave={() => setHoveredMedium(null)}
              className="relative block pointer-events-auto group/icon"
            >
              <svg className="h-14 w-14 sm:h-20 sm:w-20 fill-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover/icon:scale-125 group-hover/icon:drop-shadow-[0_0_40px_rgba(255,255,255,0.95)]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono font-medium text-white/80 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                GitHub
              </span>
            </a>
          </div>

          {/* Floating Icon 2: LINKEDIN (Top-Right Node) */}
          <div className="absolute top-1/2 left-1/2 translate-x-[110px] -translate-y-[150px] sm:translate-x-[190px] sm:-translate-y-[190px] z-30 animate-float-organic-2">
            <a
              href={USER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Professional Network"
              onMouseEnter={() => setHoveredMedium("linkedin")}
              onMouseLeave={() => setHoveredMedium(null)}
              className="relative block pointer-events-auto group/icon"
            >
              <svg className="h-14 w-14 sm:h-20 sm:w-20 fill-sky-400 drop-shadow-[0_4px_25px_rgba(56,189,248,0.5)] transition-all duration-300 group-hover/icon:scale-125 group-hover/icon:drop-shadow-[0_0_40px_rgba(56,189,248,0.95)]" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono font-medium text-sky-300/90 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Floating Icon 3: GMAIL (Official 4-Color Google Gmail M Logo) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[180px] translate-y-[80px] sm:-translate-x-[270px] sm:translate-y-[110px] z-30 animate-float-organic-3">
            <a
              href={`mailto:${USER_PROFILE.email}`}
              title="Direct Gmail Socket"
              onMouseEnter={() => setHoveredMedium("gmail")}
              onMouseLeave={() => setHoveredMedium(null)}
              className="relative block pointer-events-auto group/icon"
            >
              <svg className="h-14 w-14 sm:h-20 sm:w-20 drop-shadow-[0_4px_25px_rgba(234,67,53,0.5)] transition-all duration-300 group-hover/icon:scale-125 group-hover/icon:drop-shadow-[0_0_40px_rgba(234,67,53,0.95)]" viewBox="0 0 24 24">
                {/* Blue Left Pillar */}
                <path fill="#4285F4" d="M3.75 6.75V17.25C3.75 18.0784 4.42157 18.75 5.25 18.75H7.5V11.25L12 14.625L16.5 11.25V18.75H18.75C19.5784 18.75 20.25 18.0784 20.25 17.25V6.75" />
                {/* Green Right Pillar */}
                <path fill="#34A853" d="M18.75 18.75H17.25V11.25L20.25 8.875V17.25C20.25 18.0784 19.5784 18.75 18.75 18.75Z" />
                {/* Red Chevron & Top */}
                <path fill="#EA4335" d="M12 14.625L3.75 8.4375V6.75C3.75 5.5088 4.7588 4.5 6 4.5H18C19.2412 4.5 20.25 5.5088 20.25 6.75V8.4375L12 14.625Z" />
                {/* Yellow Top-Right Accent */}
                <path fill="#FBBC05" d="M18 4.5H18.75C19.5784 4.5 20.25 5.17157 20.25 6V7.5L17.25 9.75V4.5H18Z" />
                {/* Dark Red Top-Left Accent */}
                <path fill="#C5221F" d="M6 4.5H5.25C4.42157 4.5 3.75 5.17157 3.75 6V7.5L6.75 9.75V4.5H6Z" />
              </svg>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono font-medium text-rose-300/90 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                Gmail
              </span>
            </a>
          </div>

          {/* Floating Icon 4: INSTAGRAM (Bottom-Right Node) */}
          <div className="absolute top-1/2 left-1/2 translate-x-[110px] translate-y-[80px] sm:translate-x-[190px] sm:translate-y-[110px] z-30 animate-float-organic-4">
            <a
              href={USER_PROFILE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram Profile"
              onMouseEnter={() => setHoveredMedium("instagram")}
              onMouseLeave={() => setHoveredMedium(null)}
              className="relative block pointer-events-auto group/icon"
            >
              <svg className="h-14 w-14 sm:h-20 sm:w-20 fill-pink-400 drop-shadow-[0_4px_25px_rgba(244,114,182,0.5)] transition-all duration-300 group-hover/icon:scale-125 group-hover/icon:drop-shadow-[0_0_40px_rgba(244,114,182,0.95)]" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono font-medium text-pink-300/90 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                Instagram
              </span>
            </a>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* DIRECT SOCKET TRANSMITTER COMPACT CONTAINER IN BOTTOM-RIGHT CORNER       */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isFormOpen ? (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 hover:bg-indigo-500/25 text-xs font-medium text-indigo-300 transition-all cursor-pointer shadow-xl backdrop-blur-2xl group"
          >
            <MessageSquare size={14} className="text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Direct Socket Transmitter</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 p-5 rounded-3xl border border-white/15 bg-[#0D0E14]/95 backdrop-blur-3xl shadow-[0_16px_50px_rgba(0,0,0,0.8)] animate-fade-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-400 font-semibold">
                Direct Socket Transmitter
              </span>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 size={36} className="text-emerald-400 mb-2" />
                <h3 className="text-xs font-bold text-white">Message Transmitted!</h3>
                <p className="text-[10px] text-white/60 mt-1">
                  Sent directly to Sathvik.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Your Name..."
                  className="h-9 rounded-xl border border-white/15 bg-black/50 px-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-indigo-400 transition-all"
                />
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="your.email@domain.com"
                  className="h-9 rounded-xl border border-white/15 bg-black/50 px-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-indigo-400 transition-all"
                />
                <textarea
                  required
                  rows={2}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Write your message..."
                  className="rounded-xl border border-white/15 bg-black/50 p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-indigo-400 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] cursor-pointer mt-1"
                >
                  <Send size={13} />
                  <span>Transmit Packet</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. HIRE CHECK INTERSTITIAL OVERLAY ("HIRE ME?!" WITH PROJECT BANNER STYLE)  */}
      {/* ========================================================================= */}
      {viewMode === "hireCheck" && (
        <div className="fixed inset-0 z-50 bg-[#08090C]/98 backdrop-blur-3xl text-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none" />

          {/* Title Container */}
          <div className="relative flex flex-col items-center justify-center z-10">
            {/* Tiny "wanna" on Top */}
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-indigo-400/90 font-semibold mb-3 sm:mb-4">
              wanna
            </span>

            {/* Big "HIRE ME?!" Title with Light Pink "ME" */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter font-helvetica uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] leading-none">
              <span className="text-white">HIRE </span>
              <span className="text-pink-300 drop-shadow-[0_0_35px_rgba(244,114,182,0.6)]">ME</span>
              <span className="text-white">?!</span>
            </h1>
          </div>

          {/* Two Tiny Sub-sections Below Title */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-12 z-10">
            {/* Tiny Section 1: "sometime later" (Red Accent) */}
            <button
              onClick={() => setViewMode("alertScreen")}
              className="px-6 py-2.5 rounded-full border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 font-mono text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:scale-105 active:scale-95"
            >
              sometime later
            </button>

            {/* Tiny Section 2: "YESS!" (Vibrant Emerald Accent) */}
            <button
              onClick={closeConnectFullPage}
              className="px-8 py-2.5 rounded-full border border-emerald-400/50 bg-emerald-400/15 hover:bg-emerald-400/30 text-emerald-300 font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:scale-105 active:scale-95"
            >
              YESS!
            </button>
          </div>

          {/* Cancel & Return to Connect page link */}
          <button
            onClick={() => setViewMode("connect")}
            className="mt-10 text-xs font-mono text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            ← Return to Connect Page
          </button>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ALERT INTERFACE: BIG ⚠️ ICON + PULSING RED GLOW BACKGROUND             */}
      {/* ========================================================================= */}
      {viewMode === "alertScreen" && (
        <div className="fixed inset-0 z-50 bg-[#0A0304] text-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden animate-fade-in">
          
          {/* INTENSE RED GLOW BLINKING IN THE BACKGROUND ACROSS THE ENTIRE PAGE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[900px] h-[750px] sm:h-[900px] rounded-full bg-rose-600/40 blur-[130px] animate-red-alert-blink pointer-events-none z-0" />

          {/* Alert Canvas Box */}
          <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
            
            {/* Big ⚠️ Warning Symbol with Red Glow & Bounce Physics */}
            <div className="text-7xl sm:text-9xl md:text-[130px] animate-bounce drop-shadow-[0_0_50px_rgba(239,68,68,0.9)] mb-6 select-none">
              ⚠️
            </div>

            {/* Critical Warning Header: "RETHINK YOUR DECISION" */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-rose-500 tracking-[0.3em] uppercase font-bold mb-3">
              <AlertTriangle size={16} className="text-rose-500 animate-pulse" />
              <span>RETHINK YOUR DECISION</span>
            </div>

            {/* Alert Title */}
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-helvetica mb-4 drop-shadow-[0_4px_20px_rgba(239,68,68,0.4)]">
              OPPORTUNITY LOSS IMMINENT
            </h2>

            {/* Warning Message */}
            <p className="text-xs sm:text-sm font-mono text-rose-200/80 leading-relaxed mb-8 max-w-md">
              Delaying Sathvik&apos;s connection may result in schedule saturation! Are you sure you want to postpone hiring?
            </p>

            {/* Interactive Alert Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              {/* Primary Action: Reconsider & Hire Now! */}
              <button
                onClick={closeConnectFullPage}
                className="w-full sm:w-auto px-7 py-3 rounded-full border border-emerald-400/60 bg-emerald-400/20 hover:bg-emerald-400/35 text-emerald-300 font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-[0_0_35px_rgba(52,211,153,0.4)] hover:scale-105 active:scale-95"
              >
                RECONSIDER: YESS!
              </button>

              {/* Secondary Action: Force Exit to Desktop */}
              <button
                onClick={closeConnectFullPage}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400/80 hover:text-rose-300 font-mono text-xs sm:text-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                Exit to Desktop
              </button>
            </div>

            {/* Back to Checkpoint */}
            <button
              onClick={() => setViewMode("hireCheck")}
              className="mt-8 text-xs font-mono text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >
              ← Back to decision
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
