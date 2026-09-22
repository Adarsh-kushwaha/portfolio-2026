/**
 * Smooth scroll: Lenis drives the page and keeps GSAP ScrollTrigger in sync. 3D mode only;
 * 2D and reduced-motion visitors keep native scrolling.
 */
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRenderMode } from "@/lib/render-mode";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Scrolls to a section (e.g. "#about"), through Lenis when it is running. */
export function scrollToSection(target: string) {
  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const mode = useRenderMode();

  useEffect(() => {
    if (mode !== "3d") return;
    const instance = new Lenis({ lerp: 0.12 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, [mode]);

  return <>{children}</>;
}
