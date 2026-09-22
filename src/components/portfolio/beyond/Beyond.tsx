/**
 * Beyond the Code — the quiet side, told in pieces: what I do when I'm quiet, what I think
 * about, what I love, and a Sunday in Pune; then the Currently Shelf. In 3D the pieces arrive
 * one at a time beside a dim, warm scene; in 2D they simply stack.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Camera, ChefHat, Footprints, Headphones, type LucideIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { funFacts, hobbies, sundayInPune, thoughts, type Hobby } from "@/content/beyond";
import { useRenderMode } from "@/lib/render-mode";
import { SceneSlot } from "@/components/three/SceneSlot";
import { cn } from "@/lib/utils";
import { SkipLink, useProgressRef } from "../Pin";
import { CurrentlyShelf } from "./CurrentlyShelf";

const hobbyIcons: Record<Hobby["id"], LucideIcon> = {
  walks: Footprints,
  cooking: ChefHat,
  videos: Camera,
  music: Headphones,
};

interface Piece {
  id: string;
  title: string;
  body: ReactNode;
}

const pieces: Piece[] = [
  {
    id: "quiet",
    title: "What I do when I'm quiet",
    body: (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hobbies.map((h) => {
          const Icon = hobbyIcons[h.id];
          return (
            <li key={h.id} className="flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 p-3">
              <Icon className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" aria-hidden />
              <span>
                <span className="block text-sm font-600 text-foreground">{h.label}</span>
                <span className="block text-xs text-foreground-muted">{h.desc}</span>
              </span>
            </li>
          );
        })}
      </ul>
    ),
  },
  {
    id: "think",
    title: "What I think about",
    body: (
      <ul className="space-y-3">
        {thoughts.map((t) => (
          <li key={t.title} className="text-sm text-foreground-muted leading-relaxed">
            <span aria-hidden>{t.emoji} </span>
            <span className="font-600 text-foreground">{t.title}</span> — {t.desc}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "love",
    title: "What I love",
    body: (
      <ul className="space-y-2">
        {funFacts.map((f, i) => (
          <li key={f} className="text-sm text-foreground-muted leading-relaxed">
            <span className="text-gold font-heading font-700 mr-2">#{i + 1}</span>
            {f}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "sunday",
    title: "A Sunday in Pune",
    body: (
      <ol className="space-y-2.5">
        {sundayInPune.map((s) => (
          <li key={s.time} className="flex items-start gap-3 text-sm">
            <span aria-hidden>{s.icon}</span>
            <span className="w-16 flex-shrink-0 font-heading font-600 text-primary">{s.time}</span>
            <span className="text-foreground-muted">{s.event}</span>
          </li>
        ))}
      </ol>
    ),
  },
];

function PieceCard({ piece, className }: { piece: Piece; className?: string }) {
  return (
    <article aria-labelledby={`piece-${piece.id}`} className={cn("rounded-3xl border border-border bg-surface/70 p-6", className)}>
      <h3 id={`piece-${piece.id}`} className="text-xl font-heading font-700 text-foreground mb-4">
        {piece.title}
      </h3>
      {piece.body}
    </article>
  );
}

const loadBeyondScene = () => import("@/components/three/BeyondScene");

/** Extra scroll while the pieces arrive, in screens (plan.md → Scroll budget). */
const SCREENS = 2;

function PinnedPieces() {
  const wrapper = useRef<HTMLDivElement>(null);
  const progress = useProgressRef();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!wrapper.current) return;
    const trigger = ScrollTrigger.create({
      trigger: wrapper.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
        setActive(Math.min(pieces.length - 1, Math.floor(self.progress * pieces.length)));
      },
    });
    return () => trigger.kill();
  }, [progress]);

  return (
    <div ref={wrapper} className="relative" style={{ height: `${(SCREENS + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center py-20">
        <div className="mb-4 flex items-center gap-2">
          {pieces.map((p, i) => (
            <span
              key={p.id}
              className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-gold" : "w-3 bg-border")}
              aria-hidden
            />
          ))}
          <span className="ml-auto">
            <SkipLink to="#letterbox" />
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0 flex-1 max-h-[34rem]">
          <SceneSlot
            load={loadBeyondScene}
            sceneProps={{ progress }}
            className="hidden lg:block lg:col-span-2 h-full"
          />
          <div className="relative lg:col-span-3 min-h-[26rem]">
            {pieces.map((p, i) => (
              <motion.div
                key={p.id}
                className="absolute inset-0 overflow-y-auto"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : i < active ? -24 : 24 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ pointerEvents: i === active ? "auto" : "none" }}
              >
                <PieceCard piece={p} className="h-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Beyond() {
  const pinned = useRenderMode() === "3d";

  return (
    <section id="beyond" aria-labelledby="beyond-title" className="section-padding">
      <div className="container-max">
        <span className="section-label">Beyond the Code</span>
        <h2 id="beyond-title" className="mt-3 text-3xl md:text-4xl font-heading font-700 tracking-tight">
          Beyond the Code: <span className="text-gradient-gold">the quiet side</span>
        </h2>
        <p className="mt-3 max-w-2xl text-foreground-muted">What I do, think and love when the laptop is closed.</p>

        {pinned ? (
          <PinnedPieces />
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pieces.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <PieceCard piece={p} className="h-full" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <CurrentlyShelf />
        </div>
      </div>
    </section>
  );
}
