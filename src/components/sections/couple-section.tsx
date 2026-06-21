"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { weddingData } from "../../data/wedding";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const headingItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.15,
      ease: EASE_PREMIUM,
    },
  },
};

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_PREMIUM,
    },
  },
};

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: EASE_PREMIUM,
    },
  },
};

// Receives "hover" variant propagated from the outer image container
const imageInnerVariants = {
  hidden: { scale: 1.08, filter: "brightness(1)" },
  visible: {
    scale: 1,
    filter: "brightness(1)",
    transition: {
      duration: 1.4,
      ease: EASE_PREMIUM,
    },
  },
  hover: {
    scale: 1.04,
    filter: "brightness(1.05)",
    transition: {
      duration: 1.2,
      ease: EASE_PREMIUM,
    },
  },
};

export function CoupleSection() {
  const { bride, groom } = weddingData;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="couple"
        className="
          section-padding
          relative
          overflow-hidden
        "
      >
        {/* Ambient Glow */}
        <div
          className="
            absolute
            inset-0
            opacity-40
            pointer-events-none
          "
        >
          <div
            className="
              absolute
              top-0
              left-1/2
              h-[300px]
              w-[300px]
              -translate-x-1/2
              rounded-full
              bg-[rgba(214,185,140,0.12)]
              blur-3xl
            "
          />
        </div>

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            variants={headingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20 text-center"
          >
            <motion.p
              variants={headingItemVariants}
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-[var(--mocha)]
              "
            >
              The Bride & Groom
            </motion.p>

            <motion.h2
              variants={headingItemVariants}
              className="
                mt-5
                text-5xl
                leading-none
              "
            >
              Two Souls
            </motion.h2>

            <motion.p
              variants={headingItemVariants}
              className="
                mx-auto
                mt-6
                max-w-[320px]
                text-base
                leading-8
                text-black/60
              "
            >
              Together with their families, joyfully invite you to celebrate
              their wedding day.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div className="space-y-20">
            {/* Groom */}
            <div className="flex flex-col items-center text-center">
              {/* Image container — outer handles entry + hover propagation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover="hover"
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  type: "spring",
                  stiffness: 55,
                  damping: 18,
                  mass: 1,
                }}
                style={{ willChange: "transform" }}
                className="
                  relative
                  h-[420px]
                  w-full
                  overflow-hidden
                  rounded-[32px]
                "
              >
                {/* Inner image — scale reveal + responds to parent "hover" variant */}
                <motion.div
                  variants={imageInnerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  style={{ willChange: "transform" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={groom.image}
                    alt={groom.nickname}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Gradient — pointer-events-none so hover reaches inner div */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-black/10
                    to-transparent
                    pointer-events-none
                  "
                />
              </motion.div>

              {/* Text cascade */}
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-8 space-y-3"
              >
                <motion.p
                  variants={textItemVariants}
                  className="
                    text-xs
                    uppercase
                    tracking-[0.35em]
                    text-[var(--mocha)]
                  "
                >
                  The Groom
                </motion.p>

                <motion.h3
                  variants={textItemVariants}
                  className="text-5xl"
                >
                  {groom.nickname}
                </motion.h3>

                {/* Decorative divider */}
                <motion.div
                  variants={dividerVariants}
                  style={{ originX: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="h-px w-8 bg-[rgba(214,185,140,0.5)]" />
                  <span className="text-[10px] text-[var(--champagne)]">✦</span>
                  <div className="h-px w-8 bg-[rgba(214,185,140,0.5)]" />
                </motion.div>

                <motion.p
                  variants={textItemVariants}
                  className="text-base text-black/60"
                >
                  {groom.fullname}
                </motion.p>

                <motion.p
                  variants={textItemVariants}
                  className="
                    max-w-[280px]
                    text-sm
                    leading-7
                    text-black/50
                  "
                >
                  Son of {groom.father}
                  <br />& {groom.mother}
                </motion.p>

                <motion.div variants={textItemVariants}>
                  <a
                    href={groom.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${groom.nickname}'s Instagram profile`}
                    className="
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      border border-[rgba(214,185,140,0.30)]

                      bg-[rgba(214,185,140,0.08)]

                      px-4
                      py-2

                      text-xs
                      uppercase
                      tracking-[0.12em]

                      text-black/60

                      transition-[transform,border-color,background-color,color]
                      duration-500

                      hover:scale-[1.04]
                      hover:border-[rgba(214,185,140,0.55)]
                      hover:bg-[rgba(214,185,140,0.15)]
                      hover:text-black/80

                      active:scale-[0.97]
                    "
                  >
                    <InstagramIcon size={13} />
                    <span>Instagram</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Bride */}
            <div className="flex flex-col items-center text-center">
              {/* Image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover="hover"
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  type: "spring",
                  stiffness: 55,
                  damping: 18,
                  mass: 1,
                }}
                style={{ willChange: "transform" }}
                className="
                  relative
                  h-[420px]
                  w-full
                  overflow-hidden
                  rounded-[32px]
                "
              >
                {/* Inner image */}
                <motion.div
                  variants={imageInnerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  style={{ willChange: "transform" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={bride.image}
                    alt={bride.nickname}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Gradient */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-black/10
                    to-transparent
                    pointer-events-none
                  "
                />
              </motion.div>

              {/* Text cascade */}
              <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-8 space-y-3"
              >
                <motion.p
                  variants={textItemVariants}
                  className="
                    text-xs
                    uppercase
                    tracking-[0.35em]
                    text-[var(--mocha)]
                  "
                >
                  The Bride
                </motion.p>

                <motion.h3
                  variants={textItemVariants}
                  className="text-5xl"
                >
                  {bride.nickname}
                </motion.h3>

                {/* Decorative divider */}
                <motion.div
                  variants={dividerVariants}
                  style={{ originX: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="h-px w-8 bg-[rgba(214,185,140,0.5)]" />
                  <span className="text-[10px] text-[var(--champagne)]">✦</span>
                  <div className="h-px w-8 bg-[rgba(214,185,140,0.5)]" />
                </motion.div>

                <motion.p
                  variants={textItemVariants}
                  className="text-base text-black/60"
                >
                  {bride.fullname}
                </motion.p>

                <motion.p
                  variants={textItemVariants}
                  className="
                    max-w-[280px]
                    text-sm
                    leading-7
                    text-black/50
                  "
                >
                  Daughter of {bride.father}
                  <br />& {bride.mother}
                </motion.p>

                <motion.div variants={textItemVariants}>
                  <a
                    href={bride.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${bride.nickname}'s Instagram profile`}
                    className="
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      border border-[rgba(214,185,140,0.30)]

                      bg-[rgba(214,185,140,0.08)]

                      px-4
                      py-2

                      text-xs
                      uppercase
                      tracking-[0.12em]

                      text-black/60

                      transition-[transform,border-color,background-color,color]
                      duration-500

                      hover:scale-[1.04]
                      hover:border-[rgba(214,185,140,0.55)]
                      hover:bg-[rgba(214,185,140,0.15)]
                      hover:text-black/80

                      active:scale-[0.97]
                    "
                  >
                    <InstagramIcon size={13} />
                    <span>Instagram</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
