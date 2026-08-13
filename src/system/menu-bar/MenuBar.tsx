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
        height: "var(--topbar-height, 32px)",
        backgroundColor: "var(--topbar-bg, #000000)",
        border: "none",
        boxShadow: "none",
        overflow: "hidden",
        zIndex: 999999,
      }}
      className="flex h-[32px] items-center justify-between select-none antialiased"
    >
      <LeftSection />
      <RightSection />
    </header>
  );
}