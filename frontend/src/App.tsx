import React from 'react'
import { createBrowserRouter, Link, Outlet } from 'react-router'
import Home from './pages/Home';
import { NavigationMenu } from './components/ui/navigation-menu';



const App = () => {
  return (
    <div>
      <nav>
        <NavigationMenu>
          <Link to='/'>Home</Link>
        </NavigationMenu>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>© 2026 Healthcare System. All rights reserved.

        Developed by Yetmgeta Redahegn. Unauthorized use is prohibited.</footer>
    </div>
  )
}

export default App
