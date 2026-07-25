import type {  Users } from "../../types/userTypes";
import { getStorage } from "../localStorage/initializeStorage";
getStorage

const users = getStorage<Users>('users')

export const findUser = (id:string) => {
  const foundUser = users.find((item) => {
    return item.id === id
  })
  return foundUser
}