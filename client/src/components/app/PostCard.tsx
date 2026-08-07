import { useRef, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatCount } from "../../utils/formatCount";
import type { ProductType } from "../../types/productTypes";
import { findUser } from "../../utils/user/findUser";
import type { Users } from "../../types/userTypes";
import { useNavigate } from "react-router-dom";

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

interface OutfitCardProps {
  data: ProductType;
  currentUser: Users;
  inCart: boolean
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void
}

export default function PostCard({ data, currentUser, inCart, addToCart, removeFromCart }: OutfitCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(outfit.likes);
  const [bought, setBought] = useState<boolean>(inCart);
  const [showItems, setShowItems] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const navigate = useNavigate()



  // Tracks the currently visible image
  const [currentImage, setCurrentImage] = useState(0);

  // Gives us direct access to this card's carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  const userId =
    data.type === "outfits" ? data.creatorId : data.brandId;

  const user = findUser(userId);

  const canEditPost =
    currentUser?.role !== "customer" &&
    currentUser?.id === user?.id;

  const outfits = data.type === "outfits" ? data : null;

  function handleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  function edit() {
    setEditPost((prev) => !prev);
  }

  // Update active dot when user swipes
  function handleScroll() {
    if (!carouselRef.current) return;

    const container = carouselRef.current;

    const index = Math.round(
      container.scrollLeft / container.clientWidth
    );

    setCurrentImage(index);
  }

  // Go to previous image
  function previousImage() {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: -carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  // Go to next image
  function nextImage() {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex items-center justify-center xl:justify-start md:p-4">
      {/* Card */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{
          width: "min(420px, 100%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5" onClick={() => navigate(`/app/user/account/${user!.id}`)}>
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
                src={user?.profilePic}
                alt={user?.username}
                className="relative w-10 h-10 rounded-full object-cover"
                style={{
                  zIndex: 1,
                  border: "2px solid white",
                }}
              />
            </div>

            <div className="cursor-pointer">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900 leading-none">
                  {user?.name}
                </span>

                {true && (
                  <CheckCircle2
                    size={13}
                    className="text-blue-500 fill-blue-500"
                  />
                )}
              </div>

              <span className="text-xs text-gray-400 leading-none">
                @{user?.username}
              </span>
            </div>
          </div>

          {currentUser?.role !== "customer" &&
            currentUser?.id === user?.id && (
              <div className="relative">
                {canEditPost && (
                  <div className="relative">
                    {editPost && (
                      <div className="bg-background absolute z-10 -bottom-20 rounded-md right-2 text-foreground py-2 px-4">
                        <ul className="text-sm flex flex-col gap-2 w-20">
                          <li>Edit Post</li>
                          <li>Delete Post</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <button className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100">
                  <MoreHorizontal
                    size={20}
                    onClick={edit}
                  />
                </button>
              </div>
            )}
        </div>

        {/* Image Carousel */}
        <div
          className={`relative overflow-hidden h-80 ${
            data.type === "product" ? "h-100" : "h-fit"
          }`}
          style={{
            aspectRatio: "4/5",
            background: "#e8e4de",
          }}
        >
          {/* Images */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {data.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full shrink-0 object-cover snap-center"
              />
            ))}
          </div>

          {/* Desktop Previous Arrow */}
          {data.images.length > 1 && (
            <button
              onClick={previousImage}
              aria-label="Previous image"
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2
                w-8 h-8 rounded-full bg-black/40 text-white
                items-center justify-center backdrop-blur-sm
                hover:bg-black/60 transition"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Desktop Next Arrow */}
          {data.images.length > 1 && (
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2
                w-8 h-8 rounded-full bg-black/40 text-white
                items-center justify-center backdrop-blur-sm
                hover:bg-black/60 transition"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Dots */}
          {data.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
              {data.images.map((_, index) => (
                <span
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    index === currentImage
                      ? "bg-white"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.22), transparent)",
            }}
          />

          {/* Time */}
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
            onClick={() => {
              if (data.type === "product") return;
              setShowItems((s) => !s);
            }}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Tag size={12} />

            {data.type === "outfits"
              ? data.taggedProducts.length + " items"
              : data.stock.length + " available"}

            {data.type === "outfits" ? (
              showItems ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronUp size={12} />
              )
            ) : null}
          </button>
        </div>

        {/* Collapsible items list */}
        {showItems && (
          <div className="px-4 pt-3 pb-1 flex flex-col gap-2">
            {outfits?.taggedProducts.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl px-3 py-2"
                style={{
                  background: "#f9f8f6",
                  border: "1px solid #eeeae4",
                }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {findUser(item.brandId)?.username}
                  </p>
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
                {`${formatCount(likeCount)}k`}
              </span>
            </button>

            {/* Share */}
            <button
              className="transition-transform active:scale-90"
              aria-label="Share"
            >
              <Send
                size={22}
                style={{
                  stroke: "#111",
                  strokeWidth: 1.8,
                }}
              />
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
              {user?.username.split(" ")[0]}
            </span>

            {data.name}
          </p>

          <p className="text-xs text-subtitleText font-semibold my-1">
            {data.description}
          </p>

          <p
            className="text-xs mt-1"
            style={{ color: "#7c72c8" }}
          >
            {outfit.tags.join(" ")}
          </p>
        </div>

        {/* Buy the Full Look bar */}
        <div className="mx-4 mb-4 mt-1 flex items-center justify-between rounded-2xl px-4 py-3 gap-3 bg-bgBlack">
          <div>
            <p
              className="text-xs font-medium mb-1"
              style={{
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {data.type === "outfits"
                ? "Full Look"
                : "Price"}
            </p>

            <p className="text-lg font-semibold text-white leading-tight">
              ${data.type === 'outfits' ? data.totalPrice : data.price}
            </p>
          </div>

          <button
            onClick={() => {
              if(inCart) {
                removeFromCart(data)
                setBought(false)
              } else {
                addToCart(data)
                setBought(true)
              }
            }}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shrink-0 ${
              bought
                ? "bg-success text-successText"
                : "bg-background text-foreground"
            }`}
          >
            <ShoppingBag size={15} />

            {bought ? "In Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

//losene kanneh