import { useState, useCallback, useMemo, useEffect } from "react";
import { NavigationItem } from "@/types";
import { useScrollManager } from "./useScrollManager";

interface UseActiveSectionOptions {
  sections: NavigationItem[];
  offset?: number;
}

export function useActiveSection({
  sections,
  offset = 100,
}: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.href || "",
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const { scrollY, isScrolling } = useScrollManager();

  // Memoize sections array to prevent re-creation
  const sectionsArray = useMemo(
    () => sections.map((nav) => nav.href),
    [sections],
  );

  // Update active section based on scroll position
  useEffect(() => {
    // Don't update during navigation to prevent conflicts
    if (isNavigating || isScrolling) return;

    const scrollPosition = scrollY + offset;

    for (let i = sectionsArray.length - 1; i >= 0; i--) {
      const element = document.querySelector(sectionsArray[i]);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;

        if (scrollPosition >= elementTop) {
          setActiveSection(sectionsArray[i]);
          break;
        }
      }
    }
  }, [scrollY, sectionsArray, offset, isNavigating, isScrolling]);

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    // Immediately set as active to provide instant feedback
    setActiveSection(href);
    setIsNavigating(true);

    const headerHeight = 64;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementPosition - headerHeight;

    // Use native scrollTo for better performance
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Reset navigation flag after scroll animation completes
    setTimeout(() => {
      setIsNavigating(false);
    }, 800); // Slightly longer than typical smooth scroll duration
  }, []);

  return { activeSection, handleNavClick };
}
