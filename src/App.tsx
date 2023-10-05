import { type ReactNode } from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Router, type Route } from './Router'

const routes: Route[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/search/:product',
    component: ({ params }) => <h1>Component to search:{params.product}</h1>,
  },
]

const App = (): ReactNode => {
  return (
    <main>
      <Router routes={routes} />
    </main>
  )
}

export default App
