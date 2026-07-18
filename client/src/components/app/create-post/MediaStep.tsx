import { useRef, useState } from "react";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import type { ImageFile } from "../../../types/createPostTypes";

interface MediaStepProps {
  images: ImageFile[];
  coverIndex: number;
  setCoverIndex: (i: number) => void;
  addImages: (files: FileList | File[]) => void;
  removeImage: (id: string) => void;
}

export default function MediaStep({ images, coverIndex, setCoverIndex, addImages, removeImage }: MediaStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row w-full h-100">
      {/* Drop area */}
      <div
        className={`relative min-h-[280px] sm:min-h-[360px] md:min-h-0 md:flex-1 border-b border-subtitleText/50 md:border-b-0 md:border-r border-border transition-colors cursor-pointer ${
          isDragging ? "bg-accent/5" : "bg-muted/30"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); addImages(e.dataTransfer.files); }}
        onClick={() => images.length < 8 && fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
          onChange={(e) => e.target.files && addImages(e.target.files)} />

        {images.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground px-4">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center">
              <ImageIcon size={24} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-foreground text-sm font-medium">Drag photos here</p>
              <p className="text-xs mt-1">PNG, JPG, WEBP — up to 8 images</p>
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 px-5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-md tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              Select from device
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={images[coverIndex].url}
              alt="Cover preview"
              className="w-full h-full object-contain"
            />
            <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-accent text-accent-foreground px-2 py-1 rounded-sm font-semibold">
              Cover
            </span>
            {images.length < 8 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                className="absolute bottom-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails panel: horizontal scroll strip on mobile, vertical rail from md up */}
      {images.length > 0 && (
        <div className="flex flex-row md:flex-col gap-2 p-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:w-24">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`relative w-16 h-16 md:w-full md:h-auto shrink-0 md:aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                i === coverIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              onClick={() => setCoverIndex(i)}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/70 rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
              >
                <X size={8} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

