import { create } from "zustand";
import { BACKEND_API_URL } from "./config";
import { Track } from "./types";

interface TrackStore {
  tracks: Track[];
  fetchTracks: () => Promise<void>;
}

interface PlayerStore {
  playing: Track | null;
  setPlaying: (track: Track | null) => void;
  clearPlaying: () => void;
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

export const usePlayerStore = create<PlayerStore>((set, _get) => ({
  playing: null,
  setPlaying: (track) => set({ playing: track }),
  clearPlaying: () => set({ playing: null }),
}));
