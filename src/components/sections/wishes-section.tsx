"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import { useInvitationStore } from "../../stores/invitation";
import { Reveal } from "../animation/reveal";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

function WishAvatar({ name }: { name: string }) {
  const [hasError, setHasError] = useState(false);
  const src = `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div
      className="
        relative
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border border-[rgba(214,185,140,0.32)]
        bg-gradient-to-br
        from-[rgba(214,185,140,0.30)]
        to-[rgba(214,185,140,0.10)]
        shadow-[0_4px_16px_rgba(214,185,140,0.18)]
        transition-transform
        duration-300
        [@media(hover:hover)]:hover:scale-[1.05]
      "
    >
      {hasError ? (
        <User
          size={22}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[var(--champagne)] opacity-50"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export function WishesSection() {
  const wishes = useInvitationStore((state) => state.wishes);
  const fetchWishes = useInvitationStore((state) => state.fetchWishes);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishes().finally(() => setIsLoading(false));
  }, [fetchWishes]);

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
      <Reveal>
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
      </Reveal>

      {/* Feed */}
      {isLoading && (
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                h-28
                animate-pulse
                rounded-[28px]
                border border-[rgba(0,0,0,0.06)]
                bg-white/55
                backdrop-blur-xl
              "
            />
          ))}
        </div>
      )}

      {!isLoading && wishes.length === 0 && (
        <p
          className="
            py-12
            text-center
            text-base
            text-black/50
          "
        >
          Couldn&apos;t load messages — try refreshing.
        </p>
      )}

      {!isLoading && wishes.length > 0 && (
      <div className="space-y-5">
        <AnimatePresence>
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.6,
              delay: index * 0.07,
              ease: EASE_PREMIUM,
            }}
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
              <WishAvatar name={wish.name} />

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
                    {formatDistanceToNow(
                      new Date(wish.created_at),
                      { addSuffix: true },
                    )}
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
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      )}
    </section>
  );
}
