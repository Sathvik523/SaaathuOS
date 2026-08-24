import ExplorerApp from "@/apps/explorer/ExplorerApp";
import ProjectsApp from "@/apps/projects/ProjectsApp";
import TerminalApp from "@/apps/terminal/TerminalApp";
import SettingsApp from "@/apps/settings/SettingsApp";
import { Application } from "@/types/application";

import {
  FinderIcon,
  FolderIcon,
  VSCodeIcon,
  NotesIcon,
  PhotosIcon,
  SettingsIcon,
  TrashIcon,
} from "@/shared/icons/MacIcons";

export const applications: Application[] = [
  {
    id: "explorer",
    name: "Finder",
    description: "Browse files, project source code, and portfolio documents.",
    icon: FinderIcon as any,
    component: ExplorerApp,
    showInDock: true,
    defaultWindow: {
      width: 960,
      height: 620,
    },
  },
  {
    id: "projects",
    name: "Projects",
    description: "Showcase of featured engineering projects and live demos.",
    icon: VSCodeIcon as any,
    component: ProjectsApp,
    showInDock: true,
    defaultWindow: {
      width: 1020,
      height: 660,
    },
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Interactive zsh command line interface.",
    icon: NotesIcon as any,
    component: TerminalApp,
    showInDock: true,
    defaultWindow: {
      width: 750,
      height: 480,
    },
  },
  {
    id: "settings",
    name: "System Settings",
    description: "Configure system preferences and view system information.",
    icon: SettingsIcon as any,
    component: SettingsApp,
    showInDock: true,
    defaultWindow: {
      width: 720,
      height: 520,
    },
  },
];