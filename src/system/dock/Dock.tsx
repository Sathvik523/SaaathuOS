import DockApps from "./DockApps";

export default function Dock() {
  return (
    <div
      className="
        fixed bottom-2 left-1/2 z-50 flex -translate-x-1/2 items-end select-none pointer-events-auto
        rounded-[36px] border border-white/[0.05] bg-white/[0.03] px-3 py-1.5
        backdrop-blur-[52px] backdrop-saturate-[180%] backdrop-brightness-[108%]
        shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06),0_8px_30px_0_rgba(0,0,0,0.05)]
        transition-all duration-240 ease-[cubic-bezier(0.16,1,0.3,1)]
        before:absolute before:top-0 before:left-0 before:right-0 before:h-[25%] before:bg-gradient-to-b before:from-white/[0.04] before:to-transparent before:rounded-t-[36px] before:pointer-events-none
      "
    >
      <DockApps />
    </div>
  );
}