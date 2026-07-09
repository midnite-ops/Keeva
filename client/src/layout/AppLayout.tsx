import { Outlet } from "react-router-dom"
import Header from "../components/app/Header"
import SideBar from "../components/app/SideBar"

const AppLayout = () => {
  return (
    <div className="h-screen bg-bgBlack text-white overflow-hidden">

      <Header />

      <div className="flex h-[calc(100vh-79px)]">

        <SideBar />

        <main className="flex-1 md:px-6 lg:pl-30 lg:pr-8 overflow-hidden">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default AppLayout