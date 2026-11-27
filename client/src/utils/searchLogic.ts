import { getStorage } from "./localStorage/initializeStorage";
import type { Outfits, Products, ProductType } from "../types/productTypes";

import type { Users } from "../types/userTypes";

// type Data = Outfits | Users | Products;
type Data = ProductType | Users

const outfitData = getStorage<Outfits>('outfits')
const productsData = getStorage<Products>('products')
const usersData = getStorage<Users>('users')

const data: Data[] = [...outfitData, ...productsData, ...usersData];

export const searchLogic = (
  filters: string,
  query: string,
) => {
  return data.filter((item) => {
    if (filters === "Creators") {
      return (
        item.type === "user" &&
        item.role === "creator" &&
        item.username.toLowerCase().includes(query)
      );
    }

    if (filters === "Brands") {
      return (
        item.type === "user" &&
        item.role === "brand" &&
        item.username.toLowerCase().includes(query)
      );
    }

    if (filters === "All") {
      if (item.type === "product") {
        return item.name.toLowerCase().includes(query);
      }

      if (item.type === "outfits") {
        return item.name.toLowerCase().includes(query);
      }
    }

    return false;
  });
};

export const productSearchLogic = (name:string) => {
  const query = name.toLowerCase().trim()
  const data = productsData.filter((item) => {
    return item.name.toLowerCase().includes(query)
  })

  return data
}
