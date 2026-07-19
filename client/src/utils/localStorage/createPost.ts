import { getStorage } from "./initializeStorage";
import type { ProductType } from "../../types/productTypes";


export const createPost = ({id, }: ProductType) => {
    const products = getStorage('products')

}