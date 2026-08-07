export const initialCart = [
  {
    kind: "product",
    id: "p1",
    name: "Linen Wide-Leg Trousers",
    brand: "& Other Stories",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop&auto=format",
    price: 89,
    selectedSize: "S",
    sizes: [
      { label: "XS", available: 3 },
      { label: "S", available: 6 },
      { label: "M", available: 2 },
      { label: "L", available: 0 },
      { label: "XL", available: 1 },
    ],
    color: "Natural Ecru",
    quantity: 1,
    sku: "OST-LIN-002-S",
  },
  {
    kind: "outfit",
    id: "o1",
    name: "Copenhagen Street Look",
    creator: "Luna Edits",
    creatorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&auto=format",
    totalPrice: 830,
    products: [
      { name: "Oversized Blazer", brand: "Acne Studios", price: 450, size: "S" },
      { name: "Wide-Leg Jeans", brand: "Weekday", price: 80, size: "28/32" },
      { name: "Ankle Boots", brand: "Arket", price: 200, size: "EU 38" },
      { name: "Mini Crossbody Bag", brand: "Staud", price: 100, size: "One size" },
    ],
  },
  {
    kind: "product",
    id: "p2",
    name: "Oversized Linen Shirt",
    brand: "Totême",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&auto=format",
    price: 210,
    selectedSize: "M",
    sizes: [
      { label: "XS", available: 0 },
      { label: "S", available: 4 },
      { label: "M", available: 8 },
      { label: "L", available: 5 },
      { label: "XL", available: 2 },
    ],
    color: "Ivory White",
    quantity: 1,
    sku: "TOT-SHI-018-M",
  },
];

export const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-gray-900 outline-none transition-all bg-[#f9f8f6] border-[1.5px] border-[#eeeae4]";

export const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#111";
  e.target.style.background = "#fff";
};

export const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#eeeae4";
  e.target.style.background = "#f9f8f6";
};