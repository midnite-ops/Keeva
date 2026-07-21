import type {  Users } from "../types/userTypes";


export const formatCount = (count: number) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1);
  } else {
    return count;
  }
};

export const findUser = (id:string, user:Users[]) => {
  const foundUser = user.find((item) => {
    return item.id === id
  })

  return foundUser
}
