"use client";

import { motion } from "framer-motion";
import { weddingData } from "../../data/wedding";
import { Reveal } from "../animation/reveal";

export function StorySection() {
  const { story } = weddingData;

  return (
    <section
      id="story"
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
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            top-1/2
            left-1/2
            h-[320px]
            w-[320px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[rgba(214,185,140,0.10)]
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="mb-20 text-center">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-[var(--mocha)]
            "
          >
            Our Journey
          </p>

          <h2
            className="
              mt-5
              text-5xl
              leading-none
            "
          >
            Love Story
          </h2>

          {/* Decorative accent */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[rgba(214,185,140,0.5)]" />
            <span className="text-[10px] text-[var(--champagne)]">✦</span>
            <div className="h-px w-8 bg-[rgba(214,185,140,0.5)]" />
          </div>

          <p
            className="
              mx-auto
              mt-4
              max-w-[320px]
              text-base
              leading-8
              text-black/60
            "
          >
            Every love story is beautiful, but ours is our favorite.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line — draws top to bottom as section enters view */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="
              absolute
              left-5
              top-0
              h-full
              w-px
              bg-[rgba(214,185,140,0.22)]
            "
          />

          <div className="space-y-14">
            {story.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.14}>
                <div
                  key={item.title}
                  className="
                  relative
                  flex
                  gap-6
                "
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                      delay: index * 0.14,
                    }}
                    className="
                    relative
                    z-10

                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border border-[rgba(214,185,140,0.25)]

                    bg-[var(--ivory)]

                    shadow-[0_4px_20px_rgba(0,0,0,0.04),0_0_14px_rgba(214,185,140,0.35)]
                  "
                  >
                    <div
                      className="
                      h-3
                      w-3
                      rounded-full
                      bg-[var(--champagne)]
                    "
                    />
                  </motion.div>

                  {/* Content Card */}
                  <div
                    className="
                    relative
                    flex-1
                    overflow-hidden

                    rounded-[28px]

                    border border-[rgba(214,185,140,0.18)]

                    bg-white/40

                    p-7

                    backdrop-blur-xl

                    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                  "
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-[var(--mocha)]
                    "
                    >
                      {item.date}
                    </p>

                    <h3
                      className="
                      mt-4
                      text-3xl
                    "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                      mt-5
                      text-base
                      leading-8
                      text-black/60
                    "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
