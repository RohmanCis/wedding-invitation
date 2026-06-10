"use client";

import { motion }
  from "framer-motion";

type RevealProps = {
  children: React.ReactNode;

  delay?: number;
};

export function Reveal({
  children,
  delay = 0,
}: RevealProps) {

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}