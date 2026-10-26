/**
 * Motion — GSAP setup shared by the site. Every animation runs inside a reduced-motion-aware
 * matchMedia, so visitors who ask for less motion get the final, readable state.
 */
import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

export const hasFinePointer = () =>
  typeof window !== "undefined" && (window.matchMedia?.("(pointer: fine)").matches ?? false);

/**
 * Runs `setup` in a gsap.matchMedia scoped to `scope`, only when motion is allowed.
 * Everything created inside is reverted on unmount.
 */
export function useGsap(
  scope: RefObject<HTMLElement>,
  setup: (root: HTMLElement) => void | (() => void),
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || typeof window === "undefined" || !window.matchMedia) return;
    const mm = gsap.matchMedia(root);
    // Motion is decoration: a failed animation must never take the page down with it.
    mm.add(MOTION_OK, () => {
      try {
        return setup(root);
      } catch (error) {
        console.error("Animation setup failed", error);
        gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "opacity,visibility,transform" });
      }
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Fades `[data-reveal]` elements inside `root` up into place as they scroll into view. */
export function revealChildren(root: HTMLElement) {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
  if (!items.length) return;
  gsap.set(items, { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch(items, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
}
