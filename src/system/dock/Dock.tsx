import DockApps from "./DockApps";

export default function Dock() {
  return (
    <div
      className="
        fixed
        bottom-5
        left-1/2
        z-50
        flex
        -translate-x-1/2
        items-center
        gap-2
        rounded-3xl
        border
        border-white/10
        bg-white/10
        px-3
        py-2
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <DockApps />
    </div>
  );
}