"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { ReactNode, PointerEvent } from "react";

export default function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springPx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.6 });
  const springPy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springPy, [0, 1], [max, -max]);
  const rotateY = useTransform(springPx, [0, 1], [-max, max]);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective: 800,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
      }}
      className={`relative ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
