import { useRef, useState } from 'react'
import type { DragEvent, ChangeEvent} from 'react'

interface ImageUploadStepProps {
  images: File[]
  onChange: (images: File[]) => void
}

export default function ImageUploadStep({ images, onChange }: ImageUploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
    const combined = [...images, ...validFiles].slice(0, 6)
    onChange(combined)
    const newPreviews = combined.map((f) => URL.createObjectURL(f))
    setPreviews(newPreviews)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files)
  }

  const removeImage = (index: number) => {
    const next = images.filter((_, i) => i !== index)
    const nextPreviews = previews.filter((_, i) => i !== index)
    onChange(next)
    setPreviews(nextPreviews)
  }

  const hasCover = previews.length > 0

  return (
    <div className="space-y-5">
      <div>
        <h2
          className="text-xl sm:text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Product Images
        </h2>
        <p className="text-sm text-neutral-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Upload up to 6 images. The first image will be the cover.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />

      {/* Empty dropzone */}
      {!hasCover && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={[
            'relative rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none h-64 sm:h-80',
            dragging
              ? 'border-black bg-neutral-50 scale-[1.01]'
              : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50',
          ].join(' ')}
        >
          <div className="flex flex-col items-center gap-2.5 pointer-events-none px-4 text-center">
            <div className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v10M6 8l4-4 4 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17h12" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {dragging ? 'Drop images here' : 'Click or drag to upload'}
            </p>
            <p className="text-xs text-neutral-400" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              PNG, JPG, WEBP — up to 6 images
            </p>
          </div>
        </div>
      )}

      {/* Cover image with + button */}
      {hasCover && (
        <div className="space-y-3">
          {/* Main cover */}
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-neutral-100 group"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={previews[0]}
              alt="Cover image"
              className="w-full h-full object-cover"
            />
            {/* Cover badge */}
            <div
              className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Cover
            </div>
            {/* Remove cover */}
            <button
              type="button"
              onClick={() => removeImage(0)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 backdrop-blur-sm"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 6M8 2L2 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Add more — pill at bottom-right */}
            {images.length < 6 && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-neutral-100 transition-colors"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add photo
              </button>
            )}
          </div>

          {/* Additional thumbnails */}
          {previews.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {previews.slice(1).map((src, i) => (
                <div
                  key={i + 1}
                  className="relative group aspect-square rounded-xl overflow-hidden bg-neutral-100"
                >
                  <img
                    src={src}
                    alt={`Product image ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i + 1)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2L2 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <p
            className="text-xs text-neutral-400 text-right"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {images.length} / 6 images
          </p>
        </div>
      )}
    </div>
  )
}
