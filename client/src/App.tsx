// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
import Waitlist from "./pages/marketing/Waitlist.tsx";
import NotFound from "./pages/marketing/NotFound.tsx";
import AppFeed from "./pages/app/appHome.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import SignUp from "./pages/authentication/SignUp.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import Login from "./pages/authentication/Login.tsx";
import Role from "./pages/authentication/Role.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Explore from "./pages/app/Explore.tsx";
// import HomePage from "./pages/HomePage.tsx";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        
        <Route path="*" element={<NotFound />} />

        <Route element={<AuthLayout/>}>
          <Route path="/auth/signup" element= {<SignUp />} />
          <Route path= "/auth/login" element= {<Login />} />
          <Route path= "/auth/role" element = {<Role />} />
        
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/app/home" element= {<AppFeed />}/>
          <Route path="app/explore" element= {<Explore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  
);

export default App;
