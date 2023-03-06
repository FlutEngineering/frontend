import { create } from "zustand";

interface UploadedAudioList {
  [key: string]: string;
}

interface AudioStore {
  files: File[];
  uploaded: UploadedAudioList;
  add: (files: File[]) => void;
  upload: (file: File) => Promise<void>;
  clear: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  files: [],
  uploaded: {},
  loading: {},
  add: (files: File[]) =>
    set({
      files: [...get().files, ...files],
    }),
  clear: () => set({ files: [], uploaded: {} }),
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("audio", file);
    const response = await fetch("/api/v1/audio", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();
    if (json.cid) {
      set({ uploaded: { ...get().uploaded, [file.name]: json.cid } });
    }
  },
}));

interface SongsStore {
  songs: any[];
  add: (cids: String[]) => void;
  clear: () => void;
  getSongs: () => void;
}
export const useSongsStore = create<SongsStore>((set, get) => ({
  songs: [],
  add: (songs: []) =>
    set({
      songs: [...get().songs, ...songs],
    }),
  clear: () => set({ songs: [] }),
  getSongs: async () => {
    const response = await fetch("/api/v1/songs", {
      method: "GET",
    });
    const json = await response.json();

    if (json.songs) {
      set({ songs: [...json.songs] });
    }
  },
}));
