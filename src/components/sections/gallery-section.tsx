"use client";

import Image from "next/image";

import { weddingData } from "../../data/wedding";

import { useInvitationStore } from "../../stores/invitation";

import { Reveal } from "../animation/reveal";

export function GallerySection() {
  const { gallery } = weddingData;

  const openGallery = useInvitationStore((state) => state.openGallery);

  return (
    <section
      id="gallery"
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
            bg-[rgba(214,185,140,0.08)]
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10">
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
              Our Moments
            </p>

            <h2
              className="
                mt-5
                text-5xl
                leading-none
              "
            >
              Gallery
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
              Capturing beautiful memories filled with love, laughter, and
              togetherness.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >
          {gallery.map((image, index) => (
            <Reveal key={image} delay={index * 0.06}>
              {/* Grid Item Wrapper */}
              <div
                className={`
                  ${
                    index % 3 === 0
                      ? `
                        col-span-2
                        h-[320px]
                      `
                      : `
                        h-[220px]
                      `
                  }
                `}
              >
                <button
                  onClick={() => openGallery(index)}
                  title={`Open gallery image ${index + 1}`}
                  aria-label={`Open gallery image ${index + 1}`}
                  className="
                    group
                    relative

                    h-full
                    w-full

                    overflow-hidden
                    rounded-[28px]

                    transition-transform
                    duration-500

                    hover:scale-[1.01]

                    active:scale-[0.985]
                  "
                >
                  {/* Image */}
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="
                      object-cover

                      transition-transform
                      duration-700

                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-black/35
                      via-black/5
                      to-transparent

                      opacity-70

                      transition-opacity
                      duration-500

                      group-hover:opacity-100
                    "
                  />

                  {/* Soft Glow */}
                  <div
                    className="
                      absolute
                      inset-0

                      opacity-0

                      transition-opacity
                      duration-700

                      group-hover:opacity-100

                      shadow-[
                        inset_0_0_80px_rgba(
                          255,
                          255,
                          255,
                          0.06
                        )
                      ]
                    "
                  />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
