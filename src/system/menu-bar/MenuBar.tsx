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
        zIndex: 999999,
      }}
      className="flex h-[28px] items-center justify-between px-[14px] py-1 select-none antialiased font-system"
    >
      <LeftSection />
      <RightSection />
    </header>
  );
}