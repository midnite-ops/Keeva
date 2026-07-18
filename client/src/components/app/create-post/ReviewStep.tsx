import type { ImageFile, SizeStock } from "../../../types/createPostTypes";
import ReviewRow from "./ReviewRow";

interface ReviewStepProps {
  images: ImageFile[];
  coverIndex: number;
  setCoverIndex: (i: number) => void;
  productName: string;
  category: string;
  price: string;
  description: string;
  selectedSizes: SizeStock[];
  totalStock: number;
  goToStep: (step: number) => void;
}

export default function ReviewStep({
  images, coverIndex, setCoverIndex,
  productName, category, price, description,
  selectedSizes, totalStock, goToStep,
}: ReviewStepProps) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Image strip */}
      <div className="w-full md:w-[400px] border-b md:border-b-0 md:border-r border-border flex-shrink-0 flex flex-col">
        <div className="h-56 sm:h-72 md:h-auto md:flex-1 overflow-hidden">
          {images.length > 0 && (
            <img src={images[coverIndex].url} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-1.5 p-3 border-t border-border flex-wrap">
            {images.slice(0, 6).map((img, i) => (
              <div
                key={img.id}
                className={`w-10 h-10 rounded overflow-hidden cursor-pointer border-2 transition-all ${
                  i === coverIndex ? "border-accent" : "border-transparent opacity-50 hover:opacity-100"
                }`}
                onClick={() => setCoverIndex(i)}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {images.length > 6 && (
              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                +{images.length - 6}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review details */}
      <div className="flex-1 p-5 sm:p-8 space-y-6 overflow-y-auto">
        <div>
          <h2
            className="text-2xl text-subtitleText leading-none mb-3"
          >
            REVIEW & PUBLISH
          </h2>
          <p className="text-xs text-muted-foreground">Double-check everything before publishing.</p>
        </div>

        <div className="space-y-4">
          <ReviewRow label="Product Name" value={productName} onEdit={() => goToStep(1)} />
          <ReviewRow label="Category" value={category} onEdit={() => goToStep(1)} />
          <ReviewRow label="Price" value={`$${parseFloat(price || "0").toFixed(2)}`} onEdit={() => goToStep(1)} />
          {description && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Description</p>
                <button onClick={() => goToStep(1)} className="text-[10px] text-accent hover:underline uppercase tracking-widest">Edit</button>
              </div>
              <p className="text-sm text-background leading-relaxed bg-muted rounded-md px-4 py-3">{description}</p>
            </div>
          )}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Sizes & Stock</p>
              <button onClick={() => goToStep(2)} className="text-[10px] text-accent hover:underline uppercase tracking-widest">Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSizes.map((s) => (
                <div key={s.size} className="flex items-center gap-1.5 bg-muted rounded-md px-3 py-1.5 text-xs">
                  <span className="text-muted-foreground font-medium">{s.size}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-accent">{s.stock} units</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Total Stock</span>
            <span className="text-muted-foreground font-semibold">{totalStock} units</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Images</span>
            <span className="text-muted-foreground font-semibold">{images.length} photos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

