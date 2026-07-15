import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { Outfits, Products } from "../../types/productTypes";
import type { Users } from "../../types/userTypes";

import users from "../../data/users";

import { ProductCard, ProfileCard } from "../../components/app/ProfileCards";

import { searchLogic } from "../../utils/searchLogic";
import { findUser } from "../../utils";

type SearchResult = Outfits | Products | Users;

const filters = [
  "Price: Low to High",
  "Most Liked",
  "Newest",
  "Under 200$",
  "Under $500",
];

const categories = [
  "All",
  "Outfits",
  "Tops",
  "Bottoms",
  "Shoes",
  "Accessories",
  "Creators",
  "Brands",
];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [displaySearch, setDisplaySearch] = useState<SearchResult[]>([]);

  const [hasSearched, setHasSearched] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const query = search.trim().toLowerCase();

  //---------------------------------------------------
  // Search
  //---------------------------------------------------

  const performSearch = (category = activeCategory) => {
    if (!query) return;

    setHasSearched(true);
    setShowCategory(true);

    const results = searchLogic(category, query);

    setDisplaySearch(results);
  };

  //---------------------------------------------------
  // Input
  //---------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value.trim() === "") {
      setShowCategory(true);
      setHasSearched(false);
      setDisplaySearch([]);
    } else {
      setShowCategory(false);
    }
  };

  //---------------------------------------------------
  // Category
  //---------------------------------------------------

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    if (hasSearched) {
      performSearch(category);
    }
  };

  return (
    <section className="text-foreground px-5 lg:px-0 pt-10 overflow-y-scroll pb-70 md:pb-40 h-screen">
      <h2>Explore</h2>

      <div className="mt-5">

        {/* Search */}

        <div className="relative">

          <div className="absolute left-5 top-4">
            <Search size={20} className="text-subtitleText/50" />
          </div>

          <button
            disabled={!showCategory}
            onClick={() => setShowFilters((prev) => !prev)}
            className={`absolute right-5 top-3 flex items-center gap-2 py-1 px-2 cursor-pointer text-subtitleText/50 ${
              showFilters ? "bg-subtitleText/10 rounded-full" : ""
            }`}
          >
            <SlidersHorizontal size={20} />
            <p className="text-xs font-semibold">Filters</p>
          </button>

          <input
            value={search}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                performSearch();
              }
            }}
            placeholder="Search outfits, creators, brands"
            className="w-full py-3 pl-15 bg-white rounded-xl border-2 border-bgBlack/10 outline-none focus:border-bgBlack"
          />

        </div>

        {/* Filters */}

        {showFilters && (
          <div className="whiteCard flex flex-wrap gap-5 mt-3">
            {filters.map((filter) => (
              <div
                key={filter}
                className="whiteCard rounded-full text-sm cursor-pointer"
              >
                {filter}
              </div>
            ))}
          </div>
        )}

        {/* Categories */}

        {showCategory && (
          <div className="flex flex-wrap gap-3 md:gap-5 mt-5 text-sm">

            {categories.map((category) => (

              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer py-3 px-4 rounded-3xl border font-semibold flex items-center justify-center
                  ${
                    activeCategory === category
                      ? "bg-bgBlack text-background border-0"
                      : "bg-white text-subtitleText border-subtitleText/30"
                  }`}
              >
                {category}
              </div>

            ))}

          </div>
        )}

        {/* Empty */}

        {hasSearched && displaySearch.length === 0 && (
          <div className="mt-10 text-2xl font-bold text-subtitleText">
            No Results Found
          </div>
        )}

        {/* All */}

        {activeCategory === "All" && displaySearch.length > 0 && (

          <div className="columns-2 lg:columns-3 gap-4 mt-10">

            {displaySearch.map((item) => (

              <div key={item.id} className="mb-4 break-inside-avoid">

                {item.type === "outfits" && (
                  <ProductCard
                    id={item.id}
                    creatorId={item.creatorId}
                    productImage={item.image[0]}
                    price={item.price}
                    likes={item.likes}
                    username={findUser(item.creatorId, users)[0].username}
                    profilePic={findUser(item.creatorId, users)[0].profilePic}
                    type="outfit"
                  />
                )}

                {item.type === "product" && (
                  <ProductCard
                    id={item.id}
                    brandId={item.brandId}
                    productImage={item.images[0]}
                    price={item.price}
                    likes={item.likes}
                    username={findUser(item.brandId, users)[0].username}
                    profilePic={findUser(item.brandId, users)[0].profilePic}
                    type="product"
                  />
                )}

              </div>

            ))}

          </div>

        )}

        {/* Profiles */}

        {(activeCategory === "Brands" ||
          activeCategory === "Creators") &&
          displaySearch.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

              {displaySearch.map((item) => {

                if (item.type !== "user") return null;

                if (item.role === "brand") {
                  return (
                    <ProfileCard
                      key={item.id}
                      id={item.id}
                      role="brand"
                      followers={item.followers}
                      likes={item.likes}
                      username={item.username}
                      profilePic={item.profilePic}
                      name={item.name}
                      coverPhoto={item.coverPhoto}
                    />
                  );
                }

                if (item.role === "creator") {
                  return (
                    <ProfileCard
                      key={item.id}
                      id={item.id}
                      role="creator"
                      followers={item.followers}
                      likes={item.likes}
                      username={item.username}
                      profilePic={item.profilePic}
                      name={item.name}
                      outfits={item.outfits}
                      coverPhoto={item.coverPhoto}
                    />
                  );
                }

                return null;
              })}

            </div>
          )}
      </div>
    </section>
  );
}