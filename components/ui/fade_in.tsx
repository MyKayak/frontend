"use client"

import { motion } from "motion/react"
import React from "react"

interface FadeInProps {
  children: React.ReactNode
  index?: number
  className?: string
}

export default function FadeIn({ children, index = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
