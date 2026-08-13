"use client";

import { useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import GithubIcon from "@/shared/icons/GithubIcon";
import { TechIcon } from "@/shared/icons/TechIcons";
import { PROJECTS, ProjectItem } from "@/content/portfolioData";

export default function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Full-Stack / Next.js", "AI / ML", "Cloud Data Engineering", "Design System"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="flex h-full w-full flex-col bg-[#131417] text-white p-6 overflow-auto select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Featured Engineering Work</h1>
          </div>
          <p className="text-xs text-white/60 mt-1">
            Explore web operating systems, AI agent frameworks, and high-performance cloud pipelines.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#007AFF] text-white shadow-md shadow-blue-500/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1A1C22]/80 p-5 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#20232B]/90 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20">
                  {project.category}
                </span>
                <span className="text-[11px] font-mono text-white/40">{project.date}</span>
              </div>

              <h2 className="text-lg font-bold text-white mt-3 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h2>

              <p className="text-xs text-white/70 leading-relaxed mt-2">
                {project.description}
              </p>

              {/* Tech Stack Pills with Authentic Symbols */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/90 border border-white/[0.08] shadow-sm backdrop-blur-md hover:border-white/20 transition-colors"
                  >
                    <TechIcon name={tech} className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/[0.06]">
              <button
                onClick={() => setActiveProject(project)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Architecture Details →
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="h-4 w-4 fill-white" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007AFF] text-white hover:bg-blue-600 transition-colors shadow-md"
                    title="Live Demo"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#1C1E24] p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-indigo-400 font-semibold">{activeProject.category}</span>
                <h3 className="text-xl font-bold text-white mt-1">{activeProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="rounded-full bg-white/10 p-1 text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              {activeProject.longDescription || activeProject.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="flex items-center gap-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 text-xs font-medium text-indigo-200 shadow-sm">
                    <TechIcon name={tech} className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveProject(null)}
                className="rounded-xl bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
