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
        backgroundColor: "rgba(0, 0, 0, 0.40)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
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