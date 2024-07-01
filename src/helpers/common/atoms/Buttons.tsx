import { Button } from '@mui/material'
import type { ReactNode } from 'react'

export const OutlinedButton = ({
  onClick,
  children,
  disabled = false,
}: {
  onClick: () => void
  children?: ReactNode
  disabled?: boolean
}) => (
  <Button variant="outlined" onClick={onClick} className="text-resume-900" disabled={disabled}>
    {children}
  </Button>
)

export const TextButton = ({
  onClick,
  children,
  disabled = false,
}: {
  onClick: () => void
  children?: ReactNode
  disabled?: boolean
}) => (
  <Button variant="outlined" onClick={onClick} className="text-resume-900" disabled={disabled}>
    {children}
  </Button>
)
