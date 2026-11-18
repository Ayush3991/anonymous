"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  /** Set false for screens whose content is taller than the viewport and needs to scroll */
  centerContent?: boolean;
}

export default function PageTransition({
  children,
  className = "",
  centerContent = true,
}: PageTransitionProps) {
  return (
    <motion.div
      className={`relative z-10 flex flex-col items-center w-full px-6 py-10 ${
        centerContent ? "justify-center min-h-dvh" : "min-h-dvh"
      } ${className}`}
      initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
