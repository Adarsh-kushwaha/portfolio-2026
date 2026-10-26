/**
 * Impact — the measured before → after of each fight, with a bar that shrinks to what's left.
 */
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { bosses } from "@/content/arena";
import { gsap, revealChildren, useGsap } from "@/lib/motion";
import { SectionHeading, SpotlightCard } from "./primitives";

const wins = bosses.filter((b) => b.after);

export default function Impact() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, (el) => {
    revealChildren(el);
    el.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar) => {
      gsap.fromTo(
        bar,
        { scaleX: 1 },
        {
          scaleX: Number(bar.dataset.bar) / 100,
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: bar, start: "top 85%", once: true },
        },
      );
    });
  });

  return (
    <section ref={root} id="impact" aria-labelledby="impact-title" className="section-padding">
      <div className="container-max space-y-14">
        <SectionHeading
          index="02"
          eyebrow="Impact"
          id="impact-title"
          title={
            <>
              Problems I've taken <span className="text-gradient-aurora">down to size.</span>
            </>
          }
          lede="Every number here was measured in production. The bar shows how much of the problem was left after the fix."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wins.map((b) => (
            <SpotlightCard as="li" key={b.id} data-reveal className="flex flex-col gap-6 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">{b.headline}</p>
                  <h3 className="mt-1 font-heading text-xl font-semibold">{b.name}</h3>
                </div>
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary">
                  {b.move}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-heading text-lg text-foreground-muted line-through decoration-destructive/70">
                  {b.before}
                </span>
                <ArrowRight className="h-4 w-4 self-center text-primary" aria-label="to" />
                <span className="font-heading text-2xl font-bold tracking-tight text-gradient-aurora md:text-3xl">
                  {b.after}
                </span>
              </div>

              <div className="mt-auto space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    data-bar={b.remaining}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-destructive/80 to-gold"
                    style={{ transform: `scaleX(${b.remaining / 100})` }}
                  />
                </div>
                <p className="font-mono text-[11px] text-foreground-muted">{b.remaining}% of the problem left</p>
              </div>
            </SpotlightCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
