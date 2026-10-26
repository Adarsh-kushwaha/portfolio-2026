/**
 * Index — the portfolio as one scroll-driven story:
 * Hero → About → Impact → Skills → Journey → Work → Beyond → Contact.
 * Design decisions live in design-system/adarsh-kushwaha/MASTER.md.
 */
import { useEffect, useRef, useState } from "react";
import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import TechMarquee from "@/components/site/TechMarquee";
import About from "@/components/site/About";
import Impact from "@/components/site/Impact";
import Skills from "@/components/site/Skills";
import Journey from "@/components/site/Journey";
import Work from "@/components/site/Work";
import Beyond from "@/components/site/Beyond";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { RenderModeProvider } from "@/lib/render-mode";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type Theme = "dark" | "light";
const THEME_KEY = "portfolio-theme";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as Theme | null) ?? "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage blocked: theme still applies for this visit */
    }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))] as const;
}

/** A soft glow that trails the pointer across the page (fine pointers, motion allowed). */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
        el.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.07),transparent_65%)] opacity-0 transition-opacity duration-500"
    />
  );
}

export default function Index() {
  const [theme, toggleTheme] = useTheme();

  return (
    <RenderModeProvider>
      <SmoothScrollProvider>
        <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
          <a
            href="#about"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <CursorGlow />
          <SiteNav theme={theme} onToggleTheme={toggleTheme} />
          <main className="relative z-10">
            <Hero />
            <TechMarquee />
            <About />
            <Impact />
            <Skills />
            <Journey />
            <Work />
            <Beyond />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </RenderModeProvider>
  );
}
