import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MotionDiv = motion.div;

const interactiveSelector = "a, button, [role='button'], summary, [data-cursor='grow']";
const textSelector = "input, textarea, select, [contenteditable='true']";

export default function CursorAura() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [typing, setTyping] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 420, damping: 32, mass: 0.18 });
  const ringY = useSpring(cursorY, { stiffness: 420, damping: 32, mass: 0.18 });
  const glowX = useSpring(cursorX, { stiffness: 95, damping: 24, mass: 0.4 });
  const glowY = useSpring(cursorY, { stiffness: 95, damping: 24, mass: 0.4 });

  const readTarget = useCallback((target) => {
    if (!target?.closest) return { nextActive: false, nextTyping: false };
    return {
      nextActive: Boolean(target.closest(interactiveSelector)),
      nextTyping: Boolean(target.closest(textSelector)),
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return undefined;

    const move = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);

      const { nextActive, nextTyping } = readTarget(event.target);
      setActive(nextActive);
      setTyping(nextTyping);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY, readTarget]);

  if (!visible || typing) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <MotionDiv
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: active ? 0.18 : 0.08, scale: active ? 1.2 : 1 }}
        className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-[color:var(--accent)] blur-2xl"
      />
      <MotionDiv
        style={{ x: ringX, y: ringY }}
        animate={{
          height: active ? 46 : 30,
          opacity: active ? 0.95 : 0.45,
          width: active ? 46 : 30,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--accent)]"
      />
    </div>
  );
}
