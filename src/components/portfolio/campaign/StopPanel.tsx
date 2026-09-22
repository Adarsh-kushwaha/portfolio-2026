/**
 * The HTML panel beside the 3D Campaign: the current stop's Level card and its Towers, as
 * keyboard-reachable buttons. Everything the 3D path shows is readable here as text.
 */
import { motion } from "framer-motion";
import { ArrowUpRight, Flag } from "lucide-react";
import type { CampaignStop, Tower } from "@/content/campaign";

interface StopPanelProps {
  stop: CampaignStop;
  onOpen: (tower: Tower) => void;
}

function TowerButton({ tower, onOpen }: { tower: Tower; onOpen: (t: Tower) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(tower)}
        aria-label={`Open Tower: ${tower.title}`}
        className="w-full text-left rounded-xl border border-border bg-background/60 p-3 hover:border-primary/60 transition-colors"
      >
        <span className="block text-xs font-heading font-700 text-gold">{tower.banner}</span>
        <span className="mt-0.5 flex items-center justify-between gap-2 text-sm text-foreground">
          <span>
            <span aria-hidden>{tower.emoji} </span>
            {tower.title}
          </span>
          <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-primary" aria-hidden />
        </span>
      </button>
    </li>
  );
}

export function StopPanel({ stop, onOpen }: StopPanelProps) {
  const key = stop.kind === "level" ? stop.level.id : stop.kind;

  return (
    <section aria-label="Current stop" aria-live="polite" className="h-full overflow-y-auto">
      {/* Keyed so each stop slides in fresh; no exit animation, so fast scrolling never stalls. */}
      <motion.div
        key={key}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {stop.kind === "level" && (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground-muted">Level {stop.level.number}</p>
                <h3 className="mt-1 text-xl font-heading font-700 text-foreground">
                  {stop.level.title} · {stop.level.company}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {stop.level.period} · {stop.level.type}
                </p>
              </div>
              <motion.span
                initial={{ scale: 1.8, rotate: -18, opacity: 0 }}
                animate={{ scale: 1, rotate: -8, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 }}
                className={`flex-shrink-0 rounded-md border-2 px-2 py-0.5 text-[11px] font-heading font-700 tracking-widest ${
                  stop.level.end === null ? "border-primary text-primary" : "border-gold text-gold"
                }`}
              >
                {stop.level.end === null ? "CURRENT LEVEL" : "LEVEL CLEARED"}
              </motion.span>
            </div>
            <ul className="space-y-1.5">
              {stop.level.wins.slice(0, 3).map((w) => (
                <li key={w} className="flex gap-2 text-sm text-foreground-muted leading-relaxed">
                  <span className="text-primary" aria-hidden>
                    ▸
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            {stop.level.outpost && (
              <p className="inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-sm text-foreground">
                <Flag className="w-4 h-4 text-gold" aria-hidden />
                <span>
                  <span className="font-600">Outpost:</span> {stop.level.outpost}
                </span>
              </p>
            )}
          </>
        )}

        {stop.kind === "side-quest" && (
          <div>
            <p className="text-xs uppercase tracking-widest text-gold">Off the main path</p>
            <h3 className="mt-1 text-xl font-heading font-700 text-foreground">Side Quest</h3>
            <p className="text-sm text-foreground-muted">Built outside the roles on the path.</p>
          </div>
        )}

        {stop.kind === "fortress" && (
          <div>
            <h3 className="text-xl font-heading font-700 text-foreground">🏰 The Fortress</h3>
            <p className="text-sm text-foreground-muted">Every Tower, together.</p>
          </div>
        )}

        {stop.towers.length > 0 && (
          <ul className="grid gap-2" aria-label="Towers">
            {stop.towers.map((t) => (
              <TowerButton key={t.id} tower={t} onOpen={onOpen} />
            ))}
          </ul>
        )}
      </motion.div>
    </section>
  );
}
