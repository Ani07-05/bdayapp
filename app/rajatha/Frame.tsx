"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("in-view");
        } else if (entry.intersectionRatio < 0.1) {
          node.classList.remove("in-view");
        }
      },
      { threshold: [0, 0.1, 0.55, 0.8] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`rj-frame ${className}`}>
      {children}
    </section>
  );
}
