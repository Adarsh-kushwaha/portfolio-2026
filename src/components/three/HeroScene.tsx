/**
 * Hero scene: the Avatar at the desk. The camera follows the pointer a little, and
 * on small screens the whole setup turns slowly.
 */
import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, View } from "@react-three/drei";
import type { Group } from "three";
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

export default function HeroScene({ onReady }: SceneProps) {
  return (
    <View className="absolute inset-0">
      <PerspectiveCamera makeDefault position={[4.2, 3.6, 6.2]} fov={36} onUpdate={(c) => c.lookAt(0, 1.9, -0.4)} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#8fb8ff", "#0a1428", 0.8]} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} castShadow />
      <pointLight position={[0, 2.4, 0.6]} color="#00e5c0" intensity={6} distance={4} />
      <Suspense fallback={null}>
        <Rig>
          <Desk />
          <Avatar clip="Sitting" position={[0, 0.35, -1.5]} scale={0.72} />
        </Rig>
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={8} blur={2.5} far={3} />
        <Ready onReady={onReady} />
      </Suspense>
    </View>
  );
}
