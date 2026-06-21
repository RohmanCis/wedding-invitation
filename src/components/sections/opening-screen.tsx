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

// Nested stagger relay — h1 receives "visible" from parent, staggers its name spans
const nameBlockVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const nameItemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.3,
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

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          mixBlendMode: "soft-light",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-8 text-center text-white"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 text-xs uppercase tracking-[0.5em] text-white/60"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          variants={nameBlockVariants}
          className="max-w-[320px] text-6xl leading-none"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          <motion.span variants={nameItemVariants} className="inline">
            Panji
          </motion.span>
          {" "}
          <motion.span
            variants={nameItemVariants}
            className="inline text-[var(--champagne)]"
          >
            &
          </motion.span>
          {" "}
          <motion.span variants={nameItemVariants} className="inline">
            Anita
          </motion.span>
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
