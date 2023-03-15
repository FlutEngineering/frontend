import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { BACKEND_API_URL } from "./config";
import { Track } from "./types";

interface TrackStore {
  tracks: Track[];
  fetchTracks: () => Promise<void>;
}

interface PlayerStore {
  track: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
}

export const useTrackStore = create<TrackStore>((set, _get) => ({
  tracks: [],
  fetchTracks: async () =>
    fetch(`${BACKEND_API_URL}/v1/tracks`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Tracks fetch error:", data.error);
        } else if (data.tracks) {
          return data.tracks;
        }

        return [];
      })
      .then((tracks) => set({ tracks })),
}));

export const usePlayerStore = create<PlayerStore>()(
  subscribeWithSelector((set, get) => ({
    track: null,
    isPlaying: false,
    playTrack: (track) => set({ track, isPlaying: true }),
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlay: () => set({ isPlaying: !get().isPlaying }),
  }))
);
