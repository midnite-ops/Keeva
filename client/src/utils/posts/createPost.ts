import { type ProductFormData } from "../../types/createPostTypes";
import type { Outfits, Products } from "../../types/productTypes";
import {type Users } from "../../types/userTypes";
import { getStorage, saveStorage } from "../localStorage/initializeStorage";
import { getCurrentUser } from "../user/getCurrentUser";
export const createPost = async (
  form: ProductFormData,
  role: "brand" | "creator" | "customer",
  userId: string,
) => {
  const products = getStorage<Products>("products");
  const outfits = getStorage<Outfits>("outfits");
  const users = getStorage<Users>('users')
  const currentUser = getCurrentUser()
  const imageUrl = form.images.map((file) => URL.createObjectURL(file));
  if (role === "brand") {
    const newProduct: Products = {
      id: crypto.randomUUID(),
      name: form.name,
      category: form.category ?? "",
      description: form.description,
      price: Number(form.price),
      images: imageUrl,
      brandId: userId,
      stock: form.sizeStock!,
      type: "product",
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    // Save product

    currentUser!.role === 'brand' ? currentUser?.products.push(newProduct) : null

    const pushProducts = users.map((user) => user.id === currentUser?.id ? currentUser : user)

    products.push(newProduct);
    saveStorage("users", pushProducts)
    saveStorage("products", products);
    return newProduct;
  }

  const newOutfit: Outfits = {
    id: crypto.randomUUID(),
    name: form.name,
    description: form.description,
    price: Number(form.price),
    images: imageUrl,
    creatorId: userId,
    taggedProducts: form.taggedProducts ?? [],
    likes: 0,
    createdAt: new Date().toISOString(),
    type: "outfits",
  }
  currentUser!.role === 'creator' ? currentUser?.outfits.push(newOutfit) : null

    const pushOutfits = users.map((user) => user.id === currentUser?.id ? currentUser : user)

  outfits.push(newOutfit);
  saveStorage("users", pushOutfits)
  saveStorage("outfits", outfits);
  // Save outfit
  return newOutfit;
};
