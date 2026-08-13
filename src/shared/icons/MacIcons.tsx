import React from "react";

// Nearly Invisible Liquid Glass Squircle Tile Wrapper matching exact parameters
export function MacOSGlassIconTile({
  children,
  className = "h-13 w-13",
  accentGradient = "from-sky-400/[0.06] to-blue-500/[0.06]",
  borderColor = "border-white/[0.05]",
}: {
  children: React.ReactNode;
  className?: string;
  accentGradient?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={`
        group relative flex items-center justify-center rounded-[22px] select-none
        border ${borderColor} bg-gradient-to-br ${accentGradient} bg-white/[0.04]
        backdrop-blur-[52px] backdrop-saturate-[180%] backdrop-brightness-[108%]
        shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_30px_0_rgba(0,0,0,0.05)]
        transition-all duration-240 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:scale-[1.03] hover:-translate-y-[3px] hover:border-white/[0.10] hover:bg-white/[0.07]
        hover:backdrop-blur-[58px] hover:backdrop-brightness-[112%]
        overflow-hidden ${className}
      `}
    >
      {/* 1. Faint Top Highlight (25% Height, 4% Opacity) */}
      <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none rounded-t-[22px]" />

      {/* 2. Soft Ambient Edge Accent */}
      <div className="absolute inset-0 rounded-[22px] bg-white/[0.02] pointer-events-none" />

      {/* 3. Icon Content (Vivid icons inside nearly invisible thin glass squircle tile) */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-2.5">
        {children}
      </div>
    </div>
  );
}

export function FinderIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-[#25A6F6]/[0.08] to-[#0066CC]/[0.08]"
      borderColor="border-sky-300/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,102,204,0.2)]">
        <defs>
          <linearGradient id="finderFaceLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7CD2FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E82D9" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M 50 15 C 45 35 35 45 25 50 C 35 55 45 65 50 85"
          stroke="#0A3E75"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50 15 C 45 35 35 45 25 50 C 35 55 45 65 50 85 L 27 85 C 15 85 15 85 10 75 L 10 25 C 15 15 15 15 27 15 Z"
          fill="url(#finderFaceLeft)"
        />
        <circle cx="33" cy="38" r="5" fill="#0A3E75" />
        <circle cx="67" cy="38" r="5" fill="#0A3E75" />
        <path
          d="M 28 62 Q 50 80 72 62"
          stroke="#0A3E75"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </MacOSGlassIconTile>
  );
}

export function FolderIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-[#55BDFF]/[0.08] to-[#0080E6]/[0.08]"
      borderColor="border-cyan-300/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,128,230,0.2)]">
        <defs>
          <linearGradient id="folderBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#68C7FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0077D9" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#55BDFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0080E6" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path d="M 10 28 C 10 23 14 20 20 20 L 40 20 L 48 26 L 80 26 C 86 26 90 30 90 36 L 90 76 C 90 82 86 86 80 86 L 20 86 C 14 86 10 82 10 76 Z" fill="url(#folderBack)" />
        <path d="M 8 36 C 8 32 12 30 18 30 L 82 30 C 88 30 92 32 92 36 L 90 78 C 90 84 86 88 80 88 L 20 88 C 14 88 10 84 10 78 Z" fill="url(#folderFront)" />
      </svg>
    </MacOSGlassIconTile>
  );
}

export function NotesIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-[#FFDE59]/[0.08] to-[#FF9900]/[0.08]"
      borderColor="border-amber-300/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,153,0,0.2)]">
        <defs>
          <linearGradient id="notesHeader" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDE59" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" rx="18" fill="#F8F8F0" fillOpacity="0.8" />
        <path d="M 10 28 C 10 18 18 10 28 10 L 72 10 C 82 10 90 18 90 28 L 90 32 L 10 32 Z" fill="url(#notesHeader)" />
        <line x1="20" y1="46" x2="80" y2="46" stroke="#D1D1D6" strokeWidth="2" />
        <line x1="20" y1="58" x2="80" y2="58" stroke="#D1D1D6" strokeWidth="2" />
        <line x1="20" y1="70" x2="80" y2="70" stroke="#D1D1D6" strokeWidth="2" />
      </svg>
    </MacOSGlassIconTile>
  );
}

export function VSCodeIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-[#1E82D9]/[0.08] to-[#0E0E0E]/[0.20]"
      borderColor="border-blue-400/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,101,169,0.2)]">
        <path d="M 72 18 L 52 35 L 30 22 L 20 28 L 20 72 L 30 78 L 52 65 L 72 82 L 82 76 L 82 24 Z" fill="#0065A9" />
        <path d="M 72 18 L 82 24 L 82 76 L 72 82 L 52 50 Z" fill="#007ACC" />
        <path d="M 52 50 L 30 22 L 20 28 L 42 50 L 20 72 L 30 78 Z" fill="#1F9CF0" />
      </svg>
    </MacOSGlassIconTile>
  );
}

export function PhotosIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-pink-500/[0.08] via-purple-500/[0.08] to-indigo-500/[0.08]"
      borderColor="border-pink-300/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,59,48,0.2)]">
        <ellipse cx="50" cy="35" rx="10" ry="18" fill="#FF3B30" />
        <ellipse cx="65" cy="40" rx="10" ry="18" fill="#FF9500" transform="rotate(45 65 40)" />
        <ellipse cx="65" cy="60" rx="10" ry="18" fill="#FFCC00" transform="rotate(90 65 60)" />
        <ellipse cx="50" cy="65" rx="10" ry="18" fill="#34C759" transform="rotate(135 50 65)" />
        <ellipse cx="35" cy="60" rx="10" ry="18" fill="#007AFF" transform="rotate(180 35 60)" />
        <ellipse cx="35" cy="40" rx="10" ry="18" fill="#5856D6" transform="rotate(225 35 40)" />
      </svg>
    </MacOSGlassIconTile>
  );
}

export function SettingsIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-[#A8B0B8]/[0.08] to-[#6C757D]/[0.08]"
      borderColor="border-slate-300/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(108,117,125,0.2)]">
        <circle cx="50" cy="50" r="28" fill="#3A3F45" />
        <path
          d="M 50 16 L 50 24 M 50 76 L 50 84 M 16 50 L 24 50 M 76 50 L 84 50 M 26 26 L 32 32 M 68 68 L 74 74 M 74 26 L 68 32 M 26 74 L 32 68"
          stroke="#E5E5EA"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="14" fill="#6C757D" />
      </svg>
    </MacOSGlassIconTile>
  );
}

export function TrashIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile
      className={className}
      accentGradient="from-[#E5E5EA]/[0.08] to-[#8E8E93]/[0.08]"
      borderColor="border-gray-300/[0.06]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]">
        <path d="M 30 30 L 35 80 C 35 84 40 86 50 86 C 60 86 65 84 65 80 L 70 30 Z" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        <ellipse cx="50" cy="30" rx="20" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        <line x1="42" y1="35" x2="44" y2="78" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        <line x1="50" y1="35" x2="50" y2="78" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        <line x1="58" y1="35" x2="56" y2="78" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        <circle cx="48" cy="45" r="8" fill="#FFFFFF" opacity="0.9" />
        <circle cx="54" cy="52" r="6" fill="#FFFFFF" opacity="0.7" />
      </svg>
    </MacOSGlassIconTile>
  );
}
