"use client";

import { motion } from "motion/react";

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
}

export default function BlurIn({ children, className }: BlurInProps) {
  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      whileInView={{ filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
