import type {  Users } from "../types/userTypes";
import { getStorage } from "./localStorage/initializeStorage";
getStorage

const users = getStorage<Users>('users')
console.log(users)

export const formatCount = (count: number) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1);
  } else {
    return count;
  }
};

export const findUser = (id:string) => {
  const foundUser = users.find((item) => {
    return item.id === id
  })

  return foundUser
}
