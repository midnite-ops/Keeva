import { useState } from "react";
import {
  Heart,
  Send,
  Bookmark,
  ShoppingBag,
  MoreHorizontal,
  CheckCircle2,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const outfit = {
  id: "1",
  user: {
    name: "Sofia Marlowe",
    handle: "@sofiawears",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&auto=format",
    verified: true,
  },
  image:
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=750&fit=crop&auto=format",
  caption: "Sunday market energy. Linen everything, always. 🌿",
  tags: ["#linenlook", "#slowfashion", "#ootd", "#sustainablestyle"],
  items: [
    { name: "Linen Wide-Leg Trousers", brand: "& Other Stories", price: 89 },
    { name: "Oversized Linen Shirt", brand: "Totême", price: 210 },
    { name: "Woven Leather Mules", brand: "A.P.C.", price: 295 },
  ],
  likes: 4812,
  comments: 137,
  time: "2h ago",
};

const totalPrice = outfit.items.reduce((sum, i) => sum + i.price, 0);

export default function App() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(outfit.likes);
  const [bought, setBought] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [editPost, setEditPost] = useState(false)

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  function edit(){
    setEditPost((prev) => !prev)
  }

  return (
    <div className="h-fit flex items-center justify-center xl:justify-start md:p-4">
      {/* Card */}
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-xl"
        style={{
          width: "min(420px, 100%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-2px",
                  background:
                    "linear-gradient(135deg, #f6a623, #e91e8c, #9b4dca)",
                  zIndex: 0,
                }}
              />
              <img
                src={outfit.user.avatar}
                alt={outfit.user.name}
                className="relative w-10 h-10 rounded-full object-cover"
                style={{ zIndex: 1, border: "2px solid white" }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900 leading-none">
                  {outfit.user.name}
                </span>
                {outfit.user.verified && (
                  <CheckCircle2
                    size={13}
                    className="text-blue-500 fill-blue-500"
                  />
                )}
              </div>
              <span className="text-xs text-gray-400 leading-none">
                {outfit.user.handle}
              </span>
            </div>
          </div>
          <div className="relative">
            {editPost && (
              <div className="bg-background absolute z-10 -bottom-25 rounded-md right-2 text-foreground py-2 px-4">
                <ul className="text-sm flex flex-col gap-2">
                  <li>Edit Post</li>
                  <li>Delete Post</li>
                  <li>Collaborate</li>
                </ul>
              </div>
            )}
            <button className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
              <MoreHorizontal size={20} onClick={edit}/>
            </button>
          </div>
          
        </div>

        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "4/5", background: "#e8e4de" }}
        >
          <img
            src={outfit.image}
            alt="Outfit of the day"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.22), transparent)",
            }}
          />
          <span
            className="absolute top-3 right-3 text-white text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(4px)",
            }}
          >
            {outfit.time}
          </span>

          {/* Items pill on image */}
          <button
            onClick={() => setShowItems((s) => !s)}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Tag size={12} />
            {outfit.items.length} items
            {showItems ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>
        </div>

        {/* Collapsible items list */}
        {showItems && (
          <div className="px-4 pt-3 pb-1 flex flex-col gap-2">
            {outfit.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl px-3 py-2"
                style={{ background: "#f9f8f6", border: "1px solid #eeeae4" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.brand}</p>
                </div>
                <span className="text-xs font-semibold text-gray-700 ml-2">
                  ${item.price}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-4">
            {/* Like */}
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 transition-transform active:scale-90"
              aria-label="Like"
            >
              <Heart
                size={24}
                className="transition-all duration-200"
                style={{
                  fill: liked ? "#9E5333" : "none",
                  stroke: liked ? "#9E5333" : "#111",
                  strokeWidth: 1.8,
                }}
              />
              <span
                className="text-sm font-medium tabular-nums"
                style={{
                  color: liked ? "#9E5333" : "#111",
                  minWidth: "2.5rem",
                }}
              >
                {likeCount >= 1000
                  ? `${(likeCount / 1000).toFixed(1)}k`
                  : likeCount}
              </span>
            </button>

            {/* Share */}
            <button
              className="transition-transform active:scale-90"
              aria-label="Share"
            >
              <Send size={22} style={{ stroke: "#111", strokeWidth: 1.8 }} />
            </button>
          </div>

          {/* Save */}
          <button
            onClick={() => setSaved((s) => !s)}
            className="transition-transform active:scale-90"
            aria-label="Save"
          >
            <Bookmark
              size={24}
              style={{
                fill: saved ? "#9E5333" : "none",
                stroke: saved ? "#9E5333" : "#111",
                strokeWidth: 1.8,
                transition: "fill 0.2s",
              }}
            />
          </button>
        </div>

        {/* Caption */}
        <div className="px-4 pt-1.5 pb-2">
          <p className="text-sm text-gray-900 leading-snug">
            <span className="font-semibold mr-1">
              {outfit.user.name.split(" ")[0]}
            </span>
            {outfit.caption}
          </p>
          <p className="text-xs mt-1" style={{ color: "#7c72c8" }}>
            {outfit.tags.join(" ")}
          </p>
        </div>

        {/* Buy the Full Look bar */}
        <div className="mx-4 mb-4 mt-1 flex items-center justify-between rounded-2xl px-4 py-3 gap-3 bg-actionsColor">
          <div>
            <p
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Full outfit
            </p>
            <p className="text-lg font-semibold text-white leading-tight">
              ${totalPrice.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setBought((b) => !b)}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shrink-0 ${bought ? "bg-[#F5EDE6] text-foreground" : "bg-background text-foreground"}`}
          >
            <ShoppingBag size={15} />
            {bought ? "In Cart ✓" : "Buy the Look"}
          </button>
        </div>
      </div>
    </div>
  );
}
