import Desktop from "./Desktop";
import Wallpaper from "./Wallpaper";

import { MenuBar } from "@/system/menu-bar";
import { Dock } from "@/system/dock";

export default function DesktopShell() {
  return (
    <>
      <Wallpaper />
      <MenuBar />
      <Desktop />
      <Dock />
    </>
  );
}