import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 drop-shadow-md">
      <div className="flex items-center justify-around px-6 py-3">
        <Link to="/" className="flex items-center gap-1 text-lg font-semibold text-green-600">
          We
          <span className="text-5xl text-cyan-600">Care</span>
        </Link>

        <div className="flex items-center gap-5">
          {[
            { to: "/", label: "Home" },
            { to: "/scheduling", label: "Scheduling" },
            { to: "/clinical", label: "Clinical" },
            { to: "/users", label: "Users" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-1 text-lg font-light transition ${
                  isActive
                    ? "text-shadow-lg text-slate-900 drop-shadow-lg"
                    : "text-slate-900 hover:text-shadow-lg hover:drop-shadow-lg"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
