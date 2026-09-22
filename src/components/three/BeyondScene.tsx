/**
 * Beyond the Code: a quiet, warm night. A desk lamp, a mug, headphones and a camera float
 * slowly among fireflies; the light warms as the visitor moves through the pieces.
 */
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Sparkles, View } from "@react-three/drei";
import type { PointLight } from "three";
import type { SceneProps } from "./SceneSlot";

function Ready({ onReady }: SceneProps) {
  useEffect(onReady, [onReady]);
  return null;
}

function Mug() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.32, 0.27, 0.62, 24]} />
        <meshStandardMaterial color="#f5c462" roughness={0.4} />
      </mesh>
      <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#f5c462" roughness={0.4} />
      </mesh>
    </group>
  );
}

function Headphones() {
  return (
    <group>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.45, 0.06, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#1f2a3a" />
      </mesh>
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, -0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.12, 20]} />
          <meshStandardMaterial color="#00e5c0" emissive="#00e5c0" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function CameraProp() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.35]} />
        <meshStandardMaterial color="#2b2f38" />
      </mesh>
      <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.2, 20]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Lamp({ progress }: { progress: { current: number } }) {
  const light = useRef<PointLight>(null);
  useFrame(({ clock }) => {
    if (!light.current) return;
    // Warms up through the pieces, with a gentle flicker.
    light.current.intensity = 6 + progress.current * 10 + Math.sin(clock.elapsedTime * 3) * 0.4;
  });
  return (
    <group position={[-1.4, -1.2, -0.5]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        <meshStandardMaterial color="#8a94a6" />
      </mesh>
      <mesh position={[0.15, 1.25, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.3, 0.4, 20, 1, true]} />
        <meshStandardMaterial color="#f5c462" emissive="#f5a742" emissiveIntensity={0.8} side={2} />
      </mesh>
      <pointLight ref={light} position={[0.3, 1.0, 0.2]} color="#ffb45c" distance={7} intensity={6} />
    </group>
  );
}

export default function BeyondScene({ onReady, progress }: SceneProps & { progress: { current: number } }) {
  return (
    <View className="absolute inset-0">
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={42} />
      <color attach="background" args={["#0a0d18"]} />
      <ambientLight intensity={0.18} color="#ffd9a8" />
      <Lamp progress={progress} />
      <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.6}>
        <group position={[0.9, 0.9, 0]} rotation={[0.3, -0.5, 0]}>
          <Mug />
        </group>
      </Float>
      <Float speed={1} floatIntensity={0.7} rotationIntensity={0.5}>
        <group position={[-0.6, 1.3, -0.6]} rotation={[0.2, 0.4, 0.1]}>
          <Headphones />
        </group>
      </Float>
      <Float speed={0.9} floatIntensity={0.9} rotationIntensity={0.4}>
        <group position={[0.8, -0.6, 0.3]} rotation={[0.1, -0.7, 0]}>
          <CameraProp />
        </group>
      </Float>
      <Sparkles count={60} scale={[6, 5, 3]} size={3} speed={0.25} color="#ffcf7a" opacity={0.8} />
      <Ready onReady={onReady} />
    </View>
  );
}
