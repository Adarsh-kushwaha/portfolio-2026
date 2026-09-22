/**
 * The Avatar — one rigged character used across Hero, Arena and Campaign.
 * Placeholder: RobotExpressive by Tomás Laulhé (Quaternius), CC0. To swap in a
 * photo-based avatar, replace /models/avatar.glb keeping the same clip names.
 */
import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, type GroupProps } from "@react-three/fiber";
import { LoopOnce, type Group } from "three";
import { SkeletonUtils } from "three-stdlib";

export const AVATAR_URL = "/models/avatar.glb";

export type AvatarClip =
  | "Idle"
  | "Walking"
  | "Running"
  | "Sitting"
  | "Standing"
  | "Punch"
  | "Wave"
  | "ThumbsUp"
  | "Jump"
  | "Yes"
  | "Dance";

/** Clips that play once and hold their last pose. */
const ONE_SHOT: AvatarClip[] = ["Punch", "Wave", "ThumbsUp", "Jump", "Yes"];

interface AvatarProps extends GroupProps {
  clip: AvatarClip;
  /** Scroll-driven blend: `clip` fades into `blendTo` as progress goes 0 → 1. */
  blendTo?: AvatarClip;
  progress?: { current: number };
  /** Clip to return to after a one-shot finishes. */
  then?: AvatarClip;
  /** Changing this replays a one-shot clip. */
  playKey?: number;
}

export function Avatar({ clip, blendTo, progress, then, playKey, ...groupProps }: AvatarProps) {
  const { scene, animations } = useGLTF(AVATAR_URL);
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const group = useRef<Group>(null);
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    model.traverse((o) => {
      o.castShadow = true;
    });
  }, [model]);

  useEffect(() => {
    const action = actions[clip];
    if (!action) return;
    action.reset();
    if (ONE_SHOT.includes(clip)) {
      action.setLoop(LoopOnce, 1);
      action.clampWhenFinished = true;
    }
    action.fadeIn(0.3).play();
    const blend = blendTo ? actions[blendTo] : undefined;
    blend?.reset().play();

    const onFinished = (e: { action: unknown }) => {
      if (e.action !== action || !then) return;
      action.fadeOut(0.3);
      actions[then]?.reset().fadeIn(0.3).play();
    };
    mixer.addEventListener("finished", onFinished);
    return () => {
      mixer.removeEventListener("finished", onFinished);
      action.fadeOut(0.3);
      blend?.fadeOut(0.3);
      if (then) actions[then]?.fadeOut(0.3);
    };
  }, [actions, mixer, clip, blendTo, then, playKey]);

  useFrame(() => {
    if (!blendTo || !progress) return;
    const p = Math.min(Math.max(progress.current, 0), 1);
    actions[clip]?.setEffectiveWeight(1 - p);
    actions[blendTo]?.setEffectiveWeight(p);
  });

  return (
    <group ref={group} {...groupProps} dispose={null}>
      <primitive object={model} />
    </group>
  );
}
