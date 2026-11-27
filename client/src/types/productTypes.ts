import type { SizeStock } from "./createPostTypes"

interface BaseProducts {
  id: string
  name:string
  likes: number
  images: string[]
  createdAt: string
  description: string
}

export interface Outfits extends BaseProducts {
  creatorId: string;
  taggedProducts: Products[];
  totalPrice: number
  type: 'outfits';
}

export interface Products extends BaseProducts {
  brandId: string;
  category: string;
  stock: SizeStock[];
  type: 'product';
  price: number
}

export type ProductType = Outfits | Products
