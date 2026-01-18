import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "../ThemeContext"

const NavBar = () => {
  const [open, setOpen] = useState(false)

  const links = [
    { to: "/", label: "Home" },
    { to: "/scheduling", label: "Scheduling" },
    { to: "/clinical", label: "Clinical" },
    { to: "/users", label: "Users" },
    { to: "/about", label: "About" },
  ]

  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 shadow-md dark:bg-gray-800 transition-colors">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

    {/* LEFT: LOGO */}
    <Link
      to="/"
      className="flex items-baseline gap-1 text-lg font-semibold text-green-600"
    >
      We
      <span className="text-4xl text-cyan-600">Care</span>
    </Link>

    {/* CENTER: DESKTOP LINKS */}
    <div className="hidden md:flex items-center gap-6 ">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `rounded-lg px-3 py-1 text-base font-medium transition ${
              isActive
                ? "text-slate-900 font-semibold dark:text-white"
                : "text-slate-700 hover:text-slate-900 dark:text-slate-300"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>

    {/* RIGHT: ACTIONS */}
    <div className="flex items-center gap-3">

      {/* THEME TOGGLE */}
      <button
        onClick={toggleTheme}
        className="rounded-lg p-2 text-slate-700 hover:bg-gray-200 
                   dark:text-slate-300 dark:hover:bg-slate-700 transition"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* HAMBURGER (mobile only) */}
      <button
        className="md:hidden rounded-lg p-2 text-slate-800 
                   hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {/* MOBILE MENU */}
  {open && (
    <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="flex flex-col gap-2 px-6 py-4">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-base transition ${
                isActive
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200 font-semibold"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  )}
</nav>

  )
}

export default NavBar
