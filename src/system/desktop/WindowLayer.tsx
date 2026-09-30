"use client";

import { WindowManager } from "@/system/window-manager";

export default function WindowLayer() {
  // This layer spans the screen, so it must let clicks through to the desktop behind
  // it — each window frame re-enables pointer events for itself.
  return (
    <div className="absolute inset-0 pointer-events-none">
      <WindowManager />
    </div>
  );
}
