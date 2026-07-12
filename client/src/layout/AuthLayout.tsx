import { Quote } from "lucide-react";
import { Outlet } from "react-router-dom";

const panelImages = {
  login: {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1200&fit=crop&auto=format",
    quote: "Style is a way to say who you are without having to speak.",
    author: "Rachel Zoe",
  },
  signup: {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&auto=format",
    quote: "Fashion is the armor to survive the reality of everyday life.",
    author: "Bill Cunningham",
  },
  role: {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop&auto=format",
    quote: "Clothes mean nothing until someone lives in them.",
    author: "Marc Jacobs",
  },
};

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#faf9f7" }}
    >
      {/* Left image panel */}
      <div className="hidden lg:flex relative w-[52%] shrink-0 overflow-hidden">
        <img
          src={panelImages.login.src}
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />
        {/* Top wordmark */}
        <div className="absolute top-10 left-10">
          <h2 className="font-serif text-2xl select-none tracking-[0.2em] text-background">KEEVA</h2>
        </div>
        {/* Bottom quote */}
        
        <div className="absolute bottom-10 left-10 right-10">
          <Quote size={22} className="text-white/40 mb-3" />
          <p className="text-white text-lg font-medium leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {panelImages.login.quote}
          </p>
          <p className="text-white/50 text-sm mt-2">— {panelImages.login.author}</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 overflow-y-auto">
        <div className="w-full" style={{ maxWidth: 440 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout