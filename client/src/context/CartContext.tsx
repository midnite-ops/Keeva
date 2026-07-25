import { createContext, useContext, useState } from "react";

type CartContextType = {
    userId: string
    productId: string
    addToCart: (productId:string) => void
    removeFromCart: (productId:string) => void

}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({children}: {children: React.ReactNode}){
    const userId = ''
    const productId =''
    const [cart, setCart] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem('cart') || '[]')
    })
    console.log(cart)
    

    const addToCart = (productId:string) => {
        setCart((prev) => {
            const updatedCart = [...prev, productId]

            localStorage.setItem('cart', JSON.stringify(updatedCart))

            return updatedCart
        })
    }

    const removeFromCart = (productId:string) => {
        setCart((prev) => {
            const updatedCart = prev.filter((item) => item !== productId)

            localStorage.setItem('cart', JSON.stringify(updatedCart))

            return updatedCart
        })
            
    }

    return(
        <CartContext.Provider value={{userId, productId, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

