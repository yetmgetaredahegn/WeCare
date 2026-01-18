import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "./index.css"
import App from './App.tsx'
import { router } from './routes.tsx'
import { ThemeProvider } from './components/ui/ThemeContext.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

