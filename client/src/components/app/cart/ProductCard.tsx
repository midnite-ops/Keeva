import { ChevronDown, ChevronUp, Layers, Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../../../shared/types";
import ProductDetails from "../../../components/app/cart/ProductDetails";
import OutfitDetails from "../../../components/app/cart/OutiftDetails";
import type { ProductType } from "../../../types/productTypes";
import { findUser } from "../../../utils/user/findUser";

interface CartCardProps {
  item: ProductType;
  expanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onQty: (d: number) => void;
  onSize: (s: string) => void;
}

export default function CartCard({
  item,
  expanded,
  onToggle,
  onRemove,
  onQty,
  onSize,
}: CartCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200" style={{ background: "#fff", border: "1px solid #ece9e4" }}>
      {/* Main row */}
      <div className="flex gap-4 p-4">
        <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {item.type === "outfits" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5" style={{ background: "#f4f3fd", color: "#7c72c8" }}>
                  <Layers size={9} /> Outfit
                </span>
              )}
              <p className="text-sm font-semibold text-gray-900 leading-snug">{item.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.type === "product" ? findUser(item.brandId)?.username : `by ${findUser(item.creatorId)?.username }`}
              </p>
            </div>
            <button onClick={onRemove} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5">
              <Trash2 size={15} />
            </button>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div className="flex flex-col gap-1">
              {item.type === "product" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Size:</span>
                  <span className="text-xs font-semibold text-gray-900">{item.stock[0].size}</span>
                  <span className="text-xs text-gray-300">·</span>
                  {/* <span className="text-xs text-gray-400">{item.color}</span> */}
                </div>
              )}
              {item.type === "outfits" && (
                <span className="text-xs text-gray-400">{item.taggedProducts.length} pieces included</span>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-base font-semibold text-gray-900">
                ${item.type === "product" ? (item.price * item.stock.reduce((sum, item) => sum + item.quantity, 0)).toLocaleString() : item.totalPrice.toLocaleString()}
              </span>
              {item.type === "product" && item.stock.reduce((sum, item) => sum + item.quantity, 0) > 1 && (
                <span className="text-xs text-gray-400">${item.price} each</span>
              )}
            </div>
          </div>

          {/* Quantity (product only) */}
          {item.type === "product" && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid #ece9e4" }}>
                <button onClick={() => onQty(-1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                  <Minus size={12} />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.stock[0].quantity}</span>
                <button onClick={() => onQty(1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                  <Plus size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors"
        style={{ borderTop: "1px solid #f0ede8", color: expanded ? "#111" : "#aaa", background: expanded ? "#fafaf9" : "transparent" }}
      >
        <span>{expanded ? "Hide details" : item.type === "product" ? "View sizes & details" : "View outfit pieces"}</span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-4 pb-4" style={{ borderTop: "1px solid #f0ede8", background: "#fafaf9" }}>
          {item.type === "product" ? <ProductDetails item={item} onSize={onSize} /> : <OutfitDetails item={item} />}
        </div>
      )}
    </div>
  );
}