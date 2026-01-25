import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useMe } from "@/features/auth/queries";
import { useQueryClient } from "@tanstack/react-query";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { data: user, isLoading } = useMe();

  const links = [
    { to: "/", label: "Home" },
    { to: "/scheduling", label: "Scheduling" },
    { to: "/clinical", label: "Clinical" },
    { to: "/users", label: "Users" },
    { to: "/about", label: "About" },
  ];

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 dark:bg-gray-900 shadow-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link to="/" className="flex items-baseline gap-1 text-lg font-semibold text-green-600">
          We <span className="text-4xl text-cyan-600">Care</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1 transition ${isActive
                  ? "text-cyan-600 font-semibold"
                  : "text-slate-700 dark:text-slate-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* AUTH ACTIONS */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isLoading ? (
                <span className="text-sm text-slate-500">Loading…</span>
              ) : (
                <span className="text-sm font-medium">
                  {user?.first_name || user?.email}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="px-4 py-2 bg-cyan-600 text-white">
                Login
              </NavLink>
              <NavLink to="/register" className="px-4 py-2 border border-cyan-600 text-cyan-600">
                Register
              </NavLink>
            </>
          )}

        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden rounded-lg p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-900 border-t">
          <div className="flex flex-col gap-3 px-6 py-4">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="px-4 py-2"
              >
                {label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
