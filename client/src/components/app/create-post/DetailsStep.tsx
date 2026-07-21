import { useEffect, useState, type ChangeEvent } from "react";
import { CATEGORIES } from "../../../types/createPostTypes";
import type { ProductFormData } from "../../../types/createPostTypes";
import { productSearchLogic } from "../../../utils/searchLogic";
import type { Products } from "../../../types/productTypes";
import { findUser } from "../../../utils";
import { getStorage } from "../../../utils/localStorage/initializeStorage";
import { type Users } from "../../../types/userTypes";

interface ProductDetailsStepProps {
  data: Pick<
    ProductFormData,
    "name" | "category" | "description" | "price" | "taggedProducts"
  >;
  onChange: (field: string, value: string | string[] | number) => void;
  type: string;
}

const getUsers = getStorage<Users>("users");

const inputClass =
  "w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors bg-white";

const labelClass =
  "block text-xs font-medium text-neutral-600 mb-1.5 tracking-wide uppercase";

export default function DetailsStep({
  data,
  type,
  onChange,
}: ProductDetailsStepProps) {
  const [productSearch, setProductSearch] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<Products[]>([]);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);
  };
  useEffect(() => {
    if (!productSearch.trim()) {
      setOnSearch(false);
      setSearchResults([]);
      return;
    }
    setOnSearch(true);
    const results = productSearchLogic(productSearch);
    setSearchResults(results);
  }, [productSearch]);

  const handleChange = (field: string, value: string) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-xl sm:text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Product Details
        </h2>
        <p
          className="text-sm text-neutral-500"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          Give your product a name, category, and story.
        </p>
      </div>

      <div className="space-y-4">
        {/* Product name */}
        <div>
          <label
            className={labelClass}
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Product Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Linen Oversized Blazer"
            className={inputClass}
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          />
        </div>

        {/* Category + Price row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {type === "brand" ? (
            <div>
              <label
                className={labelClass}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Category
              </label>
              <select
                value={data.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={inputClass}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                <option value="" disabled>
                  Select category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className=" relative">
              <label
                className={labelClass}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                TagProducts
              </label>
              <input
                type="text"
                onChange={(e) => handleProductChange(e)}
                value={productSearch}
                placeholder="Search Products"
                className={inputClass}
              />

              {onSearch && (
                <div className="bg-background absolute -bottom-25 left-20 w-3/4 text-foreground h-25 py-2 px-4 rounded-md overflow-y-scroll flex gap-5 flex-col">
                  {searchResults.length === 0 ? (
                    <p className="text-center text-subtitleText mt-5">
                      No results found
                    </p>
                  ) : (
                    searchResults.map((item) => {
                      const brand = findUser(item.id, getUsers);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            onChange("taggedProducts", [
                              ...(data.taggedProducts ?? []),
                              item.id,
                            ]);
                          }}
                          className="cursor-pointer flex items-center gap-5"
                        >
                          <img
                            src={item?.images[0]}
                            alt={item.description}
                            className="size-15 rounded-md"
                          />
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <span className="text-xs text-subtitleText">
                              @{brand?.username}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <label
              className={labelClass}
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Price (USD)
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={data.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0.00"
                className={`${inputClass} pl-7`}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            className={labelClass}
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the fabric, fit, care instructions, and what makes this piece special…"
            rows={5}
            className={`${inputClass} resize-none leading-relaxed`}
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          />
          <p
            className="text-xs text-neutral-400 mt-1 text-right"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {data.description.length} / 800
          </p>
        </div>
      </div>
    </div>
  );
}
