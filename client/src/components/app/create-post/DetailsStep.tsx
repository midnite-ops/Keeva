import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORIES} from "../../../types/createPostTypes";
import ImagePreviewPanel from "./ImagePreviewPanel";
import type { ImageFile } from '../../../types/createPostTypes'

interface DetailsStepProps {
  images: ImageFile[];
  coverIndex: number;
  productName: string;
  setProductName: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
}

export default function DetailsStep({
  images, coverIndex,
  productName, setProductName,
  category, setCategory,
  price, setPrice,
  description, setDescription,
}: DetailsStepProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <ImagePreviewPanel images={images} coverIndex={coverIndex} />

      <div className="flex-1 p-5 sm:p-8 space-y-6 overflow-y-auto">
        <div>
          <h2
            className="text-2xl text-subtitleText leading-none mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.05em" }}
          >
            PRODUCT DETAILS
          </h2>
          <p className="text-xs text-muted-foreground">Name, category, price and description.</p>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Oversized Wool Coat"
            className="w-full bg-input-background text-background placeholder:text-muted-foreground rounded-md px-4 py-3 text-sm border border-border focus:outline-none focus:border-accent/60 transition-colors"
          />
        </div>

        <div className="space-y-1 relative">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground">Category</label>
          <button
            type="button"
            onClick={() => setCategoryOpen((o) => !o)}
            className="w-full bg-input-background text-left rounded-md px-4 py-3 text-sm border border-border focus:outline-none hover:border-accent/40 transition-colors flex items-center justify-between"
          >
            <span className={category ? "text-background " : ""}>{category || "Select category"}</span>
            <ChevronDown size={14} className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
          </button>
          {categoryOpen && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-background border border-subtitleText rounded-md overflow-y-scroll h-50 shadow-xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className=' text-foreground w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors'
                  onClick={() => { setCategory(cat); setCategoryOpen(false); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-input-background text-background rounded-md pl-8 pr-4 py-3 text-sm border border-border focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the cut, material, and feel..."
            rows={4}
            className="w-full bg-input-background text-background placeholder:text-muted-foreground rounded-md px-4 py-3 text-sm border border-border focus:outline-none focus:border-accent/60 resize-none transition-colors"
          />
          <p className="text-[10px] text-muted-foreground text-right">{description.length} / 600</p>
        </div>
      </div>
    </div>
  );
}
