

export function SocialButton({ logo, label, dark = false }: { logo: string; label: string; dark?: boolean }) {
  return (
    <button
      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
      style={
        dark
          ? { background: "#111", color: "#fff", border: "1.5px solid #111" }
          : { background: "#fff", color: "#111", border: "1.5px solid #eeeae4" }
      }
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: dark ? "#333" : "#f0ede8" }}
      >
        {logo}
      </span>
      {label}
    </button>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: "#eeeae4" }} />
      <span className="text-xs text-gray-300">or continue with</span>
      <div className="flex-1 h-px" style={{ background: "#eeeae4" }} />
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold text-gray-500 uppercase tracking-widest"
        style={{ letterSpacing: "0.07em" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

