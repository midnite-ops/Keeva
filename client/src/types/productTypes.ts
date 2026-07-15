export interface Outfits {
  id: string;
  creatorId: string;
  image: string[];
  caption: string;
  taggedProducts: string[];
  likes: number;
  time: string;
  name: string;
  type: 'outfits';
  price: number;
  createdAt: string;
}

export interface Products {
  id: string;
  brandId: string;
  caption: string;
  description: string;
  category: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
  likes: number;
  createdAt: string;
  type: 'product';
}
