import { MacOSGlassIconTile } from "./MacIcons";

export default function PlaceholderIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <MacOSGlassIconTile className={className} accentGradient="from-zinc-500/35 to-zinc-800/50">
      <span className="text-lg font-bold text-white tracking-tight">E</span>
    </MacOSGlassIconTile>
  );
}