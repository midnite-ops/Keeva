import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const currentUserId = localStorage.getItem("currentUserId");

  if (!currentUserId) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}