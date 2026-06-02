import React, { useMemo } from "react";

export const ParticleBackground = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        width: Math.random() * 30 + 8,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 6,
        opacity: Math.random() * 0.3 + 0.05,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.width,
            height: p.width,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};
