import type { ReactNode } from 'react'

export interface INavMenuPopoverProps {
  isOpen: boolean
  anchorElement: Element | null
  children?: ReactNode
  id: string
  onClose: () => void
}
