import { FolderOpen } from "lucide-react";

import ExplorerApp from "@/apps/explorer/ExplorerApp";
import { Application } from "@/types/application";

export const applications: Application[] = [
  {
    id: "explorer",

    name: "Explorer",

    description: "Browse projects and portfolio content.",

    icon: FolderOpen,

    component: ExplorerApp,

    showInDock: true,

    defaultWindow: {
      width: 1000,
      height: 650,
    },
  },
];