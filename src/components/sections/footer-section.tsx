"use client";

import Image from "next/image";

import { ArrowUp } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";

import { Reveal } from "../animation/reveal";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      <div
        className="
          absolute
          inset-0
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={footerImages[currentImage]}
            initial={{
              opacity: 0,
              scale: 1,
            }}
            animate={{
              opacity: 1,
              scale: 1.06,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0
              opacity-80
            "
          >
            <Image
              src={footerImages[currentImage]}
              alt="Footer Memory"
              fill
              sizes="100vw"
              className="
                object-cover

                scale-[1.02]

                blur-[1px]
              "
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Dark Overlay */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-black/75
          via-black/60
          to-black/80
        "
      />

      {/* Ambient Glow */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
      >
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
      <div
        className="
          relative
          z-10
          text-center
        "
      >
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

              drop-shadow-[
                0_4px_24px_rgba(
                  0,
                  0,
                  0,
                  0.45
                )
              ]
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
            <p
              className="
                text-lg
                italic
                leading-9

                text-white/70

                drop-shadow-[
                  0_2px_12px_rgba(
                    0,
                    0,
                    0,
                    0.35
                  )
                ]
              "
            >
              “And one of His signs is that He created for you from yourselves
              mates that you may find tranquility in them.”
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

        {/* Couple Names */}
        <Reveal delay={0.25}>
          <div className="mt-24">
            <h3
              className="
                text-6xl
                leading-none

                text-white

                drop-shadow-[
                  0_4px_20px_rgba(
                    0,
                    0,
                    0,
                    0.35
                  )
                ]
              "
            >
              Panji
            </h3>

            <div
              className="
                my-4

                text-2xl

                text-[var(--champagne)]
              "
            >
              &
            </div>

            <h3
              className="
                text-6xl
                leading-none

                text-white

                drop-shadow-[
                  0_4px_20px_rgba(
                    0,
                    0,
                    0,
                    0.35
                  )
                ]
              "
            >
              Anita
            </h3>
          </div>
        </Reveal>

        {/* Scroll Top */}
        <Reveal delay={0.35}>
          <div
            className="
              mt-20
              flex
              justify-center
            "
          >
            <button
              onClick={scrollToTop}
              title="Back to top"
              aria-label="Back to top"
              className="
                group

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

                hover:border-[
                  rgba(214,185,140,0.35)
                ]

                hover:bg-white/20

                hover:shadow-[
                  0_0_35px_rgba(
                    214,
                    185,
                    140,
                    0.16
                  )
                ]

                active:scale-95
              "
            >
              <ArrowUp
                size={18}
                className="
                  transition-transform
                  duration-500

                  group-hover:-translate-y-1
                "
              />
            </button>
          </div>
        </Reveal>

        {/* Bottom Text */}
        <Reveal delay={0.45}>
          <p
            className="
              mt-20

              text-xs
              uppercase
              tracking-[0.25em]

              text-white/40
            "
          >
            Crafted with love · 2026
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
