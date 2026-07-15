import { useNavigate } from 'react-router-dom';
import { Sparkles, Camera, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, CheckCircle2,  } from 'lucide-react';

const roles = [
  {
    id: "customer",
    label: "Fashion Enthusiast",
    description: "Discover outfits, follow creators, build wishlists.",
    icon: Sparkles,
    color: "#7c72c8",
    bg: "#f4f3fd",
  },
  {
    id: "creator",
    label: "Style Creator",
    description: "Post your looks, grow a following, earn commissions.",
    icon: Camera,
    color: "#e91e8c",
    bg: "#fdf3f9",
  },
  {
    id: "brand",
    label: "Brand / Retailer",
    description: "List products, partner with creators, drive sales.",
    icon: ShoppingBag,
    color: "#111",
    bg: "#f5f5f5",
  },
];

const Role = () => {
    const [done, setDone] = useState(false);
    const {setSignupData, signupData} = useAuth()
    const role = roles.find((r) => r.id === signupData.role)!;
    const Icon = role.icon;
    const navigate = useNavigate()
    const complete = () => {
      setTimeout(() => {
        navigate('/app/home')
      }, 5000)
    }

    if(done){
      return (
        <div className="flex flex-col items-center text-center gap-6 py-10">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: role.bg }}
          >
            <Icon size={36} style={{ color: role.color }} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">You&apos;re all set!</h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Welcome aboard as a{" "}
              <span className="font-semibold" style={{ color: role.color }}>
                {role.label}
              </span>
              .<br />Your drip. journey starts now.
            </p>
          </div>
        </div>
      )
    }
  return (
      <div>

        <h2 className="font-serif text-2xl select-none tracking-[0.2em]">KEEVA</h2>
        <h1 className="text-3xl font-semibold text-gray-900 mt-5 mb-1 leading-tight">
          How will you<br />use the app?
        </h1>
        <p className="text-sm text-gray-400 mb-8">Choose a role — you can change this later.</p>

        <div className="flex flex-col gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const active = signupData.role === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSignupData((prev:any) => ({
                  ...prev, role: role.id
                }))}
                className="flex items-start gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-150 active:scale-[0.99]"
                style={{
                  border: active ? `2px solid ${role.color}` : "2px solid #eeeae4",
                  background: active ? role.bg : "#fff",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: active ? role.color : "#f0ede8" }}
                >
                  <Icon size={20} style={{ color: active ? "#fff" : role.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-900">{role.label}</span>
                    {active && <CheckCircle2 size={16} style={{ color: role.color, flexShrink: 0 }} />}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{role.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          disabled={!signupData.role}
          onClick={() => {setDone(true); complete() }}
          className="mt-8 w-full py-4 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={{
            background: signupData.role ? "#111" : "#d1cdc7",
            cursor: signupData.role ? "pointer" : "not-allowed",
          }}
        >
          Get started <ArrowRight size={15} />
        </button>
      </div>
    );
}

export default Role
    
    