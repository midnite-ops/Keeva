import { CATEGORIES } from '../../../types/createPostTypes'
import type {  ProductFormData } from '../../../types/createPostTypes'

interface ReviewStepProps {
  data: ProductFormData
  coverPreview: string | null
}

export default function ReviewStep({ data, coverPreview }: ReviewStepProps) {
  const categoryLabel = CATEGORIES.find((c) => c.value === data.category)?.label ?? data.category
  const totalStock = data.sizeStock.reduce((sum, s) => sum + s.quantity, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Review & Publish
        </h2>
        <p className="text-sm text-neutral-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Everything look good? Confirm and publish your product.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 overflow-hidden">
        {/* Cover image */}
        {coverPreview && (
          <div className="relative w-full h-56 bg-neutral-100">
            <img
              src={coverPreview}
              alt="Product cover"
              className="w-full h-full object-cover"
            />
            {data.images.length > 1 && (
              <div
                className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                +{data.images.length - 1} more
              </div>
            )}
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* Name + category + price */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-xl font-semibold text-black leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {data.name || <span className="text-neutral-300">No name set</span>}
              </h3>
              {data.category && (
                <span
                  className="inline-block mt-1 text-xs font-medium text-neutral-500 border border-neutral-200 rounded-full px-2.5 py-0.5"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {categoryLabel}
                </span>
              )}
            </div>
            {data.price && (
              <span
                className="text-2xl font-semibold text-black flex-shrink-0"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                ${parseFloat(data.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-100" />

          {/* Description */}
          {data.description && (
            <p
              className="text-sm text-neutral-600 leading-relaxed line-clamp-3"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {data.description}
            </p>
          )}

          {/* Sizes */}
          {data.sizeStock.length > 0 && (
            <div>
              <p
                className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Sizes & Stock
              </p>
              <div className="flex flex-wrap gap-2">
                {data.sizeStock.map(({ size, quantity }) => (
                  <div
                    key={size}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <span
                      className="text-sm font-medium text-black"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {size}
                    </span>
                    <span
                      className="text-xs text-neutral-400"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      × {quantity}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="text-xs text-neutral-400 mt-2"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {totalStock} units across {data.sizeStock.length} size{data.sizeStock.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
