import { Outlet } from "react-router-dom"
import Navbar from "./components/ui/navigation/NavBar"

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-white">
      <Navbar />

      <main className="flex-1 pt-20 px-6">
        <Outlet />
      </main>

      <footer className="border-t px-6 py-4 text-center text-sm text-muted-foreground">
        © 2026 Healthcare System. All rights reserved. Developed by Yetmgeta Redahegn.
      </footer>
    </div>
  )
}

export default App
