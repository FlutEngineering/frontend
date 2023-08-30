import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { BACKEND_API_URL } from "./config";
import type { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import type { Address } from "wagmi";
import type { SiweMessage } from "siwe";
import type { Track, Tag, User } from "./types";

interface TrackStore {
  tracks: Track[];
  fetchTracks: () => Promise<void>;
  fetchTracksByAddress: (address: string) => Promise<void>;
  fetchTracksByTag: (tagID: string) => Promise<void>;
  refetchTrack: (address: string, slug: string) => Promise<void>;
  like: (id: string) => Promise<void>;
  unlike: (id: string) => Promise<void>;
  updateTrack: (
    track: Track,
    data: { title?: string; tags?: string[] }
  ) => Promise<Track>;
  deleteTrack: (track: Track) => Promise<void>;
}

interface TagStore {
  tags: Tag[];
  fetchTags: () => Promise<void>;
}

interface PlayerStore {
  track: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  togglePlay: () => void;
}

interface AuthVerificationArgs {
  message: SiweMessage;
  signature: string;
}

interface AuthStore {
  address?: Address;
  user?: User;
  status: AuthenticationStatus;
  fetchStatus: () => Promise<void>;
  fetchUser: () => Promise<void>;
  getNonce: () => Promise<string>;
  verify: ({ message, signature }: AuthVerificationArgs) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const useTrackStore = create<TrackStore>((set, get) => ({
  tracks: [],
  fetchTracks: () =>
    fetch(`${BACKEND_API_URL}/v1/tracks`)
      .then((response) => response.json())
      .then((data) => {
        set({ tracks: [] }); // clear before updating

        if (data.error) {
          console.log("Tracks fetch error:", data.error);
        } else if (data.tracks) {
          return data.tracks;
        }
        return [];
      })
      .then((tracks) => set({ tracks })),
  fetchTracksByAddress: (address) =>
    fetch(
      `${BACKEND_API_URL}/v1/tracks/?` +
        new URLSearchParams({ artist: address })
    )
      .then((response) => response.json())
      .then((data) => {
        set({ tracks: [] }); // clear before updating

        if (data.error) {
          console.log("Tracks fetch error:", data.error);
        } else if (data.tracks) {
          return data.tracks;
        }
        return [];
      })
      .then((tracks) => set({ tracks })),
  fetchTracksByTag: (tag) =>
    fetch(`${BACKEND_API_URL}/v1/tracks/?` + new URLSearchParams({ tag }))
      .then((response) => response.json())
      .then((data) => {
        set({ tracks: [] }); // clear before updating

        if (data.error) {
          console.log("Tracks fetch error:", data.error);
        } else if (data.tracks) {
          return data.tracks;
        }
        return [];
      })
      .then((tracks) => set({ tracks })),
  refetchTrack: (address, slug) =>
    fetch(`${BACKEND_API_URL}/v1/tracks/${address}/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Track fetch error:", data.error);
        } else if (data.track) {
          set({
            tracks: [
              ...get().tracks.filter(({ id }) => id !== data.track.id),
              data.track,
            ],
          });
        }
      }),
  like: (id) =>
    fetch(`${BACKEND_API_URL}/v1/me/like/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Track like error:", data.error);
        }
      }),
  unlike: (id) =>
    fetch(`${BACKEND_API_URL}/v1/me/unlike/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Track unlike error:", data.error);
        }
      }),
  updateTrack: (track, { title, tags }) =>
    fetch(`${BACKEND_API_URL}/v1/tracks/${track.artistAddress}/${track.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: title || track.title, tags }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data.track;
      }),
  deleteTrack: (track) =>
    fetch(`${BACKEND_API_URL}/v1/tracks/${track.artistAddress}/${track.slug}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          set({ tracks: get().tracks.filter((t: Track) => t.id !== track.id) });
        }
      }),
}));

export const useTagStore = create<TagStore>((set, _get) => ({
  tags: [],
  fetchTags: () =>
    fetch(`${BACKEND_API_URL}/v1/tags`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("Tags fetch error:", data.error);
        } else if (data.tags) {
          return data.tags;
        }

        return [];
      })
      .then((tags) => set({ tags })),
}));

export const usePlayerStore = create<PlayerStore>()(
  subscribeWithSelector((set, get) => ({
    track: null,
    isPlaying: false,
    playTrack: (track) => set({ track, isPlaying: true }),
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    stop: () => set({ track: undefined, isPlaying: false }),
    togglePlay: () => set({ isPlaying: !get().isPlaying }),
  }))
);

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  address: undefined,
  status: "unauthenticated",
  fetchStatus: async () => {
    const res = await fetch(`${BACKEND_API_URL}/v1/auth/status`, {
      credentials: "include",
    });
    if (res.ok) {
      const json = await res.json();
      set({ address: json.address, status: "authenticated" });
    } else {
      set({ address: undefined, status: "unauthenticated" });
    }
  },
  fetchUser: async () => {
    const res = await fetch(`${BACKEND_API_URL}/v1/me`, {
      credentials: "include",
    });
    const json = await res.json();

    set({ user: json.artist });
  },
  getNonce: async () => {
    const response = await fetch(`${BACKEND_API_URL}/v1/auth/nonce`, {
      credentials: "include",
    });
    return await response.text();
  },
  verify: async ({ message, signature }) => {
    const res = await fetch(`${BACKEND_API_URL}/v1/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ message, signature }),
    });

    const status = res.ok;

    if (status) {
      const json = await res.json();
      set({ address: json.address, status: "authenticated" });
    } else {
      console.log("Auth error");
      set({ address: undefined, status: "unauthenticated" });
    }
    return status;
  },
  signOut: async () => {
    await fetch(`${BACKEND_API_URL}/v1/auth/logout`, {
      credentials: "include",
    });
    set({ address: undefined, status: "unauthenticated" });
  },
}));
