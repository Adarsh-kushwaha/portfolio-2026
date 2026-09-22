/**
 * The 3D Campaign (desktop, 3D mode). A tall wrapper holds a sticky stage, so scrolling
 * walks the Avatar from stop to stop without a GSAP pin. Invisible markers at each stop's
 * scroll offset carry the Tower anchors, so Arena Boss links still land on the right Level.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campaignStops, levels, stopOfTower, towerAnchor, towers, type Tower } from "@/content/campaign";
import { SceneSlot } from "@/components/three/SceneSlot";
import { scrollToY } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { SkipLink, useProgressRef } from "../Pin";
import { StopPanel } from "./StopPanel";

/** Extra scroll length while the stage is held, in screens (see plan.md → Scroll budget). */
const SCREENS = 4;
const STOPS = campaignStops.length;

const loadCampaignScene = () => import("@/components/three/CampaignScene");

const stopLabel = (i: number) => {
  const stop = campaignStops[i];
  if (stop.kind === "level") return `Go to Level ${stop.level.number}: ${stop.level.company}`;
  return stop.kind === "side-quest" ? "Go to Side Quest" : "Go to the Fortress";
};

const stopShort = (i: number) => {
  const stop = campaignStops[i];
  if (stop.kind === "level") return String(stop.level.number);
  return stop.kind === "side-quest" ? "✦" : "🏰";
};

export function CampaignStage({ onOpen }: { onOpen: (tower: Tower) => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const progress = useProgressRef();
  const [stopIndex, setStopIndex] = useState(0);

  useEffect(() => {
    if (!wrapper.current) return;
    const trigger = ScrollTrigger.create({
      trigger: wrapper.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
        setStopIndex(Math.min(STOPS - 1, Math.floor(self.progress * STOPS)));
      },
    });
    return () => trigger.kill();
  }, [progress]);

  /** Page offset where a stop is centred. */
  const offsetOf = useCallback((i: number) => {
    const el = wrapper.current;
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    return top + ((i + 0.5) / STOPS) * travel;
  }, []);

  const goTo = (i: number) => {
    setStopIndex(i);
    progress.current = (i + 0.5) / STOPS;
    scrollToY(offsetOf(i));
  };

  return (
    <div ref={wrapper} className="relative" style={{ height: `${(SCREENS + 1) * 100}vh` }}>
      {/* Anchors for each Tower, at the scroll offset of its stop */}
      {towers.map((t) => (
        <span
          key={t.id}
          id={towerAnchor(t.id)}
          aria-hidden
          className="absolute left-0 w-px h-px"
          style={{ top: `calc(${((stopOfTower(t) + 0.5) / STOPS) * SCREENS * 100}vh)` }}
        />
      ))}

      <div className="sticky top-0 h-screen flex flex-col justify-center py-20">
        <nav aria-label="Levels" className="mb-4 flex flex-wrap items-center gap-2">
          {campaignStops.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={stopLabel(i)}
              aria-current={i === stopIndex ? "step" : undefined}
              className={cn(
                "h-9 min-w-9 px-2 rounded-full border text-sm font-heading font-700 transition-colors",
                i === stopIndex
                  ? "border-primary bg-primary text-primary-foreground"
                  : i < stopIndex
                    ? "border-gold/60 text-gold"
                    : "border-border text-foreground-muted hover:border-primary/60",
              )}
            >
              {stopShort(i)}
            </button>
          ))}
          <span className="ml-auto">
            <SkipLink to="#beyond" />
          </span>
        </nav>

        <div className="grid grid-cols-5 gap-6 min-h-0 flex-1 max-h-[36rem]">
          <SceneSlot
            load={loadCampaignScene}
            sceneProps={{ progress, onOpen }}
            className="col-span-3 h-full"
            fallback={
              <p className="absolute inset-0 flex items-center justify-center text-scene-muted text-sm">
                Loading the Campaign path…
              </p>
            }
          />
          <div className="col-span-2 rounded-3xl border border-border bg-surface/70 p-6 min-h-0">
            <StopPanel stop={campaignStops[stopIndex]} onOpen={onOpen} />
          </div>
        </div>
        <p className="sr-only">{levels.length} Levels, then the Side Quest and the Fortress.</p>
      </div>
    </div>
  );
}
