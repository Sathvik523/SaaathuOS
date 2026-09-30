"use client";

import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  Check,
  Command,
  Copy,
  Hand,
  Image as ImageIcon,
  Layers,
  Mail,
  Maximize2,
  Mic,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  BUILD_STACK,
  BUILD_STEPS,
  CHALLENGES,
  GUIDE_REPO_URL,
  HIDDEN_FEATURES,
  REPLICATE_STEPS,
} from "@/content/buildGuide";
import { USER_PROFILE } from "@/content/portfolioData";
import { useWindowManager } from "@/system/window-manager";

interface Theme {
  tint: string; // translucent wash over the shared base — sections differ in hue, not in material
  at: string; // where that wash sits
  glassTop: string;
  glassBottom: string;
  accent: string;
}

const BASE = "linear-gradient(180deg, #101017 0%, #0c0c12 100%)";

// Fades the portrait into the canvas on its left edge and along the top and bottom
const PORTRAIT_MASK =
  "linear-gradient(to left, rgba(0,0,0,1) 38%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12% 88%, rgba(0,0,0,0) 100%)";

const THEMES: Theme[] = [
  {
    // 1. Build — indigo
    tint: "rgba(99,102,241,0.17)",
    at: "18% 4%",
    glassTop: "rgba(129,131,229,0.17)",
    glassBottom: "rgba(22,23,42,0.30)",
    accent: "#a5b4fc",
  },
  {
    // 2. Make it yours — teal
    tint: "rgba(45,212,191,0.14)",
    at: "82% 8%",
    glassTop: "rgba(94,234,212,0.15)",
    glassBottom: "rgba(16,32,34,0.30)",
    accent: "#5eead4",
  },
  {
    // 3. Explore — amber
    tint: "rgba(251,191,36,0.12)",
    at: "18% 92%",
    glassTop: "rgba(233,196,106,0.15)",
    glassBottom: "rgba(34,27,18,0.30)",
    accent: "#e9c46a",
  },
  {
    // 4. Challenges — rose
    tint: "rgba(251,113,133,0.13)",
    at: "82% 94%",
    glassTop: "rgba(253,164,175,0.15)",
    glassBottom: "rgba(36,21,26,0.30)",
    accent: "#fda4af",
  },
];

const SECTIONS = [
  { id: "build", label: "Build", title: "Build a portfolio like this", lead: "A desktop that runs in the browser, one layer at a time." },
  { id: "replicate", label: "Make it yours", title: "Make it yours", lead: "Clone it, swap the content, ship it under your own name." },
  { id: "explore", label: "Explore", title: "Things you might have missed", lead: "The parts of this OS that stay hidden until you go looking." },
  { id: "challenges", label: "Fixes", title: "Challenges & fixes", lead: "Every wall I hit building this, and the way through it." },
];

// Glassmorphism: one frosted material for the whole guide. It stays translucent so the
// portrait behind it reads through the panels instead of being blocked out; each section
// only tints the glass with its own hue.
const glass = (t: Theme, radius = 24): CSSProperties => ({
  background: `linear-gradient(145deg, ${t.glassTop}, ${t.glassBottom})`,
  backdropFilter: "blur(18px) saturate(150%)",
  WebkitBackdropFilter: "blur(18px) saturate(150%)",
  border: "1px solid rgba(255,255,255,0.13)",
  boxShadow:
    "0 14px 38px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -18px 30px rgba(0,0,0,0.16)",
  borderRadius: radius,
});

// Recessed glass — code wells, keycaps, number badges
const glassInset = (radius = 14): CSSProperties => ({
  background: "rgba(8,10,18,0.32)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "inset 0 1px 6px rgba(0,0,0,0.42)",
  borderRadius: radius,
});

const ICONS: Record<string, typeof Command> = {
  Command, Mic, Terminal, Hand, Layers, Sparkles, Maximize2, CalendarDays, Image: ImageIcon,
};

function CodeWell({ theme, code }: { theme: Theme; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {}
    );
  };

  return (
    <div className="relative mt-4" style={glassInset()}>
      <pre className="overflow-x-auto px-4 py-3.5 pr-11 font-mono text-[11px] leading-[1.8] text-white/70 no-scrollbar whitespace-pre [mask-image:linear-gradient(to_right,black_82%,transparent_97%)]">
        {code}
      </pre>
      <button
        onClick={copy}
        aria-label="Copy to clipboard"
        style={{ background: theme.glassBottom, boxShadow: `0 0 9px 7px ${theme.glassBottom}` }}
        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white/90 cursor-pointer"
      >
        {copied ? <Check size={12} style={{ color: theme.accent }} /> : <Copy size={12} />}
      </button>
    </div>
  );
}

export default function GuideApp() {
  const { openConnectFullPage } = useWindowManager();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const [revealed, setRevealed] = useState<boolean[]>(() => {
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return SECTIONS.map((_, i) => reduced || i === 0);
  });
  // Fractional scroll position (0 → 3): drives the background crossfade, so the
  // hue drifts between sections instead of switching at the boundary
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Where the viewport's middle sits within its section. The hue holds for the
        // first 70% of a section, then blends into the next one across the last 30%,
        // so the change reads as a drift rather than a swap.
        const centre = root.scrollTop + root.clientHeight / 2;
        let next = 0;
        for (let i = 0; i < sectionRefs.current.length; i++) {
          const el = sectionRefs.current[i];
          if (!el) continue;
          const top = el.offsetTop;
          const height = el.offsetHeight || 1;
          if (centre < top) break;
          const local = Math.min(1, (centre - top) / height);
          next = i + Math.max(0, (local - 0.7) / 0.3);
        }
        setProgress(Math.min(SECTIONS.length - 1, next));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio > 0.18) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setRevealed((prev) => (prev[index] ? prev : prev.map((v, i) => (i === index ? true : v))));
          }
        }
      },
      { root, threshold: [0, 0.18, 0.5] }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      root.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const root = scrollRef.current;
    const section = sectionRefs.current[index];
    if (root && section) root.scrollTo({ top: section.offsetTop, behavior: "smooth" });
  }, []);

  const active = Math.round(progress);

  // Contact links come from USER_PROFILE so the guide can never drift out of date
  const contacts = useMemo(
    () => [
      { label: "Email", value: USER_PROFILE.email, href: `mailto:${USER_PROFILE.email}`, icon: Mail },
      { label: "GitHub", value: USER_PROFILE.github.replace(/^https?:\/\//, ""), href: USER_PROFILE.github, icon: AtSign },
      { label: "LinkedIn", value: USER_PROFILE.linkedin.replace(/^https?:\/\//, ""), href: USER_PROFILE.linkedin, icon: ArrowUpRight },
    ],
    []
  );

  const reveal = (show: boolean, delay = 0, distance = 24): CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "none" : `translateY(${distance}px)`,
    transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 820ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div className="@container relative h-full w-full" style={{ background: BASE }}>
      {/* One canvas for all four sections: each hue fades in as its section arrives */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {THEMES.map((theme, i) => (
          <div
            key={i}
            data-tint={i}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(115% 85% at ${theme.at}, ${theme.tint} 0%, rgba(14,14,22,0) 62%)`,
              opacity: Math.max(0, 1 - Math.abs(progress - i)),
            }}
          />
        ))}
      </div>

      {/* Portrait, anchored right. It sits behind the frosted panels — they overlap only
          his torso, and stay translucent enough to read him through. Hidden on narrow
          windows, where the text would have to fight it. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden aspect-[997/1577] @[820px]:block">
        <Image
          src="/portrait-sathvik.jpg"
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 1200px) 45vw, 520px"
          className="object-cover object-top"
          style={{
            opacity: 0.78,
            maskImage: PORTRAIT_MASK,
            WebkitMaskImage: PORTRAIT_MASK,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        {/* Scrim: keeps the illustration's bright paper from lighting up the dark UI */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(12,12,20,0.30) 0%, rgba(12,12,20,0.46) 45%, rgba(12,12,20,0.72) 100%)",
            maskImage: PORTRAIT_MASK,
            WebkitMaskImage: PORTRAIT_MASK,
          }}
        />
      </div>

      {/* Section rail */}
      <nav className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => goTo(i)}
            title={section.title}
            aria-label={section.title}
            className="group flex items-center justify-end gap-2 cursor-pointer"
          >
            <span
              className="hidden text-[9px] font-medium uppercase tracking-[0.14em] opacity-0 transition-opacity group-hover:opacity-100 sm:inline"
              style={{ color: THEMES[i].accent }}
            >
              {section.label}
            </span>
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: 5,
                height: active === i ? 20 : 5,
                background: active === i ? THEMES[i].accent : "rgba(255,255,255,0.22)",
              }}
            />
          </button>
        ))}
      </nav>

      <div
        ref={scrollRef}
        className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-smooth no-scrollbar select-text"
      >
        {SECTIONS.map((section, index) => {
          const theme = THEMES[index];
          const show = revealed[index];

          return (
            <section
              key={section.id}
              data-index={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="relative z-10 flex min-h-full snap-start flex-col justify-center py-12 pl-12 pr-20 @[820px]:pl-14 @[820px]:pr-[22%]"
            >
              {/* Header */}
              <div style={reveal(show, 0, 28)}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-7 items-center rounded-full px-3 font-mono text-[10px] font-semibold tracking-[0.2em]"
                    style={{ ...glass(theme, 999), color: theme.accent }}
                  >
                    0{index + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Portfolio guide
                  </span>
                </div>
                <h2 className="mt-5 text-[28px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[34px]">
                  {section.title}
                </h2>
                <p className="mt-3 max-w-md text-[13px] leading-[1.7] text-white/45">{section.lead}</p>
              </div>

              {/* 1. BUILD */}
              {index === 0 && (
                <>
                  <div className="mt-6 flex flex-wrap gap-2" style={reveal(show, 140)}>
                    {BUILD_STACK.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 font-mono text-[10px] text-white/60"
                        style={glass(theme, 999)}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(236px,1fr))]">
                    {BUILD_STEPS.map((step, i) => (
                      <div key={step.title} style={{ ...glass(theme), ...reveal(show, 230 + i * 80) }} className="p-5">
                        <span
                          className="flex h-8 w-8 items-center justify-center font-mono text-[11px] font-bold"
                          style={{ ...glassInset(999), color: theme.accent }}
                        >
                          {i + 1}
                        </span>
                        <h3 className="mt-4 text-[14px] font-semibold leading-snug text-white">{step.title}</h3>
                        <p className="mt-2.5 text-[12px] leading-[1.75] text-white/55">{step.body}</p>
                        {step.code && <CodeWell theme={theme} code={step.code} />}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* 2. REPLICATE */}
              {index === 1 && (
                <>
                  <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(236px,1fr))]">
                    {REPLICATE_STEPS.map((step, i) => (
                      <div key={step.title} style={{ ...glass(theme), ...reveal(show, 200 + i * 80) }} className="p-5">
                        <span
                          className="font-mono text-[10px] font-semibold tracking-[0.18em]"
                          style={{ color: theme.accent }}
                        >
                          STEP {i + 1}
                        </span>
                        <h3 className="mt-3 text-[14px] font-semibold leading-snug text-white">{step.title}</h3>
                        <p className="mt-2.5 text-[12px] leading-[1.75] text-white/55">{step.body}</p>
                        {step.code && <CodeWell theme={theme} code={step.code} />}
                      </div>
                    ))}
                  </div>

                  <a
                    href={GUIDE_REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 flex w-fit items-center gap-2 font-mono text-[11px] text-white/40 transition-colors hover:text-white/80"
                    style={reveal(show, 200 + REPLICATE_STEPS.length * 80)}
                  >
                    <span style={{ color: theme.accent }}>Source</span>
                    {GUIDE_REPO_URL.replace(/^https?:\/\//, "")}
                    <ArrowUpRight size={12} />
                  </a>
                </>
              )}

              {/* 3. EXPLORE */}
              {index === 2 && (
                <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(296px,1fr))]">
                  {HIDDEN_FEATURES.map((feature, i) => {
                    const Icon = ICONS[feature.icon] ?? Sparkles;
                    return (
                      <div
                        key={feature.title}
                        style={{ ...glass(theme, 22), ...reveal(show, 190 + i * 70) }}
                        className="flex items-start gap-4 p-5"
                      >
                        <span
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center"
                          style={{ ...glassInset(999), color: theme.accent }}
                        >
                          <Icon size={15} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[13.5px] font-semibold text-white">{feature.title}</h3>
                          <span
                            className="mt-2 inline-block px-2 py-1 font-mono text-[9.5px] text-white/55"
                            style={glassInset(8)}
                          >
                            {feature.how}
                          </span>
                          <p className="mt-2.5 text-[12px] leading-[1.75] text-white/55">{feature.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 4. CHALLENGES */}
              {index === 3 && (
                <>
                  <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(252px,1fr))]">
                    {CHALLENGES.map((challenge, i) => (
                      <div key={challenge.problem} style={{ ...glass(theme), ...reveal(show, 190 + i * 70) }} className="p-5">
                        <h3 className="text-[13.5px] font-semibold leading-snug text-white">{challenge.problem}</h3>
                        <p className="mt-2 text-[11px] italic leading-relaxed text-white/35">{challenge.symptom}</p>
                        <p className="mt-3.5 text-[12px] leading-[1.75] text-white/60">{challenge.fix}</p>
                      </div>
                    ))}
                  </div>

                  {/* Contact */}
                  <div
                    style={{ ...glass(theme), ...reveal(show, 190 + CHALLENGES.length * 70) }}
                    className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-5 p-5"
                  >
                    <div className="min-w-[200px] flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                        Still stuck?
                      </span>
                      <h3 className="mt-2 text-[16px] font-semibold text-white">
                        Ask {USER_PROFILE.name} directly
                      </h3>
                      <p className="mt-2 text-[12px] leading-[1.7] text-white/50">
                        Send me what you&apos;re seeing and I&apos;ll help you get unstuck.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {contacts.map(({ label, value, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noreferrer"
                          className="flex items-center gap-2.5 px-4 py-2.5 transition-transform hover:scale-[1.03]"
                          style={glassInset(14)}
                        >
                          <Icon size={13} style={{ color: theme.accent }} />
                          <span className="flex flex-col leading-tight">
                            <span className="text-[9px] uppercase tracking-wider text-white/35">{label}</span>
                            <span className="font-mono text-[11px] text-white/80">{value}</span>
                          </span>
                        </a>
                      ))}
                      <button
                        onClick={openConnectFullPage}
                        className="flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-semibold text-white transition-transform hover:scale-[1.03] cursor-pointer"
                        style={glass(theme, 14)}
                      >
                        Open the Connect page
                        <ArrowUpRight size={13} style={{ color: theme.accent }} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
