import { type ReactNode } from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Router } from './Router'
import { type IRoute } from './types'
import { Route } from './Route'

const routes: IRoute[] = [
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
    component: ({ params }) => (
      <h1>
        Component to search:{' '}
        {params.product[0].toUpperCase() + params.product.slice(1)}
      </h1>
    ),
  },
]

const App = (): ReactNode => {
  return (
    <main>
      <Router routes={routes}>
        <Route path="/example" component={() => <h1>Example page</h1>} />
        <Route path="/example-2" component={() => <h1>Example 1️⃣</h1>} />
        <Route path="/example-3" component={() => <h1>Example 2️⃣</h1>} />
      </Router>
    </main>
  )
}

export default App
