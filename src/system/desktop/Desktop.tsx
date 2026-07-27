import DesktopLayer from "./DesktopLayer";
import WindowLayer from "./WindowLayer";

export default function Desktop() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <DesktopLayer />
      <WindowLayer />
    </div>
  );
}