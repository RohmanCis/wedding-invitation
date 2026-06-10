"use client";

import { useForm } from "react-hook-form";
import { useInvitationStore } from "../../stores/invitation";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
const attendanceOptions = ["Will Attend", "Unable to Attend"] as const;

import { Check, ChevronDown } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { toast } from "sonner";

type RSVPFormData = {
  name: string;
  guestCount: number;
  message: string;
};

export function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchWishes = useInvitationStore((state) => state.fetchWishes);

  const { register, handleSubmit, reset } = useForm<RSVPFormData>({
    defaultValues: {
      guestCount: 1,
    },
  });

  const [attendance, setAttendance] = useState(attendanceOptions[0]);
  const onSubmit = async (data: RSVPFormData) => {
    try {
      setIsSubmitting(true);

      const { error } = await supabase

        .from("wishes")

        .insert([
          {
            name: data.name || "Anonymous",

            message: data.message || "Sending love and prayers.",

            attendance,

            guest_count: data.guestCount || 1,
          },
        ]);

      if (error) {
        console.error(error);

        toast.error("Failed to send RSVP");

        return;
      }

      await fetchWishes();

      toast.success("RSVP sent successfully");

      reset();

      setAttendance(attendanceOptions[0]);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
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
            Confirmation
          </p>

          <h2
            className="
              mt-5
              text-5xl
              leading-none
            "
          >
            RSVP
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
            Kindly confirm your attendance and share your warm wishes.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            rounded-[32px]

            border border-black/5

            bg-white/40

            p-8

            backdrop-blur-xl

            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
          "
        >
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-3">
              <label
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                "
              >
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                {...register("name", {
                  required: "Please Enter Your Name",
                })}
                className="
                  w-full

                  rounded-2xl

                  border border-black/10

                  bg-white/50

                  px-5
                  py-4

                  text-sm

                  outline-none

                  transition-[
                    border-color,
                    background-color,
                    box-shadow
                  ]
                  duration-500

                  focus:border-[rgba(214,185,140,0.35)]

                  focus:bg-white/70

                  focus:shadow-[
                    0_0_30px_rgba(214,185,140,0.10)
                  ]
                "
              />
            </div>

            {/* Attendance */}
            <div className="space-y-3">
              <div className="space-y-3">
                <label
                  className="
      text-xs
      uppercase
      tracking-[0.25em]
      text-black/40
    "
                >
                  Attendance
                </label>

                <Listbox value={attendance} onChange={setAttendance}>
                  <div className="relative">
                    <ListboxButton
                      className="
          relative
          w-full

          rounded-2xl

          border border-black/10

          bg-white/50

          px-5
          py-4

          text-left
          text-sm

          outline-none

          backdrop-blur-xl

          transition-[
            border-color,
            background-color,
            box-shadow,
            transform
          ]
          duration-500

          hover:bg-white/70

          hover:border-[rgba(214,185,140,0.35)]

          hover:shadow-[
            0_0_30px_rgba(214,185,140,0.10)
          ]

          focus:border-[rgba(214,185,140,0.35)]

          focus:bg-white/70

          focus:shadow-[
            0_0_30px_rgba(214,185,140,0.10)
          ]
        "
                    >
                      <span className="text-black/70">{attendance}</span>

                      <span
                        className="
            pointer-events-none
            absolute
            inset-y-0
            right-4

            flex
            items-center
          "
                      >
                        <ChevronDown size={18} className="text-black/40" />
                      </span>
                    </ListboxButton>

                    <ListboxOptions
                      anchor="bottom"
                      className="
          z-50
          mt-3

          w-[var(--button-width)]

          overflow-hidden

          rounded-2xl

          border border-black/5

          bg-[rgba(255,255,255,0.88)]

          p-2

          backdrop-blur-2xl

          shadow-[
            0_20px_60px_rgba(0,0,0,0.08)
          ]

          transition
          duration-300
        "
                    >
                      {attendanceOptions.map((option) => (
                        <ListboxOption
                          key={option}
                          value={option}
                          className="
              group
              cursor-pointer

              rounded-xl

              px-4
              py-3

              text-sm
              text-black/70

              transition-[
                background-color,
                transform,
                color
              ]
              duration-300

              hover:bg-[rgba(214,185,140,0.12)]

              hover:text-black

              data-[focus]:bg-[
                rgba(214,185,140,0.12)
              ]
            "
                        >
                          <div
                            className="
                flex
                items-center
                justify-between
              "
                          >
                            <span>{option}</span>

                            {attendance === option && (
                              <Check
                                size={16}
                                className="
                    text-[var(--champagne)]
                  "
                              />
                            )}
                          </div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-3">
              <label
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                "
              >
                Guest Count
              </label>

              <input
                type="number"
                {...register("guestCount", {
                  valueAsNumber: true,
                  min: 1,
                })}
                className="
                  w-full

                  rounded-2xl

                  border border-black/10

                  bg-white/50

                  px-5
                  py-4

                  text-sm

                  outline-none

                  transition-[
                    border-color,
                    background-color,
                    box-shadow
                  ]
                  duration-500

                  focus:border-[rgba(214,185,140,0.35)]

                  focus:bg-white/70

                  focus:shadow-[
                    0_0_30px_rgba(214,185,140,0.10)
                  ]
                "
              />
            </div>

            {/* Wishes */}
            <div className="space-y-3">
              <label
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                "
              >
                Wishes
              </label>

              <textarea
                rows={5}
                placeholder="Write your wishes..."
                {...register("message", {
                  maxLength: {
                    value: 300,
                    message: "Message cannot exceed 300 characters",
                  },
                })}
                className="
                  w-full

                  resize-none

                  rounded-2xl

                  border border-black/10

                  bg-white/50

                  px-5
                  py-4

                  text-sm
                  leading-7

                  outline-none

                  transition-[
                    border-color,
                    background-color,
                    box-shadow
                  ]
                  duration-500

                  focus:border-[rgba(214,185,140,0.35)]

                  focus:bg-white/70

                  focus:shadow-[
                    0_0_30px_rgba(214,185,140,0.10)
                  ]
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full

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
                hover:shadow-[
                  0_0_30px_rgba(214,185,140,0.14)
                ]

                active:scale-[0.985]

                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:scale-100
              "
            >
              {isSubmitting ? "Sending..." : "Send RSVP"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
