import { useQuery } from "@tanstack/react-query";
import { deriveRole, fetchMe } from "./api";
import { useAuth } from "@/context/AuthContext";

export const useMe = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: isAuthenticated, 
    select: (user) => ({
      ...user,
      role: deriveRole(user),
    }),
  });
};




