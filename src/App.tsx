import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { onMount, Suspense } from 'solid-js'
import { initAuth, destroyAuth } from '~/lib/stores/auth'
import './app.css'

export default function App() {
  onMount(() => {
    initAuth()
    return () => destroyAuth()
  })

  return (
    <Router>
      <Suspense>
        <FileRoutes />
      </Suspense>
    </Router>
  )
}
