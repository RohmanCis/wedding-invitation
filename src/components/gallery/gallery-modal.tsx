"use client";

import Image from "next/image";

import { X } from "lucide-react";

import { useInvitationStore } from "../../stores/invitation";

export function GalleryModal() {
  const { selectedGalleryImage, closeGallery } = useInvitationStore();

  if (!selectedGalleryImage) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/90

        p-6
        animate-[fadeIn_0.4s_ease-out]
      "
    >
      {/* Close */}
      <button
        onClick={closeGallery}
        title="Close Gallery"
        aria-label="Close Gallery"
        className="
          absolute
          right-6
          top-6

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          bg-white/10

          text-white

          backdrop-blur-xl

          transition-[
            transform,
            background-color,
            border-color
        ]
        duration-500

        hover:scale-105
        hover:bg-white/20
        hover:border-white/20

        active:scale-95

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/30
        "
      >
        <X size={20} />
      </button>

      {/* Image */}
      <div
        className="
            relative
            flex
            h-[80vh]
            w-full
            items-center
            justify-center

            overflow-hidden
            rounded-[32px]
        "
      >
        <Image
          src={selectedGalleryImage}
          alt="Gallery Preview"
          width={1200}
          height={1600}
          sizes="100vw"
          className="
                h-full
                w-full
                object-contain
            "
        />
      </div>
    </div>
  );
}
