import {  useState } from "react";
import PostCard from "../../components/app/PostCard";
import { getStorage } from "../../utils/localStorage/initializeStorage";
import type { Outfits, Products, ProductType } from "../../types/productTypes";
import { getCurrentUser } from "../../utils/user/getCurrentUser";
import { useCart } from "../../context/CartContext";



const AppHome = () => {
  const outfits = getStorage<Outfits>('outfits')
  const products = getStorage<Products>('products')
  const { cart, addToCart, removeFromCart } = useCart()


  const posts:ProductType[] = [...outfits, ...products]
 
  const feedFilter = ["For You", "Trending", "Following", "New", "Brands"];
  const [currentFeed, setCurrentFeed] = useState("For You");
  return (
    <main className=" text-white h-screen overflow-y-hidden ">
      <section className=" h-screen flex  gap-6 w-full ">
        <div className="relative overflow-hidden h-full flex-1 flex md:block justify-center">
          <div className="absolute pb-5 w-full top-0 pt-4 ">
            <ul className="flex gap-4 justify-center xl:justify-start items-center w-full  overflow-x-auto no-scrollbar text-foreground">
              {feedFilter.map((item) => (
                <li
                  className={`${item === currentFeed ? "border-b border-foreground" : ""} text-sm font-bold tracking-wide pb-1 cursor-pointer`}
                  onClick={() => setCurrentFeed(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-y-scroll w-full flex gap-10 md:gap-10 flex-col no-scrollbar h-11/12 pb-70 md:pb-40 mt-15  md:mt-10">
            {posts.map((item) => (
              <PostCard key={item.id} data={item} currentUser = {getCurrentUser()!} inCart={cart.some((cartItem) => cartItem.id === item.id)} addToCart={addToCart} removeFromCart={removeFromCart}/>
            ))}
          </div>
        </div>

        <div className="hidden xl:block w-120 shrink-0 md:px-10 px-20 pt-1">
          <h3 className="font-semibold mt-10 text-foreground">
            Suggested Categories
          </h3>
          {[1, 2, 3].map(() => (
            <div className="bg-black/90 text-background  rounded-lg flex items-center py-3 mt-5 px-5 justify-between w-full">
              <div className="flex gap-2">
                <div className="size-9 bg-white rounded-lg"></div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs">Linen Blazer</h4>
                  <p className="text-subtitleText text-[10px]">Rider Stars</p>
                </div>
              </div>

              <div className="text-sm font-bold"> 8$</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AppHome;
