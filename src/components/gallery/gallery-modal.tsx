"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { weddingData } from "../../data/wedding";
import { useInvitationStore } from "../../stores/invitation";

const { gallery } = weddingData;

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as [number, number, number, number];

const imageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_PREMIUM },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -dir * 60,
    transition: { duration: 0.2, ease: EASE_PREMIUM },
  }),
};

export function GalleryModal() {
  const selectedGalleryIndex = useInvitationStore(
    (state) => state.selectedGalleryIndex,
  );
  const openGallery = useInvitationStore((state) => state.openGallery);
  const closeGallery = useInvitationStore((state) => state.closeGallery);

  const [direction, setDirection] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const isModalOpen = selectedGalleryIndex !== null;
  const currentImage =
    selectedGalleryIndex !== null ? gallery[selectedGalleryIndex] : undefined;

  useEffect(() => {
    if (!isModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGallery();
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (selectedGalleryIndex === null) return;
        const delta = e.key === "ArrowRight" ? 1 : -1;
        setDirection(delta);
        const next =
          (selectedGalleryIndex + delta + gallery.length) % gallery.length;
        openGallery(next);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryIndex, closeGallery, openGallery]);

  const navigate = (delta: 1 | -1) => {
    if (selectedGalleryIndex === null) return;
    setDirection(delta);
    const next =
      (selectedGalleryIndex + delta + gallery.length) % gallery.length;
    openGallery(next);
  };

  return (
    <AnimatePresence>
      {isModalOpen && selectedGalleryIndex !== null && currentImage && (
        <motion.div
          ref={modalRef}
          key="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Photo Gallery"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed inset-0 z-[999]
            flex items-center justify-center
            overflow-hidden
            bg-black/92
            p-5
            outline-none
          "
        >
          {/* Backdrop click */}
          <div onClick={closeGallery} className="absolute inset-0" />

          {/* Close Button */}
          <button
            onClick={closeGallery}
            title="Close Gallery"
            aria-label="Close Gallery"
            className="
              absolute right-5 top-5 z-20
              flex h-12 w-12 items-center justify-center
              rounded-full
              border border-white/10
              bg-white/10
              text-white
              backdrop-blur-lg
              transition-all duration-300
              hover:scale-105 hover:bg-white/20
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
              absolute left-4 z-20
              flex h-12 w-12 items-center justify-center
              rounded-full
              border border-white/10
              bg-white/10
              text-white
              backdrop-blur-lg
              transition-all duration-300
              hover:scale-105 hover:bg-white/20
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
              absolute right-4 z-20
              flex h-12 w-12 items-center justify-center
              rounded-full
              border border-white/10
              bg-white/10
              text-white
              backdrop-blur-lg
              transition-all duration-300
              hover:scale-105 hover:bg-white/20
              active:scale-95
            "
          >
            <ChevronRight size={22} />
          </button>

          {/* Image Container — drag="x" enables swipe navigation on touch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) navigate(1);
              else if (info.offset.x > 50) navigate(-1);
            }}
            className="
              relative z-10
              h-[82vh] w-full max-w-5xl
              overflow-hidden
              rounded-[32px]
              cursor-grab active:cursor-grabbing
            "
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selectedGalleryIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={currentImage}
                  alt={`Gallery ${selectedGalleryIndex + 1}`}
                  fill
                  quality={75}
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Counter */}
          <div
            className="
              absolute bottom-6 left-1/2 z-20
              -translate-x-1/2
              rounded-full
              border border-white/10
              bg-white/10
              px-5 py-2
              text-sm tracking-[0.2em]
              text-white/80
              backdrop-blur-lg
            "
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={selectedGalleryIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {selectedGalleryIndex + 1}
              </motion.span>
            </AnimatePresence>
            {" / "}
            {gallery.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
