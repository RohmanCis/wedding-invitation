"use client";

import Image from "next/image";

import { useEffect } from "react";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { weddingData } from "../../data/wedding";

import { useInvitationStore } from "../../stores/invitation";

const { gallery } = weddingData;

export function GalleryModal() {
  const { selectedGalleryIndex, openGallery, closeGallery } =
    useInvitationStore();

  /*
  -----------------------------
  GUARD
  -----------------------------
  */

  if (selectedGalleryIndex === null) {
    return null;
  }

  const currentImage = gallery[selectedGalleryIndex];

  if (!currentImage) {
    return null;
  }

  /*
  -----------------------------
  NAVIGATION
  -----------------------------
  */

  const nextImage = () => {
    const nextIndex =
      selectedGalleryIndex === gallery.length - 1
        ? 0
        : selectedGalleryIndex + 1;

    openGallery(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      selectedGalleryIndex === 0
        ? gallery.length - 1
        : selectedGalleryIndex - 1;

    openGallery(prevIndex);
  };

  /*
  -----------------------------
  BODY SCROLL LOCK
  -----------------------------
  */

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /*
  -----------------------------
  ESC KEY SUPPORT
  -----------------------------
  */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeGallery, nextImage, prevImage]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        overflow-hidden

        bg-black/92

        p-5

        animate-[fadeIn_0.35s_ease-out]
      "
    >
      {/* Backdrop */}
      <div
        onClick={closeGallery}
        className="
          absolute
          inset-0
        "
      />

      {/* Close Button */}
      <button
        onClick={closeGallery}
        title="Close Gallery"
        aria-label="Close Gallery"
        className="
          absolute
          right-5
          top-5
          z-20

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          border border-white/10

          bg-white/10

          text-white

          backdrop-blur-xl

          transition-all
          duration-500

          hover:scale-105
          hover:bg-white/20
          hover:border-white/20

          active:scale-95
        "
      >
        <X size={20} />
      </button>

      {/* Prev Button */}
      <button
        onClick={prevImage}
        title="Previous Image"
        aria-label="Previous Image"
        className="
          absolute
          left-4
          z-20

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          border border-white/10

          bg-white/10

          text-white

          backdrop-blur-xl

          transition-all
          duration-500

          hover:scale-105
          hover:bg-white/20

          active:scale-95
        "
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextImage}
        title="Next Image"
        aria-label="Next Image"
        className="
          absolute
          right-4
          z-20

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          border border-white/10

          bg-white/10

          text-white

          backdrop-blur-xl

          transition-all
          duration-500

          hover:scale-105
          hover:bg-white/20

          active:scale-95
        "
      >
        <ChevronRight size={22} />
      </button>

      {/* Image Wrapper */}
      <div
        className="
          relative
          z-10

          flex

          h-[82vh]
          w-full
          max-w-5xl

          items-center
          justify-center

          overflow-hidden

          rounded-[32px]
        "
      >
        <Image
          src={currentImage}
          alt={`Gallery ${selectedGalleryIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="
            object-contain

            animate-[
              fadeIn_0.45s_ease-out
            ]
          "
        />
      </div>

      {/* Counter */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-20

          -translate-x-1/2

          rounded-full

          border border-white/10

          bg-white/10

          px-5
          py-2

          text-sm
          tracking-[0.2em]

          text-white/80

          backdrop-blur-xl
        "
      >
        {selectedGalleryIndex + 1}
        {" / "}
        {gallery.length}
      </div>
    </div>
  );
}
