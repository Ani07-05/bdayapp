"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function ScrollReveal({
  children,
  index = 0,
  rotate = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  rotate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("in-view");
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--i": index,
    "--rot": `${rotate}deg`,
  } as CSSProperties;

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
