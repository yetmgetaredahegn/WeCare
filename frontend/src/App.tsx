import { Outlet } from "react-router-dom"
import Navbar from "./components/ui/navigation/NavBar"

const App = () => {
  return (
    <div
      className="
        flex min-h-screen flex-col
        bg-gray-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-100
        transition-colors duration-300
      "
    >
      <Navbar />

      <main className="flex-1 pt-20 px-6">
        <Outlet />
      </main>

      <footer
        className="
          border-t border-slate-200
          dark:border-slate-800
          px-6 py-4 text-center text-sm
          text-slate-500
        "
      >
        © 2026 Healthcare System. All rights reserved. Developed by Yetmgeta Redahegn.
      </footer>
    </div>
  )
}


export default App
