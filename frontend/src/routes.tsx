import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Scheduling from "./pages/Scheduling"
import Clinical from "./pages/Clinical"
import Users from "./pages/Users"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/scheduling',
        Component: Scheduling
      },
      {
        path: '/clinical',
        Component: Clinical
      },
      {
        path: '/users',
        Component: Users
      }
    ],
  },
])
