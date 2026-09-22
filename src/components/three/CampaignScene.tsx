/**
 * Campaign path: the Avatar walks from Level to Level as the visitor scrolls. Towers rise
 * block by block at the Level where they were built, Outposts mark early roles, the Side
 * Quest branches off the path, and the camera pulls back at the end to reveal the Fortress.
 */
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import { CatmullRomCurve3, Vector3, type Group, type Mesh, type MeshStandardMaterial } from "three";
import { campaignStops, type Tower } from "@/content/campaign";
import { Avatar, type AvatarClip } from "./Avatar";
import type { SceneProps } from "./SceneSlot";

const STOPS = campaignStops.length;
const LEVEL_STOPS = campaignStops.filter((s) => s.kind === "level").length;
const SPACING = 4.5;

/** World position of each walkable stop (Levels, then the Side Quest branch). */
const nodes = Array.from({ length: LEVEL_STOPS }, (_, i) => new Vector3(i * SPACING, 0, Math.sin(i * 1.1) * 1.4));
const sideQuestNode = new Vector3((LEVEL_STOPS - 1) * SPACING + 2.5, 0, -4);
const path = new CatmullRomCurve3([...nodes, sideQuestNode]);
const fortressCentre = new Vector3(sideQuestNode.x * 0.56, 0, -2.5);

/** 0 → first Level … STOPS-2 → Side Quest; continuous. */
const stopPosition = (p: number) => Math.min(Math.max(p * STOPS - 0.5, 0), STOPS - 2);

interface TowerSpot {
  tower: Tower;
  stop: number;
  position: [number, number, number];
  blocks: number;
}

const towerSpots: TowerSpot[] = campaignStops.flatMap((stop, stopIdx) => {
  if (stop.kind === "fortress") return [];
  const node = stop.kind === "side-quest" ? sideQuestNode : nodes[stopIdx];
  return stop.towers.map((tower, k) => ({
    tower,
    stop: stopIdx,
    position: [node.x + (k % 2 === 0 ? -1.3 : 1.3), 0, node.z - 2 - Math.floor(k / 2) * 1.9] as [
      number,
      number,
      number,
    ],
    blocks: 3 + ((k + stopIdx) % 3),
  }));
});

const outposts = campaignStops.flatMap((stop, i) => (stop.kind === "level" && stop.level.outpost ? [i] : []));

function Ready({ onReady }: SceneProps) {
  useEffect(onReady, [onReady]);
  return null;
}

function TowerMesh({
  spot,
  progress,
  onOpen,
}: {
  spot: TowerSpot;
  progress: { current: number };
  onOpen: (t: Tower) => void;
}) {
  const group = useRef<Group>(null);
  const top = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const s = stopPosition(progress.current);
    const risen = s >= spot.stop - 0.35 ? 1 : 0;
    const lit = Math.min(Math.max((progress.current * STOPS - (STOPS - 1)) / 0.5, 0), 1);
    group.current?.children.forEach((block, b) => {
      // Blocks rise one after another.
      const target = risen ? 1 : 0.001;
      const k = Math.min(delta * (6 - b * 0.6), 1);
      block.scale.y += (target - block.scale.y) * k;
    });
    const mat = top.current?.material as MeshStandardMaterial | undefined;
    if (mat) mat.emissiveIntensity = 0.3 + lit * 1.6 + (hovered ? 0.8 : 0);
  });

  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onOpen(spot.tower);
  };

  return (
    <group
      position={spot.position}
      onClick={click}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <group ref={group}>
        {Array.from({ length: spot.blocks }, (_, b) => (
          <mesh key={b} position={[0, b * 0.62, 0]} scale={[1, 0.001, 1]} castShadow>
            <boxGeometry args={[0.9 - b * 0.06, 0.6, 0.9 - b * 0.06]} />
            <meshStandardMaterial color={hovered ? "#2a7a86" : "#24557a"} roughness={0.8} />
          </mesh>
        ))}
      </group>
      <mesh ref={top} position={[0, spot.blocks * 0.62 + 0.15, 0]}>
        <boxGeometry args={[0.55, 0.3, 0.08]} />
        <meshStandardMaterial color="#f5c462" emissive="#f5c462" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Outpost({ node }: { node: Vector3 }) {
  return (
    <group position={[node.x + 1, 0, node.z - 1.2]}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
        <meshStandardMaterial color="#8a94a6" />
      </mesh>
      <mesh position={[0.22, 1.2, 0]}>
        <boxGeometry args={[0.42, 0.26, 0.02]} />
        <meshStandardMaterial color="#f5c462" emissive="#f5c462" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function Pads({ progress }: { progress: { current: number } }) {
  const pads = useRef<Group>(null);
  useFrame(() => {
    const s = stopPosition(progress.current);
    pads.current?.children.forEach((pad, i) => {
      const mat = (pad as Mesh).material as MeshStandardMaterial;
      mat.emissiveIntensity = s >= i - 0.2 ? 1.2 : 0.15;
    });
  });
  return (
    <group ref={pads}>
      {[...nodes, sideQuestNode].map((n, i) => (
        <mesh key={i} position={[n.x, 0.03, n.z]} receiveShadow>
          <cylinderGeometry args={[0.75, 0.75, 0.06, 32]} />
          <meshStandardMaterial
            color="#0e2436"
            emissive={i === nodes.length ? "#f5c462" : "#00e5c0"}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function Walker({ progress }: { progress: { current: number } }) {
  const group = useRef<Group>(null);
  const last = useRef(0);
  const still = useRef(0);
  const [clip, setClip] = useState<AvatarClip>("Idle");
  const tmp = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const u = stopPosition(progress.current) / (STOPS - 2);
    path.getPointAt(Math.min(u, 1), tmp);
    const moved = tmp.distanceTo(g.position);
    g.position.lerp(tmp, Math.min(delta * 5, 1));
    if (moved > 0.02) {
      const ahead = path.getPointAt(Math.min(u + 0.01, 1));
      const behind = path.getPointAt(Math.max(u - 0.01, 0));
      const dir = progress.current >= last.current ? ahead.sub(behind) : behind.sub(ahead);
      g.rotation.y = Math.atan2(dir.x, dir.z);
      still.current = 0;
      if (clip !== "Walking") setClip("Walking");
    } else if ((still.current += delta) > 0.25 && clip !== "Idle") {
      setClip("Idle");
    }
    last.current = progress.current;
  });

  return (
    <group ref={group}>
      <Avatar clip={clip} scale={0.42} />
    </group>
  );
}

function CameraRig({ progress }: { progress: { current: number } }) {
  const camera = useRef<import("three").PerspectiveCamera>(null);
  const focus = useMemo(() => new Vector3(), []);
  const eye = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const c = camera.current;
    if (!c) return;
    const u = stopPosition(progress.current) / (STOPS - 2);
    const walker = path.getPointAt(Math.min(u, 1));
    // Fortress reveal: over the last stop, pull back to see every Tower.
    const reveal = Math.min(Math.max((progress.current * STOPS - (STOPS - 1)) / 0.5, 0), 1);
    const followEye = walker.clone().add(new Vector3(1.5, 4.2, 7.5));
    const overviewEye = fortressCentre.clone().add(new Vector3(0, 17, 22));
    eye.lerpVectors(followEye, overviewEye, reveal);
    const followFocus = walker.clone().add(new Vector3(0, 0.8, -1.2));
    focus.lerpVectors(followFocus, fortressCentre, reveal);
    c.position.lerp(eye, Math.min(delta * 3, 1));
    c.lookAt(focus);
  });

  return <PerspectiveCamera ref={camera} makeDefault fov={40} position={[1.5, 4.2, 7.5]} />;
}

export default function CampaignScene({
  onReady,
  progress,
  onOpen,
}: SceneProps & { progress: { current: number }; onOpen: (t: Tower) => void }) {
  return (
    <View className="absolute inset-0">
      <CameraRig progress={progress} />
      <color attach="background" args={["#060e1c"]} />
      <fog attach="fog" args={["#060e1c", 26, 75]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 6]} intensity={1.3} castShadow />
      <hemisphereLight args={["#8fb8ff", "#0a1428", 0.5]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[fortressCentre.x, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#0a1a2c" />
      </mesh>
      <mesh>
        <tubeGeometry args={[path, 200, 0.06, 8, false]} />
        <meshStandardMaterial color="#00e5c0" emissive="#00e5c0" emissiveIntensity={0.6} />
      </mesh>
      <Pads progress={progress} />
      {outposts.map((i) => (
        <Outpost key={i} node={nodes[i]} />
      ))}
      {towerSpots.map((spot) => (
        <TowerMesh key={spot.tower.id} spot={spot} progress={progress} onOpen={onOpen} />
      ))}
      <Suspense fallback={null}>
        <Walker progress={progress} />
        <Ready onReady={onReady} />
      </Suspense>
    </View>
  );
}
