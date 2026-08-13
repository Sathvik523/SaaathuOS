"use client";

import { WindowManager } from "@/system/window-manager";

export default function WindowLayer() {
  return (
    <div className="absolute inset-0">
      <WindowManager />
    </div>
  );
}