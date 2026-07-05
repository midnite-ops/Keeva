// import { useState } from "react";
// import { Instagram, Facebook, Twitter, Youtube, Heart, Bookmark, ShoppingBag, Sparkles, TrendingUp, Plus, Star, Package } from "lucide-react";

// const SOCIALS = [
//   { icon: Instagram, label: "Instagram" },
//   { icon: Facebook, label: "Facebook" },
//   { icon: Twitter, label: "X / Twitter" },
//   { icon: Youtube, label: "YouTube" },
// ];

// const FOOTER_LINKS = [
//   { label: "About", href: "#" },
//   { label: "Careers", href: "#" },
//   { label: "Press", href: "#" },
//   { label: "Contact", href: "#" },
// ];

// const FEATURES = [
//   {
//     icon: Sparkles,
//     title: "Create the Look",
//     body: "Curate outfits from your wardrobe or wishlist and share them as a styled look with your audience.",
//   },
//   {
//     icon: ShoppingBag,
//     title: "Shop the Look",
//     body: "Every look is shoppable. Tap any piece to find it — across brands, budgets, and styles.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Earn from Style",
//     body: "When your followers shop through your looks, you earn. Fashion meets creator economy.",
//   },
// ];

// // --- Customer Card ---
// const CUSTOMERS = [
//   {
//     name: "Amara Osei",
//     handle: "@amaraosei",
//     avatar: "https://images.unsplash.com/photo-1758274251700-3ff5df155821?w=400&h=400&fit=crop&auto=format",
//     cover: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=300&fit=crop&auto=format",
//     styleProfile: ["Minimalist", "Monochrome", "Street"],
//     savedLooks: 84,
//     purchases: 12,
//     following: 203,
//   },
//   {
//     name: "Léa Fontaine",
//     handle: "@leafx",
//     avatar: "https://images.unsplash.com/photo-1758274251774-131c170e9cd9?w=400&h=400&fit=crop&auto=format",
//     cover: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=600&h=300&fit=crop&auto=format",
//     styleProfile: ["Feminine", "Soft", "Editorial"],
//     savedLooks: 47,
//     purchases: 8,
//     following: 119,
//   },
// ];

// // --- Creator Card ---
// const CREATORS = [
//   {
//     name: "Sofia Marin",
//     handle: "@sofiamakes",
//     avatar: "https://images.unsplash.com/photo-1581841064838-a470c740e8ee?w=400&h=400&fit=crop&auto=format",
//     looks: [
//       "https://images.unsplash.com/photo-1731589802397-6a1088d63630?w=200&h=260&fit=crop&auto=format",
//       "https://images.unsplash.com/photo-1559127452-cb4ef7888fa1?w=200&h=260&fit=crop&auto=format",
//       "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=200&h=260&fit=crop&auto=format",
//     ],
//     followers: "14.2k",
//     looksCount: 38,
//     earned: "$2,840",
//   },
//   {
//     name: "Daniel Reeves",
//     handle: "@danielrfashion",
//     avatar: "https://images.unsplash.com/photo-1583822419264-f405c079a27c?w=400&h=400&fit=crop&auto=format",
//     looks: [
//       "https://images.unsplash.com/photo-1699378999301-8c88a6a237d9?w=200&h=260&fit=crop&auto=format",
//       "https://images.unsplash.com/photo-1624353656309-8be1a6c457be?w=200&h=260&fit=crop&auto=format",
//       "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=200&h=260&fit=crop&auto=format",
//     ],
//     followers: "8.7k",
//     looksCount: 21,
//     earned: "$1,190",
//   },
// ];

// // --- Vendor Card ---
// const VENDORS = [
//   {
//     brand: "Atelier Voss",
//     handle: "@ateliervoss",
//     cover: "https://images.unsplash.com/photo-1753162658216-13e9cb395982?w=600&h=340&fit=crop&auto=format",
//     category: "Ready-to-Wear",
//     pieces: 64,
//     rating: 4.9,
//     commission: "12%",
//     tags: ["Luxury", "Sustainable", "Berlin"],
//   },
//   {
//     brand: "Studio Noor",
//     handle: "@studionoor",
//     cover: "https://images.unsplash.com/photo-1771587734529-a170a03a8419?w=600&h=340&fit=crop&auto=format",
//     category: "Artisan Knitwear",
//     pieces: 31,
//     rating: 4.7,
//     commission: "10%",
//     tags: ["Handcrafted", "Slow Fashion", "Amsterdam"],
//   },
// ];

// function CustomerCard({ c }: { c: typeof CUSTOMERS[0] }) {
//   const [saved, setSaved] = useState(false);
//   return (
//     <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col">
//       {/* Cover */}
//       <div className="relative h-28 bg-secondary overflow-hidden">
//         <img src={c.cover} alt="" className="w-full h-full object-cover opacity-60" />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
//         {/* Role badge */}
//         <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70 backdrop-blur-sm border border-foreground/10">
//           Customer
//         </span>
//       </div>

//       {/* Avatar */}
//       <div className="px-5 -mt-7 mb-3 relative">
//         <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-card bg-secondary">
//           <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
//         </div>
//       </div>

//       <div className="px-5 pb-5 flex flex-col gap-4 flex-1">
//         <div>
//           <p className="text-[15px] font-medium text-foreground leading-tight">{c.name}</p>
//           <p className="text-[11px] text-muted-foreground tracking-wider">{c.handle}</p>
//         </div>

//         {/* Style tags */}
//         <div className="flex flex-wrap gap-1.5">
//           {c.styleProfile.map((tag) => (
//             <span key={tag} className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border">
//           {[
//             { label: "Saved", value: c.savedLooks },
//             { label: "Bought", value: c.purchases },
//             { label: "Following", value: c.following },
//           ].map(({ label, value }) => (
//             <div key={label} className="text-center">
//               <p className="text-[15px] font-medium text-foreground" style={{ fontFamily: "'Italiana', serif" }}>{value}</p>
//               <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{label}</p>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => setSaved(p => !p)}
//           className="mt-auto flex items-center justify-center gap-2 text-[10px] tracking-[0.18em] uppercase border border-border rounded-full py-2.5 hover:border-foreground/30 transition-colors text-muted-foreground hover:text-foreground"
//         >
//           <Heart size={11} strokeWidth={1.5} className={saved ? "fill-accent text-accent" : ""} />
//           {saved ? "Saved" : "Save Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }

// function CreatorCard({ c }: { c: typeof CREATORS[0] }) {
//   const [following, setFollowing] = useState(false);
//   return (
//     <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col">
//       {/* Look grid preview */}
//       <div className="relative grid grid-cols-3 gap-0.5 h-40 bg-secondary overflow-hidden">
//         {c.looks.map((src, i) => (
//           <div key={i} className="overflow-hidden bg-secondary">
//             <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/60" />
//         <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-accent/20 text-accent backdrop-blur-sm border border-accent/30">
//           Creator
//         </span>
//       </div>

//       {/* Avatar + name */}
//       <div className="px-5 -mt-6 mb-3 relative flex items-end gap-3">
//         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-card bg-secondary flex-shrink-0">
//           <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
//         </div>
//         <div className="pb-0.5">
//           <p className="text-[14px] font-medium text-foreground leading-tight">{c.name}</p>
//           <p className="text-[10px] text-muted-foreground tracking-wider">{c.handle}</p>
//         </div>
//       </div>

//       <div className="px-5 pb-5 flex flex-col gap-4 flex-1">
//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
//           {[
//             { label: "Followers", value: c.followers },
//             { label: "Looks", value: c.looksCount },
//             { label: "Earned", value: c.earned },
//           ].map(({ label, value }) => (
//             <div key={label} className="text-center">
//               <p className="text-[14px] font-medium text-foreground" style={{ fontFamily: "'Italiana', serif" }}>{value}</p>
//               <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{label}</p>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => setFollowing(p => !p)}
//           className={`flex items-center justify-center gap-2 text-[10px] tracking-[0.18em] uppercase rounded-full py-2.5 transition-all duration-200 ${
//             following
//               ? "bg-accent text-accent-foreground border border-accent"
//               : "border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
//           }`}
//         >
//           <Bookmark size={11} strokeWidth={1.5} />
//           {following ? "Following" : "Follow"}
//         </button>
//       </div>
//     </div>
//   );
// }

// function VendorCard({ v }: { v: typeof VENDORS[0] }) {
//   return (
//     <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col">
//       {/* Cover image */}
//       <div className="relative h-36 bg-secondary overflow-hidden">
//         <img src={v.cover} alt={v.brand} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//         <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/80 backdrop-blur-sm border border-foreground/10">
//           Vendor
//         </span>
//         <div className="absolute bottom-3 left-4 right-4">
//           <p className="text-white text-[18px] leading-tight" style={{ fontFamily: "'Italiana', serif" }}>{v.brand}</p>
//           <p className="text-white/60 text-[10px] tracking-wider">{v.handle}</p>
//         </div>
//       </div>

//       <div className="px-5 py-4 flex flex-col gap-4 flex-1">
//         {/* Category + tags */}
//         <div>
//           <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{v.category}</p>
//           <div className="flex flex-wrap gap-1.5">
//             {v.tags.map((tag) => (
//               <span key={tag} className="text-[9px] tracking-[0.12em] uppercase px-2 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Stats row */}
//         <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
//           <div className="text-center">
//             <p className="text-[14px] font-medium text-foreground" style={{ fontFamily: "'Italiana', serif" }}>{v.pieces}</p>
//             <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Pieces</p>
//           </div>
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-1">
//               <Star size={10} className="fill-accent text-accent" strokeWidth={0} />
//               <p className="text-[14px] font-medium text-foreground" style={{ fontFamily: "'Italiana', serif" }}>{v.rating}</p>
//             </div>
//             <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Rating</p>
//           </div>
//           <div className="text-center">
//             <p className="text-[14px] font-medium text-accent" style={{ fontFamily: "'Italiana', serif" }}>{v.commission}</p>
//             <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Commission</p>
//           </div>
//         </div>

//         <button className="mt-auto flex items-center justify-center gap-2 text-[10px] tracking-[0.18em] uppercase border border-border rounded-full py-2.5 hover:border-foreground/30 transition-colors text-muted-foreground hover:text-foreground">
//           <Package size={11} strokeWidth={1.5} />
//           View Collection
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div
//       className="min-h-screen bg-background text-foreground"
//       style={{ fontFamily: "'Raleway', sans-serif" }}
//     >
//       {/* Nav */}
//       <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-16 border-b border-border bg-background/80 backdrop-blur-md">
//         <span
//           className="text-2xl tracking-tight text-foreground"
//           style={{ fontFamily: "'Italiana', serif" }}
//         >
//           Maison Éclat
//         </span>
//         <button className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-border px-4 py-2 rounded-full hover:border-foreground/40 hover:text-foreground transition-all duration-200 text-muted-foreground">
//           <Plus size={11} strokeWidth={2} />
//           Join Waitlist
//         </button>
//       </nav>

//       {/* Hero */}
//       <section className="pt-32 pb-24 px-8 md:px-16 max-w-[1440px] mx-auto">
//         <div className="max-w-2xl">
//           <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
//             <span className="w-1.5 h-1.5 rounded-full bg-accent" />
//             Coming Soon
//           </span>
//           <h1
//             className="text-[clamp(3.5rem,9vw,8rem)] leading-none tracking-tight text-foreground mb-8"
//             style={{ fontFamily: "'Italiana', serif" }}
//           >
//             Style is a<br />
//             <span className="italic">language.</span>
//           </h1>
//           <p className="text-[15px] font-light leading-relaxed text-foreground/60 max-w-md mb-10">
//             A new platform where you create looks, discover fashion, and earn from the styles your community loves.
//           </p>
//           <div className="flex flex-wrap gap-3">
//             <button className="text-[11px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-7 py-3 rounded-full font-medium hover:opacity-85 transition-opacity duration-200">
//               Request Early Access
//             </button>
//             <button className="text-[11px] tracking-[0.2em] uppercase border border-border px-7 py-3 rounded-full text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-all duration-200">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="px-8 md:px-16 pb-24 max-w-[1440px] mx-auto">
//         <div className="border-t border-border pt-16">
//           <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-12">How it works</p>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
//             {FEATURES.map(({ icon: Icon, title, body }, i) => (
//               <div key={title} className="flex flex-col gap-5">
//                 <div className="flex items-center gap-4">
//                   <span className="text-[10px] tracking-[0.2em] text-muted-foreground">0{i + 1}</span>
//                   <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
//                     <Icon size={14} strokeWidth={1.5} className="text-accent" />
//                   </div>
//                 </div>
//                 <h3
//                   className="text-xl leading-tight text-foreground"
//                   style={{ fontFamily: "'Italiana', serif" }}
//                 >
//                   {title}
//                 </h3>
//                 <p className="text-[13px] font-light leading-relaxed text-foreground/60">{body}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Profile cards */}
//       <section className="px-8 md:px-16 pb-28 max-w-[1440px] mx-auto">
//         <div className="border-t border-border pt-16 mb-12">
//           <div className="flex items-end justify-between">
//             <div>
//               <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">The Community</p>
//               <h2
//                 className="text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight text-foreground"
//                 style={{ fontFamily: "'Italiana', serif" }}
//               >
//                 Three Roles,<br />One Platform
//               </h2>
//             </div>
//             <p className="text-[11px] text-muted-foreground tracking-wider hidden sm:block">A preview of what's coming</p>
//           </div>
//         </div>

//         {/* Customers */}
//         <div className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <ShoppingBag size={13} strokeWidth={1.5} className="text-muted-foreground" />
//             <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Customers — discover & shop</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-2xl">
//             {CUSTOMERS.map((c) => <CustomerCard key={c.handle} c={c} />)}
//           </div>
//         </div>

//         {/* Creators */}
//         <div className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <Sparkles size={13} strokeWidth={1.5} className="text-accent" />
//             <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Creators — style & earn</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
//             {CREATORS.map((c) => <CreatorCard key={c.handle} c={c} />)}
//           </div>
//         </div>

//         {/* Vendors */}
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <Package size={13} strokeWidth={1.5} className="text-muted-foreground" />
//             <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Vendors — design & distribute</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
//             {VENDORS.map((v) => <VendorCard key={v.handle} v={v} />)}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-background text-foreground border-t border-border">
//         <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-20 pb-0">
//           {/* Brand logotype + tagline */}
//           <div className="mb-16 md:mb-24">
//             <span
//               className="block text-[clamp(3rem,10vw,9rem)] leading-none tracking-tight text-foreground select-none"
//               style={{ fontFamily: "'Italiana', serif" }}
//             >
//               Maison Éclat
//             </span>
//             <p className="mt-5 text-[13px] font-light tracking-[0.22em] uppercase text-accent">
//               Create the Look.&nbsp;&nbsp;Shop the Look.&nbsp;&nbsp;Earn from Style.
//             </p>
//           </div>

//           {/* Mid row */}
//           <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12 pb-20 border-b border-border">
//             <div className="max-w-xs">
//               <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
//                 <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
//                 Coming Soon
//               </span>
//               <p className="text-[15px] font-light leading-relaxed text-foreground/70">
//                 We're building something new at the intersection of fashion, community, and commerce.
//               </p>
//             </div>

//             <div className="flex flex-col items-start sm:items-end gap-6">
//               <nav className="flex flex-wrap gap-x-8 gap-y-3">
//                 {FOOTER_LINKS.map(({ label, href }) => (
//                   <a
//                     key={label}
//                     href={href}
//                     className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
//                   >
//                     {label}
//                   </a>
//                 ))}
//               </nav>
//               <div className="flex items-center gap-5">
//                 {SOCIALS.map(({ icon: Icon, label }) => (
//                   <a
//                     key={label}
//                     href="#"
//                     aria-label={label}
//                     className="text-muted-foreground hover:text-foreground transition-colors duration-200"
//                   >
//                     <Icon size={16} strokeWidth={1.5} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8 text-[11px] text-muted-foreground tracking-wider">
//             <p>© 2026 Maison Éclat. All rights reserved.</p>
//             <div className="flex flex-wrap gap-6">
//               {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="hover:text-foreground transition-colors duration-200 uppercase tracking-[0.15em]"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
