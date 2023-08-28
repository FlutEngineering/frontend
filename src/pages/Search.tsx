import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Grid, Input, Select, HStack } from "@chakra-ui/react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { matchSorter } from "match-sorter";
import { useTagStore, useTrackStore } from "~/store";
import { Track } from "~/types";
import { absurd } from "~/utils";

import AudioItem from "~/components/AudioItem";

type SortingMode = "latest" | "oldest" | "alphabetically" | "best-match";

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

function Search(): JSX.Element {
  // const { tags, fetchTags } = useTagStore();
  const { tracks, fetchTracks } = useTrackStore();
  const [searchInput, setSearchInput] = useState("");
  const [sortingMode, setSortingMode] = useState<SortingMode>("latest");
  const [itemLimit, setItemLimit] = useState(10);

  const loadMore = () => setItemLimit(itemLimit + 5);

  useEffect(() => {
    fetchTracks();
    // fetchTags(); // TODO: tags autocompletion
  }, []);

  const filteredTracks = useMemo(() => {
    setItemLimit(10);

    if (!searchInput) {
      setSortingMode("latest");
      return tracks;
    }

    setSortingMode("best-match");
    return fuzzySearch(tracks, searchInput);
  }, [searchInput, tracks]);

  const sortedTracks = useMemo(() => {
    if (filteredTracks.length && sortingMode !== "best-match") {
      const sorter = getSorter(sortingMode);
      return filteredTracks.sort(sorter);
    }
    return filteredTracks;
  }, [filteredTracks, sortingMode]);

  const handleListScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    const scrollTopMax = target.scrollHeight - target.offsetHeight;
    if (scrollTopMax - target.scrollTop < 40) {
      loadMore();
    }
  };

  return (
    <Grid
      gridTemplateRows="auto auto minmax(0, 1fr)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"searchbar" "track-list"`}
      width="100%"
    >
      <HStack gridArea="searchbar" marginBottom="4">
        <Input
          variant="filled"
          _focusVisible={{ borderColor: "purple.500" }}
          _placeholder={{ color: "white" }}
          placeholder="Search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Select
          flex="1 0 auto"
          width="max-content"
          variant="filled"
          icon={<RiArrowUpDownFill />}
          textAlign="center"
          value={sortingMode}
          onChange={(event) =>
            setSortingMode(event.target.value as SortingMode)
          }
        >
          <option value="best-match" hidden={!searchInput}>
            Best Match
          </option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetically">A-Z</option>
        </Select>
      </HStack>

      <Box
        gridArea="track-list"
        alignSelf="stretch"
        overflowY="auto"
        onScroll={handleListScroll}
      >
        <Stack spacing={2} paddingBottom="2">
          {sortedTracks.slice(0, itemLimit).map((track) => (
            <AudioItem
              track={track}
              key={track.id}
              onTagClick={(tag) =>
                setSearchInput(`#${tag}`.replace(/^##/, "#"))
              }
            />
          ))}
        </Stack>
      </Box>
    </Grid>
  );
}

export default Search;
