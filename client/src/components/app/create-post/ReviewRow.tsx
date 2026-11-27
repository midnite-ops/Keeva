interface ReviewRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

export default function ReviewRow({ label, value, onEdit }: ReviewRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50">
      <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</p>
      <div className="flex items-center gap-3">
        <span className="text-sm muted-foregroundfont-medium">{value}</span>
        <button onClick={onEdit} className="text-[10px] text-accent hover:underline uppercase tracking-widest">Edit</button>
      </div>
    </div>
  );
}
