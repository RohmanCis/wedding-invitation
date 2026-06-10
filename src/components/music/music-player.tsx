"use client";

import { useEffect, useRef } from "react";

import { Pause, Play } from "lucide-react";

import { useInvitationStore }
  from "../../stores/invitation";

export function MusicPlayer() {

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const {
    isMusicPlaying,
    toggleMusic,
  } = useInvitationStore();

const setMusicPlaying =
  useInvitationStore(
    (state) => state.setMusicPlaying
  );
useEffect(() => {

  const audio = audioRef.current;

  if (!audio) return;

  const handleAudio = async () => {

    try {

      if (isMusicPlaying) {

        await audio.play();

      } else {

        audio.pause();

      }

    } catch (error) {

      console.error(
        "Audio playback failed:",
        error
      );

    }

  };

  handleAudio();

}, [isMusicPlaying]);

useEffect(() => {

  setMusicPlaying(true);

}, [setMusicPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        autoPlay={false}
      >
        <source
          src="/music/song.mp3"
          type="audio/mpeg"
        />
      </audio>

      <button
        onClick={toggleMusic}
        className="
          fixed
          bottom-24
          right-5
          z-50

          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-full

          border border-white/20

          bg-white/10

          text-white

          backdrop-blur-xl

          shadow-[0_8px_30px_rgba(0,0,0,0.12)]

          transition-[transform,background-color,border-color]
          duration-500

          hover:scale-105
          hover:bg-white/20
          hover:border-[rgba(214,185,140,0.4)]

          active:scale-95
        "
      >
        {isMusicPlaying ? (
          <Pause size={18} />
        ) : (
          <Play size={18} />
        )}
      </button>
    </>
  );
}