import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Grid, Input, Select, HStack } from "@chakra-ui/react";
import { RiArrowUpDownFill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroller";
import { usePlayerStore, useTrackStore } from "~/store";

import AudioItem, { AudioItemLoader } from "~/components/AudioItem";
import useTrackSearch, { SortingMode } from "~/hooks/useTrackSearch";
import { tagSearchURL } from "~/utils";

function Search(): JSX.Element {
  // const { tags, fetchTags } = useTagStore();
  const navigate = useNavigate();
  const { tracks, fetchTracks } = useTrackStore();
  const { playTrack } = usePlayerStore();
  const [sortingMode, setSortingMode] = useState<SortingMode>("latest");
  const listRef = useRef<HTMLDivElement>(null);
  const defaultItemLimit = useMemo(
    () => (listRef.current?.offsetHeight || 80) / 88,
    [listRef.current]
  );
  const [itemLimit, setItemLimit] = useState(defaultItemLimit);
  const [searchParams, setSearchParams] = useSearchParams();
  const { sortedTracks, filter, sort, reset } = useTrackSearch(tracks);

  const searchInput = searchParams.get("q") || "";
  const setSearchInput = (value: string) =>
    setSearchParams(value ? { q: value } : undefined);

  const loadMore = (n: number) => {
    setItemLimit(itemLimit + n);
  };

  useEffect(() => reset, [reset]);

  useEffect(() => {
    fetchTracks();
    // fetchTags(); // TODO: tags autocompletion
  }, [fetchTracks]);

  useEffect(() => {
    filter(searchInput);
    if (searchInput) {
      setSortingMode("best-match");
    }
  }, [searchInput, filter, setSortingMode]);

  useEffect(() => {
    if (sortingMode !== "best-match") {
      sort(sortingMode);
    }
  }, [sortingMode, sort]);

  useEffect(() => {
    if (!searchInput || sortingMode === "best-match") {
      filter(searchInput);
    } else {
      sort(sortingMode);
    }
  }, [searchInput, sortingMode, filter, sort]);

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;
    const mode = value ? "best-match" : "latest";
    listRef.current?.scrollTo({ top: 0 });
    setItemLimit(defaultItemLimit);

    setSortingMode(mode);
    setSearchInput(value);
  };

  const handleSortingModeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const mode = event.target.value as SortingMode;
    setItemLimit(defaultItemLimit);
    setSortingMode(mode);
  };

  const tracksToRender = sortedTracks.slice(0, itemLimit);

  return (
    <Grid
      gridTemplateRows="auto minmax(0, 100%)"
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
          onChange={handleSearchInputChange}
          tabIndex={1}
        />
        <Select
          flex="1 0 auto"
          width="max-content"
          variant="filled"
          icon={<RiArrowUpDownFill />}
          textAlign="center"
          value={sortingMode}
          onChange={handleSortingModeChange}
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
        ref={listRef}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={() => loadMore(20)}
          hasMore={tracksToRender.length < sortedTracks.length}
          loader={<AudioItemLoader key="loader" marginBottom={2} />}
          useWindow={false}
        >
          {tracksToRender.map((track, index) => (
            <AudioItem
              track={track}
              key={track.id}
              onPlayClick={() => playTrack(track, sortedTracks, index)}
              onTagClick={(tag) => navigate(tagSearchURL(tag))}
              marginBottom={2}
            />
          ))}
        </InfiniteScroll>
      </Box>
    </Grid>
  );
}

export default Search;
