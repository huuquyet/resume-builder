import type { Dayjs } from 'dayjs'

export interface IVolunteeringItem {
  id: string
  organization: string
  position: string
  url: string
  startDate: Dayjs | null
  endDate: Dayjs | null
  summary: string
  highlights: string[]
  isVolunteeringNow: boolean
}

export interface IVolunteeringStore {
  volunteeredExps: IVolunteeringItem[]
  add: (newVolunteering: IVolunteeringItem) => void
  get: (index: number) => IVolunteeringItem
  remove: (index: number) => void
  reset: (values: IVolunteeringItem[]) => void
  onmoveup: (index: number) => void
  onmovedown: (index: number) => void
  updatedVolunteeringExp: (index: number, updatedInfo: IVolunteeringItem) => void
}
