/**
 * Loads the shared 3D stage after first paint, during idle time (ADR 0001).
 * Sections render their scenes only once `useThreeReady()` is true.
 */
import { createContext, lazy, Suspense, useContext, useEffect, useState, type ReactNode } from "react";
import { useRenderMode } from "@/lib/render-mode";

const ThreeStage = lazy(() => import("@/components/three/ThreeStage"));

const ThreeReadyContext = createContext(false);

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export function ThreeProvider({ children }: { children: ReactNode }) {
  const mode = useRenderMode();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (mode !== "3d") return;
    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(id);
  }, [mode]);

  return (
    <ThreeReadyContext.Provider value={ready}>
      {children}
      {ready && (
        <Suspense fallback={null}>
          <ThreeStage />
        </Suspense>
      )}
    </ThreeReadyContext.Provider>
  );
}

export const useThreeReady = () => useContext(ThreeReadyContext);
