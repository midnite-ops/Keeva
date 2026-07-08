import Navbar from "../../components/marketing/Navbar";
import HowItWorksCard from "../../components/marketing/HowItWorksCard";
import OutfitCard from "../../components/marketing/OutfitCard";
import fashionOutfit from "../assets/fashion.jpg";
import { Link } from "react-router";
import Footer from "../../components/marketing/Footer";

const HomePage = () => {
  const earnings = [
    {
      title: "Designer",
      earning: "85%",
      description:
        "Receive the largest share of every successful sale because you own the products that make every outfit possible.",
    },
    {
      title: "Creator",
      earning: "10%",
      description:
        "Earn every time someone purchases an outfit you styled, turning your creativity and influence into real income.",
    },
    {
      title: "Commission",
      earning: "5%",
      description:
        "Keeva's commission keeps the platform running, supports secure payments, and helps grow the creator and vendor ecosystem.",
    },
  ];
  const outfits = [
    {
      title: "Summer Outfit",
      description:
        "The best outift to wear this summer to impress your friends.",
      creator: "@amaracole",
      img: fashionOutfit,
    },
    {
      title: "Street Chic",
      description:
        "The best outift to wear this summer to impress your friends.",
      creator: "@stylebyrio",
      img: fashionOutfit,
    },
    {
      title: "Evening Elegance",
      description:
        "The best outift to wear this summer to impress your friends.",
      creator: "@luxelooks",
      img: fashionOutfit,
    },
    {
      title: "Casual Weekend",
      description:
        "The best outift to wear this summer to impress your friends.",
      creator: "@riomode",
      img: fashionOutfit,
    },
  ];
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
          <h1 className="font-extralight text-4xl lg:text-6xl">
            How keeva works
          </h1>
          <p className="text-subtitleText">
            A closed loop where style drives commerce
          </p>
        </div>

        <HowItWorksCard />
      </section>

      <section className=" h-screen overflow-hidden">
        <div className="space">
          <div className="heading items-start mb-10">
            <h1 className="font-extralight text-4xl lg:text-6xl">
              Featured Looks
            </h1>
            <p>Connect with your favourite designers and creators.</p>
          </div>

          <div className="flex items-center gap-10">
            {outfits.map((item) => (
              <OutfitCard
                title={item.title}
                img={item.img}
                subtitle={item.description}
                creator={item.creator}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bgBlack py-10 text-white">
        <div className="heading">
          <h1 className="font-extralight text-4xl lg:text-6xl mb-2 text-center">
            Transparent Earnings
          </h1>
          <p>Every sale is split fairly. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 space mt-15">
          {earnings.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-3 ${index === 1 ? "bg-actionsColor text-white" : index === 2 ? "bg-[#2A2520] text-white" : "bg-white text-black"} rounded-xl px-5 py-3`}
            >
              <h1 className="text-5xl font-semibold font-sans">
                {item.earning}
              </h1>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-40">
        <div className="heading">
          <h1 className="font-extralight text-4xl lg:text-6xl">
            Ready to Earn from Style?
          </h1>
          <p>Join Keeva to discover, sell, and earn through fashion.</p>
          <Link
            to={"/waitlist"}
            className="px-5 py-3  text-sm font-medium text-white bg-actionsColor rounded-full"
          >
            Join Waitlist
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
