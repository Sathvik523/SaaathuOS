import { ComponentType } from "react";
import { LucideIcon } from "lucide-react";

export interface Application {
  id: string;
  name: string;
  description: string;

  icon: LucideIcon;

  component: ComponentType;

  showInDock: boolean;

  defaultWindow: {
    width: number;
    height: number;
  };
}