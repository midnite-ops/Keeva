import { AlertCircle } from "lucide-react";
import type { Products } from "../../../types/productTypes";
import { findUser } from "../../../utils/user/findUser";

interface ProductDetailsProps {
  item: Products;
  onSize: (s: string) => void;
}

export default function ProductDetails({ item, onSize }: ProductDetailsProps) {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-2 gap-4 mb-5 text-xs">
        <div>
          <span className="text-gray-400 block mb-0.5">SKU</span>
          {/* <span className="font-medium text-gray-700 font-mono text-[11px]">{item.sku}</span> */}
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">Color</span>
          {/* <span className="font-medium text-gray-700">{item.color}</span> */}
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">Brand</span>
          <span className="font-medium text-gray-700">{findUser(item.brandId)?.username}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">Unit price</span>
          <span className="font-medium text-gray-700">${item.price}</span>
        </div>
      </div>

      <p className="text-xs font-semibold text-gray-700 mb-3">Select size</p>
      <div className="flex flex-wrap gap-2">
        {item.stock.map(({ size, quantity}) => {
          const selected = item.stock[0].size === size;
          const outOfStock = quantity === 0;
          return (
            <button
              key={size}
              disabled={outOfStock}
              onClick={() => onSize(size)}
              className="relative flex flex-col items-center justify-center rounded-xl transition-all duration-150"
              style={{
                width: 52,
                height: 52,
                border: selected ? "2px solid #111" : "1.5px solid #ece9e4",
                background: selected ? "#111" : outOfStock ? "#fafafa" : "#fff",
                opacity: outOfStock ? 0.45 : 1,
                cursor: outOfStock ? "not-allowed" : "pointer",
              }}
            >
              <span className="text-xs font-semibold" style={{ color: selected ? "#fff" : outOfStock ? "#bbb" : "#333" }}>
                {size}
              </span>
              <span className="text-[9px] mt-0.5" style={{ color: selected ? "rgba(255,255,255,0.6)" : quantity <= 2 && quantity > 0 ? "#e91e8c" : "#aaa" }}>
                {outOfStock ? "Out" : quantity <= 3 ? `${quantity} left` : "In stock"}
              </span>
              {outOfStock && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-px rotate-45" style={{ background: "#ddd" }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {(() => {
        const sel = item.stock.find((s) => s.size === item.stock[0].size);
        if (sel && sel.quantity <= 3 && sel.quantity > 0) {
          return (
            <div className="flex items-center gap-2 mt-4 text-xs px-3 py-2 rounded-lg" style={{ background: "#fff8f0", border: "1px solid #f6d5a8" }}>
              <AlertCircle size={12} style={{ color: "#f6a623", flexShrink: 0 }} />
              <span style={{ color: "#b45309" }}>
                Only <strong>{sel.quantity}</strong> left in size {item.id} — order soon!
              </span>
            </div>
          );
        }
        return null;
      })()}
    </div>
  );
}