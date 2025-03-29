import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdmiContext.jsx'
import ConsultantContextProvider from './context/ConsultantContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <ConsultantContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ConsultantContextProvider>
    </AdminContextProvider>

  </BrowserRouter>,
)
