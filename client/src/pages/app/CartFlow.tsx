import { useState } from "react";
import type { Page, CartItem } from "../../shared/types";
import CartPage from "../../components/app/cart/CartPage";
import { findProduct } from "../../utils/findProduct";
import { useCart } from "../../context/CartContext";
import { saveStorage } from "../../utils/localStorage/initializeStorage";
// import CheckoutPage from "./checkout/CheckoutPage";
// import ConfirmationPage from "./confirmation/ConfirmationPage";



export default function App() {
  const [page, setPage] = useState<Page>("cart");
  const { cart, removeFromCart } = useCart();

  const [cartItems, setCartItems] = useState(
    cart.map((item) => findProduct(item.id)),
  );

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.type === "product")
      return (
        sum + item.price * item.stock.reduce((acc, s) => acc + s.quantity, 0)
      );
    return sum + item.totalPrice;
  }, 0);
  const shipping = subtotal > 300 ? 0 : 12;
  const total = subtotal + shipping;

  function updateQty(id: string, delta: number) {
    setCartItems((c) =>
      c.map((i) =>
        i.type === "product" && i.id === id
          ? { ...i ,quantity: Math.max(1, i.stock.reduce((acc, s) => acc + s.quantity, 0) + delta) }
          : i
          
      )
    );
    
    const newCart = cartItems.map((item) => {
      if(item.type === 'product'){
        return(
         {id:item.id, sizes: item.stock}
      )
      }
     
  })
    saveStorage('cart', newCart);
    console.log(newCart)
  }

  function updateSize(id: string, size: string) {
    setCartItems((c) =>
      c.map((i) =>
        i.type === "product" && i.id === id ? { ...i, selections: {size, quantity:1} } : i,
      ),
    );
  }

  return (
    <div
      className="flex h-screen overflow-y-scroll"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7f5f2" }}
    >
      {page === "cart" && (
        <CartPage
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onRemove={removeFromCart}
          onQty={updateQty}
          onSize={updateSize}
          onCheckout={() => setPage("checkout")}
        />
      )}
      {/* {page === "checkout" && (
        <CheckoutPage
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onBack={() => setPage("cart")}
          onConfirm={() => setPage("confirmation")}
        />
      )}
      {page === "confirmation" && (
        <ConfirmationPage onBack={() => setPage("cart")} total={total} />
      )} */}
    </div>
  );
}
// import ProductCard from "../../components/app/cart/ProductCard";
// import { useCart } from "../../context/CartContext";
// import type { Outfits, Products } from "../../types/productTypes";
// import { getStorage } from "../../utils/localStorage/initializeStorage";
// import { useState } from "react";

// const Cart = () => {
//   const { cart, addToCart, removeFromCart } = useCart();
//   const [page, setPage] = useState('cart');
//   const products = getStorage<Products | Outfits>('products')
//   return (
//     <div className="text-foreground section-spacing overflow-y-scroll h-screen no-scrollbar">
//       <h2>Your Cart</h2>
//       <p className="text-subtitleText mt-2 font-bold text-sm " >{cart.length} items</p>
//       <div className="flex">
//         {cart.length === 0 ? (
//           <p className="text-subtitleText mt-5 font-bold text-2xl " >Your cart is empty.</p>
//         ) : (
//           <>
//             <div className="flex flex-col gap-4 mt-4 flex-2">
//                 {cart.map((item) => {
//                     const currentItem = products.find((product) => product.id === item);
//                     if(currentItem?.type === 'product'){
//                         return (
//                             <ProductCard id={currentItem.id} name={currentItem.name} price={currentItem.price} images={currentItem.images} brandId={currentItem.brandId} type="product"/>
//                         )
//                     }else if(currentItem?.type === 'outfits'){
//                         return  <ProductCard id={currentItem.id} name={currentItem.name} price={currentItem.price} images={currentItem.images} brandId={currentItem.creatorId} taggedProducts={currentItem.taggedProducts} type="outfits"/>
//                     }
//                 })}

//             </div>
//             <div className="flex-1"></div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
