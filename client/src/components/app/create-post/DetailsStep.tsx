import { useEffect, useState } from "react";
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
  onChange: (field: string, value: string | number | Products[]) => void;
  role: string;
  onDeleteProduct: (id:string) => void
  updatePrice: (price: number, event:string) => void
}

const getUsers = getStorage<Users>("users");

const inputClass =
  "w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors bg-white";

const labelClass =
  "block text-xs font-medium text-neutral-600 mb-1.5 tracking-wide uppercase";

export default function DetailsStep({
  data,
  role,
  onChange,
  onDeleteProduct,
  updatePrice
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

  const handleChange = (field: string, value: string | number) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-xl sm:text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {role === "brand" ? "Product" : "Outfit"} Details
        </h2>
        <p
          className="text-sm text-neutral-500"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          Give your {role === "brand" ? "product" : "outfit"} a name, category,
          and story.
        </p>
      </div>

      <div className="space-y-4">
        {/* Product name */}
        <div>
          <label
            className={labelClass}
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {role === "brand" ? "Product" : "Outfit"} Name
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
          {role === "brand" ? (
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
                Tag Products
              </label>
              <input
                type="text"
                onChange={(e) => handleProductChange(e)}
                value={productSearch}
                placeholder="Search Products"
                className={inputClass}
              />

              {data.taggedProducts?.length !== 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {data.taggedProducts!.map((item) => {
                    return (
                      <div
                        key={item.brandId}
                        className="text-foreground bg-background text-[10px]  px-2 py-0.5 rounded-full flex gap-2"
                      >
                        <p>{item.name}</p>
                        <p className="cursor-pointer" onClick={() =>{ onDeleteProduct(item.id)
                        updatePrice(item.price, '-')
                        }}>x</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {onSearch && (
                <div className="bg-background z-10 absolute -bottom-20 right-10 w-3/4 text-foreground h-15 p-2 rounded-md overflow-y-scroll flex gap-5 flex-col">
                  {searchResults.length === 0 ? (
                    <p className="text-center text-subtitleText mt-5">
                      No results found
                    </p>
                  ) : (
                    searchResults.map((item) => {
                      const brand = findUser(item.id, getUsers);
                      const isDisabled = data.taggedProducts?.some((productItem) => productItem.id === item.id)
                      return (
                        <button
                          key={item.id}
                          disabled={isDisabled}
                          onClick={() => {
                            setOnSearch(false);
                            setProductSearch("");
                            const newArray = [
                              ...(data.taggedProducts ?? []),
                              item,
                            ];
                            updatePrice(item.price, '+')
                            onChange("taggedProducts", newArray);
                          }}
                          className={`flex items-center gap-3 ${isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <img
                            src={item?.images[0]}
                            alt={item.description}
                            className="size-10 rounded-md"
                          />
                          <div className="flex flex-col space-y-0">
                            <p className="text-xs text-start">{item.name}</p>
                            <span className="text-[10px] text-start text-subtitleText">
                              @{brand?.username}
                            </span>
                          </div>
                        </button>
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
             Total Price (USD)
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                $
              </span>
              {role === 'brand' ? <input
                type="number"
                min="0"
                step="0.01"
                value={data.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                placeholder="0.00"
                className={`${inputClass} pl-7`}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              /> : <input
                type="number"
                disabled
                min="0"
                step="0.01"
                value={data.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                placeholder="0.00"
                className={`${inputClass} pl-7`}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              />}
              
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
