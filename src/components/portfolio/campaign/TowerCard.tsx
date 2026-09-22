import { ArrowUpRight } from "lucide-react";
import { towerAnchor, type Tower } from "@/content/campaign";
import { cn } from "@/lib/utils";

interface TowerCardProps {
  tower: Tower;
  onOpen: (tower: Tower) => void;
  className?: string;
}

/** One project as a Tower: banner metric on top, summary, and a button into its full story. */
export function TowerCard({ tower, onOpen, className }: TowerCardProps) {
  return (
    <article
      id={towerAnchor(tower.id)}
      className={cn(
        "group scroll-mt-24 rounded-2xl border border-border bg-surface/70 p-5 hover:border-primary/50 transition-colors",
        className,
      )}
    >
      <p className="inline-block rounded-md bg-gold/15 border border-gold/30 px-2 py-0.5 text-xs font-heading font-700 text-gold">
        {tower.banner}
      </p>
      <h4 className="mt-3 font-heading font-700 text-foreground">
        <span aria-hidden>{tower.emoji} </span>
        {tower.title}
      </h4>
      <p className="mt-1 text-sm text-foreground-muted leading-relaxed">{tower.summary}</p>
      <button
        type="button"
        onClick={() => onOpen(tower)}
        aria-label={`Open Tower: ${tower.title}`}
        className="mt-3 inline-flex items-center gap-1 text-sm font-600 text-primary hover:underline"
      >
        Open Tower <ArrowUpRight className="w-4 h-4" aria-hidden />
      </button>
    </article>
  );
}
