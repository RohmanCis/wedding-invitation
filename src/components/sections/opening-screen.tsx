"use client";

import { motion } from "framer-motion";
import { useInvitationStore } from "../../stores/invitation";

type OpeningScreenProps = {
  guestName: string;
};

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASE_PREMIUM,
    },
  },
};

export function OpeningScreen({ guestName }: OpeningScreenProps) {
  const { openInvitation } = useInvitationStore();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="
          absolute inset-0
          scale-105
          bg-[url('/images/hero.jpg')]
          bg-cover
          bg-center
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-8 text-center text-white"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-white/70"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="max-w-[320px] text-6xl leading-none"
        >
          Panji <span className="text-[var(--champagne)]">&</span> Anita
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mt-10 space-y-2"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/60">
            Dear
          </p>

          <h2 className="text-2xl">
            {guestName || "Our Guest"}
          </h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            onClick={openInvitation}
            className="
              mt-12
              rounded-full
              border border-white/15
              bg-white/10
              px-8
              py-4
              text-sm
              uppercase
              tracking-[0.25em]
              text-white/90
              backdrop-blur-xl

              shadow-[0_0_0_rgba(214,185,140,0)]

              transition-[transform,box-shadow,background-color,border-color]
              duration-500

              hover:scale-[1.03]
              hover:border-[rgba(214,185,140,0.45)]
              hover:bg-white/15
              hover:shadow-[0_0_30px_rgba(214,185,140,0.22)]

              active:scale-[0.98]
            "
          >
            Open Invitation
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
