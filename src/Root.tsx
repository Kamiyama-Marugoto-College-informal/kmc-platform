import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import Sidebar from './components/Sidebar'
import { useAuth } from './hooks/useAuth'

export function Root() {
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
