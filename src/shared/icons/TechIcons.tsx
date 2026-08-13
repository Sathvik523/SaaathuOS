import React from "react";

interface Props {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "h-3.5 w-3.5" }: Props) {
  const norm = name.toLowerCase().trim();

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg viewBox="0 0 128 128" className={className}>
        <circle cx="64" cy="64" r="64" fill="#000000" />
        <path d="M 108 108 L 46 28 L 36 28 L 36 100 L 48 100 L 48 48 L 96 108 Z" fill="#FFFFFF" />
        <rect x="80" y="28" width="12" height="48" fill="#FFFFFF" />
      </svg>
    );
  }

  // React
  if (norm.includes("react")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" strokeWidth="6" />
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 50 50)" />
        <circle cx="50" cy="50" r="7" fill="#61DAFB" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" rx="16" fill="#3178C6" />
        <path d="M 22 42 L 52 42 M 37 42 L 37 80" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
        <path d="M 78 50 C 70 42 56 46 58 58 C 60 70 78 68 76 80 C 74 90 56 86 54 80" stroke="#FFFFFF" strokeWidth="9" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M 22 42 C 28 32 38 32 44 38 C 50 44 54 50 64 50 C 74 50 80 40 84 34 C 78 44 68 44 62 38 C 56 32 52 26 42 26 C 32 26 26 36 22 42 Z"
          fill="#38BDF8"
        />
        <path
          d="M 12 64 C 18 54 28 54 34 60 C 40 66 44 72 54 72 C 64 72 70 62 74 56 C 68 66 58 66 52 60 C 46 54 42 48 32 48 C 22 48 16 58 12 64 Z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // Python
  if (norm.includes("python")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M 48 10 C 28 10 26 18 26 26 L 26 36 L 50 36 L 50 40 L 20 40 C 10 40 10 54 10 64 C 10 74 20 74 26 74 L 32 74 L 32 64 C 32 50 40 50 50 50 L 64 50 C 74 50 74 40 74 36 L 74 26 C 74 10 56 10 48 10 Z"
          fill="#3776AB"
        />
        <circle cx="36" cy="22" r="4" fill="#FFFFFF" />
        <path
          d="M 52 90 C 72 90 74 82 74 74 L 74 64 L 50 64 L 50 60 L 80 60 C 90 60 90 46 90 36 C 90 26 80 26 74 26 L 68 26 L 68 36 C 68 50 60 50 50 50 L 36 50 C 26 50 26 60 26 64 L 26 74 C 26 90 44 90 52 90 Z"
          fill="#FFD43B"
        />
        <circle cx="64" cy="78" r="4" fill="#FFFFFF" />
      </svg>
    );
  }

  // Google Cloud / Antigravity / GCP / BigQuery
  if (norm.includes("gcp") || norm.includes("google") || norm.includes("bigquery")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <path d="M 50 18 C 30 18 16 32 16 50 C 16 68 30 82 50 82 C 65 82 78 72 82 58 L 50 58 L 50 44 L 96 44 C 98 48 98 52 98 56 C 98 80 80 98 50 98 C 23 98 2 76 2 50 C 2 23 23 2 50 2 C 64 2 76 7 85 15 L 72 28 C 66 22 59 18 50 18 Z" fill="#4285F4" />
      </svg>
    );
  }

  // FastAPI / WebSockets
  if (norm.includes("fastapi") || norm.includes("socket")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="46" fill="#059669" />
        <path d="M 54 16 L 24 54 L 48 54 L 42 84 L 76 44 L 52 44 Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Apache Spark / dbt
  if (norm.includes("spark") || norm.includes("dbt")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <path d="M 50 10 L 64 38 L 94 42 L 72 64 L 78 94 L 50 78 L 22 94 L 28 64 L 6 42 L 36 38 Z" fill="#FF6B4A" />
      </svg>
    );
  }

  // Zustand / Framer Motion / Redux / State
  if (norm.includes("zustand") || norm.includes("framer") || norm.includes("motion") || norm.includes("state") || norm.includes("redux")) {
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <path d="M 20 20 L 80 20 L 80 50 L 50 50 Z M 20 50 L 50 50 L 80 80 L 20 80 Z" fill="#0055FF" />
      </svg>
    );
  }

  // Default Code Symbol for all other technologies
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect width="100" height="100" rx="20" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="4" />
      <path d="M 35 32 L 18 50 L 35 68 M 65 32 L 82 50 L 65 68 M 55 24 L 45 76" stroke="#60A5FA" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
