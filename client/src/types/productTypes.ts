import type { SizeStock } from "./createPostTypes"

interface BaseProducts {
  id: string
  name:string
  likes: number
  images: string[]
  price: number
  createdAt: string
  description: string
}

export interface Outfits extends BaseProducts {
  creatorId: string;
  taggedProducts: Products[];
  type: 'outfits';
}

export interface Products extends BaseProducts {
  brandId: string;
  category: string;
  stock: SizeStock[];
  type: 'product';
}

export type ProductType = Outfits | Products
