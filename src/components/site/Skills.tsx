/**
 * Skills — honest stat meters (strengths and the two I'm still growing) and the toolbox,
 * grouped into tabs.
 */
import { useRef } from "react";
import { Boxes, Database, Gauge, Layers, Sprout, Wrench, Code2, type LucideIcon } from "lucide-react";
import { skills, stats, weaknesses, type SkillLevel } from "@/content/arena";
import { gsap, revealChildren, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading, SpotlightCard } from "./primitives";

const groupIcons: Record<string, LucideIcon> = {
  "Core Frontend": Code2,
  "State & Data": Database,
  Architecture: Layers,
  Performance: Gauge,
  Craft: Sprout,
  Tools: Wrench,
};

const groups = [
  ...Array.from(new Set(skills.filter((s) => s.kind === "arsenal").map((s) => s.group))),
  "Tools",
];
const skillsIn = (group: string) =>
  group === "Tools" ? skills.filter((s) => s.kind === "tools") : skills.filter((s) => s.group === group);

const levelDots: Record<SkillLevel, number> = { Expert: 3, Advanced: 2, Intermediate: 1 };
const growing = new Set(weaknesses.map((w) => w.name));

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, (el) => {
    revealChildren(el);
    el.querySelectorAll<HTMLElement>("[data-meter]").forEach((m) => {
      gsap.from(m, {
        scaleX: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: m, start: "top 90%", once: true },
      });
    });
  });

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="section-padding">
      <div className="container-max space-y-14">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          id="skills-title"
          title={
            <>
              What I'm great at, <span className="text-gradient-aurora">and what I'm growing.</span>
            </>
          }
          lede="No inflated bars. The two lowest are labelled honestly, with what I'm doing about them."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <SpotlightCard data-reveal className="p-6 md:p-8 lg:col-span-2">
            <h3 className="font-heading text-lg font-semibold">Character sheet</h3>
            <ul className="mt-6 space-y-6">
              {stats.map((s) => {
                const isGrowing = growing.has(s.name);
                return (
                  <li key={s.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium">
                        {s.name}
                        {isGrowing && (
                          <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">
                            Growing
                          </span>
                        )}
                      </p>
                      <p className="font-mono text-sm text-foreground-muted">{s.value}</p>
                    </div>
                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2"
                      role="meter"
                      aria-valuenow={s.value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={s.name}
                    >
                      <div
                        data-meter
                        className={cn(
                          "h-full origin-left rounded-full",
                          isGrowing ? "bg-gold" : "bg-gradient-aurora",
                        )}
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-foreground-muted">{s.note ?? s.evidence}</p>
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>

          <SpotlightCard data-reveal className="p-6 md:p-8 lg:col-span-3">
            <Tabs defaultValue={groups[0]}>
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-surface-2/70 p-1.5">
                {groups.map((g) => {
                  const Icon = groupIcons[g] ?? Boxes;
                  return (
                    <TabsTrigger
                      key={g}
                      value={g}
                      className="min-h-[40px] gap-1.5 rounded-xl px-3 text-xs text-foreground-muted data-[state=active]:bg-background data-[state=active]:text-foreground sm:text-sm"
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {g}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {groups.map((g) => (
                <TabsContent key={g} value={g} className="mt-6">
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {skillsIn(g).map((s, i) => (
                      <li
                        key={s.name}
                        style={{ animationDelay: `${i * 40}ms` }}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface/60 px-4 py-3.5 transition-colors duration-200 animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both hover:border-primary/40 motion-reduce:animate-none"
                      >
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="font-mono text-[11px] text-foreground-muted">{s.years}</p>
                        </div>
                        <div className="flex items-center gap-2" aria-label={s.level}>
                          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-foreground-muted sm:inline">
                            {s.level}
                          </span>
                          <span className="flex gap-1" aria-hidden>
                            {[1, 2, 3].map((d) => (
                              <span
                                key={d}
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  d <= levelDots[s.level] ? "bg-primary" : "bg-border",
                                )}
                              />
                            ))}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
