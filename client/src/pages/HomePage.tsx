import Navbar from "../components/Navbar"
import HowItWorksCard from "../components/HowItWorksCard"
import OutfitCard from "../components/OutfitCard"
import fashionOutfit from "../assets/fashion.jpg"
import { useState } from "react"

const HomePage = () => {
    const [readMore, setReadMore] = useState(false)
    const outfits = [
        {
            title: "Summer Outfit",
            description: "The best outift to wear this summer to impress your friends.",
            creator: '@amaracole',
            img: fashionOutfit
        },
        {
            title: "Street Chic",
            description: "The best outift to wear this summer to impress your friends.",
            creator: '@stylebyrio',
            img: fashionOutfit
        },
        {
            title: "Evening Elegance",
            description: "The best outift to wear this summer to impress your friends.",
            creator: '@luxelooks',
            img: fashionOutfit
        },
        {
            title: "Casual Weekend",
            description: "The best outift to wear this summer to impress your friends.",
            creator: '@riomode',
            img: fashionOutfit
        },
    ]
  return (
    <main className="bg-bgWhite">
        <section>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen text-center px-8 md:px-16 lg:px-20 bg-bgBlack text-white">
                <div className="flex flex-col gap-6">
                    <h1 className="text-6xl font-bold font-serif">Create the Look</h1>
                    <h1 className="text-4xl font-bold font-serif">Shop the Look</h1>
                    <h1 className="text-3xl font-bold font-serif">Earn from style</h1>
                </div>
            </div>
        </section>


        <section className="space py-24 border-t border-gray-200">
            <div className="heading items-start mb-15">
                <h1 className="font-extralight text-4xl lg:text-6xl">How keeva works</h1>
                <p className="text-subtitleText">A closed loop where style drives commerce</p>
            </div>

            <HowItWorksCard />
        </section>

        <section className=" h-screen overflow-hidden">
            <div className="space">
                <div className="heading items-start mb-10">
                    <h1 className="font-extralight text-4xl lg:text-6xl">Featured Looks</h1>
                    <p>Connect with your favourite designers and creators.</p>
                </div>

                <div className="flex items-center gap-10">
                    {outfits.map((item) => (
                        <OutfitCard title={item.title} img={item.img} subtitle={item.description} creator={item.creator}/>
                    ))}
                </div>
            </div>
        </section>
    </main>
  )
}

export default HomePage