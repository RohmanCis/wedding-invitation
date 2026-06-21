"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useInvitationStore } from "../../stores/invitation";

const HERO_IMAGES = [
  "/images/hero-1.jpeg",
  "/images/hero-2.jpeg",
  "/images/hero-3.jpeg",
];

const WEDDING_DATE = new Date("2026-12-12T08:00:00").getTime();

const calculateTimeLeft = () => {
  const distance = WEDDING_DATE - new Date().getTime();

  if (distance <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0"),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0"),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0"),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0"),
  };
};

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: EASE_PREMIUM,
    },
  },
};

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  const isOpened = useInvitationStore((state) => state.isOpened);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === HERO_IMAGES.length - 1 ? 0 : prev + 1,
      );
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          inset-0
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={HERO_IMAGES[currentImage]}
            initial={{
              opacity: 0,
              scale: 1,
            }}
            animate={{
              opacity: 1,
              scale: 1.08,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 2.8,
              ease: "easeInOut",
            }}
            className="
      absolute
      inset-0
    "
          >
            <Image
              src={HERO_IMAGES[currentImage]}
              alt="Wedding Hero"
              fill
              priority
              sizes="100vw"
              className="
        object-cover
      "
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/30
        "
      />

      {/* Gradient */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-black/20
          via-black/30
          to-black/65
        "
      />

      {/* Ambient Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-[420px]
          w-[420px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[
            rgba(214,185,140,0.10)
          ]

          blur-3xl
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10

          px-8
          text-center
          text-white
        "
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isOpened ? "visible" : "hidden"}
        >
          <motion.p
            variants={itemVariants}
            className="
              text-xs
              uppercase
              tracking-[0.45em]
              text-white/65
            "
          >
            The Wedding Of
          </motion.p>

          <h1 className="mt-6">
            <motion.span
              variants={itemVariants}
              className="
                block
                text-7xl
                leading-none
              "
            >
              Panji
            </motion.span>

            <motion.span
              aria-hidden="true"
              variants={itemVariants}
              className="
                my-5
                block
                text-3xl
                text-[var(--champagne)]
              "
            >
              &
            </motion.span>

            <span className="sr-only">and</span>

            <motion.span
              variants={itemVariants}
              className="
                block
                text-7xl
                leading-none
              "
            >
              Anita
            </motion.span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="
              mt-8
              text-sm
              uppercase
              tracking-[0.35em]
              text-white/70
            "
          >
            Sunday, 12 December 2026
          </motion.p>

          {/* Countdown */}
          <motion.div
            variants={itemVariants}
            className="
              mt-14

              grid
              grid-cols-4
              gap-3

              transition
              hover:-translate-y-[2px]
              hover:shadow-[
              0_0_35px_rgba(
                214,
                185,
                140,
                0.12
              )
            ]
            "
          >
            {[
              {
                value: timeLeft.days,
                label: "Days",
              },

              {
                value: timeLeft.hours,
                label: "Hours",
              },

              {
                value: timeLeft.minutes,
                label: "Minutes",
              },

              {
                value: timeLeft.seconds,
                label: "Seconds",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  rounded-[24px]

                  border border-white/10

                  bg-white/10

                  px-4
                  py-5

                  backdrop-blur-xl

                  shadow-[
                    0_10px_30px_rgba(
                      0,
                      0,
                      0,
                      0.10
                    )
                  ]
                "
              >
                <h3
                  className="
                    text-[2rem]
                      tracking-[0.04em]
                      font-medium
                  "
                >
                  {item.value}
                </h3>

                <p
                  className="
                    mt-2
                    text-[9px]
                    uppercase
                    tracking-[0.32em]
                    text-white/60
                  "
                >
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="
              mt-16
              flex
              justify-center
            "
          >
            <div
              className="
                flex
                h-14
                w-8
                items-start
                justify-center

                rounded-full

                border border-white/20

                p-2
              "
            >
              <div
                className="
                  h-2
                  w-2

                  animate-bounce

                  rounded-full

                  bg-white/70
                "
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
