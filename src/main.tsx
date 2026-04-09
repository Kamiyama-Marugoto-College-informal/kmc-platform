import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import Sidebar from './components/Sidebar'

function Root() {
  const [activeTab, setActiveTab] = useState('dashboard')
  return (
    <BrowserRouter>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
