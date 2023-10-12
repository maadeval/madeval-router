import { useState, type ReactNode, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { EVENT_TYPE } from './consts'
import { type IRoute } from './types'
import { DefaultPage } from './utils/DefaultPage'
import { getCurrentPath } from './utils/current-path'

interface Props {
  routes?: IRoute[]
  defaultPage?: () => ReactNode
  children?: ReactNode
}

export const Router = ({
  routes = [],
  defaultPage = DefaultPage,
  children,
}: Props) => {
  const { path: currentPath } = usePath()

  const childrenRouteParser = getRouteFromChildren(children)
  const allRoutes = routes?.concat(childrenRouteParser).filter(Boolean)

  let paramsUrl = {}

  const PageToRender =
    allRoutes?.find(({ path }) => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRouteFromChildren = (children: any) => {
  if (typeof children === 'undefined') return

  return Children.map(children, ({ props, type }) => {
    const { name } = type
    const { path, component } = props

    const isRoute = name === 'Route'
    if (!isRoute) return

    return {
      path,
      component,
    }
  })
}

const usePath = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENT_TYPE.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENT_TYPE.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENT_TYPE.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENT_TYPE.POPSTATE, onLocationChange)
    }
  }, [])

  return {
    path: currentPath,
  }
}
