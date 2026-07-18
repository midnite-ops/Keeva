import { Image as ImageIcon } from "lucide-react";
import type { ImageFile } from "../../../types/createPostTypes";

interface ImagePreviewPanelProps {
  images: ImageFile[];
  coverIndex: number;
}

export default function ImagePreviewPanel({ images, coverIndex }: ImagePreviewPanelProps) {
  return (
    <div className="w-full h-56 sm:h-72 md:h-auto md:w-[400px] border-b md:border-b-0 md:border-r border-border flex-shrink-0 overflow-hidden">
      {images.length > 0 ? (
        <img src={images[coverIndex].url} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <ImageIcon size={24} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

