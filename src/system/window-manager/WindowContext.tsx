"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { applications } from "@/system/registry/applications";
import { WindowContextType, WindowInstance } from "./types";

export const WindowContext = createContext<WindowContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function WindowProvider({ children }: Props) {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(100);
  const [isProjectsFullPageOpen, setIsProjectsFullPageOpen] = useState(false);
  const [isConnectFullPageOpen, setIsConnectFullPageOpen] = useState(false);
  const [isDesktopDisassembling, setIsDesktopDisassembling] = useState(false);
  const [disassemblyStep, setDisassemblyStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [connectDisassemblyStep, setConnectDisassemblyStep] = useState<0 | 1 | 2 | 3 | 4>(0);

  const openProjectsFullPage = useCallback(() => {
    setIsDesktopDisassembling(true);

    // STEP 1 (0ms -> 1200ms): Dock icons fly off in random 3D directions & GitHub thread stretches & pulls back into top
    setDisassemblyStep(1);

    // STEP 2 (1200ms -> 1600ms): Everything else on screen dims into pitch black darkness EXCEPT Projects portal
    setTimeout(() => {
      setDisassemblyStep(2);
    }, 1200);

    // STEP 3 (1600ms -> 7200ms): 6.5s Choreographed Motion: Glide to center -> 4.7s Hold in center with 5 revolving wave rings -> Seamless convergence
    setTimeout(() => {
      setDisassemblyStep(3);
    }, 1600);

    // STEP 4 (7200ms): Fresh Projects page rolls UP seamlessly with ZERO blank screen delay!
    setTimeout(() => {
      setDisassemblyStep(4);
      setIsProjectsFullPageOpen(true);
    }, 7200);
  }, []);

  const closeProjectsFullPage = useCallback(() => {
    setIsProjectsFullPageOpen(false);
    setTimeout(() => {
      setIsDesktopDisassembling(false);
      setDisassemblyStep(0);
    }, 1200);
  }, []);

  const openConnectFullPage = useCallback(() => {
    setIsDesktopDisassembling(true);

    // STEP 1 (0ms -> 1200ms): GitHub widget thread stretches & lifts up, dock icons fly off
    setConnectDisassemblyStep(1);

    // STEP 2 (1200ms -> 1600ms): Desktop dims into pitch black darkness
    setTimeout(() => {
      setConnectDisassemblyStep(2);
    }, 1200);

    // STEP 3 (1600ms -> 7200ms): Intro portal animation displaying "gathering the sockets for you to connect" with Indigo text & 5 wave rings
    setTimeout(() => {
      setConnectDisassemblyStep(3);
    }, 1600);

    // STEP 4 (7200ms): Connect page glides in smoothly from the RIGHT side of screen with ZERO blank screen delay!
    setTimeout(() => {
      setConnectDisassemblyStep(4);
      setIsConnectFullPageOpen(true);
    }, 7200);
  }, []);

  const closeConnectFullPage = useCallback(() => {
    setIsConnectFullPageOpen(false);
    setTimeout(() => {
      setIsDesktopDisassembling(false);
      setConnectDisassemblyStep(0);
    }, 1200);
  }, []);

  const activeWindowId = useMemo(() => {
    const activeWindow = windows.find((w) => w.isActive && !w.isMinimized && !w.isClosing);
    return activeWindow ? activeWindow.id : null;
  }, [windows]);

  const setActiveWindow = useCallback(
    (windowId: string) => {
      setHighestZIndex((prev) => {
        const nextZ = Math.max(100, prev) + 1;
        setWindows((previous) =>
          previous.map((win) => {
            if (win.id === windowId) {
              return {
                ...win,
                isActive: true,
                isMinimized: false,
                isClosing: false,
                isMinimizing: false,
                zIndex: nextZ,
              };
            }
            return {
              ...win,
              isActive: false,
            };
          })
        );
        return nextZ;
      });
    },
    []
  );

  // Smooth Closing Animation
  const closeWindow = useCallback((windowId: string) => {
    setWindows((previous) =>
      previous.map((win) => (win.id === windowId ? { ...win, isClosing: true } : win))
    );

    setTimeout(() => {
      setWindows((previous) => previous.filter((win) => win.id !== windowId));
    }, 220);
  }, []);

  // Smooth Minimizing Animation (Genie Scale down to Dock)
  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((previous) =>
      previous.map((win) => (win.id === windowId ? { ...win, isMinimizing: true } : win))
    );

    setTimeout(() => {
      setWindows((previous) => {
        const updated = previous.map((win) =>
          win.id === windowId ? { ...win, isMinimized: true, isMinimizing: false, isActive: false } : win
        );
        const visible = updated.filter((w) => !w.isMinimized && !w.isClosing);
        if (visible.length > 0) {
          const topVisible = visible.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), visible[0]);
          return updated.map((w) => (w.id === topVisible.id ? { ...w, isActive: true } : w));
        }
        return updated;
      });
    }, 240);
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((previous) =>
      previous.map((win) =>
        win.id === windowId ? { ...win, isMaximized: !win.isMaximized } : win
      )
    );
  }, []);

  const toggleMinimizeWindow = useCallback(
    (windowId: string) => {
      const win = windows.find((w) => w.id === windowId);
      if (!win) return;

      if (win.isMinimized) {
        setActiveWindow(windowId);
      } else if (win.isActive) {
        minimizeWindow(windowId);
      } else {
        setActiveWindow(windowId);
      }
    },
    [windows, setActiveWindow, minimizeWindow]
  );

  const openWindow = useCallback(
    (applicationId: string) => {
      if (applicationId === "projects") {
        openProjectsFullPage();
        return;
      }

      if (applicationId === "connect" || applicationId === "github") {
        openConnectFullPage();
        return;
      }

      const application = applications.find((app) => app.id === applicationId);
      if (!application) return;

      const existingWindow = windows.find((w) => w.applicationId === applicationId);

      if (existingWindow) {
        setActiveWindow(existingWindow.id);
        return;
      }

      // Compute initial cascading position
      const windowCount = windows.length;
      const offsetX = 100 + (windowCount % 4) * 36;
      const offsetY = 80 + (windowCount % 4) * 32;

      const newZ = Math.max(100, highestZIndex) + 1;
      setHighestZIndex(newZ);

      const newWindow: WindowInstance = {
        id: crypto.randomUUID(),
        applicationId,
        title: application.name,
        size: {
          width: application.defaultWindow.width,
          height: application.defaultWindow.height,
        },
        position: {
          x: offsetX,
          y: offsetY,
        },
        isActive: true,
        isMinimized: false,
        isMaximized: false,
        isClosing: false,
        isMinimizing: false,
        zIndex: newZ,
      };

      setWindows((previous) => [
        ...previous.map((w) => ({ ...w, isActive: false })),
        newWindow,
      ]);
    },
    [windows, highestZIndex, setActiveWindow, openProjectsFullPage, openConnectFullPage]
  );

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows((previous) =>
      previous.map((win) => (win.id === windowId ? { ...win, position } : win))
    );
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows((previous) =>
      previous.map((win) => (win.id === windowId ? { ...win, size } : win))
    );
  }, []);

  const value = useMemo(
    () => ({
      windows,
      activeWindowId,
      disassemblyStep,
      connectDisassemblyStep,
      isProjectsFullPageOpen,
      isConnectFullPageOpen,
      isDesktopDisassembling,
      openProjectsFullPage,
      closeProjectsFullPage,
      openConnectFullPage,
      closeConnectFullPage,
      openWindow,
      closeWindow,
      setActiveWindow,
      minimizeWindow,
      maximizeWindow,
      toggleMinimizeWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      windows,
      activeWindowId,
      disassemblyStep,
      connectDisassemblyStep,
      isProjectsFullPageOpen,
      isConnectFullPageOpen,
      isDesktopDisassembling,
      openProjectsFullPage,
      closeProjectsFullPage,
      openConnectFullPage,
      closeConnectFullPage,
      openWindow,
      closeWindow,
      setActiveWindow,
      minimizeWindow,
      maximizeWindow,
      toggleMinimizeWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
}