/**
 * Arena stage: the Avatar in a fight stance facing the current Boss. Each fight plays a
 * Punch, and the Boss flashes and shrinks to its remaining health.
 */
import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float, PerspectiveCamera, View } from "@react-three/drei";
import { Color, type Mesh, type MeshStandardMaterial } from "three";
import { Avatar } from "./Avatar";
import type { SceneProps } from "./SceneSlot";

export interface ArenaSceneFight {
  round: number;
  /** Boss health after the hit, 0–100; 100 before any fight. */
  health: number;
}

function Ready({ onReady }: SceneProps) {
  useEffect(onReady, [onReady]);
  return null;
}

const HIT = new Color("#ffffff");
const BOSS = new Color("#ff4d6d");

function Boss({ fight }: { fight: ArenaSceneFight }) {
  const mesh = useRef<Mesh>(null);
  const hitAt = useRef(-1);

  useEffect(() => {
    if (fight.round > 0) hitAt.current = performance.now() + 450; // lands mid-punch
  }, [fight.round]);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    const since = (performance.now() - hitAt.current) / 1000;
    const hit = hitAt.current > 0 && since > 0;
    const target = hit ? 0.45 + (fight.health / 100) * 0.55 : 1;
    m.scale.setScalar(m.scale.x + (target - m.scale.x) * Math.min(delta * 4, 1));
    m.rotation.y += delta * (hit && since < 0.4 ? 6 : 0.6);
    const material = m.material as MeshStandardMaterial;
    material.emissive.copy(hit && since < 0.25 ? HIT : BOSS);
    material.emissiveIntensity = hit && since < 0.25 ? 2 : 0.45;
  });

  return (
    <Float speed={2} floatIntensity={0.6} rotationIntensity={0.3}>
      <mesh ref={mesh} position={[1.7, 1.6, 0]} castShadow>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#3a0b16" emissive={BOSS} emissiveIntensity={0.45} flatShading roughness={0.4} />
      </mesh>
    </Float>
  );
}

export default function ArenaScene({ onReady, fight }: SceneProps & { fight: ArenaSceneFight }) {
  return (
    <View className="absolute inset-0">
      <PerspectiveCamera makeDefault position={[0, 2.4, 7]} fov={35} onUpdate={(c) => c.lookAt(0, 1.4, 0)} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 5]} intensity={1.4} castShadow />
      <spotLight position={[-3, 6, 3]} angle={0.5} penumbra={0.7} intensity={18} color="#00e5c0" />
      <spotLight position={[4, 6, 2]} angle={0.5} penumbra={0.7} intensity={14} color="#ff4d6d" />
      <Suspense fallback={null}>
        <Avatar
          clip={fight.round > 0 ? "Punch" : "Idle"}
          then="Idle"
          playKey={fight.round}
          position={[-1.3, 0, 0]}
          rotation={[0, 0.9, 0]}
          scale={0.62}
        />
        <Boss fight={fight} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[4, 48]} />
          <meshStandardMaterial color="#0b1a2e" />
        </mesh>
        <ContactShadows opacity={0.6} scale={8} blur={2} far={3} />
        <Ready onReady={onReady} />
      </Suspense>
    </View>
  );
}
