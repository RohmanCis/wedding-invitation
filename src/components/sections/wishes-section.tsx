"use client";

import { useEffect, useState } from "react";
import { useInvitationStore } from "../../stores/invitation";

export function WishesSection() {
  const wishes = useInvitationStore((state) => state.wishes);

  const fetchWishes = useInvitationStore((state) => state.fetchWishes);
  useEffect(() => {
    fetchWishes();
  }, []);

  return (
    <section
      id="wishes"
      className="
        section-padding
        relative
        overflow-hidden
      "
    >
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
          Warm Wishes
        </p>

        <h2
          className="
            mt-5
            text-5xl
            leading-none
          "
        >
          Messages
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-[320px]

            text-base
            leading-8

            text-black/68
            font-[425]
          "
        >
          Beautiful words and heartfelt prayers from beloved family and friends.
        </p>
      </div>

      {/* Feed */}
      <div className="space-y-5">
        {wishes.map((wish) => {
          const initials = wish.name

            .split(" ")

            .map((word) => word[0])

            .join("")

            .slice(0, 2);

          return (
            <div
              key={wish.id}
              className="
                rounded-[28px]

                border border-[
                  rgba(0,0,0,0.06)
                ]

                bg-white/55

                p-6

                backdrop-blur-xl

                shadow-[
                  0_12px_40px_rgba(
                    0,
                    0,
                    0,
                    0.05
                  )
                ]

                transition-[
                  transform,
                  border-color,
                  background-color
                ]

                duration-500

                hover:translate-y-[-2px]

                hover:border-[
                  rgba(214,185,140,0.25)
                ]

                hover:bg-white/60
              "
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border border-[
                      rgba(
                        214,
                        185,
                        140,
                        0.18
                      )
                    ]

                    bg-[
                      rgba(
                        214,
                        185,
                        140,
                        0.22
                      )
                    ]

                    text-sm
                    font-medium
                    uppercase

                    text-[
                      var(--soft-black)
                    ]
                  "
                >
                  {initials}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <div>
                      <h3
                        className="
                          text-[1.1rem]
                          font-medium
                        "
                      >
                        {wish.name}
                      </h3>

                      <p
                        className="
                          mt-1

                          text-xs
                          uppercase

                          tracking-[0.16em]

                          text-black/50
                        "
                      >
                        {wish.attendance}

                        {wish.guest_count > 1 &&
                          ` · ${wish.guest_count} Guests`}
                      </p>
                    </div>

                    <p
                      className="
                        text-xs
                        text-black/30
                      "
                    >
                      Just now
                    </p>
                  </div>

                  <p
                    className="
                      mt-4

                      text-sm
                      leading-7

                      text-black/60
                    "
                  >
                    {wish.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
