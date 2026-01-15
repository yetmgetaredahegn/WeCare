import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const NavBar = () => {
  const [open, setOpen] = useState(false)

  const links = [
    { to: "/", label: "Home" },
    { to: "/scheduling", label: "Scheduling" },
    { to: "/clinical", label: "Clinical" },
    { to: "/users", label: "Users" },
    { to: "/about", label: "About" },
  ]

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* LOGO — always visible */}
        <Link
          to="/"
          className="flex items-baseline gap-1 text-lg font-semibold text-green-600"
        >
          We
          <span className="text-4xl text-cyan-600">Care</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1 text-base font-medium transition ${
                  isActive
                    ? "text-slate-900 font-semibold"
                    : "text-slate-700 hover:text-slate-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* HAMBURGER — mobile only */}
        <button
          className="md:hidden rounded-lg p-2 text-slate-800 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-50 border-t shadow-sm">
          <div className="flex flex-col gap-2 px-6 py-4">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-base transition ${
                    isActive
                      ? "bg-cyan-100 text-cyan-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
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
