import { getStorage } from "./initializeStorage";
import type { Users } from "../../types/userTypes";

export const getCurrentUser = () => {
  const users = getStorage<Users>("users");
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUser = users.find((user) => user.id === currentUserId!);

  return currentUser;
};
