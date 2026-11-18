"use client";

import { motion } from "framer-motion";

interface MagicalBackgroundProps {
  currentScreen: number;
}

const GRADIENTS: Record<number, string> = {
  1: "linear-gradient(165deg, #fce4f1 0%, #f8d0e8 30%, #e8c5f0 60%, #d4b4e8 100%)",
  2: "linear-gradient(165deg, #fde8f4 0%, #f5cce8 30%, #e4bef0 60%, #d0aceb 100%)",
  3: "linear-gradient(165deg, #fce0ef 0%, #f2c4e4 30%, #e6b8f0 60%, #d4ace8 100%)",
  4: "linear-gradient(165deg, #fde4f2 0%, #f4c8e6 35%, #e2b6ee 65%, #d0a8e8 100%)",
  5: "linear-gradient(165deg, #fbe0ee 0%, #f0c0de 30%, #e4b0e8 60%, #d2a4e4 100%)",
  6: "linear-gradient(165deg, #faf0f5 0%, #f4dce8 30%, #ecd0ef 60%, #dcc0e8 100%)",
  7: "linear-gradient(165deg, #2d1b4e 0%, #1e1040 30%, #180c38 60%, #1a0e2e 100%)",
};

export default function MagicalBackground({ currentScreen }: MagicalBackgroundProps) {
  const bg = GRADIENTS[currentScreen] || GRADIENTS[1];

  return (
    <motion.div
      className="fixed inset-0 z-0"
      animate={{ background: bg }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
  );
}
