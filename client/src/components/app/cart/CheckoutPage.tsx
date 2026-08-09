import { ArrowLeft, CreditCard, MapPin, Package, Truck } from "lucide-react";
import { useState } from "react";
import type { CheckoutFormData } from "../../../types/cartTypes";
import { inputCls, focusStyle, blurStyle } from "../../../shared/constants";
import CheckoutSection from "./CheckoutSection";
// import PaymentForm from "./PaymentForm";
import { type Cart } from "../../../context/CartContext";
import { findUser } from "../../../utils/user/findUser";
import { findProduct } from "../../../utils/findProduct";

interface CheckoutPageProps {
  cart: Cart[];
  subtotal: number;
  shipping: number;
  total: number;
  onBack: () => void;
  onConfirm: () => void;
}
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export default function CheckoutPage({
  cart,
  subtotal,
  shipping,
  total,
  onBack,
  onConfirm,
}: CheckoutPageProps) {
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
  const [form, setForm] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    deliveryMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveInfo: false,
  });

  const set = (k: keyof CheckoutFormData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));
  const tax = subtotal * 0.08;
  const deliveryFee =
    form.deliveryMethod === "express"
      ? 18
      : form.deliveryMethod === "overnight"
        ? 35
        : shipping;
  const grandTotal = subtotal + deliveryFee + tax;
  total = grandTotal

  return (
    <div className="h-fit pb-25 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={15} /> Back to cart
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <h1
            className="text-2xl font-semibold text-gray-900"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Checkout
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Delivery", "Payment", "Review"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: i === 0 ? "#111" : "#ece9e4",
                    color: i === 0 ? "#fff" : "#aaa",
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: i === 0 ? "#111" : "#aaa" }}
                >
                  {step}
                </span>
              </div>
              {i < 2 && (
                <div className="w-8 h-px" style={{ background: "#ece9e4" }} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Contact */}
            <CheckoutSection
              title="Contact information"
              icon={<MapPin size={15} />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="First name">
                  <input
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Sofia"
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </FormField>
                <FormField label="Last name">
                  <input
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Marlowe"
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </FormField>
                <FormField label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="sofia@example.com"
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </FormField>
                <FormField label="Phone">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </FormField>
              </div>
            </CheckoutSection>

            {/* Delivery address */}
            <CheckoutSection
              title="Delivery address"
              icon={<Truck size={15} />}
            >
              <div className="flex flex-col gap-4">
                <FormField label="Street address">
                  <input
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="123 Fashion Ave"
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </FormField>
                <FormField label="Apartment, suite, etc. (optional)">
                  <input
                    value={form.apartment}
                    onChange={(e) => set("apartment", e.target.value)}
                    placeholder="Apt 4B"
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="City">
                    <input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="New York"
                      className={inputCls}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </FormField>
                  <FormField label="State">
                    <input
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="NY"
                      className={inputCls}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </FormField>
                  <FormField label="ZIP code">
                    <input
                      value={form.zip}
                      onChange={(e) => set("zip", e.target.value)}
                      placeholder="10001"
                      className={inputCls}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </FormField>
                </div>
                <FormField label="Country">
                  <select
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className={inputCls}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  >
                    {[
                      "United States",
                      "United Kingdom",
                      "Canada",
                      "Australia",
                      "Germany",
                      "France",
                      "Netherlands",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </FormField>
              </div>
            </CheckoutSection>

            {/* Delivery method */}
            <CheckoutSection
              title="Delivery method"
              icon={<Package size={15} />}
            >
              <div className="flex flex-col gap-3">
                {[
                  {
                    id: "standard",
                    label: "Standard Delivery",
                    eta: "5–7 business days",
                    price: shipping === 0 ? "Free" : "$12",
                    sub:
                      shipping === 0
                        ? "Free for orders over $300"
                        : "Tracked via DHL",
                  },
                  {
                    id: "express",
                    label: "Express Delivery",
                    eta: "2–3 business days",
                    price: "$18",
                    sub: "Tracked via FedEx",
                  },
                  {
                    id: "overnight",
                    label: "Overnight Delivery",
                    eta: "Next business day",
                    price: "$35",
                    sub: "Order before 2pm",
                  },
                ].map(({ id, label, eta, price, sub }) => (
                  <button
                    key={id}
                    onClick={() =>
                      set(
                        "deliveryMethod",
                        id as "standard" | "express" | "overnight",
                      )
                    }
                    className="flex items-center gap-4 rounded-xl p-4 text-left transition-all"
                    style={{
                      border:
                        form.deliveryMethod === id
                          ? "2px solid #111"
                          : "2px solid #ece9e4",
                      background:
                        form.deliveryMethod === id ? "#fafaf9" : "#fff",
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        border: `2px solid ${form.deliveryMethod === id ? "#111" : "#ccc"}`,
                      }}
                    >
                      {form.deliveryMethod === id && (
                        <div className="w-2 h-2 rounded-full bg-gray-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {eta} · {sub}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      {price}
                    </span>
                  </button>
                ))}
              </div>
            </CheckoutSection>

            {/* Payment */}
            <CheckoutSection title="Payment" icon={<CreditCard size={15} />}>
              <div></div>
              {/* <PaymentForm
                cardNumber={form.cardNumber}
                cardName={form.cardName}
                expiry={form.expiry}
                cvv={form.cvv}
                saveInfo={form.saveInfo}
                onChange={set}
              /> */}
            </CheckoutSection>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div
              className="rounded-2xl p-6 sticky top-8"
              style={{ background: "#fff", border: "1px solid #ece9e4" }}
            >
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Item list */}
              <div className="flex flex-col gap-3 mb-5">
                {cart.map((item) => {
                  const currentProduct = findProduct(item.id);
                  return (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                        <img
                          src={findProduct(item.id)?.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {findProduct(item.id)?.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {item.type === "product"
                            ? findUser(item.id)?.username
                            : `1 pieces`}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 flex-shrink-0">
                        $
                        {currentProduct.type === "product"
                          ? currentProduct.price *
                            currentProduct.stock.reduce(
                              (sum, item) => sum + item.quantity,
                              0,
                            )
                          : currentProduct?.totalPrice *
                            currentProduct.taggedProducts.length}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="h-px mb-4" style={{ background: "#ece9e4" }} />

              <div className="flex flex-col gap-2.5 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? "Free" : `$${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px" style={{ background: "#ece9e4" }} />
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onConfirm}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ background: "#111" }}
              >
                Place Order <ArrowLeft size={15} />
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                <MapPin size={12} /> SSL secured checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
