import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

export default function MenuBar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "var(--topbar-height, 28px)",
        borderBottom: "1px solid var(--glass-border)",
        boxShadow: "none",
        zIndex: 999999,
      }}
      className="flex h-[28px] items-center justify-between select-none antialiased font-system"
    >
      {/* Glass layer lives on its own element: a backdrop-filter on the header itself would
          trap the fixed-position dropdowns and click-outside overlays inside the 28px bar */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundColor: "var(--topbar-bg)",
          backdropFilter: "blur(var(--glass-blur, 20px))",
          WebkitBackdropFilter: "blur(var(--glass-blur, 20px))",
        }}
      />
      <LeftSection />
      <RightSection />
    </header>
  );
}