/**
 * A frame that tilts in 3D toward the pointer. Only on fine pointers without reduced motion;
 * touch screens get a flat frame.
 */
import { useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(pointer: fine)").matches &&
  !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function TiltFrame({ children, className }: { children: ReactNode; className?: string }) {
  const [enabled] = useState(canTilt);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <div className="[perspective:1000px]">
      <motion.div
        className={cn("will-change-transform", className)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
