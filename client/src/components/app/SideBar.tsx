import { useState } from "react"
import { Link } from "react-router"

const SideBar = () => {
    const [activeLink, setActiveLink] = useState('For You')
    const sidebarLinks = [
        {
            title: 'For You',
            link: 'app/home'
        },
        {
            title: 'Saved',
            link: 'app/saved'
        },
        {
            title: 'Cart',
            link: 'app/cart'
        }
    ]
  return (
    <section className='fixed left-0 top-0 bottom-0 border-r border-subtitleText/25'>
        <ul>
            {sidebarLinks.map((item) => (
               <Link to={item.link} className={`${activeLink === item.title ? 'text-white' : 'text-subtitleText'} cursor-pointer`} onClick={() => setActiveLink(item.title)}>{item.title}</Link>
            ))}
        </ul>
    </section>
  )
}

export default SideBar