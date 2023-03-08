import { Artist } from "./types";

export const formatArtistName = (artist: Artist) =>
  artist.ens || `${artist.address.slice(0, 5)}...${artist.address.slice(-4)}`;
