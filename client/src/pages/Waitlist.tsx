import { useState } from "react";
import heroImage from "../assets/hero-fashion.jpg";
import { Shirt, Sparkles, ShoppingBag } from "lucide-react";
import { apiRequest } from "../lib/apiRequest";
import { ClipLoader } from "react-spinners";
import HowItWorksCard from "../components/HowItWorksCard";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        alert("Please enter a valid email address.");
        return;
      }
      setLoading(true);
      

      await apiRequest({ method: "POST", endpoint: "add-to-waitlist", data: { email } });
      setSubmitted(true);
      
    } catch (error: any) {
        setSubmitted(true);
        setMessage(error?.response?.data?.error || "Something went wrong, please try again.");
        console.log('error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-sm">
        <span className="font-serif text-xl tracking-[0.2em] text-foreground uppercase">Keeva</span>
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-sans">AW 2026</span>
      </nav>

      {/* Hero */}
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image side */}
        <div className="relative h-[60vh] lg:h-screen overflow-hidden animate-fade-in">
          <img
            src={heroImage}
            alt="Fashion editorial - model in minimalist beige outfit"
            className="absolute inset-0 w-full h-full object-cover object-top"
            width={896}
            height={1344}
          />
          <div className="absolute inset-0 bg-foreground/5" />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center px-5 md:px-16 lg:px-20 py-20 lg:py-0">
          <div className="max-w-md">
            <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase font-sans mb-6 animate-fade-up animate-delay-200">
              Where Design Meets Style
            </p>

            <h1 className="font-serif text-4xl md:text-5xl font-lighter lg:text-[3.4rem] text-foreground leading-[1.1] mb-6 animate-fade-up animate-delay-400">
              Designers create.<br />
              Creators <em className="font-normal">style.</em><br />
              You shop.
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-10 max-w-sm animate-fade-up animate-delay-600">
              A new kind of fashion platform — designers upload their pieces, creators style them into complete looks, and you buy outfits curated by the people you trust
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="animate-fade-up animate-delay-600">
                <div className="flex border border-border">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3.5 text-sm font-sans bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none "
                  />
                  <button
                    type="submit"
                    className="px-2 md:px-6 py-3.5 text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans bg-black text-white hover:bg-foreground/90 cursor-pointer transition-colors flex-1"
                    disabled={loading}
                  >
                    {loading ? <ClipLoader size={15} color="white" /> : "Get Early Access"}
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3 font-sans">
                  Be first in line. No spam, ever.
                </p>
              </form>
            ) : (
              <div className="animate-fade-up border border-border p-6">
                {message ? (
                  <p className="text-lg font-serif">{message}</p>
                ) : (
                  <>
                    <p className="font-serif text-lg text-foreground mb-1">You're on the list.</p>
                    <p className="text-sm text-muted-foreground font-sans">
                      Stay tuned for updates and thank you for your interest in Keeva! We can't wait to share our vision with you.
                    </p>
                  </>
                )}
                
              </div>
            )}
          </div>
        </div>
      </main>

      {/* How it works */}
      <section className="px-8 md:px-16 lg:px-20 py-24 border-t border-gray-200">
            <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase font-sans mb-16 animate-fade-up">
            How It Works
            </p>
            <HowItWorksCard />
        </section>

      {/* Footer line */}
      <footer className="fixed bg-white bottom-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 py-4">
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
          © 2026 Keeva
        </span>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans hover:text-foreground transition-colors">
            Instagram
          </a>
          <a href="#" className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans hover:text-foreground transition-colors">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Waitlist;
