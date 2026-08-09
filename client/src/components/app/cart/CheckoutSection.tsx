import React from "react";

interface CheckoutSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function CheckoutSection({ title, icon, children }: CheckoutSectionProps) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #ece9e4" }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-gray-400">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}