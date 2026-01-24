import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Scheduling from "./pages/Scheduling"
import Clinical from "./pages/Clinical"
import Users from "./pages/Users"
import Login from "./pages/Login"
import About from "./pages/About"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ui/auth/ProtectedRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/scheduling',
        element: <ProtectedRoute><Scheduling /></ProtectedRoute>
      },
      {
        path: '/clinical',
        element: <ProtectedRoute><Clinical /></ProtectedRoute>
      },
      {
        path: '/users',
        element: <ProtectedRoute><Users /></ProtectedRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/about',
        element: <About />
      }
    ],
  },
])
