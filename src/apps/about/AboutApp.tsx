"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { ArrowUpRight, FileText, FolderKanban, Mail, MapPin } from "lucide-react";
import GithubIcon from "@/shared/icons/GithubIcon";
import { USER_PROFILE } from "@/content/portfolioData";
import { RESUME_CONTACT, RESUME_EDUCATION, RESUME_EXPERIENCE } from "@/content/resumeData";
import { ABOUT_PROJECTS } from "@/content/aboutData";
import { useWindowManager } from "@/system/window-manager";

// Blocks fade up one after another as the window opens
const STAGGER_MS = 90;

const rise = (show: boolean, index: number): CSSProperties => ({
  opacity: show ? 1 : 0,
  transform: show ? "none" : "translateY(18px)",
  transition: `opacity 640ms cubic-bezier(0.16,1,0.3,1) ${index * STAGGER_MS}ms, transform 720ms cubic-bezier(0.16,1,0.3,1) ${index * STAGGER_MS}ms`,
});

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
      {children}
    </h2>
  );
}

export default function AboutApp() {
  const { openWindow } = useWindowManager();
  const [show, setShow] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (show) return;
    const timer = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(timer);
  }, [show]);

  const education = RESUME_EDUCATION[0];
  const role = RESUME_EXPERIENCE[0];

  const facts = [
    { label: "Studying", value: `${education.qualification}, ${education.school}` },
    { label: "Currently", value: `${role.role}, ${role.organisation}` },
    { label: "Based in", value: education.location },
  ];

  return (
    <div className="@container h-full w-full overflow-y-auto bg-[#0f1014] no-scrollbar select-text">
      <div className="mx-auto grid max-w-[880px] gap-10 px-9 py-10 @[760px]:grid-cols-[260px_1fr] @[760px]:px-12">
        {/* Portrait + contact rail */}
        <aside style={rise(show, 0)} className="flex flex-col gap-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/[0.08]">
            <Image
              src="/portrait-sathvik.jpg"
              alt={`Illustrated portrait of ${RESUME_CONTACT.name}`}
              fill
              sizes="(max-width: 760px) 80vw, 260px"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${RESUME_CONTACT.email}`}
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 font-mono text-[11px] text-white/60 transition-colors hover:border-white/20 hover:text-white"
            >
              <Mail size={13} className="flex-shrink-0 text-white/35" />
              <span className="truncate">{RESUME_CONTACT.email}</span>
            </a>
            <a
              href={RESUME_CONTACT.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 font-mono text-[11px] text-white/60 transition-colors hover:border-white/20 hover:text-white"
            >
              <GithubIcon className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
              <span className="truncate">{RESUME_CONTACT.github}</span>
              <ArrowUpRight size={11} className="ml-auto flex-shrink-0 text-white/30" />
            </a>
            <span className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 font-mono text-[11px] text-white/60">
              <MapPin size={13} className="flex-shrink-0 text-white/35" />
              {education.location}
            </span>
          </div>
        </aside>

        {/* The words */}
        <div className="min-w-0">
          <header style={rise(show, 1)}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              About me
            </span>
            <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-tight text-white">
              {RESUME_CONTACT.name}
            </h1>
            <p className="mt-2 text-[13px] text-[var(--accent)]">{USER_PROFILE.role}</p>

            <p className="mt-5 text-[13px] leading-[1.8] text-white/60">{USER_PROFILE.bio}</p>
            <p className="mt-3 text-[13px] leading-[1.8] text-white/60">
              I like software that is technically sharp and genuinely nice to use — this desktop
              is itself the argument. Most of my work sits where data pipelines, machine learning
              and interface design meet.
            </p>
          </header>

          <section style={rise(show, 2)} className="mt-9 border-t border-white/[0.07] pt-7">
            <Label>At a glance</Label>
            <dl className="mt-4 space-y-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-0.5 @[520px]:flex-row @[520px]:gap-4">
                  <dt className="w-24 flex-shrink-0 font-mono text-[11px] uppercase tracking-wider text-white/35">
                    {fact.label}
                  </dt>
                  <dd className="text-[12.5px] leading-relaxed text-white/70">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section style={rise(show, 3)} className="mt-8 border-t border-white/[0.07] pt-7">
            <Label>Things I&apos;ve built</Label>
            <ul className="mt-4 space-y-6">
              {ABOUT_PROJECTS.map((project) => (
                <li key={project.title}>
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-start gap-1.5 text-[13px] font-semibold leading-snug text-white hover:text-[var(--accent)]"
                    >
                      {project.title}
                      <ArrowUpRight size={13} className="mt-0.5 flex-shrink-0 opacity-50" />
                    </a>
                  ) : (
                    <h3 className="text-[13px] font-semibold leading-snug text-white">
                      {project.title}
                    </h3>
                  )}

                  <p className="mt-1.5 text-[12.5px] leading-[1.7] text-white/55">{project.blurb}</p>

                  {project.metrics && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-2.5 py-1 font-mono text-[10px] text-[var(--accent)]"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-2 font-mono text-[10.5px] text-white/35">
                    {project.stack.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section style={rise(show, 4)} className="mt-8 flex flex-wrap gap-2.5 border-t border-white/[0.07] pt-7">
            <button
              onClick={() => openWindow("resume")}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-[12px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]"
            >
              <FileText size={14} className="text-[var(--accent)]" />
              Read the résumé
            </button>
            <button
              onClick={() => openWindow("projects")}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-[12px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]"
            >
              <FolderKanban size={14} className="text-[var(--accent)]" />
              See the projects
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
