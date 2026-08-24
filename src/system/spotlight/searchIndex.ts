import { PROJECTS, USER_PROFILE, SKILL_CATEGORIES } from "@/content/portfolioData";
import { EXPLORER_FILES } from "@/content/portfolioData";

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Applications" | "Projects" | "Files" | "Commands" | "Skills" | "Sections";
  icon: string;
  action: {
    type: "open_app" | "open_file" | "open_url" | "exec_command" | "filter_skill";
    payload?: string;
  };
  keywords: string[];
}

export const SEARCH_INDEX: SearchResultItem[] = [
  // 1. Applications
  {
    id: "app-finder",
    title: "Finder",
    subtitle: "File Explorer & Portfolio Storage",
    category: "Applications",
    icon: "Folder",
    action: { type: "open_app", payload: "explorer" },
    keywords: ["finder", "explorer", "files", "folders", "storage", "documents"],
  },
  {
    id: "app-vscode",
    title: "VS Code",
    subtitle: "Portfolio Projects & Code Showcases",
    category: "Applications",
    icon: "Code2",
    action: { type: "open_app", payload: "projects" },
    keywords: ["vscode", "code", "projects", "editor", "developer", "portfolio"],
  },
  {
    id: "app-notes",
    title: "Notes",
    subtitle: "About Sathvik & Interactive Resume",
    category: "Applications",
    icon: "FileText",
    action: { type: "open_app", payload: "terminal" },
    keywords: ["notes", "about", "resume", "bio", "sathvik", "experience", "education"],
  },
  {
    id: "app-photos",
    title: "Photos",
    subtitle: "Project Gallery & Screenshots",
    category: "Applications",
    icon: "Image",
    action: { type: "open_app", payload: "photos" },
    keywords: ["photos", "gallery", "screenshots", "media", "images"],
  },
  {
    id: "app-settings",
    title: "System Settings",
    subtitle: "System Customization & Wallpaper Selector",
    category: "Applications",
    icon: "Settings",
    action: { type: "open_app", payload: "settings" },
    keywords: ["settings", "preferences", "wallpaper", "appearance", "customize", "theme"],
  },

  // 2. System Commands
  {
    id: "cmd-lock",
    title: "Lock Screen",
    subtitle: "Lock SaaathuOS & Return to Spotlight Welcome Screen",
    category: "Commands",
    icon: "Lock",
    action: { type: "exec_command", payload: "lock_screen" },
    keywords: ["lock", "lockscreen", "exit", "logout", "sleep", "welcome"],
  },
  {
    id: "cmd-wallpaper",
    title: "Change Desktop Wallpaper",
    subtitle: "Customize background theme or upload image",
    category: "Commands",
    icon: "Palette",
    action: { type: "exec_command", payload: "open_wallpaper" },
    keywords: ["wallpaper", "theme", "background", "customize", "change wallpaper"],
  },
  {
    id: "cmd-resume",
    title: "Download Resume",
    subtitle: "Download Sathvik's official PDF Resume",
    category: "Commands",
    icon: "Download",
    action: { type: "exec_command", payload: "download_resume" },
    keywords: ["resume", "cv", "download", "pdf", "hire"],
  },
  {
    id: "cmd-contact",
    title: "Get in Touch",
    subtitle: `Email ${USER_PROFILE.email} or connect on social media`,
    category: "Commands",
    icon: "Mail",
    action: { type: "exec_command", payload: "open_contact" },
    keywords: ["contact", "email", "github", "linkedin", "hire", "message"],
  },

  // 3. Projects Indexing
  ...PROJECTS.map((proj) => ({
    id: `proj-${proj.id}`,
    title: proj.title,
    subtitle: `${proj.category} • ${proj.techStack.join(", ")}`,
    category: "Projects" as const,
    icon: "FolderKanban",
    action: { type: "open_app" as const, payload: "projects" },
    keywords: [
      proj.title.toLowerCase(),
      proj.description.toLowerCase(),
      ...proj.techStack.map((t) => t.toLowerCase()),
      proj.category.toLowerCase(),
    ],
  })),

  // 4. Files Indexing
  ...EXPLORER_FILES.map((file) => ({
    id: `file-${file.id}`,
    title: file.name,
    subtitle: `${file.path} (${file.size || "Item"})`,
    category: "Files" as const,
    icon: file.type === "folder" ? "Folder" : "FileCode",
    action: { type: "open_app" as const, payload: "explorer" },
    keywords: [
      file.name.toLowerCase(),
      file.path.toLowerCase(),
      ...(file.tags || []).map((t) => t.toLowerCase()),
      file.extension?.toLowerCase() || "",
    ],
  })),

  // 5. Skills & Tech Stack Indexing
  ...SKILL_CATEGORIES.flatMap((cat) =>
    cat.skills.map((skill) => ({
      id: `skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`,
      title: skill.name,
      subtitle: `${cat.name} • ${skill.level}% Proficiency`,
      category: "Skills" as const,
      icon: "Cpu",
      action: { type: "filter_skill" as const, payload: skill.name },
      keywords: [skill.name.toLowerCase(), cat.name.toLowerCase(), "skill", "technology", "stack"],
    }))
  ),

  // 6. Quick System Commands
  {
    id: "cmd-lock",
    title: "Lock SaaathuOS Screen",
    subtitle: "Return to 3D Claymorphic LockScreen",
    category: "Commands",
    icon: "Lock",
    action: { type: "exec_command", payload: "lock" },
    keywords: ["lock", "screen", "sleep", "logout", "exit", "security"],
  },
  {
    id: "cmd-wallpaper",
    title: "Open Wallpaper Engine",
    subtitle: "Switch macOS Dynamic Gradients & Mesh Themes",
    category: "Commands",
    icon: "Image",
    action: { type: "open_app", payload: "settings" },
    keywords: ["wallpaper", "background", "theme", "gradient", "mesh", "customize"],
  },
  {
    id: "cmd-terminal",
    title: "Launch Interactive Terminal",
    subtitle: "Zsh System Shell & Neofetch Engine",
    category: "Commands",
    icon: "Terminal",
    action: { type: "open_app", payload: "terminal" },
    keywords: ["terminal", "shell", "bash", "zsh", "cli", "neofetch", "commands"],
  },
];
