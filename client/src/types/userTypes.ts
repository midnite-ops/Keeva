export interface BaseUser {
  id: string;
  name: string;
  username: string;
  profilePic: string;
  dateOfBirth: string;
  location: string;
  coverPhoto: string[]
  type: 'user';
}

interface PublicProfile extends BaseUser{
  followers: number;
  likes: number;
}

export interface Creator extends PublicProfile {
  role: 'creator',
  outfits: [
    {
      outfitName: string,
      outfitStock: number,
      outfitImages: string[],
      outfitSizes: string[]
    }
  ]
}

export interface Brand extends PublicProfile {
  role: 'brand'
  products: [
    {
      productName: string,
      productStock: number,
      productImages: string[],
      productSizes: string[]
    }
  ]
}

export interface Customer extends BaseUser{
    role: 'customer'
}

export type Users = Creator | Brand | Customer