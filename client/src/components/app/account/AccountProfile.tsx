import { useMemo, useState } from "react";
import { MapPin, Tag, ShoppingBag } from "lucide-react";
import type { Outfits, Products } from "../../../types/productTypes";
import { formatCount } from "../../../utils/formatCount";

type Status =
  | "placed"
  | "accepted"
  | "shipped"
  | "delivered"
  | "cancelled";

type OrderNotification = {
  id: string;
  type: "order";
  productName: string;
  price: string;
  status: Status;
  time: string;
  read: boolean;
};

type TrendingNotification = {
  id: string;
  type: "trending";
  productName: string;
  saves: number;
  time: string;
  read: boolean;
};

type RestockNotification = {
  id: string;
  type: "restock";
  productName: string;
  size: string;
  time: string;
  read: boolean;
};

type Notification =
  | OrderNotification
  | TrendingNotification
  | RestockNotification;

interface AccountProfileProps {
  id: string;
  name: string;
  username?: string;
  followers?: number;
  following?: number;
  outfits?: Outfits[];
  products?: Products[];
  role: "creator" | "brand" | "customer";
  bio?: string;
  profilePic?: string;
  sales?: number;
  location: string;
}

const AccountProfile = ({
  name,
  followers,
  following,
  outfits,
  products,
  role,
  bio,
  profilePic,
  sales,
  location,
}: AccountProfileProps) => {
  const [creatorFeed, setCreatorFeed] = useState<"outfits" | "products">(
    "outfits",
  );

  const [customerFeed, setCustomerFeed] = useState<"saved" | "liked">("saved");

  const [brandFeed, setBrandFeed] = useState<"products" | "showcase">(
    "products",
  );

  /*
   * Get all tagged products from all creator outfits.
   * This prevents us from displaying "No tagged products"
   * once for every outfit that has no tagged products.
   */
  const taggedProducts = useMemo(() => {
    return outfits?.flatMap((outfit) => outfit.taggedProducts ?? []) ?? [];
  }, [outfits]);

  return (
    <section className="section-spacing w-full md:w-3/4">
      {/* =========================
          PROFILE HEADER
      ========================== */}
      <div className="flex items-center">
        {/* Profile Picture */}
        <div className="flex-1">
          <div className="size-25 overflow-hidden rounded-full bg-rose-800 flex items-center justify-center">
            {!profilePic ? (
              <p className="text-white text-3xl font-medium">
                {name?.[0]?.toUpperCase()}
              </p>
            ) : (
              <img
                src={profilePic}
                alt={`${name}'s profile`}
                className="size-full object-cover"
              />
            )}
          </div>
        </div>

        {/* =========================
            BRAND STATS
        ========================== */}
        {role === "brand" && (
          <div className="flex-2 flex justify-between">
            <ProfileStat
              value={formatCount(followers ?? 0)}
              label="Followers"
            />

            <ProfileStat
              value={formatCount(products?.length ?? 0)}
              label="Products"
            />

            <ProfileStat
              value={formatCount(sales ?? 0)}
              label="Sales"
            />
          </div>
        )}

        {/* =========================
            CREATOR STATS
        ========================== */}
        {role === "creator" && (
          <div className="flex-2 flex justify-between">
            <ProfileStat
              value={formatCount(followers ?? 0)}
              label="Followers"
            />

            <ProfileStat
              value={formatCount(outfits?.length ?? 0)}
              label="Outfits"
            />

            <ProfileStat
              value={formatCount(sales ?? 0)}
              label="Sales"
            />
          </div>
        )}

        {/* =========================
            CUSTOMER STATS
        ========================== */}
        {role === "customer" && (
          <div className="flex-2 flex justify-between">
            <ProfileStat
              value={formatCount(following ?? 0)}
              label="Following"
            />

            <ProfileStat
              value={formatCount(0)}
              label="Cart"
            />

            <ProfileStat
              value={formatCount(0)}
              label="Reviews"
            />
          </div>
        )}
      </div>

      {/* =========================
          PROFILE BIO
      ========================== */}
      <div className="text-foreground mt-3 flex flex-col gap-1">
        <div className="flex gap-3 mb-2 items-center">
          <h3 className="font-semibold text-lg md:text-xl">
            {name}
          </h3>

          <span className="bg-rose-100 border border-rose-500 inline-flex items-center justify-center rounded-full text-rose-500 text-xs px-2 py-1">
            {role}
          </span>
        </div>

        <p className="font-medium text-sm text-subtitleText">
          {bio || "Minimal wardrobe. Maximal impact. 🖤"}
        </p>

        <div className="flex gap-1 items-center">
          <MapPin size={20} />

          <p className="text-xs">
            {location || "Location not specified"}
          </p>
        </div>
      </div>

      {/* =========================
          PROFILE ACTIONS
      ========================== */}
      <div className="flex gap-2 mt-5">
        <button className="w-full rounded-md bg-black py-2 text-white">
          Edit Profile
        </button>

        <button className="w-full rounded-md bg-black py-2 text-white">
          Share Profile
        </button>
      </div>

      {/* =========================
          BRAND CONTENT
      ========================== */}
      {role === "brand" && (
        <div className="mt-10">
          {/* Tabs */}
          <div className="flex gap-5 items-center justify-around">
            <button
              onClick={() => setBrandFeed("products")}
              className={`text-subtitleText uppercase text-center font-semibold pb-2 w-full text-sm tracking-[0.2em] ${
                brandFeed === "products"
                  ? "border-b border-b-black"
                  : ""
              }`}
            >
              Products
            </button>

            <button
              onClick={() => setBrandFeed("showcase")}
              className={`text-subtitleText uppercase text-center font-semibold pb-2 w-full text-sm tracking-[0.2em] ${
                brandFeed === "showcase"
                  ? "border-b border-b-black"
                  : ""
              }`}
            >
              Showcase
            </button>
          </div>

          {/* Products */}
          {brandFeed === "products" && (
            <div className="grid grid-cols-3 mt-5">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id}>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-subtitleText">
                  <ShoppingBag className="mx-auto mb-2" />
                  <p>No products available</p>
                </div>
              )}
            </div>
          )}

          {/* Showcase */}
          {brandFeed === "showcase" && (
            <div className="grid grid-cols-3 mt-5">
              <div className="col-span-3 py-10 text-center text-subtitleText">
                <p>No showcase items available</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================
          CUSTOMER CONTENT
      ========================== */}
      {role === "customer" && (
        <div className="mt-10">
          {/* Tabs */}
          <div className="flex gap-5 items-center justify-around">
            <button
              onClick={() => setCustomerFeed("saved")}
              className={`text-subtitleText uppercase text-center font-semibold pb-2 w-full text-sm tracking-[0.2em] ${
                customerFeed === "saved"
                  ? "border-b border-b-black"
                  : ""
              }`}
            >
              Saved
            </button>

            <button
              onClick={() => setCustomerFeed("liked")}
              className={`text-subtitleText uppercase text-center font-semibold pb-2 w-full text-sm tracking-[0.2em] ${
                customerFeed === "liked"
                  ? "border-b border-b-black"
                  : ""
              }`}
            >
              Liked
            </button>
          </div>

          <div className="py-10 text-center text-subtitleText">
            {customerFeed === "saved" && (
              <p>No saved items available</p>
            )}

            {customerFeed === "liked" && (
              <p>No liked items available</p>
            )}
          </div>
        </div>
      )}

      {/* =========================
          CREATOR CONTENT
      ========================== */}
      {role === "creator" && (
        <div className="mt-10">
          {/* Tabs */}
          <div className="flex gap-5 items-center justify-around">
            <button
              onClick={() => setCreatorFeed("outfits")}
              className={`text-subtitleText uppercase text-center font-semibold pb-2 w-full text-sm tracking-[0.2em] ${
                creatorFeed === "outfits"
                  ? "border-b border-b-black"
                  : ""
              }`}
            >
              Outfits
            </button>

            <button
              onClick={() => setCreatorFeed("products")}
              className={`text-subtitleText uppercase text-center font-semibold pb-2 w-full text-sm tracking-[0.2em] ${
                creatorFeed === "products"
                  ? "border-b border-b-black"
                  : ""
              }`}
            >
              Products
            </button>
          </div>

          {/* =========================
              CREATOR OUTFITS
          ========================== */}
          {creatorFeed === "outfits" && (
            <div className="grid grid-cols-3 mt-5">
              {outfits && outfits.length > 0 ? (
                outfits.map((outfit) => (
                  <div key={outfit.id}>
                    <img
                      src={outfit.images?.[0]}
                      alt="Creator outfit"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-subtitleText">
                  <p>No outfits available for this user</p>
                </div>
              )}
            </div>
          )}

          {/* =========================
              CREATOR TAGGED PRODUCTS
          ========================== */}
          {creatorFeed === "products" && (
            <div className="grid grid-cols-3 mt-5">
              {taggedProducts.length > 0 ? (
                taggedProducts.map((product) => (
                  <div key={product.id}>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center py-10 text-subtitleText">
                  <Tag className="mb-2" />
                  <p>No tagged products</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

/* =========================
   PROFILE STAT COMPONENT
========================== */

interface ProfileStatProps {
  value: string | number;
  label: string;
}

const ProfileStat = ({
  value,
  label,
}: ProfileStatProps) => {
  return (
    <div className="flex flex-col gap-1 items-center text-foreground justify-center">
      <h3 className="text-2xl">
        {value}
      </h3>

      <p className="uppercase font-medium text-xs tracking-wide">
        {label}
      </p>
    </div>
  );
};

export default AccountProfile;