"use client";

import { motion } from "framer-motion";

import { navigationItems } from "../../data/navigation";

import { useInvitationStore } from "../../stores/invitation";
import { getLenis } from "../../lib/lenis";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function FloatingNavbar() {
  const activeSection = useInvitationStore((state) => state.activeSection);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(element, { offset: 0 });
    } else {
      element.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ x: "-50%" }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: EASE_PREMIUM,
      }}
      className="
        fixed
        left-1/2
        bottom-[max(1.5rem,env(safe-area-inset-bottom))]
        z-50

        flex
        items-center
        gap-2

        rounded-full

        border border-white/12

        bg-[rgba(18,18,18,0.42)]

        px-4
        py-3

        backdrop-blur-xl

        shadow-[
          0_12px_40px_rgba(
            0,
            0,
            0,
            0.32
          )
        ]
      "
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;

        const isActive = item.id === activeSection;

        return (
          <button
            key={item.id}
            title={item.id}
            aria-label={`Navigate to ${item.id} section`}
            onClick={() => scrollToSection(item.id)}
            className={`
              group

              relative

              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              transition-all
              duration-500

              active:scale-90

              ${
                isActive
                  ? `
                    scale-105
                    text-white
                  `
                  : `
                    text-white/65

                    hover:bg-white/10
                    hover:text-white

                    active:bg-white/15

                    hover:shadow-[
                      0_0_20px_rgba(
                        255,
                        255,
                        255,
                        0.08
                      )
                    ]
                  `
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="navbar-active-indicator"
                className="
                  absolute
                  inset-0

                  rounded-full

                  bg-[rgba(214,185,140,0.18)]

                  shadow-[0_0_30px_rgba(214,185,140,0.22)]
                "
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                }}
              />
            )}

            <Icon
              size={18}
              className="
                relative
                z-10

                transition-transform
                duration-500

                group-hover:scale-110
              "
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
