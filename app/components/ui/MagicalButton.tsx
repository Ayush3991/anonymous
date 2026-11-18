"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicalButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}

export default function MagicalButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: MagicalButtonProps) {
  const gradients = {
    primary:
      "bg-gradient-to-r from-[#f8a4c8] via-[#e0a0d8] to-[#c9a7eb]",
    secondary:
      "bg-gradient-to-r from-[#fdd5e9] via-[#f0c0e0] to-[#e0b8f0]",
    gold: "bg-gradient-to-r from-[#d4a843] via-[#f0d68a] to-[#d4a843]",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-8 py-3.5 rounded-full font-body font-semibold text-sm
        tracking-wide text-white overflow-hidden
        shadow-[0_4px_20px_rgba(248,164,200,0.4),0_0_40px_rgba(201,167,235,0.2)]
        ${gradients[variant]}
        ${className}
      `}
      whileHover={{ scale: 1.05, boxShadow: "0 6px 30px rgba(248,164,200,0.6), 0 0 60px rgba(201,167,235,0.3)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={{ x: ["-200%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
