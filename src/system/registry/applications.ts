import { Application } from "@/types/application";

import ExplorerApp from "@/apps/explorer/ExplorerApp";
import PlaceholderIcon from "@/shared/icons/PlaceholderIcon";

export const applications: Application[] = [
  {
    id: "explorer",
    name: "Explorer",
    icon: PlaceholderIcon,
    component: ExplorerApp,
  },
];