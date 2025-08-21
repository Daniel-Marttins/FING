import { useState, useEffect, useCallback, useMemo } from 'react';

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
    enabled = true 
  } = options;
  
  const [offset, setOffset] = useState(0);

  const updateParallax = useCallback(() => {
    if (!enabled || document.hidden) return;

    const scrollY = window.scrollY;
    
    if (targetElementId) {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        const elementHeight = targetElement.offsetHeight;
        const currentScrollY = scrollY;
        
        // Only apply parallax when within the target element
        if (currentScrollY <= elementHeight) {
          const newOffset = Math.min(currentScrollY * speed, maxOffset);
          setOffset(newOffset);
        } else if (offset !== 0) {
          setOffset(0); // Reset when outside target area
        }
      }
    } else {
      const newOffset = Math.min(scrollY * speed, maxOffset);
      setOffset(newOffset);
    }
  }, [speed, maxOffset, targetElementId, enabled, offset]);

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateParallax, enabled]);

  const parallaxStyle = useMemo(() => ({
    transform: `translate3d(0, ${offset}px, 0)`,
    willChange: 'transform'
  }), [offset]);

  return { offset, parallaxStyle };
}
