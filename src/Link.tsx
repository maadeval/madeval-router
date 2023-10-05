import { type MouseEvent, type ComponentPropsWithoutRef } from 'react'
import { EVENT_TYPE } from './consts'

type Props = {
  to: string
  target?: HTMLAnchorElement['target']
} & Omit<ComponentPropsWithoutRef<'a'>, 'target'>

export const Link = ({ to, target = DEFAULT_TARGET, ...props }: Props) => {
  return (
    <a
      onClick={(evt) => {
        handleNavigate(evt, { to, target })
      }}
      href={to}
      target={target}
      {...props}
    />
  )
}

const handleNavigate = (
  evt: MouseEvent<HTMLAnchorElement>,
  { to, target = DEFAULT_TARGET }: Pick<Props, 'to' | 'target'>,
) => {
  const isMainClick = evt.button === PRIMARY_CLICK
  const isModifiedClick =
    evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey
  const isTargetSelf = target === DEFAULT_TARGET

  const shouldCustomNavigate = isMainClick && !isModifiedClick && isTargetSelf
  if (!shouldCustomNavigate) return

  evt.preventDefault()
  navigate(to)
}

const navigate = (href: string) => {
  window.history.pushState({}, '', href)
  const navigateEvent = new Event(EVENT_TYPE.PUSHSTATE)
  return window.dispatchEvent(navigateEvent)
}

const DEFAULT_TARGET = '_self'
const PRIMARY_CLICK = 0
