import { IPFS_GATEWAY_URL } from "./config";
import { Address } from "wagmi";

interface ArtistName {
  address: Address;
  ensName: string | null | undefined;
}
export const formatArtistName = (artist: ArtistName) =>
  artist.ensName ||
  `${artist.address.slice(0, 5)}...${artist.address.slice(-4)}`;

export const ipfsCidToUrl = (
  cid: string,
  opts = { gateway: IPFS_GATEWAY_URL }
) => `${opts.gateway}/${cid}`;

export const tagSearchURL = (tag: string) =>
  `/search?q=${encodeURIComponent(("#" + tag).replace(/^##/, "#"))}`;

export function absurd<A>(_: never): A {
  throw new Error("Called `absurd` function which should be uncallable");
}
