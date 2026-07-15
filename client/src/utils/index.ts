import type { Outfits, Products } from "../types/productTypes";
import type {  Users } from "../types/userTypes";

type Outfits_Products = Outfits | Products

export const formatCount = (count: number) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1);
  } else {
    return count;
  }
};

export const searchResult = (
  outfits: Outfits[],
  products: Products[],
  users: Users[]
) => {
  const result = [...outfits, ...products, ...users];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const findUser = (id:string, user:Users[]) => {
  const foundUser = user.filter((item) => {
    return item.id === id
  })

  return foundUser
}
