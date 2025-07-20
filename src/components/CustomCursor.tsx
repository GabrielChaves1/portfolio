import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import useTheme from "../hooks/useTheme";

export default function CustomCursor() {
  const { isDark } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawSize = useMotionValue(30);
  const size = useSpring(rawSize, { stiffness: 400, damping: 50 });

  const smoothX = useSpring(mouseX, { stiffness: 700, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 700, damping: 25 });

  const offsetX = useTransform(smoothX, (latest) => latest - size.get() / 2);
  const offsetY = useTransform(smoothY, (latest) => latest - size.get() / 2);

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const hoverHandler = (e: any) => {
      const target = e.target as HTMLElement;

      const hasDirectTextContent = Array.from(target.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );

      if (hasDirectTextContent) {
        const textRect = target.getBoundingClientRect();
        const baseSize = 40;
        const textSize = Math.min(
          Math.sqrt(Math.max(textRect.width, textRect.height)) * 1.5 + baseSize,
          100
        );
        rawSize.set(textSize);
      } else {
        rawSize.set(30);
      }
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", hoverHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", hoverHandler);
    };
  }, [mouseX, mouseY, rawSize]);

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-[60] rounded-full border-3 p-2 border-surface-50 ${isDark ? 'mix-blend-difference bg-surface-50' : 'border bg-surface-50/5'}`}
      style={{
        width: size,
        height: size,
        x: offsetX,
        y: offsetY,
      }}
    />
  );
}
