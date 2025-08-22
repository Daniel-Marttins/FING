import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollManagerState {
  scrollY: number;
  isScrolling: boolean;
  direction: "up" | "down";
}

interface ScrollManagerOptions {
  throttleMs?: number;
  debounceMs?: number;
}

export function useScrollManager(options: ScrollManagerOptions = {}) {
  const { throttleMs = 16, debounceMs = 150 } = options; // ~60fps throttling

  const [state, setState] = useState<ScrollManagerState>({
    scrollY: 0,
    isScrolling: false,
    direction: "down",
  });

  const lastScrollY = useRef(0);
  const isScrollingTimeout = useRef<NodeJS.Timeout>();
  const ticking = useRef(false);

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY.current ? "down" : "up";

    setState((prev) => ({
      scrollY: currentScrollY,
      direction,
      isScrolling: true,
    }));

    lastScrollY.current = currentScrollY;

    // Clear existing timeout
    if (isScrollingTimeout.current) {
      clearTimeout(isScrollingTimeout.current);
    }

    // Set isScrolling to false after debounce period
    isScrollingTimeout.current = setTimeout(() => {
      setState((prev) => ({ ...prev, isScrolling: false }));
    }, debounceMs);

    ticking.current = false;
  }, [debounceMs]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Set initial values
    setState({
      scrollY: window.scrollY,
      isScrolling: false,
      direction: "down",
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
    };
  }, [updateScroll]);

  return state;
}
