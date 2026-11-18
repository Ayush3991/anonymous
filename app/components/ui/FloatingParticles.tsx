"use client";

import { useState, useEffect } from "react";

interface FloatingParticlesProps {
  variant?: "default" | "dense" | "hearts" | "stars" | "night";
  count?: number;
}

const PARTICLE_TYPES = {
  heart: "♡",
  star: "✦",
  sparkle: "✨",
  dot: "•",
  flower: "✿",
};

type Particle = {
  id: number;
  char: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
};

export default function FloatingParticles({
  variant = "default",
  count,
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const n = count ?? (variant === "dense" ? 30 : variant === "night" ? 25 : 18);
    const types =
      variant === "hearts"
        ? ["heart", "heart", "sparkle"]
        : variant === "stars"
          ? ["star", "star", "sparkle", "dot"]
          : variant === "night"
            ? ["star", "dot", "dot", "sparkle"]
            : ["heart", "star", "sparkle", "dot", "flower"];

    const generated = Array.from({ length: n }, (_, i) => {
      const type = types[i % types.length] as keyof typeof PARTICLE_TYPES;
      const char = PARTICLE_TYPES[type];
      return {
        id: i,
        char,
        left: Math.random() * 100,
        size: type === "dot" ? 4 + Math.random() * 4 : 10 + Math.random() * 14,
        duration: 8 + Math.random() * 16,
        delay: Math.random() * 10,
        opacity: variant === "night" ? 0.2 + Math.random() * 0.5 : 0.15 + Math.random() * 0.4,
        color:
          char === "♡"
            ? "#f8a4c8"
            : char === "✿"
              ? "#fdd5e9"
              : char === "✦" || char === "•"
                ? "#f0d68a"
                : "#c9a7eb",
      };
    });

    setParticles(generated);
  }, [variant, count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            color: p.color,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
