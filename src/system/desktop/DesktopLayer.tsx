// Desktop widgets are rendered once, by DesktopShell (above the fading layer); rendering
// them here too stacked a second, independently swinging copy with doubled glows.
export default function DesktopLayer() {
  return <main className="relative h-full w-full" />;
}
