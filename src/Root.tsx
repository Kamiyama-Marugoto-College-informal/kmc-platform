import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'

export function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
