export type Category =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'accessories'
  | 'footwear'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface SizeStock {
  size: Size
  quantity: number
}

export interface ProductFormData {
  images: File[]
  name: string
  category: Category | ''
  description: string
  price: string
  sizeStock: SizeStock[]
}

export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
]
