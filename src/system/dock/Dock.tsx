import DockApps from "./DockApps";

export default function Dock() {
  return (
    <div
      className="
        fixed bottom-2.5 left-1/2 z-50 flex -translate-x-1/2 items-end select-none pointer-events-auto
        rounded-2xl border border-white/[0.06] bg-white/[0.035] px-4 py-2
        backdrop-blur-[20px] backdrop-saturate-[140%]
        shadow-[0_4px_24px_rgba(0,0,0,0.45)]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
      "
    >
      <DockApps />
    </div>
  );
}