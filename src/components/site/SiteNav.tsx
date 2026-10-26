/**
 * Floating pill navigation: active-chapter highlight, scroll progress, theme toggle and a
 * full-screen menu on small screens.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToSection, scrollToY } from "@/lib/smooth-scroll";
import { profile } from "@/content/profile";

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "work", label: "Work" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
] as const;

type Theme = "dark" | "light";

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function SiteNav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(`#${id}`);
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-aurora"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Main"
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border px-2 py-2 pl-4 transition-all duration-300",
            scrolled
              ? "border-border bg-background/70 shadow-card backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <button
            onClick={() => scrollToY(0)}
            className="group flex min-h-[44px] items-center gap-2 font-heading text-sm font-bold tracking-tight"
            aria-label={`${profile.name}, back to top`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-aurora font-mono text-xs text-primary-foreground transition-transform duration-300 group-hover:rotate-[20deg]">
              AK
            </span>
            <span className="hidden sm:inline">Adarsh</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative min-h-[40px] rounded-full px-3.5 text-sm font-medium transition-colors duration-200",
                    active === id ? "text-foreground" : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                className="flex min-h-[40px] items-center gap-1 rounded-full px-3.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                Blog <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[40px] items-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 sm:flex"
            >
              Résumé
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full text-foreground md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-background/95 px-6 pb-10 pt-6 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="grid h-11 w-11 place-items-center rounded-full border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-10 space-y-2">
              {sections.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => go(id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left font-heading text-4xl font-bold tracking-tight"
                  >
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    {label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * sections.length, duration: 0.4 }}
              >
                <Link to="/blog" className="flex items-baseline gap-4 py-2 font-heading text-4xl font-bold tracking-tight">
                  <span className="font-mono text-xs text-primary">07</span>
                  Blog
                </Link>
              </motion.li>
            </ul>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex min-h-[52px] items-center justify-center rounded-full bg-foreground font-semibold text-background"
            >
              View résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
