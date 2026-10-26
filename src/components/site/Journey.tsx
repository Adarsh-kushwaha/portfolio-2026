/**
 * Journey — every role, newest first, along a line that draws itself as you scroll.
 */
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { levels, towersForLevel } from "@/content/campaign";
import { gsap, revealChildren, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Chip, SectionHeading, SpotlightCard } from "./primitives";
import { useProjectParam } from "./project-link";

const newestFirst = [...levels].reverse();
const WINS_SHOWN = 3;

function LevelCard({ level }: { level: (typeof levels)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const { open } = useProjectParam();
  const projects = towersForLevel(level.id);
  const wins = expanded ? level.wins : level.wins.slice(0, WINS_SHOWN);
  const current = level.end === null;

  return (
    <SpotlightCard as="article" className="p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-primary">{level.period}</span>
        <Chip>{level.type}</Chip>
        {current && (
          <span className="rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[11px] leading-none text-primary">
            Now
          </span>
        )}
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold md:text-2xl">{level.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground-muted">
        {level.company}
        <span aria-hidden>·</span>
        <MapPin className="h-3.5 w-3.5" aria-hidden />
        {level.location}
      </p>

      <ul className="mt-5 space-y-2.5">
        {wins.map((w) => (
          <li key={w} className="flex gap-3 text-sm leading-relaxed text-foreground-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
            {w}
          </li>
        ))}
      </ul>
      {level.wins.length > WINS_SHOWN && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary"
        >
          {expanded ? "Show less" : `${level.wins.length - WINS_SHOWN} more`}
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")} aria-hidden />
        </button>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {level.tech.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      {projects.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">Built here</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {projects.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => open(p.id)}
                  className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border px-3.5 text-xs font-medium transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {p.title.replace(/\s*\(.*\)$/, "")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SpotlightCard>
  );
}

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, (el) => {
    revealChildren(el);
    gsap.fromTo(
      "[data-journey-line]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-journey-track]", start: "top 70%", end: "bottom 70%", scrub: 0.6 },
      },
    );
    el.querySelectorAll<HTMLElement>("[data-journey-dot]").forEach((dot) => {
      gsap.fromTo(
        dot,
        // GSAP can't tween colours written as CSS variables, so the dot lights up through opacity.
        { scale: 0.4, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(3)",
          scrollTrigger: { trigger: dot, start: "top 70%", toggleActions: "play none none reverse" },
        },
      );
    });
  });

  return (
    <section ref={root} id="journey" aria-labelledby="journey-title" className="section-padding">
      <div className="container-max space-y-14">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          id="journey-title"
          title={
            <>
              From a COVID-era agency <span className="text-gradient-aurora">to SDE II.</span>
            </>
          }
          lede="Six roles since 2020. Newest first; open any project to read the full case study."
        />

        <ol data-journey-track className="relative space-y-8 pl-8 md:pl-0">
          <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <span
            aria-hidden
            data-journey-line
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-primary via-violet to-gold md:left-1/2 md:-translate-x-1/2"
          />
          {newestFirst.map((level, i) => (
            <li
              key={level.id}
              data-reveal
              className={cn(
                "relative md:grid md:w-1/2",
                i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12",
              )}
            >
              <span
                aria-hidden
                data-journey-dot
                className={cn(
                  "absolute -left-8 top-8 h-[15px] w-[15px] rounded-full border-4 border-background bg-primary",
                  i % 2 === 0 ? "md:-right-[7.5px] md:left-auto" : "md:-left-[7.5px]",
                )}
              />
              <LevelCard level={level} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
