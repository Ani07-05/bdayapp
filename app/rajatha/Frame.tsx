"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Frame({
  children,
  className = "",
  gate,
}: {
  children: ReactNode;
  className?: string;
  /** "sound" — don't reveal on intersection alone; wait for the sound
   *  prompt to be answered too. The hero is always geometrically in view
   *  at mount (the prompt only visually covers it), so without this its
   *  door-open transition fires before the veil is ever dismissed. */
  gate?: "sound";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let gateOpen = gate !== "sound";
    let intersecting = false;

    const reveal = () => {
      if (gateOpen && intersecting) node.classList.add("in-view");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        if (intersecting) {
          reveal();
        } else if (entry.intersectionRatio < 0.1) {
          node.classList.remove("in-view");
        }
      },
      { threshold: [0, 0.1, 0.55, 0.8] }
    );
    observer.observe(node);

    let onAnswered: (() => void) | undefined;
    if (gate === "sound") {
      onAnswered = () => {
        gateOpen = true;
        reveal();
      };
      window.addEventListener("rj:sound-answered", onAnswered);
    }

    return () => {
      observer.disconnect();
      if (onAnswered) window.removeEventListener("rj:sound-answered", onAnswered);
    };
  }, [gate]);

  return (
    <section ref={ref} className={`rj-frame ${className}`}>
      {children}
    </section>
  );
}
