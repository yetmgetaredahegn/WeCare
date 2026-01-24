import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedNotice from "@/components/ui/ProtectedNotice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: "redirect" | "notice";
}

const ProtectedRoute = ({
  children,
  fallback = "notice",
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Option 1: UX-first (what you're using)
  if (fallback === "notice") {
    return <ProtectedNotice />;
  }

  // Option 2: classic redirect
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
