import { Address } from "wagmi";

export interface Track {
  audio: string;
  image: string;
  title: string;
  slug: string;
  artistAddress: Address;
  tags: string[];
  createdAt: string;
}

export interface Artist {
  address: Address;
  ensName: string | null | undefined;
  followedBy: Address[];
  following: Address[];
}

export interface Tag {
  name: string;
  trackCount: number;
}
