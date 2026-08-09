import { Home, Bell, SearchIcon, Plus, User2, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/user/getCurrentUser"

const BottomNav = () => {
    const [currentLink, setCurrentLink] = useState(window.location.pathname)
    const user = getCurrentUser()
    currentLink
    const navLinks = [
        {
            icon: Home ,
            link: '/app/home'
        },
        {
            icon: SearchIcon,
            link: '/app/explore'
        },
        
        {
            icon: Plus,
            link: '/app/create-post'
        },
        {
            icon: Bell ,
            link: '/app/notifications'
        },
        {
            icon: User2 ,
            link: '/app/account'
        }
    ]
  return (
    <nav className='fixed px-4 py-4 z-10 bottom-0 right-0 w-full h-15 md:hidden bg-background flex justify-between items-center'>
        {navLinks.map((item) => {
            if(user?.role === 'customer' && item.link === '/app/create-post') return <Link to='/app/cart' onClick={() => setCurrentLink('/app/cart')} > <ShoppingBag className="text-black" /></Link>
            return (
            <Link to={item.link} onClick={() => setCurrentLink(item.link)} > <item.icon className="text-black" /></Link>
)})}
    </nav>
  )
}

export default BottomNav