"use client";

import { useEffect } from "react";

/**
 * GlobalScrollReveal
 * Watches every element with a [data-reveal] attribute across the whole page.
 * Adds the .revealed class when the element enters the viewport and removes it
 * when the element leaves — giving recursive forward + backward scroll animations.
 *
 * Usage: place <GlobalScrollReveal /> once in the root layout.
 * On any element write:   data-reveal          (fade-up, default)
 *                         data-reveal="left"   (slide in from left)
 *                         data-reveal="right"  (slide in from right)
 */
export default function GlobalScrollReveal() {
  useEffect(() => {
    const getAll = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    // Observe all current elements
    getAll().forEach((el) => observer.observe(el));

    // Also watch for elements added later (dynamic / lazy-loaded sections)
    const mutationObserver = new MutationObserver(() => {
      getAll().forEach((el) => {
        // observe only if not already being observed (no-op if already observed)
        observer.observe(el);
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
