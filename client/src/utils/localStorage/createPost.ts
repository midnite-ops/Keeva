import { type ProductFormData } from "../../types/createPostTypes";
import type { Outfits, Products } from "../../types/productTypes";
import { getStorage, saveStorage } from "./initializeStorage";
export const createPost = async (
  form: ProductFormData,
  role: "brand" | "creator" | 'customer',
  userId: string
) => {
    const products = getStorage<Products>('products')
    const outfits = getStorage<Outfits>('outfits')
    const imageUrl = form.images.map((file) => URL.createObjectURL(file))
  if (role === "brand") {
    const newProduct: Products = {
      id: crypto.randomUUID(),
      name: form.name,
      category: form.category ?? '',
      description: form.description,
      price: Number(form.price),
      images: imageUrl,
      brandId: userId,
      stock: form.sizeStock!,
      type: 'product',
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    // Save product
    products.push(newProduct)
    saveStorage('products', products)
    return newProduct;
  }

  const newOutfit:Outfits = {
    id: crypto.randomUUID(),
    name: form.name,
    description: form.description,
    price: Number(form.price),
    images: imageUrl,
    creatorId: userId,
    taggedProducts: form.taggedProducts ?? [],
    likes: 0,
    createdAt: new Date().toISOString(),
    type:'outfits'
  };
    outfits.push(newOutfit)
    saveStorage('outfits', outfits)
  // Save outfit
  return newOutfit;
};