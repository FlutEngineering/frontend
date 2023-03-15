import { IPFS_GATEWAY_URL } from "./config";
import { Artist } from "./types";

export const formatArtistName = (artist: Artist) =>
  artist.ens || `${artist.address.slice(0, 5)}...${artist.address.slice(-4)}`;

export const ipfsCidToUrl = (cid: string) => `${IPFS_GATEWAY_URL}/${cid}`;
