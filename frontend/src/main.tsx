import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { router } from './routes.tsx'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
