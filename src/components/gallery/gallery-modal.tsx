"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { weddingData }
  from "../../data/wedding";

import { useInvitationStore }
  from "../../stores/invitation";

const { gallery } = weddingData;

export function GalleryModal() {

  /*
  -----------------------------
  STORE
  -----------------------------
  */

  const selectedGalleryIndex =
    useInvitationStore(
      (state) =>
        state.selectedGalleryIndex
    );

  const openGallery =
    useInvitationStore(
      (state) =>
        state.openGallery
    );

  const closeGallery =
    useInvitationStore(
      (state) =>
        state.closeGallery
    );

  /*
  -----------------------------
  LOCAL STATE
  -----------------------------
  */

  const [isVisible, setIsVisible] =
    useState(false);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const modalRef =
    useRef<HTMLDivElement>(null);

  const isModalOpen =
    selectedGalleryIndex !== null;

  /*
  -----------------------------
  EFFECTS
  -----------------------------
  */

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        setIsVisible(true);

      }, 10);

    return () =>
      clearTimeout(timeout);

  }, []);

  // C-1: only lock scroll when a gallery image is actually open
  useEffect(() => {

    if (!isModalOpen) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {

      document.body.style.overflow =
        originalOverflow;

    };

  }, [isModalOpen]);

  // C-4: move focus into modal when it opens
  useEffect(() => {

    if (isModalOpen) {
      modalRef.current?.focus();
    }

  }, [isModalOpen]);

  // C-2: keyboard navigation (Escape / ArrowLeft / ArrowRight)
  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape") {

        setIsVisible(false);

        setTimeout(() => closeGallery(), 180);

      } else if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft"
      ) {

        if (isAnimating || selectedGalleryIndex === null) return;

        setIsAnimating(true);
        setIsVisible(false);

        setTimeout(() => {

          const delta = e.key === "ArrowRight" ? 1 : -1;

          const next =
            (selectedGalleryIndex + delta + gallery.length) %
            gallery.length;

          openGallery(next);
          setIsVisible(true);
          setIsAnimating(false);

        }, 180);

      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);

  }, [selectedGalleryIndex, isAnimating, closeGallery, openGallery]);

  /*
  -----------------------------
  GUARD
  -----------------------------
  */

  if (
    selectedGalleryIndex === null
  ) {
    return null;
  }

  const currentImage =
    gallery[selectedGalleryIndex];

  if (!currentImage) {
    return null;
  }

  /*
  -----------------------------
  NAVIGATION
  -----------------------------
  */

  const navigate = (delta: 1 | -1) => {

    if (isAnimating) return;

    setIsAnimating(true);

    setIsVisible(false);

    setTimeout(() => {

      const next =
        (selectedGalleryIndex + delta + gallery.length) %
        gallery.length;

      openGallery(next);

      setIsVisible(true);

      setIsAnimating(false);

    }, 180);

  };

  /*
  -----------------------------
  CLOSE
  -----------------------------
  */

  const handleClose = () => {

    setIsVisible(false);

    setTimeout(() => {

      closeGallery();

    }, 180);

  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo Gallery"
      tabIndex={-1}
      className={`
        fixed
        inset-0
        z-[999]

        flex
        items-center
        justify-center

        overflow-hidden

        bg-black/92

        p-5

        outline-none

        transition-opacity
        duration-300

        ${
          isVisible
            ? "opacity-100"
            : "opacity-0"
        }
      `}
    >

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="
          absolute
          inset-0
        "
      />

      {/* Close Button */}
      <button
        onClick={handleClose}
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

          backdrop-blur-lg

          transition-all
          duration-300

          hover:scale-105
          hover:bg-white/20

          active:scale-95
        "
      >
        <X size={20} />
      </button>

      {/* Prev Button */}
      <button
        onClick={() => navigate(-1)}
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

          backdrop-blur-lg

          transition-all
          duration-300

          hover:scale-105
          hover:bg-white/20

          active:scale-95
        "
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => navigate(1)}
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

          backdrop-blur-lg

          transition-all
          duration-300

          hover:scale-105
          hover:bg-white/20

          active:scale-95
        "
      >
        <ChevronRight size={22} />
      </button>

      {/* Image */}
      <div
        className={`
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

          transition-all
          duration-300

          ${
            isVisible
              ? `
                scale-100
                opacity-100
              `
              : `
                scale-[0.98]
                opacity-0
              `
          }
        `}
      >

        <Image
          key={selectedGalleryIndex}
          src={currentImage}
          alt={`Gallery ${
            selectedGalleryIndex + 1
          }`}
          fill
          quality={75}
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
          className="
            object-contain
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

          backdrop-blur-lg
        "
      >
        {selectedGalleryIndex + 1}
        {" / "}
        {gallery.length}
      </div>

    </div>
  );

}
