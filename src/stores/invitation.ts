import { create }
  from "zustand";
import { supabase }
  from "../lib/supabase";


type Wish = {
  id: number;

  name: string;

  message: string;

  attendance: string;

  guest_count: number;

  created_at: string;
};

type InvitationState = {

  isOpened: boolean;
  isMusicPlaying: boolean;
  selectedGalleryIndex: number | null;
  activeSection: string;
  wishes: Wish[];
  fetchWishes: () => Promise<void>;
  openInvitation: () => void;
  toggleMusic: () => void;

  setMusicPlaying: (
    value: boolean
  ) => void;

  openGallery: (
    index: number
  ) => void;

  closeGallery: () => void;

  setActiveSection: (
    section: string
  ) => void;

};

export const useInvitationStore =
  create<InvitationState>(
    (set) => ({
      wishes: [],

      isOpened: false,

      isMusicPlaying: false,

      selectedGalleryIndex: null,

      activeSection: "home",

      openInvitation: () =>
        set({
          isOpened: true,
        }),

      toggleMusic: () =>
        set((state) => ({
          isMusicPlaying:
            !state.isMusicPlaying,
        })),

      setMusicPlaying: (
        value
      ) =>
        set({
          isMusicPlaying:
            value,
        }),

      openGallery: (index) =>
        set({
          selectedGalleryIndex: index,
        }),

      closeGallery: () =>
        set({
          selectedGalleryIndex: null,
        }),

      setActiveSection: (
        section
      ) =>
        set({
          activeSection:
            section,
        }),

      fetchWishes: async () => {

        const {
          data,
          error,
        } = await supabase

          .from("wishes")

          .select("*")

          .order(
            "created_at",
            {
              ascending: false,
            }
          )
          .limit(20);

        if (error) {

          console.error(error);

          return;

        }

        set({
          wishes: data,
        });

      },

    })
  );
