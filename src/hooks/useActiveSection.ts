import { useState, useEffect, useCallback, useMemo } from "react";
import { NavigationItem } from "@/types";

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

  // Memoize the sections array to prevent re-creation
  const sectionsArray = useMemo(
    () => sections.map((nav) => nav.href),
    [sections],
  );

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionsArray.length - 1; i >= 0; i--) {
      const element = document.querySelector(sectionsArray[i]);
      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top + window.pageYOffset;
        if (scrollPosition >= offsetTop) {
          setActiveSection(sectionsArray[i]);
          break;
        }
      }
    }
  }, [sectionsArray, offset]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActiveSection]);

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 64;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { activeSection, handleNavClick };
}
