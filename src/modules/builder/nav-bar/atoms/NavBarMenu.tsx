import type { PropsWithChildren } from 'react'

export const NavBarMenu = ({ children }: PropsWithChildren) => {
  return <div className="flex gap-3">{children}</div>
}
