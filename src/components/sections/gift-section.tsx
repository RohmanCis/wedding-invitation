"use client";

import { useState } from "react";

import Image from "next/image";

import {
  Copy,
  Check,
} from "lucide-react";

import { weddingData }
  from "../../data/wedding";

export function GiftSection() {

  const { gift } = weddingData;

  const [copiedAccount, setCopiedAccount] =
    useState("");

  const handleCopy = async (
    accountNumber: string
  ) => {

    await navigator.clipboard.writeText(
      accountNumber
    );

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
        <div className="mb-16 text-center">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-[var(--mocha)]
            "
          >
            Wedding Gift
          </p>

          <h2
            className="
              mt-5
              text-5xl
              leading-none
            "
          >
            Digital Envelope
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-[320px]
              text-base
              leading-8
              text-black/60
            "
          >
            Your presence is the greatest
            gift. However, if you wish to
            send a token of love, you may
            do so below.
          </p>

        </div>

        {/* Main Card */}
        <div
          className="
            rounded-[32px]

            border border-[rgba(0,0,0,0.06)]

            bg-white/55

            p-8

            backdrop-blur-xl

            shadow-[
              0_12px_40px_rgba(0,0,0,0.05)
            ]
          "
        >

          {/* QRIS */}
          <div className="flex justify-center">

            <div
              className="
                overflow-hidden
                rounded-[28px]

                border border-black/5

                bg-white

                p-4

                shadow-[
                  0_10px_30px_rgba(0,0,0,0.04)
                ]
              "
            >

              <Image
                src="/images/qris.png"
                alt="QRIS"
                width={220}
                height={220}
                className="
                  h-auto
                  w-auto
                  object-contain
                "
              />

            </div>

          </div>

          {/* Payment Methods */}
          <div className="mt-10 space-y-6">

            {gift.map((item) => (

              <div
                key={item.accountNumber}
                className="
                  rounded-[28px]

                  border border-black/5

                  bg-white/45

                  p-6

                  backdrop-blur-xl

                  transition-[
                    transform,
                    border-color,
                    background-color,
                    box-shadow
                  ]
                  duration-500

                  hover:translate-y-[-2px]

                  hover:border-[
                    rgba(214,185,140,0.20)
                  ]

                  hover:bg-white/65

                  hover:shadow-[
                    0_12px_40px_rgba(0,0,0,0.06)
                  ]
                "
              >

                {/* Logo */}
                <div className="flex justify-center">

                  <Image
                    src={item.logo}
                    alt={item.type}
                    width={90}
                    height={36}
                    className="
                      h-auto
                      object-contain
                    "
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
                  onClick={() =>
                    handleCopy(
                      item.accountNumber
                    )
                  }

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

                    shadow-[
                      0_0_0_rgba(
                        214,
                        185,
                        140,
                        0
                      )
                    ]

                    transition-[
                      transform,
                      background-color,
                      border-color,
                      box-shadow
                    ]
                    duration-500

                    hover:scale-[1.015]

                    hover:border-[
                      rgba(214,185,140,0.35)
                    ]

                    hover:bg-white/75

                    hover:shadow-[
                      0_0_35px_rgba(
                        214,
                        185,
                        140,
                        0.16
                      )
                    ]

                    active:scale-[0.985]
                  "
                >

                  {copiedAccount ===
                  item.accountNumber ? (
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

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}