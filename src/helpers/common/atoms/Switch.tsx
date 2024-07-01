import Switch from '@mui/material/Switch'
import type { ChangeEvent } from 'react'

export const SwitchWidget = ({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (newValue: boolean) => void
}) => {
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.checked
    onChange(newValue)
  }

  return (
    <div className="w-full flex justify-between items-center my-3 ">
      <span className="text-xs">{label}</span>
      <Switch checked={value} onChange={handleSwitchChange} />
    </div>
  )
}
