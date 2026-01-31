import { useState } from "react";
import { ChevronDown, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  name?: string;
  avatarUrl?: string | null;
};

const ProfileDropdown = ({ name, avatarUrl }: Props) => {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-800"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name ?? "User avatar"}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white text-sm font-semibold">
            {name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-gray-900 shadow-lg border dark:border-slate-700">
          <div className="px-4 py-3 text-sm font-medium border-b dark:border-slate-700">
            {name}
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <User size={16} />
            Profile
          </button>

          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
