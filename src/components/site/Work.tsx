/**
 * Work — the projects as a bento grid. Each card opens a case study (context, problem,
 * decision, results), deep-linked through `?project=<id>`.
 */
import { useRef } from "react";
import {
  ArrowUpRight,
  AudioLines,
  BarChart3,
  ClipboardList,
  Gauge,
  Hospital,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { levelOf, towerById, towers, type Tower } from "@/content/campaign";
import { revealChildren, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Chip, SectionHeading, trackSpotlight } from "./primitives";
import { useProjectParam } from "./project-link";

const icons: Record<string, LucideIcon> = {
  "campaign-workflow": Workflow,
  "claim-portal": ClipboardList,
  "performance-optimization": Gauge,
  "analytics-dashboard": BarChart3,
  "lab-booking": Hospital,
  "call-pulse": AudioLines,
};

/** Bento spans, in `towers` order. */
const spans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-3",
];

const shortTitle = (t: Tower) => t.title.replace(/\s*\(.*\)$/, "");

function ProjectCard({ tower, className, featured }: { tower: Tower; className?: string; featured?: boolean }) {
  const { open } = useProjectParam();
  const Icon = icons[tower.id] ?? Workflow;
  const level = levelOf(tower);

  return (
    <li data-reveal className={cn("min-h-[260px]", className)}>
      <button
        onClick={() => open(tower.id)}
        onPointerMove={trackSpotlight}
        aria-label={`${shortTitle(tower)}: read the case study`}
        className={cn(
          "group relative isolate flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card/70 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-8",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
          "before:bg-[radial-gradient(480px_circle_at_var(--x,50%)_var(--y,50%),hsl(var(--primary)/0.16),transparent_60%)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-surface-2 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <p
          className={cn(
            "mt-8 font-heading font-bold tracking-tight text-gradient-aurora",
            featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl",
          )}
        >
          {tower.banner}
        </p>
        <h3 className={cn("mt-3 font-heading font-semibold", featured ? "text-2xl" : "text-lg")}>{shortTitle(tower)}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground-muted">{tower.summary}</p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
          <Chip className="border-primary/30 text-primary">
            {tower.levelId === "side-quest" ? "Side project" : level?.company}
          </Chip>
          {tower.tech.slice(0, featured ? 5 : 3).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </button>
    </li>
  );
}

function CaseStudy() {
  const { projectId, close } = useProjectParam();
  const tower = projectId ? towerById(projectId) : undefined;
  const Icon = tower ? (icons[tower.id] ?? Workflow) : Workflow;
  const level = tower ? levelOf(tower) : undefined;

  return (
    <Dialog open={Boolean(tower)} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-h-[90svh] max-w-3xl overflow-y-auto rounded-3xl border-border bg-background/95 p-0 backdrop-blur-xl">
        {tower && (
          <article>
            <header className="relative overflow-hidden border-b border-border p-7 md:p-10">
              <div aria-hidden className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
              <div aria-hidden className="absolute -left-10 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-surface-2 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-primary">
                {tower.levelId === "side-quest" ? "Side project" : `${level?.company} · ${level?.title}`}
              </p>
              <DialogTitle className="mt-2 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {tower.title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-base text-foreground-muted">{tower.summary}</DialogDescription>
            </header>

            <div className="space-y-8 p-7 md:p-10">
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {tower.metrics.map((m) => (
                  <li key={m} className="rounded-2xl border border-border bg-surface/60 p-4 font-heading text-sm font-semibold">
                    {m}
                  </li>
                ))}
              </ul>

              {(
                [
                  ["Context", tower.context],
                  ["The problem", tower.problem],
                  ["The decision", tower.decision],
                  ["Results", tower.results],
                ] as const
              ).map(([label, body], i) => (
                <section key={label} className="grid gap-2 md:grid-cols-[160px_1fr] md:gap-8">
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground-muted">
                    <span className="text-primary">0{i + 1}</span> {label}
                  </h4>
                  <p className="leading-relaxed text-foreground/90">{body}</p>
                </section>
              ))}

              <div className="flex flex-wrap gap-1.5 border-t border-border pt-6">
                {tower.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  useGsap(root, revealChildren);

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="section-padding">
      <div className="container-max space-y-14">
        <SectionHeading
          index="05"
          eyebrow="Selected work"
          id="work-title"
          title={
            <>
              Systems built for <span className="text-gradient-aurora">real scale.</span>
            </>
          }
          lede="Enterprise portals at Bajaj Finserv Health, plus one AI side project. Each card opens the trade-offs behind it."
        />

        <ul className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {towers.map((t, i) => (
            <ProjectCard key={t.id} tower={t} className={spans[i]} featured={i === 0} />
          ))}
        </ul>
      </div>
      <CaseStudy />
    </section>
  );
}
