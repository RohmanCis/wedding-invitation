import { CalendarDays, Clock3, MapPin } from "lucide-react";

import { weddingData } from "../../data/wedding";
import { Reveal } from "../animation/reveal";

export function EventSection() {
  const { events } = weddingData;

  return (
    <section
      id="event"
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
            bottom-0
            left-1/2
            h-[320px]
            w-[320px]
            -translate-x-1/2
            rounded-full
            bg-[rgba(214,185,140,0.12)]
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
              Wedding Event
            </p>

            <h2
              className="
              mt-5
              text-5xl
              leading-none
            "
            >
              Save The Date
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
              With joyful hearts, we invite you to celebrate this special moment
              together.
            </p>
          </div>
        </Reveal>

        {/* Event Cards */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.12}>
              <div
                className="
                  rounded-[32px]
                  border border-black/5
                bg-white/40
                p-8
                backdrop-blur-xl

                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              "
              >
                <div className="space-y-8">
                  <div className="text-center">
                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-[0.35em]
                      text-[var(--mocha)]
                    "
                    >
                      Wedding Event
                    </p>

                    <h3
                      className="
                      mt-4
                      text-4xl
                    "
                    >
                      {event.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Date */}
                    <div className="flex items-start gap-4">
                      <div
                        className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[rgba(214,185,140,0.15)]
                      "
                      >
                        <CalendarDays size={18} />
                      </div>

                      <div>
                        <p
                          className="
                          text-xs
                          uppercase
                          tracking-[0.25em]
                          text-black/40
                        "
                        >
                          Date
                        </p>

                        <p
                          className="
                          mt-2
                          text-base
                          leading-7
                          text-black/70
                        "
                        >
                          {event.date}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-4">
                      <div
                        className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[rgba(214,185,140,0.15)]
                      "
                      >
                        <Clock3 size={18} />
                      </div>

                      <div>
                        <p
                          className="
                          text-xs
                          uppercase
                          tracking-[0.25em]
                          text-black/40
                        "
                        >
                          Time
                        </p>

                        <p
                          className="
                          mt-2
                          text-base
                          leading-7
                          text-black/70
                        "
                        >
                          {event.time}
                        </p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-4">
                      <div
                        className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[rgba(214,185,140,0.15)]
                      "
                      >
                        <MapPin size={18} />
                      </div>

                      <div>
                        <p
                          className="
                          text-xs
                          uppercase
                          tracking-[0.25em]
                          text-black/40
                        "
                        >
                          Venue
                        </p>

                        <p
                          className="
                          mt-2
                          text-base
                          leading-7
                          text-black/70
                        "
                        >
                          {event.venue}
                        </p>

                        <p
                          className="
                          mt-2
                          text-sm
                          leading-7
                          text-black/50
                        "
                        >
                          {event.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                  flex
                    items-center
                    justify-center
                    w-full
                    text-center
                    leading-none
                    rounded-full

                    border border-black/10

                    bg-white/40

                    px-6
                    py-4

                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.25em]

                    text-[var(--soft-black)]

                    backdrop-blur-xl

                    shadow-[0_0_0_rgba(214,185,140,0)]

                    transition-[
                    transform,
                    background-color,
                    border-color,
                    box-shadow
                    ]
                    duration-500

                    hover:scale-[1.015]
                    hover:border-[rgba(214,185,140,0.35)]
                    hover:bg-white/70
                    hover:shadow-[0_0_30px_rgba(214,185,140,0.14)]

                    active:scale-[0.985]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[rgba(214,185,140,0.35)]
                "
                  >
                    View Location
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
