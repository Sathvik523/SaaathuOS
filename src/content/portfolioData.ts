export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file" | "image" | "pdf" | "code" | "link";
  extension?: string;
  size?: string;
  updatedAt: string;
  iconName?: string;
  content?: string;
  projectRefId?: string;
  parentId: string | null;
  path: string;
  tags?: string[];
  externalUrl?: string;
}

export const USER_PROFILE = {
  name: "Sathvik",
  handle: "@sathvik",
  role: "Full-Stack Engineer & AI Systems Builder",
  bio: "Passionate engineer building next-generation web applications, autonomous AI agents, and high-performance operating systems in the browser.",
  location: "India / Remote",
  email: "sathvik@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  osVersion: "SaaathuOS 2.0 (macOS Sequoia Dark Edition)",
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "saathu-os",
    title: "SaaathuOS Web Operating System",
    category: "Full-Stack / Next.js",
    description: "A premium, macOS-inspired personal web operating system with window management, Finder, Terminal, and Control Center.",
    longDescription: "SaaathuOS brings the desktop operating system experience to the browser. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Features window focus management, z-ordering, draggable frames, floating Dock, menu bar, and Finder file explorer.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://saathuos.dev",
    featured: true,
    date: "2026",
  },
  {
    id: "ai-agent-platform",
    title: "Autonomous AI Agent Orchestrator",
    category: "AI / ML",
    description: "Multi-agent runtime framework for executing complex code generation and research pipelines.",
    longDescription: "An agentic system capable of decomposing user goals into task graphs, spawning subagents, executing sandboxed commands, and streaming real-time status updates.",
    techStack: ["TypeScript", "Python", "Google Antigravity SDK", "FastAPI", "WebSockets"],
    githubUrl: "https://github.com",
    liveUrl: "https://agentic.dev",
    featured: true,
    date: "2025",
  },
  {
    id: "realtime-data-lakehouse",
    title: "Real-time Analytics Lakehouse",
    category: "Cloud Data Engineering",
    description: "High-throughput real-time data pipeline for streaming event analytics using BigQuery and Dataproc Spark.",
    longDescription: "Processes over 50k events/sec with automated schema cleaning, dbt transformation models, and instant dashboard visualization.",
    techStack: ["GCP", "BigQuery", "Apache Spark", "dbt", "Python", "React"],
    githubUrl: "https://github.com",
    featured: false,
    date: "2025",
  },
  {
    id: "hyper-ui",
    title: "HyperUI Component System",
    category: "Design System",
    description: "Ultra-fast, accessible UI component library built for glassmorphism and modern dark mode interfaces.",
    longDescription: "Includes 40+ accessible React components with smooth spring transitions, zero runtime CSS overhead, and full keyboard navigation support.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Radix Primitives"],
    githubUrl: "https://github.com",
    liveUrl: "https://hyperui.dev",
    featured: false,
    date: "2024",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend & Architecture",
    skills: [
      { name: "React 19 / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "State Management (Zustand/Redux)", level: 88 },
      { name: "Framer Motion & Animations", level: 85 },
    ],
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "Node.js & Express / NestJS", level: 90 },
      { name: "Python / FastAPI", level: 88 },
      { name: "PostgreSQL / Prisma / Redis", level: 85 },
      { name: "WebSockets & Real-time Systems", level: 84 },
    ],
  },
  {
    name: "AI & Cloud Infrastructure",
    skills: [
      { name: "Google Cloud Platform (GCP)", level: 86 },
      { name: "BigQuery / Data Pipelines", level: 82 },
      { name: "LLM Orchestration & Subagents", level: 92 },
      { name: "Docker & Containerization", level: 85 },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Full-Stack & AI Systems Engineer",
    company: "Tech Architecture Lab",
    period: "2024 - Present",
    location: "Remote",
    description: [
      "Architected real-time web operating systems and agentic AI tools for enterprise teams.",
      "Optimized Next.js applications reducing bundle sizes by 40% and achieving sub-second LCP scores.",
      "Designed autonomous multi-agent pipelines for automated code refactoring and data workflows.",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "GCP", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    role: "Frontend Systems Developer",
    company: "Digital Product Studio",
    period: "2022 - 2024",
    location: "Remote",
    description: [
      "Built custom design systems and complex interactive web graphics using React and WebGL/Canvas.",
      "Collaborated with UX teams to implement fluid animations and glassmorphic micro-interactions.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

export const EXPLORER_FILES: FileItem[] = [
  // Root directories
  {
    id: "folder-desktop",
    name: "Desktop",
    type: "folder",
    updatedAt: "Today, 10:30 AM",
    parentId: null,
    path: "/Desktop",
  },
  {
    id: "folder-documents",
    name: "Documents",
    type: "folder",
    updatedAt: "Today, 11:15 AM",
    parentId: null,
    path: "/Documents",
  },
  {
    id: "folder-projects",
    name: "Projects",
    type: "folder",
    updatedAt: "Yesterday",
    parentId: null,
    path: "/Projects",
  },
  {
    id: "folder-downloads",
    name: "Downloads",
    type: "folder",
    updatedAt: "Jul 28",
    parentId: null,
    path: "/Downloads",
  },

  // Desktop files
  {
    id: "file-welcome",
    name: "README_SaaathuOS.md",
    type: "file",
    extension: "md",
    size: "2.4 KB",
    updatedAt: "Today, 12:00 PM",
    parentId: "folder-desktop",
    path: "/Desktop/README_SaaathuOS.md",
    tags: ["Important"],
    content: `# Welcome to SaaathuOS 2.0\n\nSaaathuOS is an experimental, production-grade web desktop operating system built to showcase projects, skills, and engineering work.\n\n### System Highlights:\n- **Window Management**: Drag, resize, focus stack, minimize & maximize windows.\n- **Finder Explorer**: Browse project source code, markdown documentation, and interactive case studies.\n- **Zsh Terminal**: Run interactive commands directly in the browser.\n- **Control Center**: Dynamic dark mode toggles, status widgets, and system settings.`,
  },
  {
    id: "file-resume",
    name: "Sathvik_Resume_2026.pdf",
    type: "pdf",
    extension: "pdf",
    size: "184 KB",
    updatedAt: "Jul 30",
    parentId: "folder-desktop",
    path: "/Desktop/Sathvik_Resume_2026.pdf",
    tags: ["Work"],
    content: "PDF Resume Document - Full-Stack & AI Systems Engineer with 4+ years experience building web apps, AI orchestration systems, and cloud infrastructure.",
  },

  // Projects files
  {
    id: "file-proj-1",
    name: "SaaathuOS_Architecture.ts",
    type: "code",
    extension: "ts",
    size: "12 KB",
    updatedAt: "Today",
    parentId: "folder-projects",
    path: "/Projects/SaaathuOS_Architecture.ts",
    projectRefId: "saathu-os",
    tags: ["Featured"],
    content: `// SaaathuOS System Architecture\nexport interface SystemConfig {\n  name: 'SaaathuOS';\n  version: '2.0.0';\n  theme: 'Dark Glassmorphic';\n  architecture: 'Modular Application Registry';\n}`,
  },
  {
    id: "file-proj-2",
    name: "AI_Agent_Orchestrator.py",
    type: "code",
    extension: "py",
    size: "8 KB",
    updatedAt: "Jul 25",
    parentId: "folder-projects",
    path: "/Projects/AI_Agent_Orchestrator.py",
    projectRefId: "ai-agent-platform",
    tags: ["Featured"],
    content: `# AI Agent Orchestration Pipeline\nclass AgentRunner:\n    def __init__(self, agent_id: str):\n        self.agent_id = agent_id\n    async def execute_task(self, prompt: str):\n        return await self.planner.run(prompt)`,
  },
  {
    id: "file-proj-3",
    name: "HyperUI_Design_System.tsx",
    type: "code",
    extension: "tsx",
    size: "15 KB",
    updatedAt: "Jul 20",
    parentId: "folder-projects",
    path: "/Projects/HyperUI_Design_System.tsx",
    projectRefId: "hyper-ui",
    tags: ["UI/UX"],
    content: `// HyperUI Button Component\nexport const GlassButton = ({ children, onClick }: Props) => (\n  <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all px-4 py-2 rounded-xl border border-white/10">\n    {children}\n  </button>\n);`,
  },

  // Documents files
  {
    id: "file-about",
    name: "About_Sathvik.md",
    type: "file",
    extension: "md",
    size: "1.8 KB",
    updatedAt: "Jul 29",
    parentId: "folder-documents",
    path: "/Documents/About_Sathvik.md",
    tags: ["Personal"],
    content: `# About Me\nHi! I'm Sathvik, a Full-Stack Engineer and AI Systems builder. I love crafting software that combines technical elegance with exceptional design.`,
  },
  {
    id: "file-skills",
    name: "Skill_Matrix.json",
    type: "code",
    extension: "json",
    size: "3.1 KB",
    updatedAt: "Jul 28",
    parentId: "folder-documents",
    path: "/Documents/Skill_Matrix.json",
    tags: ["Work"],
    content: JSON.stringify(SKILL_CATEGORIES, null, 2),
  },
];
