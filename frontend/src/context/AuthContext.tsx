import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { deriveRole, fetchMe, type UserWithRole } from "@/features/auth/api";

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: UserWithRole | null;
  role: UserWithRole["role"];
  isUserLoading: boolean;
  refreshUser: () => void;
  login: (access: string, refresh: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Restore auth state on page reload
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (access && refresh) {
      setAccessToken(access);
      setRefreshToken(refresh);
    }
  }, []);

  const login = (access: string, refresh: string) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const { data: meData, isLoading: isUserLoading, refetch: refetchMe } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!accessToken,
  });

  const user: UserWithRole | null = accessToken && meData
    ? { ...meData, role: deriveRole(meData) }
    : null;

  return (
    <AuthContext
      value={{
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        user,
        role: user?.role ?? null,
        isUserLoading,
        refreshUser: () => {
          void refetchMe();
        },
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
