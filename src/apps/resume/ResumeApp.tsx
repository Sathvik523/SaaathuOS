"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import GithubIcon from "@/shared/icons/GithubIcon";
import {
  RESUME_CONTACT,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PDF,
  RESUME_PROJECTS,
  RESUME_SKILLS,
} from "@/content/resumeData";

// How strongly the portrait shows through the résumé page
const RESUME_BACKDROP_OPACITY = 0.22;

// The window already unfolds out of its Dock icon; inside it, the résumé sets itself
// out one block at a time so it reads like a page being laid down.
const STAGGER_MS = 90;

function useOpeningSequence(steps: number) {
  const [shown, setShown] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? steps
      : 0,
  );

  useEffect(() => {
    if (shown >= steps) return;
    const timer = setTimeout(() => setShown(steps), 60);
    return () => clearTimeout(timer);
  }, [shown, steps]);

  return shown >= steps;
}

const rise = (show: boolean, index: number): CSSProperties => ({
  opacity: show ? 1 : 0,
  transform: show ? "none" : "translateY(18px)",
  transition: `opacity 640ms cubic-bezier(0.16,1,0.3,1) ${index * STAGGER_MS}ms, transform 720ms cubic-bezier(0.16,1,0.3,1) ${index * STAGGER_MS}ms`,
});

function Section({
  label,
  index,
  show,
  children,
}: {
  label: string;
  index: number;
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      style={rise(show, index)}
      className="grid gap-x-8 gap-y-3 border-t border-white/[0.07] py-7 @[720px]:grid-cols-[132px_1fr]"
    >
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Bullets({ points }: { points: string[] }) {
  return (
    <ul className="mt-2.5 space-y-2">
      {points.map((point) => (
        <li
          key={point}
          className="flex gap-2.5 text-[12.5px] leading-[1.75] text-white/60"
        >
          <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/55"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

// Official logos, downloaded from devicon and served locally (public/tech).
// A skill can map to more than one mark: "C/C++" shows both, "HTML/CSS" shows both.
const LOGOS: Record<string, string[]> = {
  Python: ["python"],
  "C/C++": ["c", "cplusplus"],
  Java: ["java"],
  JavaScript: ["javascript"],
  "HTML/CSS": ["html5", "css3"],
  Rust: ["rust"],
  Docker: ["docker"],
  Kubernetes: ["kubernetes"],
  Redis: ["redis"],
  MongoDB: ["mongodb"],
  PyTorch: ["pytorch"],
  Pandas: ["pandas"],
  NumPy: ["numpy"],
  Git: ["git"],
  MySQL: ["mysql"],
  YAML: ["yaml"],
  Kafka: ["kafka"],
  Spark: ["spark"],
};

// These brand marks are drawn in near-black and would disappear on the dark panel
const INVERTED = new Set(["rust", "kafka"]);

function TechMark({ skill }: { skill: string }) {
  const slugs = LOGOS[skill];

  // No official mark (SQL) — keep the name as a lettered badge so nothing is dropped
  if (!slugs) {
    return (
      <span
        title={skill}
        className="flex h-11 items-center rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 font-mono text-[11px] text-white/60"
      >
        {skill}
      </span>
    );
  }

  return (
    <span
      title={skill}
      className="flex h-11 flex-shrink-0 items-center gap-2 px-1"
    >
      {slugs.map((slug) => (
        <Image
          key={slug}
          src={`/tech/${slug}.svg`}
          alt=""
          aria-hidden
          width={30}
          height={30}
          unoptimized
          className="h-[30px] w-[30px] opacity-75 transition-opacity duration-300 hover:opacity-100"
          style={
            INVERTED.has(slug)
              ? { filter: "invert(1) brightness(1.4)" }
              : undefined
          }
        />
      ))}
      <span className="sr-only">{skill}</span>
    </span>
  );
}

function TechMarquee({
  items,
  direction,
}: {
  items: string[];
  direction: "right" | "left";
}) {
  return (
    <div
      className="tech-marquee relative mt-3 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <div
        className={`flex w-max items-center gap-7 ${
          direction === "right"
            ? "animate-tech-marquee-right"
            : "animate-tech-marquee-left"
        }`}
      >
        {/* the list twice over: the animation shifts by half the track for a seamless loop */}
        {[...items, ...items].map((skill, i) => (
          <TechMark key={`${skill}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function ResumeApp() {
  const show = useOpeningSequence(1);

  return (
    <div className="@container relative h-full w-full bg-[#0f1014]">
      {/* Portrait behind the page — pinned to the window rather than the scrolling
          content, so it holds still as the résumé scrolls. It stays faint, with a scrim
          over it, so every line keeps its contrast. Raise RESUME_BACKDROP_OPACITY for a
          bolder photograph — past ~0.30 the body text starts to fight it. */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/portrait-bw.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: RESUME_BACKDROP_OPACITY }}
        />
        <div className="absolute inset-0 bg-[#0f1014]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(15,16,20,0.25)_0%,rgba(12,12,16,0.85)_100%)]" />
      </div>

      <div className="relative z-10 h-full overflow-y-auto no-scrollbar select-text">
        <div className="mx-auto max-w-[760px] px-9 py-10 @[720px]:px-12">
          {/* Header */}
          <header style={rise(show, 0)}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-[30px] font-semibold tracking-tight text-white">
                  {RESUME_CONTACT.name}
                </h1>
                <p className="mt-1.5 text-[12.5px] text-white/45">
                  Computer Science undergraduate · Bangalore, India
                </p>
              </div>

              <a
                href={RESUME_PDF}
                download
                className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-[12px] font-medium text-white/85 transition-colors hover:bg-white/[0.12] cursor-pointer"
              >
                <Download size={14} className="text-[var(--accent)]" />
                Download PDF
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {RESUME_CONTACT.phone && (
                <span className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-white/60">
                  <Phone size={12} className="text-white/35" />
                  {RESUME_CONTACT.phone}
                </span>
              )}
              <a
                href={`mailto:${RESUME_CONTACT.email}`}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-white/60 transition-colors hover:text-white hover:border-white/20"
              >
                <Mail size={12} className="text-white/35" />
                {RESUME_CONTACT.email}
              </a>
              <a
                href={RESUME_CONTACT.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-white/60 transition-colors hover:text-white hover:border-white/20"
              >
                <GithubIcon className="h-3.5 w-3.5 opacity-70" />
                {RESUME_CONTACT.github}
                <ArrowUpRight size={11} className="text-white/30" />
              </a>
            </div>
          </header>

          <div className="mt-8">
            <Section label="Education" index={1} show={show}>
              <div className="space-y-5">
                {RESUME_EDUCATION.map((entry) => (
                  <div key={entry.school}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[14px] font-semibold text-white">
                        {entry.school}
                      </h3>
                      <span className="text-[11.5px] text-white/40">
                        {entry.location}
                      </span>
                    </div>
                    {entry.qualification && (
                      <p className="mt-1 text-[12.5px] italic text-white/55">
                        {entry.qualification}
                      </p>
                    )}
                    <p className="mt-1 text-[12.5px] text-white/60">
                      {entry.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section label="Experience" index={2} show={show}>
              {RESUME_EXPERIENCE.map((role) => (
                <div key={role.organisation}>
                  <h3 className="text-[14px] font-semibold text-white">
                    {role.organisation}
                  </h3>
                  <p className="mt-1 text-[12.5px] italic text-white/55">
                    {role.role}
                  </p>
                  <Bullets points={role.points} />
                </div>
              ))}
            </Section>

            <Section label="Research & Projects" index={3} show={show}>
              <div className="space-y-7">
                {RESUME_PROJECTS.map((project) => (
                  <div key={project.title}>
                    <h3 className="text-[14px] font-semibold leading-snug text-white">
                      {project.title}
                    </h3>
                    <Stack items={project.stack} />
                    <Bullets points={project.points} />
                  </div>
                ))}
              </div>
            </Section>

            <Section label="Technical Skills" index={4} show={show}>
              <div className="space-y-6">
                {RESUME_SKILLS.map((group, i) => (
                  <div key={group.label}>
                    <h3 className="text-[12px] font-semibold text-white/80">
                      {group.label}
                    </h3>
                    {/* Languages drift left → right, tools right → left */}
                    <TechMarquee
                      items={group.items}
                      direction={i === 0 ? "right" : "left"}
                    />
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <p
            style={rise(show, 5)}
            className="border-t border-white/[0.07] pt-6 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25"
          >
            Résumé · updated from resume.pdf
          </p>
        </div>
      </div>
    </div>
  );
}
