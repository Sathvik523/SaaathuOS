import ExplorerApp from "@/apps/explorer/ExplorerApp";
import GuideApp from "@/apps/guide/GuideApp";
import ResumeApp from "@/apps/resume/ResumeApp";
import AboutApp from "@/apps/about/AboutApp";
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
    id: "about",
    name: "About Me",
    description: "Who I am, what I'm studying, and what I've built.",
    icon: PhotosIcon as unknown as Application["icon"],
    component: AboutApp,
    showInDock: true,
    defaultWindow: {
      width: 940,
      height: 660,
    },
  },
  {
    id: "resume",
    name: "Résumé",
    description: "Education, experience, research projects and technical skills.",
    icon: NotesIcon as unknown as Application["icon"],
    component: ResumeApp,
    showInDock: true,
    defaultWindow: {
      width: 880,
      height: 680,
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
    id: "guide",
    name: "Portfolio Documents",
    description: "How this portfolio was built, how to make it yours, and how to get unstuck.",
    icon: FolderIcon as unknown as Application["icon"],
    component: GuideApp,
    showInDock: true,
    defaultWindow: {
      width: 1080,
      height: 724,
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