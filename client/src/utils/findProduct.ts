import { getStorage } from "./localStorage/initializeStorage";
import type { Products, Outfits, ProductType } from "../types/productTypes";

export const findProduct = (id: string) => {
  const products = getStorage<Products>("products");
  const outfits = getStorage<Outfits>("outfits");
  const products_outfits: ProductType[] = [...products, ...outfits];

  const product = products_outfits.find((product) => product.id === id);
  if (!product) {
    console.log('can"t find product', product, id);
    throw new Error(`Product with id ${id} not found`);
  }

  return product;
};
