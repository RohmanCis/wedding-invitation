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
            Every love story is beautiful, but ours is our favorite.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div
            className="
              absolute
              left-5
              top-0
              h-full
              w-px
              bg-black/10
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
                  <div
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

                    shadow-[0_4px_20px_rgba(0,0,0,0.04)]
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
                  </div>

                  {/* Content Card */}
                  <div
                    className="
                    flex-1

                    rounded-[28px]

                    border border-black/5

                    bg-white/40

                    p-7

                    backdrop-blur-xl

                    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                  "
                  >
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
