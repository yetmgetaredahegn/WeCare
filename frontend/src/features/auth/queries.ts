import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "./api";
import { useAuth } from "@/context/AuthContext";

export const useMe = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: isAuthenticated, // CRITICAL
  });
};
