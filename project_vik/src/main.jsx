import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // <--- MAKE SURE THIS IS HERE
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext' // Or your specific path
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)