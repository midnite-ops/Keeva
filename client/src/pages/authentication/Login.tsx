import { useState } from 'react';
import { Divider } from '../../components/authentication';
import { EyeOff,Eye, ArrowRight } from 'lucide-react';
import { Field, SocialButton } from '../../components/authentication';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const { loginData, setLoginData } = useAuth()
    const navigate = useNavigate()
    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!loginData.email.trim() || !loginData.password.trim()) return
        navigate('/app/feed')
    }
  return (
    < >
      <h2 className="font-serif text-2xl select-none tracking-[0.2em]">KEEVA</h2>
      <h1 className="text-3xl font-semibold text-gray-900 mt-5 mb-1 leading-tight">Welcome back</h1>
      <p className="text-sm text-gray-400 mb-8">Log in to your account to continue.</p>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => handleLogin(e)}
      >
        <Field label="Email">
          <input
            type="email"
            placeholder="sofia@example.com"
            value={loginData.email}
            onChange={(e) => setLoginData((f) => ({ ...f, email: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 outline-none transition-all"
            style={{ background: "#f9f8f6", border: "1.5px solid #eeeae4" }}
            onFocus={(e) => (e.target.style.borderColor = "#111")}
            onBlur={(e) => (e.target.style.borderColor = "#eeeae4")}
          />
        </Field>

        <Field label="Password">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              value={loginData.password}
              onChange={(e) => setLoginData((f) => ({ ...f, password: e.target.value }))}
              required
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
          <div className="flex justify-end">
            <button type="button" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
              Forgot password?
            </button>
          </div>
        </Field>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: "#111" }}
        >
          Log in <ArrowRight size={15} />
        </button>
      </form>

      <Divider />
      <div className="flex gap-3">
        <SocialButton logo="G" label="Google" />
        <SocialButton logo="A" label="Apple" dark />
      </div>

      <p className="text-xs text-center text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link to={'/auth/signup'}
          className="font-semibold text-gray-900 hover:underline underline-offset-2"
        >
          Sign up free
        </Link>
      </p>
    </>
  )
}

export default Login