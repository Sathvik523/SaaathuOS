import {
  Folder,
  FolderOpen,
  FileText,
  Settings,
} from "lucide-react";

import DockItem from "./DockItem";

export default function DockApps() {
  return (
    <>
      <DockItem
        icon={FolderOpen}
        label="Explorer"
      />

      <DockItem
        icon={Folder}
        label="Projects"
      />

      <DockItem
        icon={FileText}
        label="Resume"
      />

      <DockItem
        icon={Settings}
        label="Settings"
      />
    </>
  );
}