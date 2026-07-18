import outfits from "../data/outfits";
import products from "../data/products";
import users from "../data/users";

import type {
  Brand,
  Creator,
  Customer,
  Users,
} from "../types/userTypes";

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

type CreateUserProps = {
  email: string;
  name: string;
  password: string;
  role: "customer" | "creator" | "brand";
};

export const createUser = ({
  email,
  name,
  password,
  role,
}: CreateUserProps) => {
  let newUser: Users;

  switch (role) {
    case "customer":
      newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
        username: "",
        profilePic: "",
        coverPhoto: [],
        dateOfBirth: "",
        location: "",
        type: "user",
        role: "customer",
      };
      break;

    case "creator":
      newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
        username: "",
        profilePic: "",
        coverPhoto: [],
        dateOfBirth: "",
        location: "",
        type: "user",
        role: "creator",
        followers: 0,
        likes: 0,
        outfits: [
            {
                outfitImages: [],
                outfitName:  '',
                outfitSizes: [],
                outfitStock: 0
            }
        ],
      };
      break;

    case "brand":
      newUser = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
        username: "",
        profilePic: "",
        coverPhoto: [],
        dateOfBirth: "",
        location: "",
        type: "user",
        role: "brand",
        followers: 0,
        likes: 0,
        products: [{
            productName: '',
            productStock: 0,
            productImages: [],
            productSizes: []

        }],
      };
      break;

    default:
      throw new Error("Invalid user role");
  }

  const users = getStorage<Users>("users");

  users.push(newUser);

  saveStorage("users", users);

  localStorage.setItem("currentUserId", newUser.id);

  return newUser;
};