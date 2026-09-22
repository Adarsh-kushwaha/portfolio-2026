/**
 * Render mode — one app-level decision: full 3D, or the complete 2D site.
 * See docs/adr/0001-poster-first-3d-loading.md.
 */
import { createContext, useContext, useState, type ReactNode } from "react";

export type RenderMode = "3d" | "2d";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

const MIN_CORES = 4;
const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function detectRenderMode(): RenderMode {
  if (typeof window === "undefined") return "2d";
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return "2d";

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return "2d";
  if (connection?.effectiveType && SLOW_CONNECTIONS.includes(connection.effectiveType)) return "2d";

  // Unknown core count (e.g. Safari privacy) is treated as capable.
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < MIN_CORES) return "2d";

  return hasWebGL() ? "3d" : "2d";
}

const RenderModeContext = createContext<RenderMode>("2d");

export function RenderModeProvider({ children }: { children: ReactNode }) {
  const [mode] = useState(detectRenderMode);
  return <RenderModeContext.Provider value={mode}>{children}</RenderModeContext.Provider>;
}

export const useRenderMode = () => useContext(RenderModeContext);
