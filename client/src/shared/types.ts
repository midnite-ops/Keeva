export type Page = "cart" | "checkout" | "confirmation";

export interface ProductItem {
  kind: "product";
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  selectedSize: string;
  sizes: { label: string; available: number }[];
  color: string;
  quantity: number;
  sku: string;
}

export interface OutfitItem {
  kind: "outfit";
  id: string;
  name: string;
  creator: string;
  creatorAvatar: string;
  image: string;
  totalPrice: number;
  products: { name: string; brand: string; price: number; size: string }[];
}

export type CartItem = ProductItem | OutfitItem;

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  deliveryMethod: "standard" | "express" | "overnight";
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  saveInfo: boolean;
}