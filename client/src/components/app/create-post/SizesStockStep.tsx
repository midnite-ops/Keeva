import { SIZES } from "../../../types/createPostTypes";
import type { ImageFile, SizeStock } from "../../../types/createPostTypes"
import ImagePreviewPanel from "./ImagePreviewPanel";

interface SizesStockStepProps {
  images: ImageFile[];
  coverIndex: number;
  selectedSizes: SizeStock[];
  toggleSize: (size: string) => void;
  updateStock: (size: string, delta: number) => void;
  setStockValue: (size: string, val: string) => void;
  totalStock: number;
}

export default function SizesStockStep({
  images, coverIndex,
  selectedSizes, toggleSize, updateStock, setStockValue, totalStock,
}: SizesStockStepProps) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <ImagePreviewPanel images={images} coverIndex={coverIndex} />

      <div className="flex-1 p-5 sm:p-8 space-y-6 overflow-y-auto">
        <div>
          <h2
            className="text-2xl text-subtitleText leading-none mb-1"
          >
            SIZES & STOCK
          </h2>
          <p className="text-xs text-muted-foreground">Select available sizes, then set stock per size.</p>
        </div>

        {/* Size picker */}
        <div>
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Available sizes</p>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => {
              const active = selectedSizes.find((s) => s.size === size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 rounded-md text-xs font-medium border transition-all ${
                    active
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-input-background text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stock per size */}
        {selectedSizes.length > 0 && (
          <div className="border border-border rounded-md overflow-hidden">
            <div className="px-4 py-2.5 bg-muted border-b border-border flex items-center justify-between">
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Stock per size</p>
              <p className="text-[10px] tracking-widest uppercase text-accent">{totalStock} units total</p>
            </div>
            <div className="divide-y divide-border">
              {selectedSizes.map((s) => (
                <div key={s.size} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-background w-16">{s.size}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateStock(s.size, -1)}
                      className="w-7 h-7 rounded-md bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center text-base leading-none transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={s.stock}
                      onChange={(e) => setStockValue(s.size, e.target.value)}
                      className="w-14 text-center bg-input-background text-background text-sm rounded-md border border-border py-1.5 focus:outline-none focus:border-accent/60"
                    />
                    <button
                      type="button"
                      onClick={() => updateStock(s.size, 1)}
                      className="w-7 h-7 rounded-md bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center text-base leading-none transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
