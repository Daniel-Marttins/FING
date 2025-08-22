import { useMemo, useCallback } from "react";
import { useScrollManager } from "./useScrollManager";

interface UseParallaxOptions {
  speed?: number;
  maxOffset?: number;
  targetElementId?: string;
  enabled?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const {
    speed = 0.5,
    maxOffset = 200,
    targetElementId,
    enabled = true,
  } = options;

  const { scrollY } = useScrollManager();

  const offset = useMemo(() => {
    if (!enabled) return 0;

    if (targetElementId) {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        const elementHeight = targetElement.offsetHeight;

        // Only apply parallax when within the target element
        if (scrollY <= elementHeight) {
          return Math.min(scrollY * speed, maxOffset);
        }
      }
      return 0;
    }

    return Math.min(scrollY * speed, maxOffset);
  }, [scrollY, speed, maxOffset, targetElementId, enabled]);

  const parallaxStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${offset}px, 0)`,
      willChange: enabled ? "transform" : "auto",
    }),
    [offset, enabled],
  );

  return { offset, parallaxStyle };
}
