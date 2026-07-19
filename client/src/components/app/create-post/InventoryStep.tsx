import type { ProductFormData, Size } from '../../../types/createPostTypes'

import { SIZES } from '../../../types/createPostTypes'

interface InventoryStepProps {
  sizeStock: ProductFormData['sizeStock']
  onChange: (sizeStock: ProductFormData['sizeStock']) => void
}

export default function InventoryStep({ sizeStock, onChange }: InventoryStepProps) {
  const getQty = (size: Size) => sizeStock.find((s) => s.size === size)?.quantity ?? 0

  const toggleSize = (size: Size) => {
    const exists = sizeStock.find((s) => s.size === size)
    if (exists) {
      onChange(sizeStock.filter((s) => s.size !== size))
    } else {
      onChange([...sizeStock, { size, quantity: 1 }])
    }
  }

  const setQty = (size: Size, qty: number) => {
    const clamped = Math.max(0, qty)
    if (sizeStock.find((s) => s.size === size)) {
      onChange(sizeStock.map((s) => (s.size === size ? { ...s, quantity: clamped } : s)))
    }
  }

  const totalStock = sizeStock.reduce((sum, s) => sum + s.quantity, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-xl sm:text-2xl font-semibold text-black mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Sizes & Stock
        </h2>
        <p className="text-sm text-neutral-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Select the sizes you carry and set stock quantities for each.
        </p>
      </div>

      <div className="space-y-2">
        {SIZES.map((size) => {
          const active = !!sizeStock.find((s) => s.size === size)
          const qty = getQty(size)

          return (
            <div
              key={size}
              className={[
                'flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-150',
                active ? 'border-black bg-black/[0.02]' : 'border-neutral-200 bg-white',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={[
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-150 flex-shrink-0',
                    active ? 'border-black bg-black' : 'border-neutral-300 bg-white',
                  ].join(' ')}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span
                  className={[
                    'text-sm font-medium w-8',
                    active ? 'text-black' : 'text-neutral-400',
                  ].join(' ')}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {size}
                </span>
              </div>

              {active && (
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs text-neutral-400 mr-1"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Stock
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(size, qty - 1)}
                    className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black transition-colors"
                  >
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                      <path d="M1 1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) => setQty(size, parseInt(e.target.value) || 0)}
                    className="w-14 text-center border border-neutral-200 rounded-lg py-1 text-sm text-black focus:outline-none focus:border-black transition-colors"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                  <button
                    type="button"
                    onClick={() => setQty(size, qty + 1)}
                    className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-black hover:text-black transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {sizeStock.length > 0 && (
        <div
          className="flex items-center justify-between pt-3 border-t border-neutral-100"
        >
          <span className="text-xs text-neutral-400" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {sizeStock.length} size{sizeStock.length !== 1 ? 's' : ''} selected
          </span>
          <span className="text-xs font-medium text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {totalStock} units total
          </span>
        </div>
      )}
    </div>
  )
}
