import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Root } from '@/Root'
import DevBar from '@/components/DevBar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DevBar />
      <Root />
    </ThemeProvider>
  </StrictMode>,
)
