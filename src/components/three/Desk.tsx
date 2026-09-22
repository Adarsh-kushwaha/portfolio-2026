/**
 * The Hero desk: table, chair, laptop and a filter coffee mug with steam. Built from
 * primitives, so there is nothing to download.
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Group } from "three";

const WOOD = "#3a2a20";
const METAL = "#1f2a3a";

export function Desk(props: JSX.IntrinsicElements["group"]) {
  const screen = useRef<Group>(null);
  useFrame(({ clock }) => {
    // The laptop screen breathes softly, like code scrolling by.
    if (screen.current) screen.current.children[0].scale.setScalar(1 + Math.sin(clock.elapsedTime * 2) * 0.004);
  });

  return (
    <group {...props}>
      {/* Table */}
      <mesh position={[0, 1.55, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.6, 0.12, 1.7]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>
      {[-1.65, 1.65].map((x) =>
        [-0.7, 0.7].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.75, z]}>
            <boxGeometry args={[0.1, 1.5, 0.1]} />
            <meshStandardMaterial color={METAL} />
          </mesh>
        )),
      )}

      {/* Laptop, facing the Avatar */}
      <group position={[0, 1.62, 0.15]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.04, 0.8]} />
          <meshStandardMaterial color="#8a94a6" metalness={0.6} roughness={0.3} />
        </mesh>
        <group ref={screen} position={[0, 0.4, -0.4]} rotation={[-0.25, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 0.78, 0.03]} />
            <meshStandardMaterial color="#8a94a6" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[1.1, 0.68]} />
            <meshStandardMaterial color="#00e5c0" emissive="#00e5c0" emissiveIntensity={0.9} />
          </mesh>
        </group>
      </group>

      {/* Filter coffee mug */}
      <group position={[1.2, 1.72, 0.35]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.26, 24]} />
          <meshStandardMaterial color="#f5c462" roughness={0.4} />
        </mesh>
        <Sparkles count={14} scale={[0.25, 0.6, 0.25]} position={[0, 0.45, 0]} size={2} speed={0.4} color="#ffffff" opacity={0.5} />
      </group>

      {/* Chair */}
      <group position={[0, 0, -1.55]}>
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[1.1, 0.12, 1]} />
          <meshStandardMaterial color="#12324a" />
        </mesh>
        <mesh position={[0, 1.7, -0.48]}>
          <boxGeometry args={[1.1, 1.4, 0.1]} />
          <meshStandardMaterial color="#12324a" />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.9, 12]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
      </group>
    </group>
  );
}
