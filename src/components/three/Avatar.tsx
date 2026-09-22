/**
 * The Avatar — one rigged character used across Hero, Arena and Campaign.
 * Placeholder: RobotExpressive by Tomás Laulhé (Quaternius), CC0. To swap in a
 * photo-based avatar, replace /models/avatar.glb keeping the same clip names.
 */
import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce, type Group } from "three";
import { SkeletonUtils } from "three-stdlib";
import type { GroupProps } from "@react-three/fiber";

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
const ONE_SHOT: AvatarClip[] = ["Sitting", "Standing", "Punch", "Wave", "ThumbsUp", "Jump", "Yes"];

interface AvatarProps extends GroupProps {
  clip: AvatarClip;
  /** 0–1: scrub the clip by this progress instead of playing it (scroll-driven). */
  progress?: number;
  /** Clip to return to after a one-shot finishes. */
  then?: AvatarClip;
}

export function Avatar({ clip, progress, then, ...groupProps }: AvatarProps) {
  const { scene, animations } = useGLTF(AVATAR_URL);
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const group = useRef<Group>(null);
  const { actions, mixer } = useAnimations(animations, group);
  const scrubbed = progress !== undefined;

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
    action.paused = scrubbed;

    const onFinished = (e: { action: unknown }) => {
      if (e.action !== action || !then) return;
      action.fadeOut(0.3);
      actions[then]?.reset().fadeIn(0.3).play();
    };
    mixer.addEventListener("finished", onFinished);
    return () => {
      mixer.removeEventListener("finished", onFinished);
      action.fadeOut(0.3);
      if (then) actions[then]?.fadeOut(0.3);
    };
  }, [actions, mixer, clip, then, scrubbed]);

  useEffect(() => {
    const action = actions[clip];
    if (!action || progress === undefined) return;
    action.time = Math.min(Math.max(progress, 0), 0.999) * action.getClip().duration;
  }, [actions, clip, progress]);

  return (
    <group ref={group} {...groupProps} dispose={null}>
      <primitive object={model} />
    </group>
  );
}
