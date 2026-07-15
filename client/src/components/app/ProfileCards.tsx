import { Tag, Heart } from "lucide-react";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { formatCount } from "../../utils";


interface ProfileCardProps {
  id: string;
  profilePic: string;
  username: string;
  name: string;
  likes: number;
  followers: number;
  role: "creator" | "brand";
  coverPhoto: string[]
  outfits?: [
    {
      outfitName: string;
      outfitStock: number;
      outfitImages: string[];
      outfitSizes: string[];
    },
  ];
  products?: [
    {
      productName: string;
      productStock: number;
      productImages: string[];
      productSizes: string[];
    },
  ];
}

interface ProductCardProps {
  id: string;
  productImage: string;
  profilePic: string
  creatorId?: string;
  brandId?: string
  type: 'outfit' | 'product',
  likes: number,
  username?: string,
  items?: object[]
  price: number
}


export const ProductCard = ({id, productImage, username, profilePic, type, likes, price,  items}: ProductCardProps) => {
    // const creatorIdNum = creatorId
    return(
        <div
            key={id}
            className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-200"
            style={{
            background: "#fff",
            border: "2px solid transparent",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.border = "2px solid #ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.border = "2px solid transparent")}
        >
            <div
            className="relative overflow-hidden bg-stone-100"
            style={{ height: type === 'outfit' ? 420 : 200 }}
            >
            <img src={productImage} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)" }} />

            {/* Like button */}
            <div
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
            >
                <Heart size={14}  /> {likes}
            </div>

            {/* Price + items */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div
                className="flex items-center gap-1.5 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
                >
                <Tag size={10} /> {items?.length} · ${price}
                </div>
                <span className="text-white/60 text-xs tabular-nums">
                {`${formatCount(likes)}k`} ♥
                </span>
            </div>
            </div>

            {/* User row */}
            <div className="flex items-center gap-2 px-3 py-2.5">
            <img src={profilePic} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
            <span className="text-xs font-medium text-gray-600 truncate">@{username}</span>
            </div>
        </div>
            
    )
}

export const ProfileCard = ({
  profilePic,
  followers,
  likes,
  name,
  username,
  outfits,
  products,
  role,
  coverPhoto
}: ProfileCardProps) => {
  const [following, setFollowing] = useState(false);
  return (
    <div
      className={`bg-card rounded-2xl overflow-hidden border border-subtitleText hover:border-foreground/20 transition-all duration-300 flex flex-col row-span-1`}
    >
      {/* Look grid preview */}
      <div className={`relative grid grid-cols-3 gap-0.5  h-40 bg-secondary overflow-hidden [mask-image:linear-gradient(to_top,transparent_0%,black_30%)]
    [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_30%)]`}>
        
        {coverPhoto.map((item, i) => (
              <div key={i} className="overflow-hidden bg-secondary">
                <img
                  src={item}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-80"
                />
              </div>
            ))}

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-card/60" />
        
        <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent backdrop-blur-sm border border-accent/30!">
          <p className="text-white">{role === 'brand' ? 'brand' : 'Creator'}</p>
        </span>
      </div>

      {/* Avatar + name */}
      <div className="px-5 -mt-6 mb-3 relative flex items-end gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-card bg-secondary shrink-0">
          <img
            src={profilePic}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pb-0.5">
          <p className="text-[14px] font-semibold text-foreground leading-tight">
            {name}
          </p>
          <p className="text-[10px] text-subtitleText tracking-wider">
            @{username}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-4 flex-1">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 border-t border-subtitleText pt-4">
          {[
            { label: "Followers", value: followers },
            { label: "Looks", value: role === 'creator' ? outfits?.length : products?.length },
            { label: "Earned", value: likes },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p
                className="text-[14px] font-medium text-foreground">
                {value}
              </p>
              <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-semibold">
                {label}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setFollowing((p) => !p)}
          className={`flex items-center justify-center gap-2 text-[10px] tracking-[0.18em] uppercase rounded-full py-2.5 transition-all duration-200 ${
           
               "border border-border text-muted-foreground bg-bgBlack hover:border-foreground/30 text-background"
          }`}
        >
          <Bookmark size={13} strokeWidth={1.5} />
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};
