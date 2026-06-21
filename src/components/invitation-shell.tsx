"use client";

import { OpeningScreen } from "./sections/opening-screen";
import { useInvitationStore } from "../stores/invitation";
import { MusicPlayer } from "./music/music-player";
import { FloatingNavbar } from "./navigation/floating-navbar";
import { CoupleSection } from "./sections/couple-section";
import { EventSection } from "./sections/event-section";
import { StorySection } from "./sections/story-section";
import { GallerySection } from "./sections/gallery-section";
import { GalleryModal } from "./gallery/gallery-modal";
import { RSVPSection } from "./sections/rsvp-section";
import { WishesSection } from "./sections/wishes-section";
import { GiftSection } from "./sections/gift-section";
import { HeroSection } from "./sections/hero-section";
import { FooterSection } from "./sections/footer-section";
import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "../lib/lenis";

type InvitationShellProps = {
  guestName: string;
};

export function InvitationShell({ guestName }: InvitationShellProps) {
  const isOpened = useInvitationStore((state) => state.isOpened);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    setLenis(lenis);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  
  return (
    <>
      {!isOpened && <OpeningScreen guestName={guestName} />}

      <main
        className={`
          transition-all
          duration-1000
          ${
            isOpened
              ? "opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-10"
          }
        `}
      >
        <HeroSection />
      </main>

      {isOpened && <MusicPlayer />}
      {isOpened && <FloatingNavbar />}
      {isOpened && <CoupleSection />}
      {isOpened && <StorySection />}
      {isOpened && <EventSection />}
      {isOpened && <GallerySection />}
      {isOpened && <RSVPSection />}
      {isOpened && <WishesSection />}
      {isOpened && <GiftSection />}
      {isOpened && <FooterSection />}
      {isOpened && <GalleryModal />}
    </>
  );
}
