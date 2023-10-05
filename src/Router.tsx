import { useState, type ReactNode, useEffect } from 'react'
import { match } from 'path-to-regexp'
import { EVENT_TYPE } from './consts'

interface PropsComponent {
  params: Record<string, string>
  [key: string]: unknown
}

export interface Route {
  path: string
  component: ({ params, ...args }: PropsComponent) => ReactNode
}

interface Props {
  routes: Route[]
  defaultPage?: () => ReactNode
}

export const Router = ({ routes, defaultPage = DefaultPage }: Props) => {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname,
  )

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENT_TYPE.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENT_TYPE.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENT_TYPE.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENT_TYPE.POPSTATE, onLocationChange)
    }
  }, [])

  let paramsUrl = {}

  const PageToRender =
    routes.find(({ path }) => {
      if (path === currentPath) return true

      const matcherUrl = match(path, {
        decode: decodeURIComponent,
      })
      const matched = matcherUrl(currentPath)
      if (matched === false) return false

      paramsUrl = matched.params
      return true
    })?.component ?? defaultPage

  return <PageToRender params={paramsUrl} />
}

const DefaultPage = () => <h1>404</h1>
