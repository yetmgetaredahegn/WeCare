import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Settings } from "lucide-react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useMe } from "@/features/auth/queries";
import { useQueryClient } from "@tanstack/react-query";
import ProfileDropdown from "../ProfileDropdown";

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

  // Keep a mobile-only profile link so users can reach their profile without the desktop dropdown
  const mobileLinks = isAuthenticated
    ? [...links, { to: "/profile", label: "Profile" }]
    : links;

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 dark:bg-gray-900 shadow-md transition-colors">
      <div className="mx-auto relative flex max-w-7xl items-center justify-between px-6 py-3">
        {/* LEFT: Logo + Pages */}
        <div className="flex  items-center gap-8">
          <Link to="/" className="flex items-baseline gap-1 text-lg font-semibold text-green-600">
            We <span className="text-4xl text-cyan-600">Care</span>
          </Link>

          <div className="hidden absolute left-47 md:flex items-center gap-9">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-600 font-semibold"
                    : "text-slate-700 dark:text-slate-300"
                }
              >
                {label}
              </NavLink>
            ))}
          </div>


        </div>
        {/* RIGHT: Auth */}
        <div className="ml-auto hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <ProfileDropdown
              name={
                isLoading
                  ? "Loading..."
                  : user?.first_name || user?.email
              }
            />
          ) : (
            <>
              <NavLink to="/login" className="px-4 py-2 rounded-lg bg-cyan-600 text-white">
                Login
              </NavLink>
              <NavLink to="/register" className="px-4 py-2 rounded-lg border border-cyan-600 text-cyan-600">
                Register
              </NavLink>
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-lg flex flex-row items-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-800"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              {/* <div className="relative">

                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-800"
                >

                  <ChevronDown size={16} />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-20 rounded-xl bg-white dark:bg-gray-900 shadow-lg border dark:border-slate-700">
                    <button
                      onClick={toggleTheme}
                      className="flex w-full items-center  gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      {isDark ? <Sun size={16} /> : <Moon size={16} />}
                      {isDark ? "Light" : "Dark"}
                    </button>
                  </div>
                )}
              </div> */}
              {/* <div className="flex flex-row  gap-3 px-6 py-4 absolute right-0">
                <button
                  onClick={toggleTheme}
                  className="flex px-4 py-2 items-center gap-1.5 rounded-lg border border-slate-600 text-slate-700 dark:text-slate-300 dark:border-slate-300"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
              </div> */}
            </>
          )}

        </div>


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
            {mobileLinks.map(({ to, label }) => (
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
              <>
                <button
                  onClick={toggleTheme}
                  className="flex px-4 py-2 items-center gap-1.5 rounded-lg border border-slate-600 text-cyan-600"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className='flex flex-col gap-3 px-6 py-4' to="/login">Login</NavLink>
                <NavLink className='flex flex-col gap-3 px-6 py-4' to="/register">Register</NavLink>
                <div className="flex flex-row  gap-3 px-6 py-4">
                  <button
                    onClick={toggleTheme}
                    className="flex px-4 py-2 items-center gap-1.5 rounded-lg border border-slate-600 text-cyan-600"
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    {isDark ? "Light mode" : "Dark mode"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
