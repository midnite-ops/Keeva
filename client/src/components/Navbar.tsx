import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-sm text-white">
        <div className="flex items-center gap-30">
            <h1 className="text-2xl font-normal font-serif">Keeva</h1>
            <ul className="flex items-center gap-6">
                <Link to={'/feed'}>Feed</Link>
                <Link to={'/feed'}>Shop</Link>
                <Link to={'/feed'}>Creators</Link>
                <Link to={'/vendors'}>Vendors</Link>
            </ul>
        </div>

        <div>
            <Link to={'/waitlist'} className="px-5 py-3  text-sm font-medium text-white bg-actionsColor rounded-full">Join Waitlist</Link>
        </div>
    </nav>
  )
}

export default Navbar