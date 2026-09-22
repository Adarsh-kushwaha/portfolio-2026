/**
 * Campaign — the career as a path of Levels (roles, oldest → newest). Each Level raises the
 * Towers (projects) built in it; early roles hold an Outpost. Call Pulse is a Side Quest,
 * and the path ends at the Fortress. Desktop 3D walks the path on a 3D stage; mobile and
 * 2D visitors get the vertical timeline.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { levels, sideQuests, towers, towersForLevel, type Level, type Tower } from "@/content/campaign";
import { TowerCard } from "./TowerCard";
import { TowerDialog } from "./TowerDialog";
import { CampaignStage } from "./CampaignStage";
import { useRenderMode } from "@/lib/render-mode";
import { useMedia } from "@/lib/use-media";

function Stamp({ current }: { current: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 1.8, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.25 }}
      className={
        current
          ? "inline-block rounded-md border-2 border-primary px-2 py-0.5 text-[11px] font-heading font-700 tracking-widest text-primary"
          : "inline-block rounded-md border-2 border-gold px-2 py-0.5 text-[11px] font-heading font-700 tracking-widest text-gold"
      }
    >
      {current ? "CURRENT LEVEL" : "LEVEL CLEARED"}
    </motion.span>
  );
}

function LevelNode({ level, onOpen }: { level: Level; onOpen: (t: Tower) => void }) {
  const current = level.end === null;
  const levelTowers = towersForLevel(level.id);

  return (
    <li className="relative pl-12 md:pl-16" id={`level-${level.id}`}>
      <span
        className={`absolute left-0 md:left-2 top-0 w-9 h-9 rounded-full flex items-center justify-center font-heading font-700 text-sm border-2 ${
          current ? "border-primary bg-primary text-primary-foreground" : "border-gold bg-background text-gold"
        }`}
        aria-hidden
      >
        {level.number}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-surface/60 p-5 md:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground-muted">Level {level.number}</p>
            <h3 className="mt-1 text-lg font-heading font-700 text-foreground">
              {level.title} · {level.company}
            </h3>
            <p className="text-sm text-foreground-muted">
              {level.period} · {level.type} · {level.location}
            </p>
          </div>
          <Stamp current={current} />
        </div>

        <ul className="mt-4 space-y-1.5">
          {level.wins.slice(0, 3).map((win) => (
            <li key={win} className="text-sm text-foreground-muted leading-relaxed flex gap-2">
              <span className="text-primary" aria-hidden>
                ▸
              </span>
              {win}
            </li>
          ))}
        </ul>

        {level.outpost && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/5 px-3 py-2 text-sm text-foreground">
            <Flag className="w-4 h-4 text-gold" aria-hidden />
            <span>
              <span className="font-600">Outpost:</span> {level.outpost}
            </span>
          </p>
        )}
      </motion.div>

      {levelTowers.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {levelTowers.map((t) => (
            <TowerCard key={t.id} tower={t} onOpen={onOpen} />
          ))}
        </div>
      )}
    </li>
  );
}

function Timeline({ onOpen }: { onOpen: (t: Tower) => void }) {
  return (
    <>
      <ol
        aria-label="Levels"
        className="relative mt-12 space-y-10 before:absolute before:left-[17px] md:before:left-[25px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-gold/60 before:via-primary/60 before:to-primary"
      >
        {levels.map((level) => (
          <LevelNode key={level.id} level={level} onOpen={onOpen} />
        ))}
      </ol>

      <section aria-labelledby="side-quest-title" className="mt-12 rounded-3xl border border-dashed border-gold/40 p-6">
        <p className="text-xs uppercase tracking-widest text-gold font-600">Off the main path</p>
        <h3 id="side-quest-title" className="mt-1 text-xl font-heading font-700 text-foreground">
          Side Quest
        </h3>
        <p className="mt-1 text-sm text-foreground-muted">Built outside the roles above.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sideQuests.map((t) => (
            <TowerCard key={t.id} tower={t} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="fortress-title"
        className="mt-12 rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8"
      >
        <h3 id="fortress-title" className="text-2xl font-heading font-700 text-foreground">
          🏰 The Fortress
        </h3>
        <p className="mt-1 text-sm text-foreground-muted">Everything built along the way, together.</p>
        <ul className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
          {towers.map((t) => (
            <li key={t.id}>
              <a
                href={`#tower-${t.id}`}
                className="block rounded-xl border border-border bg-background/60 p-3 hover:border-primary/60 transition-colors"
              >
                <span className="block text-xs text-foreground-muted truncate">
                  <span aria-hidden>{t.emoji} </span>
                  {t.title}
                </span>
                <span className="block mt-1 text-sm font-heading font-700 text-gold">{t.banner}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default function Campaign() {
  const [openTower, setOpenTower] = useState<Tower | null>(null);
  const mode = useRenderMode();
  const wide = useMedia("(min-width: 1024px)");
  const stage = mode === "3d" && wide;

  return (
    <section id="campaign" aria-labelledby="campaign-title" className="section-padding">
      <div className="container-max">
        <span className="section-label">Campaign</span>
        <h2 id="campaign-title" className="mt-3 text-3xl md:text-4xl font-heading font-700 tracking-tight">
          The Campaign: <span className="text-gradient-teal">every Level, every Tower</span>
        </h2>
        <p className="mt-3 max-w-2xl text-foreground-muted">
          Six roles, oldest to newest. The projects built in each one rise as Towers along the way.
        </p>

        {stage ? <CampaignStage onOpen={setOpenTower} /> : <Timeline onOpen={setOpenTower} />}
      </div>

      <TowerDialog tower={openTower} onClose={() => setOpenTower(null)} />
    </section>
  );
}
