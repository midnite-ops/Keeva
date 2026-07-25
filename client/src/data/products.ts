import type { Products } from "../types/productTypes";

const data: Products[] = [
  {
    id: "hf",
    brandId: '2j',
    price: 5000,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: [],
    likes: 0,
    category: "Bags",
    description: "",
    createdAt: "",
    name: "Gucci bag",
    type: "product",
  },

  {
    id: "56",
    brandId: '2j',
    price: 5000,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    ],
    stock: [],
    likes: 0,
    category: "Shoes",
    description: "",
    createdAt: "",
    name: "Nike Shoes",
    type: "product",
  },

  {
    id: "00",
    brandId: '2j',
    price: 5000,
    images: [
      "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: [],
    likes: 0,
    category: "Shoes",
    description: "",
    createdAt: "",
    name: "Prada Shoes",
    type: "product",
  },
  {
    id: "4t",
    brandId: '3o',
    name: "Rolex watch",
    price: 5000,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    ],
    stock: [],
    likes: 0,
    category: "Watches",
    description: "Sunday market energy. Linen everything, always. 🌿",
    createdAt: "",
    type: "product",
  },
];

export default data;
