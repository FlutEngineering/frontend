import { Address } from "wagmi";

export interface Track {
  audio: string;
  image: string;
  title: string;
  slug: string;
  artistAddress: Address;
  tags: string[];
  createdAt: string;
  id: string;
  playCount: number;
}

export interface User {
  address: Address;
  followedBy: Address[];
  following: Address[];
  likes: Track[];
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
