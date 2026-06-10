"use client";

import Image from "next/image";

import { Reveal } from "../animation/reveal";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function HeroSection() {
  const heroImages = [
    "/images/hero-1.jpeg",
    "/images/hero-2.jpeg",
    "/images/hero-3.jpeg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 6500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const weddingDate = new Date("2026-12-12T08:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = weddingDate - now;

      if (distance <= 0) {
        clearInterval(interval);

        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),

        hours: hours.toString().padStart(2, "0"),

        minutes: minutes.toString().padStart(2, "0"),

        seconds: seconds.toString().padStart(2, "0"),
      });
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
            key={heroImages[currentImage]}
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
              src={heroImages[currentImage]}
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

      <div
        className="
        absolute
        inset-0

        opacity-[0.05]

        mix-blend-soft-light

        bg-[url('/images/noise.png')]
      "
      />

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
        <Reveal>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.45em]
              text-white/65
            "
          >
            The Wedding Of
          </p>

          <h1
            className="
              mt-6
              text-7xl
              leading-none
            "
          >
            Panji
          </h1>

          <div
            className="
              my-5
              text-3xl
              text-[var(--champagne)]
            "
          >
            &
          </div>

          <h1
            className="
              text-7xl
              leading-none
            "
          >
            Anita
          </h1>

          <p
            className="
              mt-8
              text-sm
              uppercase
              tracking-[0.35em]
              text-white/70
            "
          >
            Sunday, 12 December 2026
          </p>
        </Reveal>

        {/* Countdown */}
        <Reveal delay={0.2}>
          <div
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
          </div>
        </Reveal>

        {/* Scroll Indicator */}
        <Reveal delay={0.4}>
          <div
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
