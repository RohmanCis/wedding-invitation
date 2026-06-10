"use client";

import { navigationItems } from "../../data/navigation";

import { useInvitationStore } from "../../stores/invitation";

export function FloatingNavbar() {
  const activeSection = useInvitationStore((state) => state.activeSection);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className="
        fixed
        bottom-6
        left-1/2
        z-50

        flex
        -translate-x-1/2
        items-center
        gap-2

        rounded-full

        border border-white/10

        bg-[rgba(20,20,20,0.25)]

        px-4
        py-3

        backdrop-blur-2xl

        shadow-[
          0_10px_40px_rgba(
            0,
            0,
            0,
            0.28
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
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              transition-all
              duration-500

              ${
                isActive
                  ? `
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
                        0.20
                      )
                    ]
                  `
                  : `
                    text-white/65

                    hover:bg-white/10

                    hover:text-white

                    hover:shadow-[
                      0_0_25px_rgba(
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
            <Icon size={18} />
          </button>
        );
      })}
    </nav>
  );
}
