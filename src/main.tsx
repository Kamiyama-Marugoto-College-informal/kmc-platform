import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Sidebar from './components/Sidebar'
import { useAuth } from './hooks/useAuth'

function Root() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user } = useAuth()
  return (
    <BrowserRouter>
      {user ? (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : null}
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
