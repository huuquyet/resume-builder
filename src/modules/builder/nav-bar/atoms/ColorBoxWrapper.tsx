import type { PropsWithChildren } from 'react'

export const ColorBoxWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex shadow-[0_0_2px_0_rgba(0_0_0/0.5)] ">{children}</div>
}
