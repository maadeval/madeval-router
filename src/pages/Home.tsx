import { type ReactNode } from 'react'
import { Link } from '../Link'

export const Home = (): ReactNode => {
  return (
    <>
      <h1>Home page wey 🚀</h1>
      <Link to="/about">Go to about page 🪪</Link>
    </>
  )
}
