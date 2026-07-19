interface BaseProducts {
  id: string
  name:string
  likes: number
  image: string[]
  price: number
  caption: string
  createdAt: string
  description: string
}

export interface Outfits extends BaseProducts {
  creatorId: string;
  taggedProducts: string[];
  type: 'outfits';
}

export interface Products extends BaseProducts {
  brandId: string;
  category: string;
  stock: number;
  type: 'product';
}

export type ProductType = Outfits | Products
