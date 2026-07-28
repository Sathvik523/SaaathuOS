import Desktop from "./Desktop";
import Wallpaper from "./Wallpaper";

import { MenuBar } from "./menu-bar";

export default function DesktopShell() {
  return (
    <>
      <Wallpaper />
      <MenuBar />
      <Desktop />
    </>
  );
}