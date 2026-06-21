"use client";

import { navigationItems } from "../../data/navigation";

import { useInvitationStore } from "../../stores/invitation";
import { getLenis } from "../../lib/lenis";

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
    <nav
      className="
    fixed
    left-1/2
    bottom-[max(1.5rem,env(safe-area-inset-bottom))]
    z-50

    flex
    items-center
    gap-2

    -translate-x-1/2

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

    transition-all
    duration-500
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

                bg-[rgba(
                  214,
                  185,
                  140,
                  0.18
                )]

                text-white

                shadow-[
                  0_0_30px_rgba(
                    214,
                    185,
                    140,
                    0.22
                  )
                ]
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
            <Icon
              size={18}
              className="
            transition-transform
            duration-500

            group-hover:scale-110
          "
            />
          </button>
        );
      })}
    </nav>
  );
}
