import { useState } from "react";
import type { Page } from "../../types/cartTypes";
import CartPage from "../../components/app/cart/CartPage";
import { findProduct } from "../../utils/findProduct";
import { useCart } from "../../context/CartContext";
import { saveStorage } from "../../utils/localStorage/initializeStorage";
import CheckoutPage from "../../components/app/cart/CheckoutPage";
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
          ? {
              ...i,
              quantity: Math.max(
                1,
                i.stock.reduce((acc, s) => acc + s.quantity, 0) + delta,
              ),
            }
          : i,
      ),
    );

    const newCart = cartItems.map((item) => {
      if (item.type === "product") {
        return { id: item.id, sizes: item.stock };
      }
    });
    saveStorage("cart", newCart);
    console.log(newCart);
  }

  function updateSize(id: string, size: string) {
    setCartItems((c) =>
      c.map((i) =>
        i.type === "product" && i.id === id
          ? { ...i, selections: { size, quantity: 1 } }
          : i,
      ),
    );
  }

  return (
    <div className="flex h-full overflow-y-auto ">
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
      {page === "checkout" && (
        <CheckoutPage
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onBack={() => setPage("cart")}
          onConfirm={() => setPage("confirmation")}
        />
      )}
      {/* {page === "confirmation" && (
        <ConfirmationPage onBack={() => setPage("cart")} total={total} />
      )} */}
    </div>
  );
}
