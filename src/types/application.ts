import { ComponentType } from "react";

export interface Application {
  id: string;
  name: string;
  icon: ComponentType;
  component: ComponentType;
}