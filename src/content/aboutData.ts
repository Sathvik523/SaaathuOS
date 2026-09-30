// Projects as they appear on the About Me page: one line each, newest first.
// The Résumé app stays faithful to public/resume.pdf — this list is the shorter,
// friendlier telling, so the two can differ on purpose.

export interface AboutProject {
  title: string;
  blurb: string;
  stack: string[];
  metrics?: string[];
  repo?: string; // add the GitHub URL and the title turns into a link
}

export const ABOUT_PROJECTS: AboutProject[] = [
  {
    title: "AI-Powered Tamper Detection & Recovery System with Blockchain-Verified Ownership",
    blurb:
      "Detects and recovers tampered regions in images using a dual-watermarking scheme and a custom U-Net, then proves who owns the image through an on-chain Solidity registry signed with ECDSA.",
    stack: ["Python", "Deep Learning", "U-Net", "Solidity", "ECDSA"],
    metrics: [
      "Owner verification 33% → 96.2%",
      "27.0 dB PSNR · 0.94 SSIM",
      "92.1% tamper-detection F1",
    ],
    repo: "", // e.g. "https://github.com/Sathvik523/<repo>"
  },
  {
    title: "EmoStream: Concurrent Emoji Broadcast over Event-Driven Architecture",
    blurb:
      "Processes millions of live emoji reactions during sporting events, aggregating them in two-second micro-batches and fanning them back out through a Pub-Sub cluster.",
    stack: ["Python", "Spark", "Kafka", "Flask", "Redis"],
  },
  {
    title: "Competitive Exam Rank Automation Platform",
    blurb:
      "Generates and ranks nationwide JEE Mains data, with SQL views computing percentiles and custom tie-breakers across multiple sessions.",
    stack: ["Python", "MySQL", "YAML"],
  },
  {
    title: "Analytic System for Predicting and Reducing Customer Churn",
    blurb:
      "Separates what merely correlates with churn from what actually causes it, then estimates which intervention buys the most retention per rupee.",
    stack: ["PowerBI", "Scikit-learn", "PyTorch", "MongoDB", "FastAPI"],
  },
];
