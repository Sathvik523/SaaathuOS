"use client";

import { applications } from "@/system/registry/applications";
import useWindowManager from "./useWindowManager";
import WindowFrame from "./WindowFrame";
import WindowTitleBar from "./WindowTitleBar";

interface WindowProps {
  windowId: string;
}

export default function Window({ windowId }: WindowProps) {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    setActiveWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const window = windows.find((w) => w.id === windowId);
  if (!window) return null;

  const application = applications.find((app) => app.id === window.applicationId);
  if (!application) return null;

  const AppComponent = application.component;

  return (
    <WindowFrame
      active={window.isActive}
      isMinimized={window.isMinimized}
      isMaximized={window.isMaximized}
      isClosing={window.isClosing}
      isMinimizing={window.isMinimizing}
      position={window.position}
      size={window.size}
      zIndex={window.zIndex}
      onFocus={() => setActiveWindow(window.id)}
      onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
      onSizeChange={(size) => updateWindowSize(window.id, size)}
    >
      {(dragHandleProps) => (
        <div className="flex h-full w-full flex-col overflow-hidden">
          <WindowTitleBar
            title={window.title}
            active={window.isActive}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onMouseDown={dragHandleProps.onMouseDown}
          />
          <div className="flex-1 overflow-auto bg-[#121316]/90 text-white select-text">
            <AppComponent />
          </div>
        </div>
      )}
    </WindowFrame>
  );
}