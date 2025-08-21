import { useState, useEffect, useCallback } from 'react';

interface UseScrollPositionOptions {
  throttle?: boolean;
  element?: HTMLElement | null;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const { throttle = true, element } = options;
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const updateScrollPosition = useCallback(() => {
    const target = element || window;
    const currentScrollY = element ? element.scrollTop : window.scrollY;
    
    setScrollDirection(currentScrollY > scrollY ? 'down' : 'up');
    setScrollY(currentScrollY);
  }, [scrollY, element]);

  useEffect(() => {
    const target = element || window;
    let ticking = false;

    const handleScroll = () => {
      if (throttle) {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateScrollPosition();
            ticking = false;
          });
          ticking = true;
        }
      } else {
        updateScrollPosition();
      }
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [updateScrollPosition, throttle, element]);

  return { scrollY, scrollDirection };
}
