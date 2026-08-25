import DockApps from "./DockApps";

export default function Dock() {
  return (
    <div
      className="
        fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end select-none pointer-events-auto
        rounded-[36px] border border-white/10 bg-black/35 px-3.5 py-1.5
        backdrop-blur-3xl backdrop-saturate-[180%] backdrop-brightness-[105%]
        shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),0_20px_50px_0_rgba(0,0,0,0.85)]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
      "
    >
      <DockApps />
    </div>
  );
}