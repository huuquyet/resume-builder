import type { PropsWithChildren } from 'react'

export const NavBarActions = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-3 items-center">{children}</div>
}
