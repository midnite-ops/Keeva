import { useState } from "react";
import OutfitCard from "../../components/app/OutfitCard";
import fashionOutfit from "../../assets/fashion.jpg";


const AppFeed = () => {
  const feedFilter = ["For You", "Trending", "Following", "New", "Brands"];
  const [currentFeed, setCurrentFeed] = useState("For You");
  return (
    <main className=" text-white h-screen overflow-y-hidden pt-4 px-4 ">

      <section className=" h-screen flex  gap-6 w-full ">
        <div className="relative h-full flex-1">

          <div className="absolute top-0">
            <ul className="flex gap-5 items-center w-full  overflow-x-auto no-scrollbar">
              {feedFilter.map((item) => (
                <li
                  className={`${item === currentFeed ? "border-b border-white" : ""} text-sm font-bold tracking-wide pb-1 cursor-pointer`}
                  onClick={() => setCurrentFeed(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-y-scroll w-full flex gap-15 flex-col no-scrollbar h-11/12 pb-40  mt-10 ">
            {[1,2,34,5].map(() => (
              <OutfitCard title="Street Chic" subtitle="The best outift to wear this summer to impress your friends and family." img={fashionOutfit} creator="@stylebyrio" />
            ))}
          </div>
        </div>

        <div className="hidden xl:block w-120 shrink-0 md:px-10 px-20 pt-1">
          
          <h2 className="font-semibold mt-10">Suggested Categories</h2>
          {[1,2,3].map(() => (
            <div className="bg-actionsColor/10 rounded-lg flex items-center py-3 mt-5 px-5 justify-between w-full">
              <div className="flex gap-2">
                <div className="size-9 bg-white rounded-lg"></div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs">Linen Blazer</h4>
                  <p className="text-white/50 text-[10px]">Rider Stars</p>
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

export default AppFeed;
