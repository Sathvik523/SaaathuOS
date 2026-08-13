import React from "react";

// Notion SF Symbol
export function NotionSymbol({ size = 22, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4.5 4.5C4.5 3.67157 5.17157 3 6 3H18C18.8284 3 19.5 3.67157 19.5 4.5V19.5C19.5 20.3284 18.8284 21 18 21H6C5.17157 21 4.5 20.3284 4.5 19.5V4.5Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 7.5V16.5M8.5 7.5L15.5 16.5M15.5 7.5V16.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arc Browser SF Symbol
export function ArcSymbol({ size = 22, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="2.2" />
      <path d="M12 3.5C14.5 7 14.5 17 12 20.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3.5 12H20.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Finder / Application SF Symbol
export function FinderAppSymbol({ size = 22, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke={color} strokeWidth="2.2" />
      <path d="M12 3.5C10.5 8 9.5 11 8.5 12C9.5 13 10.5 16 12 20.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="8" cy="9" r="1.2" fill={color} />
      <circle cx="16" cy="9" r="1.2" fill={color} />
      <path d="M7.5 15.5C10 18.5 14 18.5 16.5 15.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Cloud Sync SF Symbol
export function CloudSyncSymbol({ size = 22, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6.5 17.5C4.29086 17.5 2.5 15.7091 2.5 13.5C2.5 11.5173 3.9427 9.8719 5.85698 9.56475C6.41705 6.6433 8.95015 4.5 12 4.5C15.5899 4.5 18.5 7.41015 18.5 11C20.433 11 22 12.567 22 14.5C22 16.433 20.433 18 18.5 18H6.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="3" y1="3" x2="21" y2="21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Play SF Symbol
export function PlaySymbol({ size = 22, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 4.5V19.5L19 12L7 4.5Z"
        fill={color}
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Apple Battery SF Symbol (Exact 24px x 20px, 2px outline, charging bolt)
export function AppleBatterySymbol({
  width = 24,
  height = 20,
  level = 66,
  charging = false,
  color = "#FFFFFF",
  className = "",
}: {
  width?: number;
  height?: number;
  level?: number;
  charging?: boolean;
  color?: string;
  className?: string;
}) {
  const fillWidth = Math.max(2, Math.min(14, (level / 100) * 14));

  return (
    <svg width={width} height={height} viewBox="0 0 24 20" fill="none" className={className}>
      {/* Battery Body Outline */}
      <rect x="2" y="4" width="17" height="12" rx="3" stroke={color} strokeWidth="2" />
      {/* Battery Tip */}
      <path d="M21 7.5V12.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Inner Fill */}
      <rect x="3.5" y="5.5" width={fillWidth} height="9" rx="1.5" fill={color} />
      {/* Charging Bolt */}
      {charging && (
        <path
          d="M11 5L8.5 10.5H11.5L10 15.5L14 9.5H11L12.5 5H11Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="0.5"
        />
      )}
    </svg>
  );
}

// Apple WiFi Filled SF Symbol
export function AppleWifiSymbol({ size = 24, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" fill={color} />
      <path d="M7.75736 12.7574C10.1005 10.4142 13.8995 10.4142 16.2426 12.7574" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4.92893 9.92893C8.83418 6.02369 15.1658 6.02369 19.0711 9.92893" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M2.10051 7.10051C7.56784 1.63317 16.4322 1.63317 21.8995 7.10051" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

// Apple Control Center SF Symbol (2 vertical sliders, rounded edges, stroke 2px)
export function AppleControlCenterSymbol({ size = 24, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Left Slider */}
      <rect x="5" y="4" width="6" height="16" rx="3" stroke={color} strokeWidth="2" />
      <circle cx="8" cy="9" r="2" fill={color} />
      {/* Right Slider */}
      <rect x="13" y="4" width="6" height="16" rx="3" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="15" r="2" fill={color} />
    </svg>
  );
}
