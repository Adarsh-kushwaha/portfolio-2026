/**
 * Small building blocks shared by every chapter of the site.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/** Chapter heading: mono index, eyebrow, title and optional lede. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  id,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl space-y-4", className)}>
      <p data-reveal className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span className="text-foreground-muted">{index}</span>
        <span className="h-px w-8 bg-primary/60" aria-hidden />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal
        className="text-balance font-heading text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl"
      >
        {title}
      </h2>
      {lede && (
        <p data-reveal className="max-w-2xl text-pretty text-base leading-relaxed text-foreground-muted md:text-lg">
          {lede}
        </p>
      )}
    </header>
  );
}

/** Pulls its child toward the pointer. Use on at most two focal elements per screen. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Writes the pointer position into --x / --y so a card can paint a spotlight under it. */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/** A bento card with a pointer-following glow and gradient border on hover. */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      onPointerMove={trackSpotlight}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "before:bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),hsl(var(--primary)/0.14),transparent_60%)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Small mono pill for tech names and tags. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface/80 px-2.5 py-1 font-mono text-[11px] leading-none text-foreground-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
