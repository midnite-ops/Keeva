import { Check } from "lucide-react";

interface PublishedSuccessProps {
  productName: string;
}

export default function PublishedSuccess({ productName }: PublishedSuccessProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
        <Check size={28} className="text-accent" strokeWidth={2.5} />
      </div>
      <div>
        <h2
          className="text-3xl muted-foreground"
        >
          PRODUCT PUBLISHED
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          {productName} is now live in your store.
        </p>
      </div>
    </div>
  );
}
