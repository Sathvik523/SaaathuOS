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
        backgroundColor: "var(--topbar-bg)",
        backdropFilter: "blur(var(--glass-blur, 20px))",
        WebkitBackdropFilter: "blur(var(--glass-blur, 20px))",
        borderBottom: "1px solid var(--glass-border)",
        boxShadow: "none",
        overflow: "hidden",
        zIndex: 999999,
      }}
      className="flex h-[28px] items-center justify-between select-none antialiased font-system"
    >
      <LeftSection />
      <RightSection />
    </header>
  );
}