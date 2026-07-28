import { LucideIcon } from "lucide-react";

interface DockItemProps {
  icon: LucideIcon;
  label: string;
}

export default function DockItem({
  icon: Icon,
  label,
}: DockItemProps) {
  return (
    <button
      className="
        group
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        transition-all
        duration-200
        hover:-translate-y-1
        hover:scale-110
        hover:bg-white/10
      "
      aria-label={label}
      title={label}
    >
      <Icon
        size={28}
        className="text-white"
      />
    </button>
  );
}