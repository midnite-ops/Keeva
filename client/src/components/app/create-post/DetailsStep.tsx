import type { ChangeEvent } from 'react'
import {  CATEGORIES } from '../../../types/createPostTypes'
import type { ProductFormData } from '../../../types/createPostTypes'

interface ProductDetailsStepProps {
  data: Pick<ProductFormData, 'name' | 'category' | 'description' | 'price'>
  onChange: (field: string, value: string) => void
}

const inputClass =
  'w-full border border-neutral-200 rounded-lg px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors bg-white'

const labelClass = 'block text-xs font-medium text-neutral-600 mb-1.5 tracking-wide uppercase'

export default function DetailsStep({ data, onChange }: ProductDetailsStepProps) {
  const handle = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange(field, e.target.value)

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-xl sm:text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Product Details
        </h2>
        <p className="text-sm text-neutral-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Give your product a name, category, and story.
        </p>
      </div>

      <div className="space-y-4">
        {/* Product name */}
        <div>
          <label className={labelClass} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Product Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={handle('name')}
            placeholder="e.g. Linen Oversized Blazer"
            className={inputClass}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Category + Price row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Category
            </label>
            <select
              value={data.category}
              onChange={handle('category')}
              className={inputClass}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              <option value="" disabled>Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Price (USD)
            </label>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={data.price}
                onChange={handle('price')}
                placeholder="0.00"
                className={`${inputClass} pl-7`}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Description
          </label>
          <textarea
            value={data.description}
            onChange={handle('description')}
            placeholder="Describe the fabric, fit, care instructions, and what makes this piece special…"
            rows={5}
            className={`${inputClass} resize-none leading-relaxed`}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
          <p
            className="text-xs text-neutral-400 mt-1 text-right"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {data.description.length} / 800
          </p>
        </div>
      </div>
    </div>
  )
}
