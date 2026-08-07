import { ArrowRight, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import CartCard from "./CartCard";
import type { ProductType } from "../../../types/productTypes";

interface CartPageProps {
  cartItems: ProductType[];
  subtotal: number;
  shipping: number;
  total: number;
  onRemove: (product:ProductType) => void;
  onQty: (id: string, d: number) => void;
  onSize: (id: string, s: string) => void;
  onCheckout: () => void;
}

export default function CartPage({
  cartItems,
  subtotal,
  shipping,
  total,
  onRemove,
  onQty,
  onSize,
  onCheckout,
}: CartPageProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

 

  return (
    <div className="h-full overflow-y-auto pb-20 w-full" style={{ scrollbarWidth: "none" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <h1
          className="text-2xl font-semibold text-gray-900 mb-2"
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
        >
          Your Cart
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={40} className="text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Free shipping notice */}
              {shipping > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: "#fdf3f9", border: "1px solid #f9d0e8" }}>
                  <Truck size={15} style={{ color: "#e91e8c", flexShrink: 0 }} />
                  <span className="text-gray-600">
                    Add <span className="font-semibold text-gray-900">${(300 - subtotal).toFixed(0)}</span> more for free shipping
                  </span>
                </div>
              )}
              {shipping === 0 && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: "#f0faf0", border: "1px solid #c3e6c3" }}>
                  <Truck size={15} style={{ color: "#2e7d32", flexShrink: 0 }} />
                  <span className="text-gray-600 font-medium">
                    You've got <span className="font-semibold text-green-700">free shipping!</span>
                  </span>
                </div>
              )}

              {cartItems.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  expanded={expanded.has(item.id)}
                  onToggle={() => toggle(item.id)}
                  onRemove={() => onRemove(item)}
                  onQty={(d) => onQty(item.id, d)}
                  onSize={(s) => onSize(item.id, s)}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="rounded-2xl p-6 sticky top-8" style={{ background: "#fff", border: "1px solid #ece9e4" }}>
                <h2 className="text-base font-semibold text-gray-900 mb-5">Order Summary</h2>

                <div className="flex flex-col gap-3 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className={shipping === 0 ? "font-medium text-green-600" : "font-medium text-gray-900"}>
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax (est.)</span>
                    <span className="font-medium text-gray-900">${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="h-px" style={{ background: "#ece9e4" }} />
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900 text-base">${(total + subtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-3"
                  style={{ background: "#111" }}
                >
                  Proceed to Checkout <ArrowRight size={15} />
                </button>

                <div className="flex flex-col gap-2 mt-4">
                  {[
                    { icon: ShieldCheck, text: "Secure & encrypted checkout" },
                    { icon: RotateCcw, text: "Free 30-day returns" },
                    { icon: Truck, text: "Express delivery available" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-gray-400">
                      <Icon size={12} className="flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}