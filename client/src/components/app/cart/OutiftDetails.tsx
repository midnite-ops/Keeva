import { Tag } from "lucide-react";
import type { Outfits } from "../../../types/productTypes";
import { findUser } from "../../../utils/user/findUser";

interface OutfitDetailsProps {
  item: Outfits;
}

export default function OutfitDetails({ item }: OutfitDetailsProps) {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-3 mb-4">
        <img src={findUser(item.creatorId)?.profilePic} alt={findUser(item.creatorId)?.username} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="text-xs font-semibold text-gray-900">{findUser(item.creatorId)?.username}</p>
          <p className="text-[10px] text-gray-400">Outfit curator</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-700">{item.taggedProducts.length} pieces in this outfit</p>
        <span className="text-xs font-semibold text-gray-500">${item.totalPrice} total</span>
      </div>

      <div className="flex flex-col gap-2">
        {item.taggedProducts.map((p, i) => {
          const product = findUser(p.brandId);
          const taggedProducts = p.stock.map((s) => s.size).join(", ");
          return(
            <div key={i} className="flex items-center justify-between rounded-xl px-3 py-2.5" style={{ background: "#fff", border: "1px solid #ece9e4" }}>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
              <p className="text-[10px] text-gray-400">
                {product?.username} · Size {taggedProducts}
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-700 ml-3 flex-shrink-0">${p.price}</span>
          </div>
          )
          
})}
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs px-3 py-2.5 rounded-xl" style={{ background: "#f4f3fd", border: "1px solid #dddaf7" }}>
        <Tag size={11} style={{ color: "#7c72c8", flexShrink: 0 }} />
        <span style={{ color: "#5b52b5" }}>Buying the full outfit saves you time — all pieces ship together.</span>
      </div>
    </div>
  );
} 