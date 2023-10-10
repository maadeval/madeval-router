import { type ReactNode } from 'react'

interface PropsComponent {
  params: Record<string, string>
  [key: string]: unknown
}

export interface IRoute {
  path: string
  component: ({ params, ...args }: PropsComponent) => ReactNode
}
