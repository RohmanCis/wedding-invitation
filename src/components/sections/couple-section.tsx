import Image from "next/image";

import { weddingData } from "../../data/wedding";
import { Reveal } from "../animation/reveal";

export function CoupleSection() {
  const { bride, groom } = weddingData;

  return (
    <section
      id="couple"
      className="
        section-padding
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-40
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            top-0
            left-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            rounded-full
            bg-[rgba(214,185,140,0.12)]
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10">
        <Reveal>
          <div className="mb-20 text-center">
            <p
              className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-[var(--mocha)]
            "
            >
              The Bride & Groom
            </p>

            <h2
              className="
              mt-5
              text-5xl
              leading-none
            "
            >
              Two Souls
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
              Together with their families, joyfully invite you to celebrate
              their wedding day.
            </p>
          </div>
        </Reveal>

        <div className="space-y-20">
          {/* Groom */}
          <Reveal delay={0.1}>
          <div className="flex flex-col items-center text-center">
            <div
              className="
                relative
                h-[420px]
                w-full
                overflow-hidden
                rounded-[32px]
              "
            >
              <Image
                src={groom.image}
                alt={groom.nickname}
                fill
                sizes="100vw"
                className="
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/50
                  via-black/10
                  to-transparent
                "
              />
            </div>

            <div className="mt-8 space-y-3">
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-[var(--mocha)]
                "
              >
                The Groom
              </p>

              <h3 className="text-5xl">{groom.nickname}</h3>

              <p
                className="
                  text-base
                  text-black/60
                "
              >
                {groom.fullname}
              </p>

              <p
                className="
                  max-w-[280px]
                  text-sm
                  leading-7
                  text-black/50
                "
              >
                Son of {groom.father}
                <br />& {groom.mother}
              </p>
            </div>
          </div>
          </Reveal>

          {/* Bride */}
          <Reveal delay={0.22}>
          <div className="flex flex-col items-center text-center">
            <div
              className="
                relative
                h-[420px]
                w-full
                overflow-hidden
                rounded-[32px]
              "
            >
              <Image
                src={bride.image}
                alt={bride.nickname}
                fill
                sizes="100vw"
                className="
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/50
                  via-black/10
                  to-transparent
                "
              />
            </div>

            <div className="mt-8 space-y-3">
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-[var(--mocha)]
                "
              >
                The Bride
              </p>

              <h3 className="text-5xl">{bride.nickname}</h3>

              <p
                className="
                  text-base
                  text-black/60
                "
              >
                {bride.fullname}
              </p>

              <p
                className="
                  max-w-[280px]
                  text-sm
                  leading-7
                  text-black/50
                "
              >
                Daughter of {bride.father}
                <br />& {bride.mother}
              </p>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
