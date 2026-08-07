import { createContext, useContext, useState } from "react";
import type { ProductType } from "../types/productTypes";

type Cart =
  | {
      type: "product";
      id: string;
      selections: { size: string; quantity: number }[];
    }
  | {
      type: "outfits";
      id: string;
      taggedProductIds: {
        productId: string;
        selections: { size: string; quantity: number }[];
      }[];
    };

type CartContextType = {
  userId: string;
  productId: string;
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  updateSize: (productId: string, oldSize: string, newSize: string) => void;
  cart: Cart[];
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const userId = "";
  const productId = "";

  const [cart, setCart] = useState<Cart[]>(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });
  console.log(cart);

  const addToCart = (product: ProductType) => {
    setCart((prev) => {
      let newCart: Cart[];
      if (product.type === "product") {
        newCart = [
          ...prev,
          {
            type: "product",
            id: product.id,
            selections: [{ size: "M", quantity: 1 }],
          },
        ];
      } else {
        newCart = [
          ...prev,
          {
            type: "outfits",
            id: product.id,
            taggedProductIds: [
              {
                productId: product.id,
                selections: [{ size: "M", quantity: 1 }],
              },
            ],
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    });
  };

  const removeFromCart = (product: ProductType) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== product.id);

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    });
  };

  

  return (
    <CartContext.Provider
      value={{ userId, productId, addToCart, removeFromCart, cart, updateQuantity: () => {}, updateSize: () => {} }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
