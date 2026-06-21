"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getLenis } from "../../lib/lenis";
import { Reveal } from "../animation/reveal";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Sparkle = {
  top: string;
  left?: string;
  right?: string;
  fontSize: number;
  duration: number;
  delay: number;
};

const SPARKLES: Sparkle[] = [
  { top: "12%", left: "7%", fontSize: 8, duration: 9, delay: 0 },
  { top: "40%", right: "8%", fontSize: 6, duration: 11, delay: 1.5 },
  { top: "68%", left: "6%", fontSize: 7, duration: 8.5, delay: 3 },
];

const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const nameItemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
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

export function FooterSection() {
  const footerImages = [
    "/images/footer-1.jpeg",
    "/images/footer-2.jpeg",
    "/images/footer-3.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === footerImages.length - 1 ? 0 : prev + 1,
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [footerImages.length]);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer
        className="
          relative
          overflow-hidden
          px-6
          pb-32
          pt-28
        "
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={footerImages[currentImage]}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.06 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 opacity-80"
            >
              <Image
                src={footerImages[currentImage]}
                alt="Footer Memory"
                fill
                sizes="100vw"
                className="object-cover scale-[1.02] blur-[1px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Dark Overlay — slightly reduced */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/60
            via-black/45
            to-black/65
          "
        />

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
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
              bg-[rgba(214,185,140,0.10)]
              blur-3xl
            "
          />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.035,
            mixBlendMode: "soft-light",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />

        {/* Cinematic light beam */}
        <motion.div
          className="pointer-events-none absolute top-0 h-full"
          style={{
            left: 0,
            width: "50%",
            background:
              "linear-gradient(to right, transparent, rgba(214,185,140,0.07) 50%, transparent)",
            skewX: -12,
          }}
          animate={{ x: ["-60vw", "160vw"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 7,
          }}
        />

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className="absolute select-none text-[var(--champagne)]"
              style={{
                top: s.top,
                left: s.left,
                right: s.right,
                fontSize: s.fontSize,
              }}
              animate={{ y: [-6, 6, -6], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s.delay,
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>

        {/* Bottom Fade */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-transparent
            to-black/20
          "
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Heading */}
          <Reveal>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.4em]
                text-[var(--champagne)]
              "
            >
              Thank You
            </p>

            <h2
              className="
                mt-6
                text-5xl
                leading-[1.15]
                text-white
                drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]
              "
            >
              See You
              <br />
              On Our Special Day
            </h2>

            <p
              className="
                mx-auto
                mt-8
                max-w-[330px]
                text-base
                leading-8
                text-white/75
              "
            >
              Thank you for being part of our journey and sharing this beautiful
              moment with us.
            </p>
          </Reveal>

          {/* Quote */}
          <Reveal delay={0.15}>
            <div
              className="
                mx-auto
                mt-20
                max-w-[320px]
              "
            >
              <div
                className="
                  mb-2
                  text-4xl
                  leading-none
                  text-[var(--champagne)]
                  opacity-30
                "
              >
                {"“"}
              </div>

              <p
                className="
                  text-lg
                  italic
                  leading-8
                  text-white/65
                  drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]
                "
              >
                And one of His signs is that He created for you from yourselves
                mates that you may find tranquility in them.
              </p>

              <p
                className="
                  mt-5
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-[var(--champagne)]
                "
              >
                QS. Ar-Rum : 21
              </p>
            </div>
          </Reveal>

          {/* Couple Names — premium stagger */}
          <motion.div
            variants={nameContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-24"
          >
            <motion.h3
              variants={nameItemVariants}
              className="
                text-6xl
                leading-none
                text-white
                drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
              "
            >
              Panji
            </motion.h3>

            <motion.div
              variants={nameItemVariants}
              aria-hidden="true"
              className="
                my-4
                text-2xl
                text-[var(--champagne)]
              "
            >
              &
            </motion.div>
            <span className="sr-only">and</span>

            <motion.h3
              variants={nameItemVariants}
              className="
                text-6xl
                leading-none
                text-white
                drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
              "
            >
              Anita
            </motion.h3>
          </motion.div>

          {/* Scroll Top */}
          <Reveal delay={0.35}>
            <div className="mt-20 flex justify-center">
              <button
                onClick={scrollToTop}
                title="Back to top"
                aria-label="Back to top"
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-full

                  border border-white/10

                  bg-white/10

                  text-white

                  backdrop-blur-xl

                  transition-all
                  duration-500

                  hover:scale-105

                  hover:border-[rgba(214,185,140,0.35)]

                  hover:bg-white/20

                  hover:shadow-[0_0_35px_rgba(214,185,140,0.16)]

                  active:scale-95
                "
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.5,
                  }}
                >
                  <ArrowUp size={18} />
                </motion.div>
              </button>
            </div>
          </Reveal>

          {/* Ornament + Bottom Text */}
          <Reveal delay={0.45}>
            <div className="mt-20">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-[rgba(214,185,140,0.35)]" />
                <span
                  className="
                    text-sm
                    text-[var(--champagne)]
                    opacity-40
                  "
                >
                  ❧
                </span>
                <div className="h-px w-10 bg-[rgba(214,185,140,0.35)]" />
              </div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Crafted with love · 2026
              </p>
            </div>
          </Reveal>
        </div>
    </footer>
  );
}
