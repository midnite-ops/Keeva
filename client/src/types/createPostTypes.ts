export const CATEGORIES = [
  "Tops", "Bottoms", "Outerwear", "Dresses", "Knitwear",
  "Denim", "Accessories", "Footwear", "Loungewear", "Swimwear",
];

export const SIZES = [
  "XS", "S", "M", "L", "XL", "XXL",
  "28", "30", "32", "34", "36", "38", "ONE SIZE",
];

export const STEPS = ["Media", "Details", "Sizes & Stock", "Review"];

export interface ImageFile {
  id: string;
  url: string;
  file: File;
}

export interface SizeStock {
  size: string;
  stock: number;
}
