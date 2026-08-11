"use client";

import { useEffect, useRef, useState } from "react";

const STOPS = ["Birthday", "Speed", "ML", "Mind", "Style", "Namaste", "Always"];

export default function JourneyRail() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeIndex = Math.min(
    STOPS.length - 1,
    Math.floor((progress / 100) * STOPS.length)
  );

  return (
    <nav className="rj-rail" aria-hidden="true">
      <div className="rj-rail-track">
        <div className="rj-rail-fill" style={{ height: `${progress}%` }} />
        <div className="rj-rail-car" style={{ top: `${progress}%` }}>
          <img src="/rajatha-f1-car.svg" alt="" />
        </div>
        <ul className="rj-rail-stops">
          {STOPS.map((label, i) => (
            <li
              key={label}
              className={i === activeIndex ? "is-active" : ""}
              style={{ top: `${(i / (STOPS.length - 1)) * 100}%` }}
            >
              <span className="rj-rail-dot" />
              <span className="rj-rail-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
