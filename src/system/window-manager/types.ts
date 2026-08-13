export interface WindowInstance {
  id: string;
  applicationId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing?: boolean;
  isMinimizing?: boolean;
  zIndex: number;
}

export interface WindowContextType {
  windows: WindowInstance[];
  activeWindowId: string | null;
  openWindow: (applicationId: string) => void;
  closeWindow: (windowId: string) => void;
  setActiveWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  toggleMinimizeWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
}