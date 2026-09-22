/**
 * Arena — the fighter's character sheet: Stats, Strengths and Weaknesses, Boss fights, and
 * the Arsenal / Tools inventory. Click-driven, never pinned.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { bosses, skills, stats, strengths, weaknesses, type Boss, type Skill } from "@/content/arena";
import { BossCard } from "./BossCard";
import { SceneSlot } from "@/components/three/SceneSlot";

const loadArenaScene = () => import("@/components/three/ArenaScene");

const levelStyle: Record<Skill["level"], string> = {
  Expert: "border-gold/50 text-gold bg-gold/10",
  Advanced: "border-primary/40 text-primary bg-primary/10",
  Intermediate: "border-border text-foreground-muted bg-muted",
};

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-3 py-2">
      <span className="text-lg" aria-hidden>
        {skill.icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm text-foreground truncate">{skill.name}</span>
        <span className="block text-[11px] text-foreground-muted">{skill.years}</span>
      </span>
      <span
        className={`rounded-md border px-1.5 py-0.5 text-[10px] font-600 uppercase tracking-wide ${levelStyle[skill.level]}`}
      >
        {skill.level}
      </span>
    </li>
  );
}

export interface ArenaFight {
  boss: Boss | null;
  /** Increments on every fight so the same Boss can be fought again. */
  round: number;
}

export default function Arena() {
  const [fight, setFight] = useState<ArenaFight>({ boss: null, round: 0 });
  const [defeated, setDefeated] = useState<Set<string>>(() => new Set());

  const onFight = (boss: Boss) => {
    setFight((f) => ({ boss, round: f.round + 1 }));
    setDefeated((d) => new Set(d).add(boss.id));
  };

  const arsenal = skills.filter((s) => s.kind === "arsenal");
  const tools = skills.filter((s) => s.kind === "tools");

  return (
    <section id="arena" aria-labelledby="arena-title" className="section-padding">
      <div className="container-max">
        <span className="section-label">Arena</span>
        <h2 id="arena-title" className="mt-3 text-3xl md:text-4xl font-heading font-700 tracking-tight">
          The Arena: <span className="text-gradient-gold">choose your fighter</span>
        </h2>

        {/* Fighter select: name plate + Stats + Strengths / Weaknesses */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-scene-edge bg-scene p-6 md:p-8 text-scene-text lg:sticky lg:top-24 self-start">
            <SceneSlot
              load={loadArenaScene}
              sceneProps={{
                fight: {
                  round: fight.round,
                  health: fight.boss ? fight.boss.remaining : 100,
                },
              }}
              poster="/posters/arena-stage.webp"
              posterAlt="Adarsh's Avatar in a fight stance facing a Boss"
              className="aspect-[16/10] w-full mb-6"
            />
            <p role="status" className="min-h-[1.5rem] text-sm font-heading font-600 text-gold">
              {fight.boss && `${fight.boss.move} hits ${fight.boss.name}: ${fight.boss.before} → ${fight.boss.after}`}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-scene-muted">Player 1</p>
            <p className="mt-1 text-2xl md:text-3xl font-heading font-700 tracking-tight">
              ADARSH <span className="text-gold">— The Pixel Warrior</span>
            </p>
            <ul className="mt-6 space-y-4" aria-label="Stats">
              {stats.map((s, i) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-heading font-600">{s.name}</span>
                    <span className="text-scene-muted">{s.value}</span>
                  </div>
                  <div
                    role="meter"
                    aria-label={s.name}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={s.value}
                    className="mt-1.5 h-2.5 rounded-full bg-white/10 overflow-hidden"
                  >
                    <motion.div
                      className={
                        s.value >= 80 ? "h-full bg-gradient-to-r from-primary to-gold" : "h-full bg-red-400/80"
                      }
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-scene-muted">{s.evidence}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 content-start">
            <div className="rounded-3xl border border-border bg-surface/60 p-6">
              <h3 className="font-heading font-700 text-foreground">Strengths ⚔️</h3>
              <ul aria-label="Strengths" className="mt-3 space-y-2">
                {strengths.map((s) => (
                  <li key={s.name} className="text-sm text-foreground-muted">
                    <span className="font-600 text-foreground">{s.name}</span> — {s.value}: {s.evidence}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-surface/60 p-6">
              <h3 className="font-heading font-700 text-foreground">Weaknesses 🛡️</h3>
              <ul aria-label="Weaknesses" className="mt-3 space-y-2">
                {weaknesses.map((s) => (
                  <li key={s.name} className="text-sm text-foreground-muted">
                    <span className="font-600 text-foreground">
                      {s.name} — {s.value}
                    </span>
                    : {s.note}
                  </li>
                ))}
              </ul>
            </div>
            {/* Boss fights, next to the stage so the fight is visible */}
            <div>
              <h3 className="text-xl font-heading font-700 text-foreground">Boss fights</h3>
              <p className="mt-1 text-sm text-foreground-muted">
                Real problems, real before → after numbers. Pick one.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bosses.map((b) => (
                  <BossCard
                    key={b.id}
                    boss={b}
                    active={fight.boss?.id === b.id}
                    defeated={defeated.has(b.id)}
                    onFight={onFight}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-6">
          <div>
            <h3 className="text-xl font-heading font-700 text-foreground">Arsenal</h3>
            <p className="mt-1 text-sm text-foreground-muted">Techniques, used as Moves.</p>
            <ul aria-label="Arsenal" className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {arsenal.map((s) => (
                <SkillItem key={s.name} skill={s} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-heading font-700 text-foreground">Tools</h3>
            <p className="mt-1 text-sm text-foreground-muted">Gear.</p>
            <ul aria-label="Tools" className="mt-4 grid grid-cols-1 gap-2">
              {tools.map((s) => (
                <SkillItem key={s.name} skill={s} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
