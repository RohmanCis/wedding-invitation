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
type InvitationShellProps = {
  guestName: string;
};

export function InvitationShell({ guestName }: InvitationShellProps) {
  const isOpened = useInvitationStore((state) => state.isOpened);

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
