"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { weddingData } from "../../data/wedding";

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
  { top: "10%", left: "8%", fontSize: 8, duration: 8.5, delay: 0 },
  { top: "22%", right: "7%", fontSize: 6, duration: 11, delay: 2.5 },
  { top: "62%", left: "5%", fontSize: 7, duration: 9.5, delay: 4 },
];

const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
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
      duration: 1.0,
      ease: EASE_PREMIUM,
    },
  },
};

export function GiftSection() {
  const { gift } = weddingData;

  const [copiedAccount, setCopiedAccount] = useState("");

  const handleCopy = async (accountNumber: string) => {
    await navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => {
      setCopiedAccount("");
    }, 2000);
  };

  return (
    <section
      className="
        section-padding
        relative
        overflow-hidden
      "
    >
        {/* Ambient Glow + Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
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
              animate={{ y: [-6, 6, -6], opacity: [0.25, 0.55, 0.25] }}
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

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            variants={headingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-16 text-center"
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
              Wedding Gift
            </motion.p>

            <motion.h2
              variants={headingItemVariants}
              className="
                mt-5
                text-5xl
                leading-none
              "
            >
              Digital Envelope
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
              Your presence is the greatest gift. However, if you wish to send
              a token of love, you may do so below.
            </motion.p>

            <motion.p
              variants={headingItemVariants}
              className="
                mx-auto
                mt-4
                max-w-[280px]
                text-sm
                italic
                leading-7
                text-black/40
              "
            >
              Your prayers and presence mean the world to us.
            </motion.p>
          </motion.div>

          {/* Main Card */}
          <div
            className="
              rounded-[32px]
              border border-[rgba(0,0,0,0.06)]
              bg-white/55
              p-8
              backdrop-blur-xl
              shadow-[0_12px_40px_rgba(0,0,0,0.05)]
            "
          >
            {/* QRIS */}
            <div className="relative flex justify-center">
              {/* Ambient glow — QRIS only */}
              <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(214,185,140,0.12)] blur-3xl pointer-events-none" />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-black/5
                  bg-white
                  p-4
                  shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                "
              >
                <Image
                  src="/images/qris.png"
                  alt="QRIS"
                  width={220}
                  height={220}
                  className="h-auto w-auto object-contain"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-10 space-y-6">
              {gift.map((item, index) => (
                <motion.div
                  key={item.accountNumber}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.3, ease: EASE_PREMIUM },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: EASE_PREMIUM,
                  }}
                  className="
                    relative
                    overflow-hidden

                    rounded-[28px]

                    border border-[rgba(214,185,140,0.15)]

                    bg-white/45

                    p-6

                    backdrop-blur-xl

                    transition-[border-color,background-color,box-shadow]
                    duration-500

                    hover:border-[rgba(214,185,140,0.20)]

                    hover:bg-white/65

                    hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]
                  "
                >
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                  {/* Logo */}
                  <div className="flex justify-center">
                    <Image
                      src={item.logo}
                      alt={item.type}
                      width={90}
                      height={36}
                      className="h-auto object-contain"
                    />
                  </div>

                  {/* Account Number */}
                  <div className="mt-6 text-center">
                    <h3
                      className="
                        text-[1.9rem]
                        tracking-[0.03em]
                      "
                    >
                      {item.accountNumber}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        text-black/60
                      "
                    >
                      {item.accountName}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(item.accountNumber)}
                    title={`Copy ${item.type} account`}
                    aria-label={`Copy ${item.type} account`}
                    className="
                      mt-6

                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3

                      rounded-full

                      border border-black/10

                      bg-white/40

                      px-5
                      py-3

                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.18em]

                      text-[var(--soft-black)]

                      backdrop-blur-xl

                      shadow-[0_0_0_rgba(214,185,140,0)]

                      transition-[transform,background-color,border-color,box-shadow]
                      duration-500

                      hover:scale-[1.015]

                      hover:border-[rgba(214,185,140,0.35)]

                      hover:bg-white/75

                      hover:shadow-[0_0_35px_rgba(214,185,140,0.16)]

                      active:scale-[0.985]
                    "
                  >
                    {copiedAccount === item.accountNumber ? (
                      <>
                        <Check size={14} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy Account
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
