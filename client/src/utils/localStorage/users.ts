import type { Users } from "../../types/userTypes";
import { saveStorage, getStorage, initializeStorage } from "./initializeStorage";

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
            outfitName: "",
            outfitSizes: [],
            outfitStock: 0,
          },
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
        products: [
          {
            productName: "",
            productStock: 0,
            productImages: [],
            productSizes: [],
          },
        ],
      };
      break;

    default:
      throw new Error("Invalid user role");
  }

  initializeStorage()

  const users = getStorage<Users>("users");

  users.push(newUser);

  saveStorage("users", users);

  localStorage.setItem("currentUserId", newUser.id);

  return newUser;
};

/**
 * 
 * // Initialization
initializeUsers()

// CRUD
createUser()
updateUser()
deleteUser()
getUsers()
getUserById()

// Authentication
loginUser()
logoutUser()
getCurrentUser()
setCurrentUser()

// Current user
getCurrentUserId()
setCurrentUserId()

// Social
followUser()
unfollowUser()
 */