import { useState, useCallback } from "react";
import type { ImageFile, SizeStock } from "../../types/createPostTypes";
import { STEPS } from "../../types/createPostTypes";
import StepHeader from "../../components/app/create-post/StepHeader";
import MediaStep from "../../components/app/create-post/MediaStep";
import DetailsStep from "../../components/app/create-post/DetailsStep";
import SizesStockStep from "../../components/app/create-post/SizesStockStep";
import PublishedSuccess from "../../components/app/create-post/PublishedSuccess";
import ReviewStep from "../../components/app/create-post/ReviewStep";



function CreatePost() {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<SizeStock[]>([]);
  const [published, setPublished] = useState(false);

  const addImages = useCallback((files: FileList | File[]) => {
    const next: ImageFile[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 8 - images.length)
      .map((f) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), file: f }));
    setImages((prev) => [...prev, ...next]);
  }, [images.length]);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const next = prev.filter((img) => img.id !== id);
      if (coverIndex >= next.length) setCoverIndex(Math.max(0, next.length - 1));
      return next;
    });
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.find((s) => s.size === size)
        ? prev.filter((s) => s.size !== size)
        : [...prev, { size, stock: 1 }]
    );
  };

  const updateStock = (size: string, delta: number) => {
    setSelectedSizes((prev) =>
      prev.map((s) => s.size === size ? { ...s, stock: Math.max(0, s.stock + delta) } : s)
    );
  };

  const setStockValue = (size: string, val: string) => {
    setSelectedSizes((prev) =>
      prev.map((s) => s.size === size ? { ...s, stock: Math.max(0, parseInt(val) || 0) } : s)
    );
  };

  const totalStock = selectedSizes.reduce((sum, s) => sum + s.stock, 0);

  const canNext = [
    images.length > 0,
    productName.trim() !== "" && category !== "" && price !== "",
    selectedSizes.length > 0,
    true,
  ][step];

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setStep(0);
      setImages([]);
      setProductName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setSelectedSizes([]);
      setCoverIndex(0);
    }, 2500);
  };

  return (
    <div
      className="min-h-screen bg-background  flex flex-col justify-start p-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Brand mark */}
      <div className="mb-8 ">
        <h2 className="text-foreground">
          Create Post
        </h2>
      </div>

      {/* Dialog shell */}
      <div className="w-full max-w-[900px] bg-bgBlack border border-border rounded-xl overflow-hidden shadow-2xl">
        <StepHeader
          step={step}
          canNext={canNext}
          onBack={() => step > 0 && setStep((s) => s - 1)}
          onNext={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : handlePublish()}
        />

        <div className="min-h-[420px]  flex">
          {step === 0 && (
            <MediaStep
              images={images}
              coverIndex={coverIndex}
              setCoverIndex={setCoverIndex}
              addImages={addImages}
              removeImage={removeImage}
            />
          )}

          {step === 1 && (
            <DetailsStep
              images={images}
              coverIndex={coverIndex}
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
              price={price}
              setPrice={setPrice}
              description={description}
              setDescription={setDescription}
            />
          )}

          {step === 2 && (
            <SizesStockStep
              images={images}
              coverIndex={coverIndex}
              selectedSizes={selectedSizes}
              toggleSize={toggleSize}
              updateStock={updateStock}
              setStockValue={setStockValue}
              totalStock={totalStock}
            />
          )}

          {step === 3 && !published && (
            <ReviewStep
              images={images}
              coverIndex={coverIndex}
              setCoverIndex={setCoverIndex}
              productName={productName}
              category={category}
              price={price}
              description={description}
              selectedSizes={selectedSizes}
              totalStock={totalStock}
              goToStep={setStep}
            />
          )}

          {published && <PublishedSuccess productName={productName} />}
        </div>
      </div>
    </div>
  );
}

export default CreatePost