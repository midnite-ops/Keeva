import { useState } from "react";
import { SocialButton, Divider, Field } from "../../components/authentication";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
    const { setSignupData, signupData } = useAuth()
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!signupData.email.trim() || !signupData.name.trim() || !signupData.password.trim()){
            return
        }else{
            navigate('/auth/role')
        }

       
    }
  

    return (
      <>

        <h2 className="font-serif text-2xl select-none tracking-[0.2em]">KEEVA</h2>
        <h1 className="text-3xl font-semibold text-gray-900 mt-5 mb-1 leading-tight">
          Create your<br />account
        </h1>
        <p className="text-sm text-gray-400 mb-8">Join thousands of style-forward people.</p>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full name">
              <input
                type="text"
                placeholder="Sofia Marlowe"
                value={signupData.name}
                onChange={(e) => setSignupData((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 outline-none transition-all"
                style={{ background: "#f9f8f6", border: "1.5px solid #eeeae4" }}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#eeeae4")}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                placeholder="sofia@example.com"
                value={signupData.email}
                onChange={(e) => setSignupData((f) => ({ ...f, email: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 outline-none transition-all"
                style={{ background: "#f9f8f6", border: "1.5px solid #eeeae4" }}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#eeeae4")}
              />
            </Field>
          </div>

          <Field label="Password">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={signupData.password}
                onChange={(e) => setSignupData((f) => ({ ...f, password: e.target.value }))}
                required
                minLength={8}
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-gray-900 outline-none transition-all"
                style={{ background: "#f9f8f6", border: "1.5px solid #eeeae4" }}
                onFocus={(e) => (e.target.style.borderColor = "#111")}
                onBlur={(e) => (e.target.style.borderColor = "#eeeae4")}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <StrengthMeter password={signupData.password} />
          </Field>

          <button
            type="submit" 
            className="w-full py-4 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: "#111" }}
          >
            Continue <ArrowRight size={15} />
          </button>
        </form>

        <Divider />
        <div className="flex gap-3">
          <SocialButton logo="G" label="Google" />
          <SocialButton logo="A" label="Apple" dark />
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to={'/auth/login'}
            className="font-semibold text-gray-900 hover:underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
        <p className="text-xs text-center text-gray-300 mt-3">
          By signing up you agree to our{" "}
          <span className="text-gray-400 underline underline-offset-2 cursor-pointer">Terms</span> &amp;{" "}
          <span className="text-gray-400 underline underline-offset-2 cursor-pointer">Privacy Policy</span>.
        </p>
      </>
    );
  }

function StrengthMeter({ password }: { password: string }) {
  const len = password.length;
  const strength = len === 0 ? 0 : len < 6 ? 1 : len < 10 ? 2 : 3;
  const labels = ["", "Weak", "Fair", "Strong"];
  const colors = ["#eee", "#e91e63", "#f6a623", "#22c55e"];

  return (
    <div className="flex items-center gap-3 mt-1">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: strength >= s ? colors[strength] : "#eeeae4" }}
          />
        ))}
      </div>
      {strength > 0 && (
        <span className="text-xs font-medium" style={{ color: colors[strength], minWidth: "2.5rem" }}>
          {labels[strength]}
        </span>
      )}
    </div>
  );
}

