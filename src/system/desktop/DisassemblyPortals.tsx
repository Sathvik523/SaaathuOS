"use client";

import { useWindowManager } from "@/system/window-manager";

// The Projects / Connect intro portals. These live outside the desktop's fading layer
// (and above the windows) so they stay visible while the rest of the desktop goes dark.
export default function DisassemblyPortals() {
  const { disassemblyStep, connectDisassemblyStep } = useWindowManager();

  const isDesktopDimmed = disassemblyStep >= 2;
  const isConnectDimmed = connectDisassemblyStep >= 2;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FULL-SCREEN DEAD-CENTER PORTAL OVERLAY FOR PROJECTS (STEP 2+)          */}
      {/* ========================================================================= */}
      {isDesktopDimmed && (
        <div className="fixed inset-0 z-[650] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="relative flex flex-col items-center justify-center animate-projects-condense transform-gpu">
            
            {/* 5 CONCENTRIC DOTTED CIRCULAR LAYERS WITH ULTRA-SMOOTH OUTWARD RADIAL WAVE PROPAGATION */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              
              {/* Shockwave Expanding Aura Past Ring 5 */}
              <div className="absolute h-[380px] w-[380px] rounded-full border border-cyan-400/40 bg-cyan-500/10 blur-xl animate-radial-wave-aura-5 pointer-events-none" />
              
              {/* Extremely Soft Submerged Ambient Glow */}
              <div className="absolute h-[240px] w-[240px] rounded-full bg-cyan-500/10 blur-3xl opacity-20 pointer-events-none" />

              {/* Layer 1 (Inner Ring 100px): Wave Stage 1 */}
              <div className="absolute animate-radial-wave-1">
                <svg className="w-[210px] h-[210px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 210 210">
                  <circle cx="105" cy="105" r="100" fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeDasharray="3 18" opacity="0.85" />
                </svg>
              </div>

              {/* Layer 2 (Inner-Mid Ring 145px): Wave Stage 2 */}
              <div className="absolute animate-radial-wave-2">
                <svg className="w-[300px] h-[300px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 300 300">
                  <circle cx="150" cy="150" r="145" fill="none" stroke="#38bdf8" strokeWidth="2.8" strokeDasharray="3 22" opacity="0.75" />
                </svg>
              </div>

              {/* Layer 3 (Center-Mid Ring 190px): Wave Stage 3 */}
              <div className="absolute animate-radial-wave-3">
                <svg className="w-[390px] h-[390px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 390 390">
                  <circle cx="195" cy="195" r="190" fill="none" stroke="#38bdf8" strokeWidth="2.6" strokeDasharray="3 24" opacity="0.65" />
                </svg>
              </div>

              {/* Layer 4 (Outer-Mid Ring 240px): Wave Stage 4 */}
              <div className="absolute animate-radial-wave-4">
                <svg className="w-[490px] h-[490px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 490 490">
                  <circle cx="245" cy="245" r="240" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="3 28" opacity="0.55" />
                </svg>
              </div>

              {/* Layer 5 (Outer Ring 295px): Wave Stage 5 */}
              <div className="absolute animate-radial-wave-5">
                <svg className="w-[600px] h-[600px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 600 600">
                  <circle cx="300" cy="300" r="295" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="3 32" opacity="0.45" />
                </svg>
              </div>
            </div>

            {/* Stretched Lowercase Helvetica "taking you in.." Headline */}
            <span className="relative z-10 inline-block font-helvetica text-2xl sm:text-3xl md:text-4xl font-medium text-white/95 lowercase scale-x-[1.25] transform-gpu drop-shadow-[0_2px_20px_rgba(56,189,248,0.5)] tracking-normal">
              opening the projects
            </span>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FULL-SCREEN DEAD-CENTER PORTAL OVERLAY FOR CONNECT (CONNECT STEP 2+)   */}
      {/* ========================================================================= */}
      {isConnectDimmed && (
        <div className="fixed inset-0 z-[650] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="relative flex flex-col items-center justify-center animate-connect-condense transform-gpu">
            
            {/* 5 CONCENTRIC INDIGO/CYAN SVG DOTTED CIRCULAR LAYERS WITH OUTWARD RADIAL WAVE PROPAGATION */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              
              {/* Shockwave Expanding Aura Past Ring 5 */}
              <div className="absolute h-[400px] w-[400px] rounded-full border border-indigo-400/40 bg-indigo-500/10 blur-xl animate-radial-wave-aura-5 pointer-events-none" />

              {/* Extremely Soft Submerged Indigo Ambient Glow */}
              <div className="absolute h-[260px] w-[260px] rounded-full bg-indigo-500/15 blur-3xl opacity-20 pointer-events-none" />

              {/* Layer 1 (Inner Ring 105px): Wave Stage 1 */}
              <div className="absolute animate-radial-wave-1">
                <svg className="w-[220px] h-[220px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="105" fill="none" stroke="#818cf8" strokeWidth="3.2" strokeDasharray="3 18" opacity="0.85" />
                </svg>
              </div>

              {/* Layer 2 (Inner-Mid Ring 155px): Wave Stage 2 */}
              <div className="absolute animate-radial-wave-2">
                <svg className="w-[320px] h-[320px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 320 320">
                  <circle cx="160" cy="160" r="155" fill="none" stroke="#6366f1" strokeWidth="2.8" strokeDasharray="3 22" opacity="0.75" />
                </svg>
              </div>

              {/* Layer 3 (Center-Mid Ring 205px): Wave Stage 3 */}
              <div className="absolute animate-radial-wave-3">
                <svg className="w-[420px] h-[420px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 420 420">
                  <circle cx="210" cy="210" r="205" fill="none" stroke="#4f46e5" strokeWidth="2.6" strokeDasharray="3 26" opacity="0.65" />
                </svg>
              </div>

              {/* Layer 4 (Outer-Mid Ring 260px): Wave Stage 4 */}
              <div className="absolute animate-radial-wave-4">
                <svg className="w-[530px] h-[530px] animate-spin-reverse-slow overflow-visible pointer-events-none" viewBox="0 0 530 530">
                  <circle cx="265" cy="265" r="260" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="3 30" opacity="0.55" />
                </svg>
              </div>

              {/* Layer 5 (Outer Ring 320px): Wave Stage 5 */}
              <div className="absolute animate-radial-wave-5">
                <svg className="w-[650px] h-[650px] animate-spin-slow overflow-visible pointer-events-none" viewBox="0 0 650 650">
                  <circle cx="325" cy="325" r="320" fill="none" stroke="#0ea5e9" strokeWidth="2.2" strokeDasharray="3 34" opacity="0.45" />
                </svg>
              </div>
            </div>

            {/* Headline: "opening the ways to connect", with "connect" picked out in indigo */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 max-w-xl text-center px-4 font-helvetica text-2xl sm:text-3xl md:text-4xl font-medium text-white/95 lowercase scale-x-[1.12] transform-gpu drop-shadow-[0_2px_22px_rgba(129,140,248,0.5)] tracking-normal">
              <span>opening the ways to</span>
              <span className="text-indigo-400 font-bold drop-shadow-[0_0_20px_rgba(129,140,248,0.9)]">
                connect
              </span>
            </div>

          </div>
        </div>
      )}

    </>
  );
}
