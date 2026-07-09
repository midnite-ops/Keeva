import { Link } from "react-router"
const Header = () => {
  return (
    <section className="border-b border-subtitleText/25  px-5 py-5 z-10 bg-bgBlack flex items-center justify-between">
        <Link to={'/app/feed'} className="text-3xl font-medium font-serif tracking-[0.2em]">KEEVA</Link>

        <button className="text-white border-actionsColor/50 rounded-full bg-transparent border px-5 py-2 text-sm">Install Keeva</button>
    </section>
  )
}

export default Header