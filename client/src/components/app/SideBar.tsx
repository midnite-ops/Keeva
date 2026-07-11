import { useState } from "react"
import { Link } from "react-router"

const SideBar = () => {
    const [activeLink, setActiveLink] = useState('Home')
    const creators = [
        {
            name: 'Jesse Oyims',
            userName: '@midniteOps'
        },
        {
            name: 'Jesse Oyims',
            userName: '@midniteOps'
        },
        {
            name: 'Jesse Oyims',
            userName: '@midniteOps'
        }
    ]
    const sidebarLinks = [
        {
            title: 'Home',
            link: 'app/home'
        },
        {
            title: "Explore",
            link: 'app/explore'
        },
        {
            title: "Search",
            link: 'app/search'
        },
        
        {
            title: 'Notifications',
            link: 'app/notifications'
        },
        {
            title: 'Add Post',
            link: 'app/post'
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
    <section className='hidden  md:flex flex-col border-r border-subtitleText/25 w-50 pb-10 px-5 pt-10 '>
        <ul className="flex flex-col gap-2 font-semibold border-b border-subtitleText/25 pb-10 mb-5">
            {sidebarLinks.map((item) => (
               <Link to={item.link} className={`${activeLink === item.title ? 'text-foreground' : 'text-subtitleText'} cursor-pointer`} onClick={() => setActiveLink(item.title)}>{item.title}</Link>
            ))}
        </ul>

        <div>
            <h1 className="text-lg text-foreground">Top Creators</h1>
            <ul className="flex gap-5 flex-col mt-5">
                {creators.map((item) => (
                    <li className="flex gap-2 cursor-pointer">
                        <div className="bg-actionsColor size-8 rounded-full"></div>
                        <div>
                            <h4 className="text-sm text-foreground font-semibold">{item.name}</h4>
                            <p className="text-xs text-subtitleText">{item.userName}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

        <div className="flex-1 items-end flex">
            <div className="flex gap-2 items-center border-t border-subtitleText/25 w-full pt-5">
                <div className="size-8 ">
                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&auto=format" alt="" className="rounded-full"/>
                </div>
                <h4 className="text-sm text-foreground font-semibold cursor-pointer">Account</h4>
            </div>
            
        </div>
    </section>
  )
}

export default SideBar