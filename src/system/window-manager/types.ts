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
  disassemblyStep: 0 | 1 | 2 | 3 | 4;
  connectDisassemblyStep: 0 | 1 | 2 | 3 | 4;
  isProjectsFullPageOpen: boolean;
  isConnectFullPageOpen: boolean;
  isDesktopDisassembling: boolean;
  openProjectsFullPage: () => void;
  closeProjectsFullPage: () => void;
  openConnectFullPage: () => void;
  closeConnectFullPage: () => void;
  openWindow: (applicationId: string) => void;
  closeWindow: (windowId: string) => void;
  setActiveWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  toggleMinimizeWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
}