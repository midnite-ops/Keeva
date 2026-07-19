import { useState } from 'react'
import type { ProductFormData } from '../../types/createPostTypes'
import StepHeader from '../../components/app/create-post/StepHeader'
import ImageUploadStep from '../../components/app/create-post/ImageUploadStep'
import DetailsStep from '../../components/app/create-post/DetailsStep'
import InventoryStep from '../../components/app/create-post/InventoryStep'
import ReviewStep from '../../components/app/create-post/ReviewStep'

const STEPS = [
  { number: 1, label: 'Images' },
  { number: 2, label: 'Details' },
  { number: 3, label: 'Inventory' },
  { number: 4, label: 'Review' },
]

const EMPTY: ProductFormData = {
  images: [],
  name: '',
  category: '',
  description: '',
  price: '',
  sizeStock: [],
}

export default function AddPost() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<ProductFormData>(EMPTY)
  const [published, setPublished] = useState(false)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleImages = (images: typeof form.images) => {
    setForm((prev) => ({ ...prev, images }))
    setCoverPreview(images.length > 0 ? URL.createObjectURL(images[0]) : null)
  }

  const canAdvance = () => {
    if (step === 1) return form.images.length > 0
    if (step === 2) return form.name.trim() !== '' && form.category !== '' && form.price !== ''
    if (step === 3) return form.sizeStock.length > 0
    return true
  }

  const handleReset = () => {
    setForm(EMPTY)
    setCoverPreview(null)
    setStep(1)
    setPublished(false)
  }

  if (published) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center w-full max-w-sm">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l5 5 11-10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2
            className="text-3xl font-semibold text-black mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Product Published
          </h2>
          <p
            className="text-sm text-neutral-500 mb-8 leading-relaxed"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <strong className="text-black">{form.name}</strong> is now live in your store.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Add another product
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Back */}
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-black disabled:opacity-0 disabled:pointer-events-none transition-colors flex-shrink-0"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Step label */}
          <span
            className="text-xs font-medium text-neutral-400 uppercase tracking-widest"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Step {step} of {STEPS.length}
          </span>

          {/* Continue / Publish */}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              disabled={!canAdvance()}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPublished(true)}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors flex-shrink-0"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              <span className="hidden sm:inline">Publish</span>
              <span className="sm:hidden">Publish</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page heading */}
        <div className="mb-8 sm:mb-10">
          <p
            className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-1"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Add Product
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold text-black leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            New Post
          </h1>
        </div>

        {/* Step indicator */}
        <StepHeader steps={STEPS} currentStep={step} />

        {/* Step content */}
        <div className="min-h-[320px]">
          {step === 1 && (
            <ImageUploadStep images={form.images} onChange={handleImages} />
          )}
          {step === 2 && (
            <DetailsStep
              data={{ name: form.name, category: form.category, description: form.description, price: form.price }}
              onChange={updateField}
            />
          )}
          {step === 3 && (
            <InventoryStep
              sizeStock={form.sizeStock}
              onChange={(sizeStock) => setForm((prev) => ({ ...prev, sizeStock }))}
            />
          )}
          {step === 4 && (
            <ReviewStep data={form} coverPreview={coverPreview} />
          )}
        </div>

        {/* Bottom spacer for mobile comfort */}
        <div className="h-10 sm:h-0" />
      </div>
    </div>
  )
}
