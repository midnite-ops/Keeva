import type { Users } from "../../types/userTypes";
import { getStorage } from "../localStorage/initializeStorage";

export const loginUser = (email: string, password: string) => {
  const users = getStorage<Users>("users");

  const existingUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!existingUser) {
    return null;
  }

  localStorage.setItem("currentUserId", existingUser.id);

  return existingUser;
};