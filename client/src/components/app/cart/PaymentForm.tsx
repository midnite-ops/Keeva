import { X } from "lucide-react";

import { inputCls, focusStyle, blurStyle } from "../../../shared/constants";

interface PaymentFormProps {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  saveInfo: boolean;
  onChange: (field: string, value: string | boolean) => void;
}
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export default function PaymentForm({
  cardNumber,
  cardName,
  expiry,
  cvv,
  saveInfo,
  onChange,
}: PaymentFormProps) {
    function FormField({ label, children }: FormFieldProps) {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-semibold text-gray-400 uppercase"
          style={{ letterSpacing: "0.07em" }}
        >
          {label}
        </label>
        {children}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 ">
      <FormField label="Card number">
        <div className="relative">
          <input
            value={cardNumber}
            onChange={(e) =>
              onChange(
                "cardNumber",
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 16)
                  .replace(/(.{4})/g, "$1 ")
                  .trim()
              )
            }
            placeholder="4242 4242 4242 4242"
            className={inputCls}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
            {["V", "M", "A"].map((b) => (
              <span key={b} className="w-7 h-5 rounded text-[9px] font-bold flex items-center justify-center" style={{ background: "#f0ede8", color: "#999" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </FormField>
      <FormField label="Cardholder name">
        <input
          value={cardName}
          onChange={(e) => onChange("cardName", e.target.value)}
          placeholder="Sofia Marlowe"
          className={inputCls}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Expiry">
          <input
            value={expiry}
            onChange={(e) => onChange("expiry", e.target.value)}
            placeholder="MM / YY"
            className={inputCls}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </FormField>
        <FormField label="CVV">
          <input
            type="password"
            value={cvv}
            onChange={(e) => onChange("cvv", e.target.value.slice(0, 4))}
            placeholder="•••"
            className={inputCls}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </FormField>
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer">
        <div
          onClick={() => onChange("saveInfo", !saveInfo)}
          className="w-4 h-4 rounded flex items-center justify-center transition-all flex-shrink-0"
          style={{ background: saveInfo ? "#111" : "#fff", border: `2px solid ${saveInfo ? "#111" : "#ccc"}` }}
        >
          {saveInfo && <X size={9} className="text-white" strokeWidth={3} />}
        </div>
        <span className="text-xs text-gray-500">Save payment info for future orders</span>
      </label>
    </div>
  );
}