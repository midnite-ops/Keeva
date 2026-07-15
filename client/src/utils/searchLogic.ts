import type { Outfits, Products } from "../types/productTypes";
import type { Users } from "../types/userTypes";
import users from "../data/users";
import outfits from "../data/outfits";
import products from "../data/products";

// type Data = Outfits | Users | Products;

const data = [...outfits, ...products, ...users];

export const searchLogic = (
  filters: string,
  query: string,
  priceRange?: number,
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
        return item.category.toLowerCase().includes(query);
      }

      if (item.type === "outfits") {
        return item.name.toLowerCase().includes(query);
      }
    }

    return false;
  });
};
