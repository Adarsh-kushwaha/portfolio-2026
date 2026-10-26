/**
 * Two rows of tech names drifting in opposite directions. Pauses on hover; under reduced
 * motion it stops and wraps.
 */
import { skills } from "@/content/arena";
import { cn } from "@/lib/utils";

const names = skills.map((s) => s.name);
const rows = [names.slice(0, Math.ceil(names.length / 2)), names.slice(Math.ceil(names.length / 2))];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={cn(
            "flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            "motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center",
            copy === 1 && "motion-reduce:hidden",
          )}
        >
          {items.map((name) => (
            <li
              key={name}
              className="whitespace-nowrap rounded-full border border-border bg-surface/60 px-5 py-2.5 font-heading text-sm font-medium text-foreground-muted transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="space-y-3 border-y border-border-subtle py-10">
      <Row items={rows[0]} />
      <Row items={rows[1]} reverse />
    </section>
  );
}
