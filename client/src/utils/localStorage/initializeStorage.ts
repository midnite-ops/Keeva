import outfits from "../../data/outfits";
import products from "../../data/products";
import users from "../../data/users";

export const initializeStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  if (!localStorage.getItem("outfits")) {
    localStorage.setItem("outfits", JSON.stringify(outfits));
  }
};

export const getStorage = <T>(key: string): T[] => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const saveStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCurrentUserId = () => {
  return localStorage.getItem("currentUserId");
};


