import type { Outfits, Products } from "./productTypes";

export interface BaseUser {
  id: string;
  name: string;
  username: string;
  profilePic: string;
  dateOfBirth: string;
  location: string;
  coverPhoto: string[]
  type: 'user';
  password?: string
  email?: string
  bio:string | undefined
}

interface PublicProfile extends BaseUser{
  followers: number;
  likes: number;
}

export interface Creator extends PublicProfile {
  role: 'creator',
  outfits: Outfits[]
}

export interface Brand extends PublicProfile {
  role: 'brand'
  products: Products[]
}

export interface Customer extends BaseUser{
    role: 'customer'
    following: number
}

export type Users = Creator | Brand | Customer