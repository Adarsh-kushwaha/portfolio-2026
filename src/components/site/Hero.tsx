/**
 * Hero — the intro hook. Aurora backdrop, split-text name, rotating focus line, magnetic CTAs,
 * an orbiting portrait with floating metric chips and counting impact stats.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Gauge, Layers, Zap } from "lucide-react";
import portraitImg from "@/assets/adarsh-portrait.webp";
import { profile, socials } from "@/content/profile";
import { scrollToSection } from "@/lib/smooth-scroll";
import { gsap, prefersReducedMotion, SplitText, useGsap } from "@/lib/motion";
import { SocialIcon } from "./SocialIcon";
import { LocalTime } from "./LocalTime";
import { Magnetic } from "./primitives";

const focusWords = ["frontend systems", "design systems", "schema-driven forms", "3G-fast interfaces"];

const heroStats = [
  { value: 1.25, suffix: "L+", decimals: 2, label: "API calls / month" },
  { value: 200, suffix: "+", decimals: 0, label: "form variants, 1 schema" },
  { value: 95, suffix: "", decimals: 0, label: "Lighthouse, up from 60" },
  { value: 99.3, suffix: "%", decimals: 1, label: "crash-free sessions" },
];

const chips = [
  { icon: Gauge, text: "LCP 5.3s → 1.2s", className: "-left-6 top-[18%] md:-left-14" },
  { icon: Zap, text: "Bundle −76%", className: "-right-4 top-[46%] md:-right-12" },
  { icon: Layers, text: "Module Federation", className: "-left-2 bottom-[10%] md:-left-10" },
];

function useRotatingWord(words: string[], ms = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), ms);
    return () => window.clearInterval(id);
  }, [words.length, ms]);
  return words[i];
}

function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full bg-primary/25 blur-[120px] animate-aurora motion-reduce:animate-none" />
      <div className="absolute -right-[15%] top-[5%] h-[55vmax] w-[55vmax] rounded-full bg-violet/25 blur-[130px] animate-aurora-slow motion-reduce:animate-none" />
      <div className="absolute bottom-[-30%] left-[25%] h-[45vmax] w-[45vmax] rounded-full bg-gold/10 blur-[120px] animate-aurora motion-reduce:animate-none [animation-delay:-6s]" />
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const word = useRotatingWord(focusWords);

  useGsap(root, (el) => {
    // Only the first line is split: background-clip text doesn't survive per-char elements,
    // so the gradient line rises as one piece.
    const first = el.querySelector<HTMLElement>("[data-hero-split]");
    const split = first ? new SplitText(first, { type: "chars", mask: "chars" }) : null;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (split) tl.from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.025 }, 0.1);
    tl.from("[data-hero-line]", { yPercent: 110, duration: 1.2 }, 0.3);
    tl.from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.08 }, 0.35)
      .from("[data-hero-portrait]", { autoAlpha: 0, scale: 0.9, rotate: -4, duration: 1.3 }, 0.2)
      .from("[data-hero-chip]", { autoAlpha: 0, scale: 0.6, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, 0.9);

    // Count the stats up from zero.
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
      const target = Number(node.dataset.count);
      const decimals = Number(node.dataset.decimals ?? 0);
      const obj = { v: 0 };
      tl.to(obj, { v: target, duration: 1.8, ease: "power3.out", onUpdate: () => (node.textContent = obj.v.toFixed(decimals)) }, 0.7);
    });

    // Parallax the portrait and fade the hero as it scrolls away.
    gsap.to("[data-hero-portrait]", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("[data-hero-copy]", {
      autoAlpha: 0.15,
      y: -60,
      ease: "none",
      scrollTrigger: { trigger: el, start: "center center", end: "bottom top", scrub: true },
    });

    return () => split?.revert();
  });

  // Chips drift a little toward the pointer.
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || !window.matchMedia?.("(pointer: fine)").matches) return;
    const targets = gsap.utils.toArray<HTMLElement>("[data-hero-chip]", el);
    const movers = targets.map((t, i) => ({
      x: gsap.quickTo(t, "x", { duration: 1, ease: "power3.out" }),
      y: gsap.quickTo(t, "y", { duration: 1, ease: "power3.out" }),
      depth: 14 + i * 8,
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      movers.forEach((m) => {
        m.x(nx * m.depth);
        m.y(ny * m.depth);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-name"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-10 pt-28 sm:px-6 lg:px-8"
    >
      <AuroraBackdrop />

      <div className="container-max grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div data-hero-copy className="space-y-7">
          <p
            data-hero-fade
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-foreground-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {profile.label}
            <span className="text-border" aria-hidden>
              |
            </span>
            <LocalTime className="font-mono" />
          </p>

          <h1
            id="hero-name"
            className="font-heading text-[clamp(3.2rem,10vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.045em]"
          >
            <span data-hero-split className="block">
              Adarsh
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block text-gradient-aurora">
                Kushwaha
              </span>
            </span>
          </h1>

          <p data-hero-fade className="font-heading text-xl font-medium text-foreground sm:text-2xl md:text-3xl">
            <span className="sr-only">I build frontend systems that scale.</span>
            <span aria-hidden className="inline-flex flex-wrap items-baseline gap-x-2">
              I build
              <span className="relative inline-grid overflow-hidden align-bottom text-primary">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={word}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="whitespace-nowrap"
                  >
                    {word}
                  </motion.span>
                </AnimatePresence>
              </span>
              that scale.
            </span>
          </p>

          <p data-hero-fade className="max-w-xl text-pretty text-base leading-relaxed text-foreground-muted md:text-lg">
            {profile.subtitle}
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3 pt-1">
            <Magnetic>
              <button
                onClick={() => scrollToSection("#work")}
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-gradient-aurora px-7 font-heading text-sm font-semibold text-primary-foreground shadow-teal transition-shadow duration-300 hover:shadow-[0_0_48px_hsl(var(--primary)/0.45)]"
              >
                See my work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-border bg-surface/60 px-7 font-heading text-sm font-semibold backdrop-blur transition-colors duration-300 hover:border-primary/60"
              >
                <FileText className="h-4 w-4" aria-hidden /> Résumé
              </a>
            </Magnetic>
            <ul className="ml-1 flex items-center gap-1" aria-label="Social links">
              {socials
                .filter((s) => s.id !== "email")
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full text-foreground-muted transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-2 hover:text-primary"
                    >
                      <SocialIcon id={s.id} className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <div data-hero-portrait className="relative aspect-[4/5]">
            <svg aria-hidden viewBox="0 0 400 400" className="absolute -inset-[12%] h-[124%] w-[124%] animate-orbit motion-reduce:animate-none">
              <circle cx="200" cy="200" r="196" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeDasharray="2 10" strokeWidth="1.5" />
              <circle cx="200" cy="4" r="4" fill="hsl(var(--primary))" />
            </svg>
            <svg aria-hidden viewBox="0 0 400 400" className="absolute -inset-[4%] h-[108%] w-[108%] animate-orbit-reverse motion-reduce:animate-none">
              <circle cx="200" cy="200" r="196" fill="none" stroke="hsl(var(--violet) / 0.3)" strokeWidth="1" />
              <circle cx="396" cy="200" r="3.5" fill="hsl(var(--violet))" />
            </svg>
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-border bg-surface shadow-lg-dark">
              <img
                src={portraitImg}
                alt="Portrait of Adarsh Kushwaha"
                className="h-full w-full object-cover object-top"
                width={720}
                height={613}
                {...{ fetchpriority: "high" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {chips.map(({ icon: Icon, text, className }) => (
              <div
                key={text}
                data-hero-chip
                className={`absolute flex items-center gap-2 rounded-2xl border border-border bg-background/80 px-3 py-2 font-mono text-xs shadow-card backdrop-blur-md ${className}`}
              >
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <dl className="container-max mt-16 grid w-full grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
        {heroStats.map((s) => (
          <div key={s.label} data-hero-fade className="flex flex-col-reverse bg-background/80 px-5 py-6 backdrop-blur">
            <dt className="mt-1 text-xs text-foreground-muted md:text-sm">{s.label}</dt>
            <dd className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              <span data-count={s.value} data-decimals={s.decimals}>
                {s.value.toFixed(s.decimals)}
              </span>
              <span className="text-primary">{s.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>

      <button
        onClick={() => scrollToSection("#about")}
        className="mx-auto mt-8 flex min-h-[44px] flex-col items-center gap-1 text-xs text-foreground-muted transition-colors hover:text-foreground"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden />
      </button>
    </section>
  );
}
