import MenuBarLeft from "./MenuBarLeft";
import MenuBarRight from "./MenuBarRight";

export default function MenuBar() {
  return (
    <header
      className="
        absolute
        top-0
        left-0
        z-50
        flex
        h-10
        w-full
        items-center
        justify-between
        border-b
        border-white/10
        bg-black/25
        px-6
        text-sm
        text-white
        backdrop-blur-xl
      "
    >
      <MenuBarLeft />
      <MenuBarRight />
    </header>
  );
}