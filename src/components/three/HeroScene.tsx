/**
 * Hero scene: the Avatar at the desk. The camera follows the pointer a little, and
 * on small screens the whole setup turns slowly.
 */
import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, View } from "@react-three/drei";
import type { Group, PerspectiveCamera as Camera } from "three";
import { Avatar } from "./Avatar";
import { Desk } from "./Desk";
import type { SceneProps } from "./SceneSlot";

function Ready({ onReady }: SceneProps) {
  useEffect(onReady, [onReady]);
  return null;
}

function Rig({ children }: { children: React.ReactNode }) {
  const rig = useRef<Group>(null);
  const small = window.innerWidth < 768;
  useFrame(({ pointer, clock }, delta) => {
    if (!rig.current) return;
    const targetY = small ? Math.sin(clock.elapsedTime * 0.25) * 0.5 : pointer.x * 0.25;
    rig.current.rotation.y += (targetY - rig.current.rotation.y) * Math.min(delta * 3, 1);
    rig.current.rotation.x += ((small ? 0 : -pointer.y * 0.06) - rig.current.rotation.x) * Math.min(delta * 3, 1);
  });
  return <group ref={rig}>{children}</group>;
}

const CAMERA_START: [number, number, number] = [4.2, 3.6, 6.2];

/** Scroll handoff: the Avatar stands up, steps out from the desk and turns to the camera while the camera pulls back. */
function Handoff({ progress, children }: { progress: { current: number }; children: React.ReactNode }) {
  const turn = useRef<Group>(null);
  const camera = useRef<Camera>(null);
  useFrame(() => {
    const p = progress.current;
    if (turn.current) {
      // Seated on the chair (y 0.35) → standing on the floor beside the desk.
      const step = Math.min(p * 1.4, 1);
      turn.current.position.set(step * 2.1, 0.35 * (1 - step), -1.5 + step * 1.3);
      turn.current.rotation.y = p * 0.6;
    }
    if (camera.current) {
      const pull = 1 + p * 0.35;
      camera.current.position.set(CAMERA_START[0] * pull, CAMERA_START[1] + p * 0.6, CAMERA_START[2] * pull);
      camera.current.lookAt(p * 1.2, 1.9 + p * 0.1, -0.4);
    }
  });
  return (
    <>
      <PerspectiveCamera ref={camera} makeDefault position={CAMERA_START} fov={36} />
      <group ref={turn} position={[0, 0, -1.5]}>
        {children}
      </group>
    </>
  );
}

export default function HeroScene({ onReady, progress }: SceneProps & { progress: { current: number } }) {
  return (
    <View className="absolute inset-0">
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#8fb8ff", "#0a1428", 0.8]} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} castShadow />
      <pointLight position={[0, 2.4, 0.6]} color="#00e5c0" intensity={6} distance={4} />
      <Suspense fallback={null}>
        <Rig>
          <Handoff progress={progress}>
            <Avatar clip="Sitting" blendTo="Idle" progress={progress} scale={0.72} />
          </Handoff>
          <Desk />
        </Rig>
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={8} blur={2.5} far={3} />
        <Ready onReady={onReady} />
      </Suspense>
    </View>
  );
}
