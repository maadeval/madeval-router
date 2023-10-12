import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Router } from '../Router'
import { Link } from '../Link'
import { Route } from '../Route'
import userEvent from '@testing-library/user-event'
import { getCurrentPath } from '../utils/current-path.ts'

vi.mock('../utils/current-path.ts', () => ({
  getCurrentPath: vi.fn(() => {}),
}))

describe('Library components', () => {
  it('should be render Router component', () => {
    render(<Router />)
  })

  it('should be render Router component with empty array routes as prop', () => {
    render(<Router routes={[]} />)
  })

  it('should be render a 404 default component', () => {
    const childrenMessage = '404'

    render(
      <Router>
        <h1>{childrenMessage}</h1>
      </Router>,
    )

    expect(
      screen.getByRole('heading', { name: childrenMessage }),
    ).toBeInTheDocument()
  })

  it('should render a custom default page component', () => {
    const childrenMessage = 'Custom default page'

    render(
      <Router defaultPage={() => <h1>{childrenMessage}</h1>}>
        <h1>404</h1>
      </Router>,
    )

    expect(
      screen.getByRole('heading', { name: childrenMessage }),
    ).toBeInTheDocument()
  })

  it.skip('should navigate to a route with a path prop', async () => {
    getCurrentPath.mockReturnValueOnce('/')
    render(
      <Router>
        <Route
          path="/"
          component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go to About</Link>
              </>
            )
          }}
        />
        <Route path="/about" component={() => <h1>About</h1>} />
      </Router>,
    )
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()

    const navidateToAboutLink = screen.getByRole('link', {
      name: /Go to about/i,
    })

    await userEvent.click(navidateToAboutLink)

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
  })
})
