/**
 * A framed slot for one section's 3D scene. Shows the poster first; mounts the scene
 * (lazily) only in 3D mode, once the stage is ready and the slot is near the viewport.
 */
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRenderMode } from "@/lib/render-mode";
import { useThreeReady } from "@/lib/three-loader";

export interface SceneProps {
  onReady: () => void;
}

interface SceneSlotProps<P> {
  load: () => Promise<{ default: ComponentType<P & SceneProps> }>;
  sceneProps?: P;
  poster?: string;
  posterAlt?: string;
  className?: string;
  /** Rendered in the slot when there is no poster (e.g. a 2D illustration). */
  fallback?: ReactNode;
}

function useNearViewport(ref: React.RefObject<HTMLElement>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near]);
  return near;
}

export function SceneSlot<P extends object>({ load, sceneProps, poster, posterAlt, className, fallback }: SceneSlotProps<P>) {
  const mode = useRenderMode();
  const ready = useThreeReady();
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref);
  const [shown, setShown] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Scene = useMemo(() => lazy(load) as unknown as ComponentType<P & SceneProps>, []);
  const onReady = useCallback(() => setShown(true), []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-3xl bg-scene border border-scene-edge", className)}>
      {poster ? (
        <img
          src={poster}
          alt={posterAlt}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", shown && "opacity-0")}
          {...{ fetchpriority: "high" }}
          decoding="async"
        />
      ) : (
        !shown && fallback
      )}
      {mode === "3d" && ready && near && (
        <Suspense fallback={null}>
          <Scene {...(sceneProps as P)} onReady={onReady} />
        </Suspense>
      )}
    </div>
  );
}
