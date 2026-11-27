import { Outlet } from "react-router-dom"
import Header from "../components/app/Header"
import SideBar from "../components/app/SideBar"
import BottomNav from "../components/app/BottomNav"

const AppLayout = () => {
 
  return (
    <div className="h-dvh  text-white overflow-hidden ">

      <Header />

      <div className="flex h-[calc(100vh-79px)]">

        <SideBar />
        <BottomNav />

        <main className="min-w-0 min-h-0 flex-1 overflow-hidden md:px-6 lg:pl-20 xl:pl-30 lg:pr-8">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AppLayout