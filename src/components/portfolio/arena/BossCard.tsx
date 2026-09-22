import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import type { Boss } from "@/content/arena";
import { levelOf, towerAnchor, towerById } from "@/content/campaign";
import { scrollToSection } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

interface BossCardProps {
  boss: Boss;
  defeated: boolean;
  active: boolean;
  onFight: (boss: Boss) => void;
}

/** A real problem as a Boss: its health bar is the before value, draining to the after value. */
export function BossCard({ boss, defeated, active, onFight }: BossCardProps) {
  const tower = boss.towerId ? towerById(boss.towerId) : undefined;
  const level = tower ? levelOf(tower) : undefined;
  const health = defeated ? boss.remaining : 100;
  const titleId = `boss-${boss.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "rounded-2xl border bg-surface/70 p-5 transition-colors",
        active ? "border-primary shadow-teal" : "border-border hover:border-gold/50",
      )}
    >
      <div>
        <span className="text-[11px] uppercase tracking-widest text-foreground-muted">{boss.headline}</span>
        <h4 id={titleId} className="font-heading font-700 text-foreground">
          {boss.name}
        </h4>
      </div>

      <div
        role="meter"
        aria-label={`${boss.name} health`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={health}
        className="mt-3 h-3 rounded-full bg-muted overflow-hidden border border-border"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-gold"
          initial={false}
          animate={{ width: `${health}%` }}
          transition={{ duration: defeated ? 1.2 : 0.3, ease: "easeOut", delay: defeated ? 0.35 : 0 }}
        />
      </div>

      <p className="mt-3 flex flex-wrap items-baseline gap-2 font-heading">
        <span className="text-lg font-700 text-red-400">{boss.before}</span>
        <span className="text-foreground-muted" aria-hidden>
          →
        </span>
        <span className="sr-only">to</span>
        <span className="text-lg font-700 text-primary">{boss.after ?? "fight pending"}</span>
      </p>

      <p className={cn("mt-1 text-sm text-foreground-muted transition-opacity", !defeated && "opacity-60")}>
        Move: <span className="font-600 text-gold">{boss.move}</span>
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onFight(boss)}
          disabled={boss.after === null}
          aria-label={`Fight ${boss.name}`}
          className="inline-flex items-center gap-1.5 rounded-lg btn-primary px-3 py-1.5 text-sm font-heading font-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Swords className="w-4 h-4" aria-hidden /> {defeated ? "Fight again" : "Fight"}
        </button>
        {tower && level && (
          <a
            href={`#${towerAnchor(tower.id)}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(`#${towerAnchor(tower.id)}`);
            }}
            className="text-sm text-foreground-muted hover:text-primary"
          >
            ⚔️ Fought at: {level.title} → see Tower
          </a>
        )}
      </div>
    </article>
  );
}
