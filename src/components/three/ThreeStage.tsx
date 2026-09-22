/**
 * The one shared WebGL canvas. Fixed behind the page; each section draws into it through a drei <View>.
 */
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

export default function ThreeStage() {
  return (
    <Canvas
      eventSource={document.getElementById("root") ?? undefined}
      className="!fixed inset-0 z-20 pointer-events-none"
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
      dpr={[1, window.innerWidth < 768 ? 1.25 : 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <View.Port />
    </Canvas>
  );
}
