// Windows unfold out of their Dock icon when opened and fold back into it when
// closed or minimized.
export const WINDOW_OPEN_MS = 480;
export const WINDOW_CLOSE_MS = 380;

// WindowContext unmounts/hides a window after this; the extra frames make sure the
// fold has fully landed in the icon first (the end state is held by fill: "forwards")
export const WINDOW_UNMOUNT_DELAY_MS = WINDOW_CLOSE_MS + 40;

// Open: fast unfold that settles gently. Close: the mirror image — starts gently and
// accelerates into the icon (a steeper ease-in-expo looked frozen, then snapped shut).
const OPEN_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const CLOSE_EASING = "cubic-bezier(0.45, 0, 0.6, 0.5)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Transform that maps the window's current box onto its Dock icon (origin: top-left)
function iconTransform(el: HTMLElement, applicationId: string) {
  const win = el.getBoundingClientRect();
  const icon = document
    .querySelector(`[data-dock-app="${applicationId}"] button`)
    ?.getBoundingClientRect();

  // Apps without a Dock icon fold into the middle of the Dock
  const target = icon ?? {
    left: window.innerWidth / 2 - 24,
    top: window.innerHeight - 64,
    width: 48,
    height: 48,
  };

  const scaleX = target.width / win.width;
  const scaleY = target.height / win.height;
  return `translate(${target.left - win.left}px, ${target.top - win.top}px) scale(${scaleX}, ${scaleY})`;
}

export function animateWindowOpen(el: HTMLElement, applicationId: string) {
  if (prefersReducedMotion()) return null;
  return el.animate(
    [
      { transformOrigin: "0 0", transform: iconTransform(el, applicationId), opacity: 0 },
      { opacity: 1, offset: 0.3 },
      { transformOrigin: "0 0", transform: "none", opacity: 1 },
    ],
    { duration: WINDOW_OPEN_MS, easing: OPEN_EASING }
  );
}

export function animateWindowClose(el: HTMLElement, applicationId: string) {
  if (prefersReducedMotion()) return null;
  return el.animate(
    [
      { transformOrigin: "0 0", transform: "none", opacity: 1 },
      { opacity: 1, offset: 0.6 },
      { transformOrigin: "0 0", transform: iconTransform(el, applicationId), opacity: 0 },
    ],
    // Hold the folded state until WindowContext unmounts the window
    { duration: WINDOW_CLOSE_MS, easing: CLOSE_EASING, fill: "forwards" }
  );
}
