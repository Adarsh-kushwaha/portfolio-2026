/**
 * Pinning for scroll-driven sections. Pins only in 3D mode; everywhere else the section
 * scrolls normally. Every pin gets a Skip link (see plan.md → Scroll budget).
 */
import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useRenderMode } from "@/lib/render-mode";
import { scrollToSection } from "@/lib/smooth-scroll";

interface PinOptions {
  /** Extra scroll length while pinned, in screens. */
  screens: number;
  /** Called with 0–1 as the visitor scrolls through the pin. */
  onProgress?: (progress: number) => void;
}

/** Returns true while the section is pinned (3D mode only). */
export function usePin(ref: RefObject<HTMLElement>, { screens, onProgress }: PinOptions) {
  const mode = useRenderMode();
  const pinned = mode === "3d";

  useEffect(() => {
    if (!pinned || !ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: () => `+=${window.innerHeight * screens}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => onProgress?.(self.progress),
    });
    return () => trigger.kill();
  }, [pinned, ref, screens, onProgress]);

  return pinned;
}

export function SkipLink({ to, label = "Skip" }: { to: string; label?: string }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(to);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-foreground-muted backdrop-blur hover:border-primary hover:text-primary transition-colors"
    >
      {label} <ArrowDown className="w-3.5 h-3.5" aria-hidden />
    </a>
  );
}

/** Mutable 0–1 progress shared with a 3D scene without re-rendering React. */
export function useProgressRef() {
  const [ref] = useState(() => ({ current: 0 }));
  return ref;
}
