import { Home, Bell, SearchIcon, Plus, User2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const BottomNav = () => {
    const [currentLink, setCurrentLink] = useState('app/feed')
    const navLinks = [
        {
            icon: Home ,
            link: 'app/feed'
        },
        {
            icon: SearchIcon,
            link: 'app/explore'
        },
        
        {
            icon: Plus,
            link: 'app/create-post'
        },
        {
            icon: Bell ,
            link: 'app/notification'
        },
        {
            icon: User2 ,
            link: 'app/account'
        }
    ]
  return (
    <nav className='fixed px-4 py-4 z-10 bottom-0 right-0 w-full h-15 md:hidden bg-background flex justify-between items-center'>
        {navLinks.map((item) => (
            <Link to={item.link} onClick={() => setCurrentLink(item.link)}> <item.icon fill={currentLink === item.link ? 'white' : ''}/></Link>
        ))}
    </nav>
  )
}

export default BottomNav