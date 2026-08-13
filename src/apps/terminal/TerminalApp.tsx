"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { PROJECTS, SKILL_CATEGORIES, USER_PROFILE } from "@/content/portfolioData";

interface HistoryLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string | React.ReactNode;
}

export default function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    {
      id: "1",
      type: "system",
      text: "Last login: " + new Date().toLocaleString() + " on ttys001",
    },
    {
      id: "2",
      type: "system",
      text: "Welcome to SaaathuOS Zsh Terminal v2.0. Type 'help' for a list of available commands.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory: HistoryLine[] = [
      ...history,
      { id: crypto.randomUUID(), type: "input", text: `sathvik@SaaathuOS ~ % ${trimmed}` },
    ];

    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
      case "help":
        newHistory.push({
          id: crypto.randomUUID(),
          type: "output",
          text: (
            <div className="space-y-1 my-1 text-emerald-400">
              <p><strong className="text-white">help</strong> - Display available commands</p>
              <p><strong className="text-white">about</strong> - Print developer bio and profile</p>
              <p><strong className="text-white">projects</strong> - List featured software projects</p>
              <p><strong className="text-white">skills</strong> - Display core technical skill matrix</p>
              <p><strong className="text-white">contact</strong> - Print email and social links</p>
              <p><strong className="text-white">ls</strong> - List files in workspace</p>
              <p><strong className="text-white">cat &lt;file&gt;</strong> - View file contents</p>
              <p><strong className="text-white">whoami</strong> - Print current session user</p>
              <p><strong className="text-white">clear</strong> - Clear terminal output</p>
            </div>
          ),
        });
        break;

      case "about":
        newHistory.push({
          id: crypto.randomUUID(),
          type: "output",
          text: (
            <div className="space-y-1.5 my-1 text-sky-300">
              <p className="font-bold text-white text-sm">{USER_PROFILE.name} - {USER_PROFILE.role}</p>
              <p>{USER_PROFILE.bio}</p>
              <p className="text-white/60">Location: {USER_PROFILE.location}</p>
            </div>
          ),
        });
        break;

      case "projects":
        newHistory.push({
          id: crypto.randomUUID(),
          type: "output",
          text: (
            <div className="space-y-2 my-1">
              {PROJECTS.map((p) => (
                <div key={p.id} className="border-l-2 border-indigo-500 pl-3">
                  <p className="font-bold text-white">{p.title} <span className="text-xs text-indigo-400 font-normal">[{p.category}]</span></p>
                  <p className="text-xs text-white/70">{p.description}</p>
                  <p className="text-[11px] text-amber-400 mt-0.5">Stack: {p.techStack.join(", ")}</p>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "skills":
        newHistory.push({
          id: crypto.randomUUID(),
          type: "output",
          text: (
            <div className="space-y-2 my-1">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <p className="font-bold text-amber-300 text-xs">{cat.name}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="rounded bg-white/10 px-2 py-0.5 text-xs text-white">
                        {s.name} ({s.level}%)
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "contact":
        newHistory.push({
          id: crypto.randomUUID(),
          type: "output",
          text: (
            <div className="space-y-1 my-1 text-indigo-300">
              <p>Email: <a href={`mailto:${USER_PROFILE.email}`} className="underline text-white">{USER_PROFILE.email}</a></p>
              <p>GitHub: <a href={USER_PROFILE.github} target="_blank" rel="noreferrer" className="underline text-white">{USER_PROFILE.github}</a></p>
              <p>LinkedIn: <a href={USER_PROFILE.linkedin} target="_blank" rel="noreferrer" className="underline text-white">{USER_PROFILE.linkedin}</a></p>
            </div>
          ),
        });
        break;

      case "ls":
        newHistory.push({
          id: crypto.randomUUID(),
          type: "output",
          text: (
            <div className="flex gap-4 my-1 text-sky-400 font-bold">
              <span>Desktop/</span>
              <span>Documents/</span>
              <span>Projects/</span>
              <span className="text-emerald-400">README_SaaathuOS.md</span>
              <span className="text-rose-400">Sathvik_Resume_2026.pdf</span>
            </div>
          ),
        });
        break;

      case "cat":
        const fileTarget = args[1];
        if (!fileTarget) {
          newHistory.push({ id: crypto.randomUUID(), type: "error", text: "cat: missing filename target" });
        } else if (fileTarget.toLowerCase().includes("readme")) {
          newHistory.push({
            id: crypto.randomUUID(),
            type: "output",
            text: "SaaathuOS 2.0 Web Operating System\nBuilt with Next.js 16, React 19, TypeScript, and Tailwind CSS.",
          });
        } else {
          newHistory.push({ id: crypto.randomUUID(), type: "error", text: `cat: ${fileTarget}: No such file or directory` });
        }
        break;

      case "whoami":
        newHistory.push({ id: crypto.randomUUID(), type: "output", text: "sathvik@SaaathuOS" });
        break;

      case "date":
        newHistory.push({ id: crypto.randomUUID(), type: "output", text: new Date().toString() });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sudo":
        if (args.join(" ").includes("rm -rf")) {
          newHistory.push({
            id: crypto.randomUUID(),
            type: "error",
            text: "Permission denied: SaaathuOS core system is protected by kernel security policy.",
          });
        } else {
          newHistory.push({ id: crypto.randomUUID(), type: "error", text: "sudo: permission denied" });
        }
        break;

      default:
        newHistory.push({
          id: crypto.randomUUID(),
          type: "error",
          text: `zsh: command not found: ${command}. Type 'help' for command list.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#0C0D10] p-4 font-mono text-[13px] leading-relaxed text-[#00FF66] select-text">
      {/* Terminal Header */}
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2 text-white/40">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold">zsh - 80×24</span>
        </div>
        <span className="text-[11px]">SaaathuOS Terminal</span>
      </div>

      {/* Output History */}
      <div className="flex-1 overflow-auto space-y-2">
        {history.map((line) => (
          <div key={line.id}>
            {line.type === "input" && <span className="text-white font-bold">{line.text}</span>}
            {line.type === "system" && <span className="text-white/50">{line.text}</span>}
            {line.type === "output" && <div className="text-[#00FF66]">{line.text}</div>}
            {line.type === "error" && <span className="text-rose-400 font-semibold">{line.text}</span>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="mt-2 flex items-center gap-2 pt-2 border-t border-white/5"
      >
        <span className="text-white font-bold">sathvik@SaaathuOS ~ %</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white focus:outline-none caret-emerald-400"
          autoFocus
        />
      </form>
    </div>
  );
}
