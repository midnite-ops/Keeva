// import { SlidersHorizontal, Search } from "lucide-react";

// interface SearchBarProps {
//     search: string;
//     performSearch: React.Dispatch<React.SetStateAction<string>>;
//     onSearch: () => void;
//     showCategory: boolean;
//     showFilters: boolean;
//     setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const SearchBar = ({search, performSearch, onSearch}: SearchBarProps) => {
//     const handleChange = () => {

//     }
//     return(
//         <div className="relative">

//           <div className="absolute left-5 top-4">
//             <Search size={20} className="text-subtitleText/50" />
//           </div>

//           <button
//             disabled={!showCategory}
//             onClick={() => setShowFilters((prev) => !prev)}
//             className={`absolute right-5 top-3 flex items-center gap-2 py-1 px-2 cursor-pointer text-subtitleText/50 ${
//               showFilters ? "bg-subtitleText/10 rounded-full" : ""
//             }`}
//           >
//             <SlidersHorizontal size={20} />
//             <p className="text-xs font-semibold">Filters</p>
//           </button>

//           <input
//             value={search}
//             onChange={handleChange}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 performSearch();
//               }
//             }}
//             placeholder="Search outfits, creators, brands"
//             className="w-full py-3 pl-15 bg-white rounded-xl border-2 border-bgBlack/10 outline-none focus:border-bgBlack"
//           />

//         </div>
//     )
// } 