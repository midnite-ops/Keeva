import type { Products } from "../types/productTypes";

const data: Products[] = [
  {
    id: "1",
    brandId: '6',
    caption: "",
    price: 5000,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 5,
    likes: 0,
    category: "Bags",
    description: "",
    createdAt: "",
    name: "Linen Wide-Leg Trouser",
    type: "product",
  },

  {
    id: "2",
    brandId: '2',
    caption: "",
    price: 5000,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 3,
    likes: 0,
    category: "Shoes",
    description: "",
    createdAt: "",
    name: "Linen Wide-Leg Trouser",
    type: "product",
  },

  {
    id: "3",
    brandId: '5',
    caption: "",
    price: 5000,
    images: [
      "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 3,
    likes: 0,
    category: "Shoes",
    description: "",
    createdAt: "",
    name: "Linen Wide-Leg Trouser",
    type: "product",
  },
  {
    id: "4",
    brandId: '3',
    name: "Linen Wide-Leg Trouser",
    caption: "Sunday market energy. Linen everything, always. 🌿",
    price: 5000,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 3,
    likes: 0,
    category: "Watches",
    description: "",
    createdAt: "",
    type: "product",
  },
];

export default data;
