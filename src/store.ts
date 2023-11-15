import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { BACKEND_API_URL } from "./config";
import type { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import type { Address } from "wagmi";
import type { SiweMessage } from "siwe";
import type { Track, Tag, User, Playlist } from "./types";
import { toast } from "./services/toast";

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

interface PlaylistStore {
  fetchPlaylistTracks: (playlist: Playlist) => Promise<Track[]>;
  createPlaylist: (title: string, address: Address) => Promise<Playlist>;
  updatePlaylist: (
    playlist: Playlist,
    data: { title: string }
  ) => Promise<Playlist>;
  deletePlaylist: (playlist: Playlist) => Promise<void>;
  addTrackToPlaylist: (playlist: Playlist, trackId: string) => Promise<void>;
  removeTrackFromPlaylist: (
    playlist: Playlist,
    trackId: string
  ) => Promise<void>;
}

type PlaylistSelectCallback = (playlist: Playlist) => Promise<void>;
type PlaylistSelectFilter = (playlist: Playlist) => boolean;

interface PlaylistSelectModalStore {
  isOpen: boolean;
  onClose: () => void;
  callback?: PlaylistSelectCallback;
  filter?: PlaylistSelectFilter;
  selectPlaylist: (
    callback: PlaylistSelectCallback,
    filter?: PlaylistSelectFilter
  ) => void;
}

export const handleResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  } else if (res.status === 400) {
    const error = (await res.json()).error;
    toast({
      title: "Request error",
      description: error,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } else if (res.status === 401) {
    toast({
      title: "Unauthorized",
      description: "Please sign in",
      status: "error",
      isClosable: true,
    });
  } else {
    console.log(
      "👾",
      `[${res.url.replace(BACKEND_API_URL, "")}] Request error: ${
        res.statusText
      }`
    );
  }
};

export const useTrackStore = create<TrackStore>((set, get) => ({
  tracks: [],
  fetchTracks: () =>
    fetch(`${BACKEND_API_URL}/v1/tracks`)
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
      .then(handleResponse)
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
    const user = await fetch(`${BACKEND_API_URL}/v1/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => json.artist);

    set({ user });
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

export const usePlaylistStore = create<PlaylistStore>((_set) => ({
  fetchPlaylistTracks: async (playlist) =>
    fetch(`${BACKEND_API_URL}/v1/playlists/${playlist.userId}/${playlist.slug}`)
      .then(handleResponse)
      .then((json) => json.playlist?.tracks || [])
      .catch(() => console.log("👾", "Failed to load playlist data")),
  updatePlaylist: async (playlist, { title }) =>
    fetch(
      `${BACKEND_API_URL}/v1/playlists/${playlist.userId}/${playlist.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title }),
      }
    )
      .then(handleResponse)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data.playlist;
      }),
  deletePlaylist: async (playlist) =>
    fetch(
      `${BACKEND_API_URL}/v1/playlists/${playlist.userId}/${playlist.slug}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then(handleResponse)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
      }),
  createPlaylist: async (title, address) => {
    const playlist = await fetch(`${BACKEND_API_URL}/v1/playlists/${address}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title }),
    })
      .then(handleResponse)
      .then((json) => json.playlist)
      .catch(() => console.log("👾", "Failed to create playlist"));

    return playlist;
  },
  addTrackToPlaylist: (playlist, trackId) =>
    fetch(
      `${BACKEND_API_URL}/v1/playlists/${playlist.userId}/${playlist.slug}/tracks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ trackId }),
      }
    )
      .then(handleResponse)
      .catch(() => console.log("👾", "Failed to add track to playlist")),
  removeTrackFromPlaylist: (playlist, trackId) =>
    fetch(
      `${BACKEND_API_URL}/v1/playlists/${playlist.userId}/${playlist.slug}/tracks`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ trackId }),
      }
    )
      .then(handleResponse)
      .catch(() => console.log("👾", "Failed to remove track from playlist")),
}));

export const usePlaylistSelectModalStore = create<PlaylistSelectModalStore>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    callback: undefined,
    filter: undefined,
    selectPlaylist: (callback) => set({ isOpen: true, callback }),
  })
);
