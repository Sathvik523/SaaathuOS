// Content for the Portfolio Build Guide (Dock → Portfolio Documents, or
// Finder → Documents → Portfolio_Build_Guide.md). Contact details are not
// written here: the guide reads them from USER_PROFILE in portfolioData.ts.

export const GUIDE_REPO_URL = "https://github.com/Sathvik523/SaaathuOS";

export interface GuideStep {
  title: string;
  body: string;
  code?: string;
}

export interface GuideFeature {
  icon: string; // lucide icon name, mapped in GuideApp
  title: string;
  how: string;
  body: string;
}

export interface GuideChallenge {
  problem: string;
  symptom: string;
  fix: string;
}

// ---------------------------------------------------------------------------
// 1. Build a portfolio like this
// ---------------------------------------------------------------------------
export const BUILD_STACK = [
  "Next.js 16 · App Router",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "lucide-react icons",
  "Web Audio API",
  "Web Animations API",
];

export const BUILD_STEPS: GuideStep[] = [
  {
    title: "Start from a single-page Next.js app",
    body: "The whole OS lives on one route: app/page.tsx renders a single DesktopShell, and everything else is client-side React inside it.",
    code: "npx create-next-app@latest my-os",
  },
  {
    title: "Build the desktop in layers",
    body: "Stack the scene back to front: wallpaper, greeting, windows, dock, widgets, menu bar, lock screen. Decide this order first — most bugs in a web OS are layering bugs.",
  },
  {
    title: "Keep state in a few small contexts",
    body: "No state library needed. One context owns the windows, one the lock state and search, one the wallpaper.",
  },
  {
    title: "Register apps in one place",
    body: "A registry maps each app id to its component and window size, so openWindow(id) works from the Dock, Finder or Spotlight alike.",
  },
  {
    title: "Put content in data, not in components",
    body: "One data file holds the profile, projects, skills and files. Finder, Terminal and Spotlight all read from it.",
  },
  {
    title: "Add motion last, and keep it purposeful",
    body: "Big moments are CSS keyframes; windows unfold from their Dock icon with the Web Animations API. Respect prefers-reduced-motion.",
  },
];

// ---------------------------------------------------------------------------
// 2. Make it yours
// ---------------------------------------------------------------------------
export const REPLICATE_STEPS: GuideStep[] = [
  {
    title: "Clone it and run it locally",
    body: "Needs Node.js 20.9+. Next.js 16 changed APIs — trust node_modules/next/dist/docs over older tutorials.",
    code: `git clone ${GUIDE_REPO_URL}.git\ncd SaaathuOS\nnpm install\nnpm run dev`,
  },
  {
    title: "Swap in your content",
    body: "Replace USER_PROFILE, PROJECTS, SKILL_CATEGORIES and EXPLORER_FILES in src/content/portfolioData.ts. Most of the site updates from this one file.",
  },
  {
    title: "Replace the personal touches",
    body: "A few names live in components, not data — the greeting, the @handle, the terminal prompt, the page title, the tagline. Find them all:",
    code: "grep -rni sathvik src app",
  },
  {
    title: "Rebrand the OS",
    body: "Rename the OS, tune the wallpaper presets in Wallpaper.tsx, pick your accents. Keep the structure; change the personality.",
  },
  {
    title: "Add your résumé",
    body: "Spotlight's “Download Resume” opens /resume.pdf — put your PDF at public/resume.pdf.",
  },
  {
    title: "Ship it",
    body: "Push to GitHub, then import the repo on Vercel — no configuration needed.",
    code: "npm run build\nnpm start",
  },
];

// ---------------------------------------------------------------------------
// 3. Things you might have missed
// ---------------------------------------------------------------------------
export const HIDDEN_FEATURES: GuideFeature[] = [
  {
    icon: "Command",
    title: "Spotlight, anywhere",
    how: "⌘ K  or  ⌘ / Ctrl + Space",
    body: "Search apps, projects, files and commands. Arrow keys move, Enter launches — or tap the mic and say it.",
  },
  {
    icon: "Terminal",
    title: "Terminal easter eggs",
    how: "Finder → Open Terminal",
    body: "Beyond help, try neofetch, date, and — carefully — sudo rm -rf /.",
  },
  {
    icon: "Hand",
    title: "Living widgets",
    how: "Hover the Projects card",
    body: "The hanging cards swing on their threads; the Projects card releases glass bubbles.",
  },
  {
    icon: "Layers",
    title: "The project laboratory",
    how: "Projects card → scroll down",
    body: "Flip through projects with the wheel or arrow keys. Scroll up at the top to return.",
  },
  {
    icon: "Sparkles",
    title: "The parting ask",
    how: "Connect page → ← Desktop",
    body: "Leaving the Connect page asks you for suggestions before you go. It mails them straight to me.",
  },
  {
    icon: "Maximize2",
    title: "Real window management",
    how: "Title bar & corners",
    body: "Double-click a title bar to maximize, drag the corner to resize, minimize to fold into the Dock.",
  },
  {
    icon: "CalendarDays",
    title: "A working menu bar",
    how: "Click the clock, battery, Wi-Fi",
    body: "A navigable calendar, Control Center sliders, and your real battery level.",
  },
  {
    icon: "Image",
    title: "Your own wallpaper",
    how: "Settings → Wallpaper & Theme",
    body: "Upload an image or paste a URL — it's remembered on your next visit.",
  },
];

// ---------------------------------------------------------------------------
// 4. Challenges and fixes
// ---------------------------------------------------------------------------
export const CHALLENGES: GuideChallenge[] = [
  {
    problem: "Dropdowns get clipped or won't close",
    symptom: "Menus vanish inside the bar, or won't dismiss.",
    fix: "overflow: hidden clips them, and a transform or backdrop-filter ancestor captures fixed children — move the blur to a sibling layer. Visible but unclickable? pointer-events: none is inherited.",
  },
  {
    problem: "Glows show stepped rings",
    symptom: "Soft glows look like stacked bands on a dark background.",
    fix: "Blur radii of 150px+ render as coarse steps. Use radial-gradient backgrounds for ambient glows.",
  },
  {
    problem: "Everything looks doubled",
    symptom: "Twice-as-strong glows, or two animation loops at once.",
    fix: "The component is mounted in two layers. Give every piece of UI exactly one owner.",
  },
  {
    problem: "Hydration errors from saved settings",
    symptom: "“Text content does not match server HTML.”",
    fix: "localStorage doesn't exist on the server. Render a default, then read it in an effect.",
  },
  {
    problem: "The startup sound never plays",
    symptom: "The console warns the AudioContext can't start.",
    fix: "Browsers block audio before a user gesture. Resume the context on first click, and reuse one.",
  },
  {
    problem: "Close animations get cut off",
    symptom: "Windows vanish instead of animating away.",
    fix: "It unmounts before the animation ends. Mark it closing, animate, then remove it after that long.",
  },
];
