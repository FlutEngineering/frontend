import { useMemo } from "react";
import { create } from "zustand";
import { matchSorter } from "match-sorter";
import { Track } from "~/types";
import { absurd } from "~/utils";

export type SortingMode = "latest" | "oldest" | "alphabetically" | "best-match";

interface TrackSearchStore {
  tracks: Track[];
  sortedTracks: Track[];
  filter: (query: string) => void;
  sort: (mode: SortingMode) => void;
  reset: () => void;
}

const getSorter = (mode: SortingMode) => {
  if (mode === "best-match") return undefined;
  if (mode === "latest")
    return (a: Track, b: Track) => b.updatedAt - a.updatedAt;
  if (mode === "oldest")
    return (a: Track, b: Track) => a.updatedAt - b.updatedAt;
  if (mode === "alphabetically")
    return (a: Track, b: Track) => a.title.localeCompare(b.title);
  absurd(mode);
};

const fuzzySearch = (tracks: Track[], filterValue: string) => {
  const terms = filterValue.split(" ");
  return terms.reduceRight<Track[]>((results, term) => {
    if (term[0] === "#") {
      return matchSorter(results, term.slice(1), { keys: ["tags"] });
    } else {
      return matchSorter(results, term, {
        keys: [
          "title",
          { key: "tags", maxRanking: matchSorter.rankings.CONTAINS },
        ],
      });
    }
  }, tracks);
};

const useTrackSearch = (tracks: Track[]) => {
  const useTrackSearchStore = useMemo(
    () =>
      create<TrackSearchStore>((set, get) => ({
        tracks,
        sortedTracks: tracks,
        filter: (query) => {
          const tracks = get().tracks;

          if (!query) {
            set({ sortedTracks: tracks });
          } else {
            const filtered = fuzzySearch(tracks, query);
            set({ sortedTracks: filtered });
          }
        },
        sort: (mode) => {
          const sortedTracks = get().sortedTracks;
          if (mode !== "best-match") {
            const sorter = getSorter(mode);
            set({ sortedTracks: sortedTracks.sort(sorter) });
          }
        },
        reset: () => set({ sortedTracks: tracks }),
      })),
    [tracks]
  );

  const { sortedTracks, filter, sort, reset } = useTrackSearchStore();

  return { sortedTracks, filter, sort, reset };
};

export default useTrackSearch;
